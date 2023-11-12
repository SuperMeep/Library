const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const borrowSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Book model
      required: [true, "Please add an User ID"],
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Reference to the Book model
      required: [true, "Please add a Book ID"],
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    book: {
      type: {
        title: String,
        genre: [String],
        author: String,
        ratings: Number,
        stock: Number,
      },
      required: [true, "Please provide book information"],
    },
  },
  { collection: "borrows", versionKey: false }
);

module.exports = mongoose.model("Borrow", borrowSchema);
