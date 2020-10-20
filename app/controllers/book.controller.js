const Book = require("../models/book.model.js");

// Create and Save a new book
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a book
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre
  });

  // Save book in the database
  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the book."
      });
    else res.send(data);
  });
};

// Retrieve all books from the database.
exports.findAll = (req, res) => {
  Book.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    else res.send(data);
  });
};

// Find a single book with a bookId
exports.findOne = (req, res) => {
  Book.findById(req.params.bookId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found book with id ${req.params.bookId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving book with id " + req.params.bookId
        });
      }
    } else res.send(data);
  });
};

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Book.updateById(
    req.params.bookId,
    new Book(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found book with id ${req.params.bookId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating book with id " + req.params.bookId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
  Book.remove(req.params.bookId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found book with id ${req.params.bookId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete book with id " + req.params.bookId
        });
      }
    } else res.send({ message: `book was deleted successfully!` });
  });
};

// Delete all books from the database.
exports.deleteAll = (req, res) => {
  Book.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all books."
      });
    else res.send({ message: `All books were deleted successfully!` });
  });
};
