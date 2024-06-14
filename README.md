# Next.js User Authentication

Welcome to our Next.js user authentication project with Nodemailer integration! This project provides a robust authentication system using JWT session tokens for user sign up, login, and logout functionalities. Additionally, it includes the feature of sending a welcoming email to new users upon registration using Nodemailer.

## Technologies Used

- Next.js
- Axios
- Bcrypt.js
- JWT
- Nodemailer
- Tailwind CSS
- Mongoose

## Features

- User sign up with encrypted password storage
- User login with JWT session tokens
- User logout
- Route protection using middlewares
- Welcome email sent to new users using Nodemailer

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Configure your MongoDB database connection in `.env` file.
4. Run the development server using `npm run dev`.
5. Access the application in your web browser at `http://localhost:3000`.

## ENV

- DB_URI
- DB_NAME
- TOKEN_SECRET
- DOMAIN
- NEXTAUTH_SECRET
- NEXTAUTH_URL

## Usage

- Visit the sign-up page (`/signup`) to create a new user account.
- After signing up, you can log in using your credentials on the login page (`/login`).
- Once logged in, you can access protected routes and perform actions specific to authenticated users.
- Logout from your account by clicking on the logout button.

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new pull request.
