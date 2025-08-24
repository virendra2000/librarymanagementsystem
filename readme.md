Library Management System
This is a single-page web application built with React to simulate a basic library management system. It allows users to browse books, view their details, manage personal borrowings, and access administrative reports. The project uses local JSON files to simulate a backend database, making it easy to run and test without a server.

Features
Book Search: Find books by title or author from a list of available books.

Book Details: View detailed information for each book, including its availability and who has currently borrowed it.

Book Lending & Return: Simulate lending and returning books. A user can see all their currently borrowed books and click a button to "return" them.

Live Reports: View dynamic reports, including a list of all books due for return on the current day and a breakdown of books by genre.

Responsive UI: The application's interface is designed to be fully responsive and work seamlessly on both desktop and mobile devices.

Technology Stack
This project is built using the following technologies:

React: A JavaScript library for building user interfaces.

React Router DOM: For handling client-side routing and navigation.

Tailwind CSS: A utility-first CSS framework for styling the application quickly and efficiently.

react-toastify: For displaying user-friendly success and error notifications.

Getting Started
To get a copy of this project up and running on your local machine, follow these simple steps.

Prerequisites
You need to have Node.js and npm installed on your machine.

Installation
Clone the repository to your local machine.

Navigate into the project directory.

Install the required npm packages:

Bash

npm install
Start the development server:

Bash

npm start
The application will now be running on http://localhost:3000.

Data Simulation
The application uses local JSON files located in the Constants directory to simulate a database.

books.json: Acts as the main Book table, containing details like book name, author, genre, and total quantity.

transactions.json: Acts as the Transactions table, storing records of lent books, including a bookId for linking and a userId for tracking.
