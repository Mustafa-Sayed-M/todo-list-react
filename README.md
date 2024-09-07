# Todo List - React <a href="https://mustafa-sayed-m.github.io/todo-list-react/">(Live Site)</a>

## Table of Contents

- Project Overview
- Features
- Technologies Used
- Installation
- Usage
- Folder Structure
- Contributing
- License

# Project Overview

This is a React.js based Todo List application that allows users to manage their daily tasks effectively. The project includes essential features such as task creation, deletion, marking tasks as completed, and user registration/login using Clerk. The back end is powered by Strapi, making this a full-stack application.

# Features

- User Authentication: Register and log in with Clerk authentication.
- Task Management: Add, edit, delete, and mark tasks as completed.
- Persistent Data: Tasks are stored using Strapi as the backend CMS.
- Responsive Design: Optimized for both desktop and mobile devices.

# Technologies Used

- React.js - Front-end framework
- Redux Toolkit - State management
- Clerk - User authentication
- Strapi - Backend CMS
- TailwindCSS - Styling
- Font Awesome - Icons

# Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```$
   git clone https://github.com/yourusername/todo-list-react.git
   cd todo-list-react
   ```

2. Install dependencies:

   ```$
   npm install
   ```

3. Set up environment variables:

   Create a .env file in the root of your project and add your API keys, Clerk credentials, and backend URL:

   ```$
   REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publish_key
   ```

4. Run the development server:

   ```$
   npm start
   ```

   The app will run at http://localhost:3000.

# Usage

Once the project is set up and running, you can:

- Register/login using Clerk's authentication.
- Add, delete, and mark tasks as completed.
- Manage your tasks seamlessly with a user-friendly interface

# Folder Structure

    ├── public
    ├── src
    │   ├── components
    │   ├── api
    │   ├── store
    │   └── utils
    ├── .env
    ├── package.json
    └── README.md

# Contributing

Contributions are welcome! If you'd like to contribute to the project, feel free to submit a pull request or open an issue on the GitHub repository.
