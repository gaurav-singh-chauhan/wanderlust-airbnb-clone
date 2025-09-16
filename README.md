# Wanderlust Airbnb Clone

Wanderlust is a full-stack web application inspired by Airbnb, allowing users to list, browse, and review unique places to stay. Built with Node.js, Express, MongoDB, and EJS, it demonstrates modern web development best practices.

## Features

- User authentication (signup, login, logout)
- Create, edit, and delete property listings
- Upload images for listings
- Filter listings by category
- Leave reviews and ratings for listings
- Responsive UI with EJS templates and custom CSS
- Error handling and flash messages

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, HTML, CSS, JavaScript
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Passport.js
- **File Uploads:** Multer
- **Other:** Cloudinary (for image storage), Express-Session, Connect-Flash

## Project Structure

```
app.js                  # Main application entry point
cloudConfig.js          # Cloudinary configuration
middleware.js           # Custom middleware
package.json            # Project dependencies and scripts
schema.js               # Joi validation schemas
controllers/            # Route controllers
models/                 # Mongoose models
public/                 # Static assets (CSS, JS)
routes/                 # Express route definitions
uploads/                # Uploaded files/images
utils/                  # Utility functions and error classes
views/                  # EJS templates
```

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd wanderlust-airbnb-clone
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory with the following:
     ```env
     DB_URL=<your_mongodb_uri>
     CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
     CLOUDINARY_KEY=<your_cloudinary_key>
     CLOUDINARY_SECRET=<your_cloudinary_secret>
     SECRET=<your_session_secret>
     ```
4. (Optional) Seed the database:
   ```sh
   node init/index.js
   ```
5. Start the development server:
   ```sh
   node app.js
   ```

6. Visit `http://localhost:3000` in your browser.

## Folder Details

- **controllers/**: Business logic for listings, users, and reviews
- **models/**: Mongoose schemas for User, Listing, Review
- **routes/**: Express route handlers for listings, users, reviews
- **views/**: EJS templates for all pages
- **public/**: Static files (CSS, JS)
- **uploads/**: Uploaded images (if not using Cloudinary)
- **utils/**: Error handling and async wrappers

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Airbnb](https://www.airbnb.com/) for inspiration
- [Apna College](https://www.youtube.com/c/ApnaCollegeOfficial) - A huge thanks for their **Delta 2.0 Web Development course**, which guided me through building full-stack projects and inspired me to create *Wanderlust*.
