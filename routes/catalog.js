const express = require("express");
const router = express.Router();

// Require controller modules.
const movie_controller = require("../controllers/movieController");

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", movie_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
// router.get("/book/create", movie_controller.book_create_get);

// POST request for creating Book.
// router.post("/book/create", movie_controller.book_create_post);

// GET request to delete Book.
// router.get("/book/:id/delete", movie_controller.book_delete_get);

// POST request to delete Book.
// router.post("/book/:id/delete", movie_controller.book_delete_post);

// GET request to update Book.
// router.get("/book/:id/update", movie_controller.book_update_get);

// // POST request to update Book.
// router.post("/book/:id/update", movie_controller.book_update_post);

// GET request for one Book.
// router.get("/book/:id", movie_controller.book_detail);

// GET request for list of all Book items.
router.get("/movies", movie_controller.movie_list);


module.exports = router;
