const express = require('express');
const app = express.Router();
const books = require("../controllers/book.controller.js");

// Create a new Customer
app.post("/books", books.create);

// Retrieve all books
app.get("/books", books.findAll);

// Retrieve a single book with bookId
app.get("/books/:bookId", books.findOne);

// Update a book with bookId
app.put("/books/:bookId", books.update);

// Delete a book with bookId
app.delete("/books/:bookId", books.delete);

// Create a new book
app.delete("/books", books.deleteAll);




module.exports = {
  app
};
