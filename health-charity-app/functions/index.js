/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest, onCall} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

admin.initializeApp();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-app-password", // Replace with your app password
  },
});

// Send email function
exports.sendEmail = onCall(async (request) => {
  const {to, subject, text, html, attachments} = request.data;

  if (!to || !subject || (!text && !html)) {
    throw new Error("Missing required fields: to, subject, and text/html");
  }

  try {
    const mailOptions = {
      from: "Health & Happiness Home <your-email@gmail.com>",
      to: to,
      subject: subject,
      text: text,
      html: html,
      attachments: attachments || [],
    };

    const result = await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully", {messageId: result.messageId});

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    logger.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
});

// Auto-send welcome email when user registers
exports.sendWelcomeEmail = onDocumentCreated(
    "users/{userId}",
    async (event) => {
      const userData = event.data.data();
      const userId = event.params.userId;

      try {
        const mailOptions = {
          from: "Health & Happiness Home <your-email@gmail.com>",
          to: userData.email,
          subject: "Welcome to Health & Happiness Home!",
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2c3e50;">Welcome to Health & Happiness Home!</h1>
            <p>Dear ${userData.email},</p>
            <p>Thank you for joining our community! We're excited to have you as part of our family.</p>
            <h2>Our Services Include:</h2>
            <ul>
              <li>Health Knowledge Lectures</li>
              <li>Interest Groups and Activities</li>
              <li>Home Visit Care</li>
              <li>Community Day Care</li>
            </ul>
            <p>You can now:</p>
            <ul>
              <li>Rate our services</li>
              <li>Find our locations</li>
              <li>Access exclusive member content</li>
            </ul>
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>The Health & Happiness Home Team</p>
          </div>
        `,
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Welcome email sent to ${userData.email}`);
      } catch (error) {
        logger.error("Error sending welcome email:", error);
      }
    },
);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
