import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Create a book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "All fields are required -> title, author & publish year.",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message,
    });
  }
});

//Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message,
    });
  }
});

//Get a book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    res.json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message,
    });
  }
});

//Update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "All fields are required -> title, author & publish year.",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book updated successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message,
    });
  }
});

//delete a book

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({
        message: "Book not found",
      });
    }

    res.send({
      message: "Book deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message,
    });
  }
});

export default router;