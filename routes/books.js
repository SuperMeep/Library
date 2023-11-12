const express = require("express");
const { requireAuth, requireRole } = require("../middleware/requireAuth");
const {
  createBook,
  getBooks,
  getBooksBorrowed,
  getBook,
  deleteBook,
  updateBook,
  borrowBook,
  returnBook,
} = require("../controllers/bookController");

const router = express.Router();

router.use(requireAuth);

// GET all books (open to all authenticated users)
router.get("/", getBooks);
// GET all books (open to all authenticated users)
router.get("/borrowed", getBooksBorrowed);

// GET a single book (open to all authenticated users)
router.get("/:id", getBook);

// post a single book (open to all authenticated users)
router.post("/borrow/:bookId", borrowBook);
// post a single book (open to all authenticated users)
router.post("/return/:bookId", returnBook);

// POST a new book (only accessible to users with the "admin" or "librarian" role)
router.post("/", requireRole(["admin", "librarian"]), createBook);

// DELETE a book (only accessible to users with the "admin" or "librarian" role)
router.delete("/:id", requireRole(["admin", "librarian"]), deleteBook);

// UPDATE a book (only accessible to users with the "admin" or "librarian" role)
router.put("/:id", requireRole(["admin", "librarian"]), updateBook);

module.exports = router;
