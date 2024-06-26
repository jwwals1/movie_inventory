const express = require("express");
const router = express.Router();

// Require controller modules.
const movie_controller = require("../controllers/movieController");

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", movie_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/movie/create", movie_controller.movie_create_get);

// POST request for creating Book.
router.post("/movie/create", movie_controller.movie_create_post);

// GET request to delete Book.
// router.get("/movie/:id/delete", movie_controller.movie_delete_get);

// POST request to delete Book.
// router.post("/movie/:id/delete", movie_controller.movie_delete_post);

// GET request to update Book.
// router.get("/movie/:id/update", movie_controller.movie_update_get);

// POST request to update Book.
// router.post("/movie/:id/update", movie_controller.movie_update_post);

// GET request for one Book.
router.get("/movie/:id", movie_controller.movie_detail);

// GET request for list of all Book items.
router.get("/movies", movie_controller.movie_list);


module.exports = router;
