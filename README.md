# React Firebase Project

This project is a React application that integrates Firebase for authentication, Firestore for database operations, and Firebase Storage for file uploads. The application allows users to create and manage opportunities and update their profile information.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Configuration](#firebase-configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Login/Logout)
- Profile Management
- Opportunity Listing
- Adding New Opportunities
- Uploading and Displaying Profile Pictures
- Filtering and Sorting Opportunities

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/cloudsoftwareoff/scoltender-react
    cd scoltender-react
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `firebase.js` file service folder

   
    ```

4. Start the development server:

    ```sh
    npm start
    ```

## Usage

### Authentication

Users can log in and log out using their email and password.

### Profile Management

Users can update their profile information, including uploading a profile picture.

### Opportunity Management

Users can view a list of opportunities, add new opportunities, and filter opportunities based on their status (active or ended).

## Firebase Configuration

Ensure you have a Firebase project set up with Firestore and Storage enabled.

### Firestore Structure

- **users**: Collection to store user profiles.
  - **uid**: Document ID (user ID).
    - **name**: User's name.
    - **email**: User's email.
    - **phoneNumber**: User's phone number.
    - **profileImageUrl**: URL to the user's profile image.
    - **role**: User's role (e.g., contractor, institution).
    - **registeredAt**: Timestamp of user registration.

- **opportunities**: Collection to store opportunities.
  - **id**: Document ID.
    - **title**: Title of the opportunity.
    - **description**: Description of the opportunity.
    - **budget**: Budget for the opportunity.
    - **endDate**: End date of the opportunity.
    - **createdBy**: User ID of the creator.
    - **tags**: Tags associated with the opportunity.
    - **photoURL**: URL to the opportunity's image.
    - **createdAt**: Timestamp of creation.

## Project Structure

    ├── public
    │   ├── index.html
    │   └── ...
    ├── src
    │   ├── components
    │   │   ├── ProfileCard.js
    │   │   ├── AddOpportunity.js
    │   │   └── ...
    │   ├── services
    │   │   └── firebase.js
    │   ├── App.js
    │   ├── index.js
    │   └── ...
    ├── .env
    ├── package.json
    └── README.md

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
