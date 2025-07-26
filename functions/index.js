const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

/**
 * Listens for new ratings and updates the corresponding service's average rating.
 */
exports.updateServiceRating = functions.firestore
    .document("ratings/{ratingId}")
    .onCreate(async (snap, context) => {
      // Get the data from the new rating document that was created.
      const ratingData = snap.data();
      const serviceId = ratingData.serviceId;

      if (!serviceId) {
        console.log("New rating document is missing a serviceId. Exiting function.");
        return null;
      }

      // Get a reference to the service document.
      const serviceRef = db.collection("services").doc(serviceId);

      // In a transaction, read the current ratings and update the average.
      // Transactions ensure that the data remains consistent even with multiple simultaneous updates.
      return db.runTransaction(async (transaction) => {
        const serviceDoc = await transaction.get(serviceRef);

        if (!serviceDoc.exists) {
          throw new Error(`Service document with ID ${serviceId} does not exist!`);
        }

        // Calculate the new average rating.
        const oldTotalRatings = serviceDoc.data().totalRatings || 0;
        const oldAverageRating = serviceDoc.data().averageRating || 0;
        
        const oldRatingTotal = oldAverageRating * oldTotalRatings;
        const newTotalRatings = oldTotalRatings + 1;

        const newAverageRating = (oldRatingTotal + ratingData.rating) / newTotalRatings;

        // Update the service document with the new values.
        console.log(
            `Updating rating for service ${serviceId}. 
            New average: ${newAverageRating}, Total ratings: ${newTotalRatings}`
        );
        
        return transaction.update(serviceRef, {
          averageRating: newAverageRating,
          totalRatings: newTotalRatings,
        });
      });
    }); 