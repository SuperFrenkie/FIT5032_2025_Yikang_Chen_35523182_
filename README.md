# Health Charity Web Application

This project is a modern, responsive web application developed for a health charity dedicated to supporting vulnerable communities. Built with Vue.js 3 and Firebase, it aims to enhance the charity's digital presence, streamline operations, and improve community engagement.

## Key Features

The application implements a wide range of features based on the business requirements:

- **User Management:**
  - Secure user registration and login.
  - Role-based access control (e.g., general users vs. administrators).
  - External authentication using Firebase Auth.
- **Interactive Content:**
  - Dynamic data display from various sources.
  - Interactive tables with sorting, searching, and pagination.
  - Aggregated rating system for user feedback.
- **Services & Tools:**
  - Email notifications with attachments via SendGrid API.
  - Interactive maps with features like place search and navigation (using MapBox/Mapify).
  - Data export functionality (e.g., to CSV or PDF).
- **Technical Excellence:**
  - Fully responsive design for various devices.
  - Serverless backend logic using Firebase Cloud Functions.
  - Adherence to WCAG 2.1 AA accessibility standards.
  - Client-side validation and security best practices.

## Tech Stack

- **Frontend:**
  - [Vue.js 3](https://vuejs.org/) (Composition API)
  - [Vue Router](https://router.vuejs.org/) for client-side routing
  - [Pinia](https://pinia.vuejs.org/) for state management
  - [Vite](https://vitejs.dev/) as the build tool
- **Backend & Services:**
  - [Firebase](https://firebase.google.com/):
    - Firebase Authentication
    - Firestore Database
    - Cloud Functions
  - [SendGrid API](https://sendgrid.com/) for email services
  - [MapBox](https://www.mapbox.com/) / [Mapify](https://mapify.pro/) for geolocation services
- **Styling:**
  - CSS with a focus on responsiveness.

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd health-charity-app
    ```

2.  **Install dependencies:**
    Navigate to the `health-charity-app` directory and run:
    ```sh
    npm install
    ```

3.  **Set up Firebase:**
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Obtain your Firebase project configuration (API key, auth domain, etc.).
    - Update the Firebase configuration in `health-charity-app/src/firebase.js`.

### Running the Application

Once the dependencies are installed and Firebase is configured, you can run the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Deployment

This application is designed for cloud deployment. The requirements specify using services like **Cloudflare Pages** or **Google Cloud Hosting**.

To deploy, you would typically:
1.  Build the application for production: `npm run build`.
2.  Deploy the generated `dist` folder to your chosen hosting provider.
3.  Ensure your Firebase Cloud Functions are deployed using the Firebase CLI.

## Project Structure

The project follows a standard Vue.js 3 application structure:

```
health-charity-app/
├── public/              # Static assets
├── src/
│   ├── assets/          # CSS, images, fonts
│   ├── components/      # Reusable Vue components
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia state management stores
│   ├── views/           # Page components
│   ├── App.vue          # Root App component
│   ├── firebase.js      # Firebase configuration
│   └── main.js          # Application entry point
├── package.json         # Project dependencies and scripts
└── vite.config.js       # Vite configuration
```
