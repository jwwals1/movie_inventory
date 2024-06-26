const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");



exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [
    numMoives,
  ] = await Promise.all([
    Movie.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Movie List Home",
    movie_count: numMoives,
  });
});


// Display list of all books.
exports.movie_list = asyncHandler(async (req, res, next) => {
  const allMovies = await Movie.find({}, "title author")
    .sort({ title: 1 })
    // .populate("author")
    .exec();

  res.render("movie_list", { title: "Movie List", movie_list: allMovies });
});


// Display detail page for a specific book.
exports.movie_detail = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances for specific book
  const [movie] = await Promise.all([
    Movie.findById(req.params.id)
    // movieInstance.find({ movie: req.params.id }).exec(),
  ]); 

  if (movie === null) {
    // No results.
    const err = new Error("Movie not found");
    err.status = 404;
    return next(err);
  }

  res.render("movie_detail", {
    title: movie.title,
    summary: req.body.summary,
    movie: movie,
    // book_instances: movieInstances,
  });
});


// Display book create form on GET.
exports.movie_create_get = asyncHandler(async (req, res, next) => {
  // Get all authors and genres, which we can use for adding to our book.
  res.render("movie_form", {
    title: "Create Movie",
  });
});


// Handle book create on POST.
exports.movie_create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("director", "Director must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("release_date", "Release date must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Movie object with escaped and trimmed data.
    const movie = new Movie({
      title: req.body.title,
      director: req.body.director,
      release_date: req.body.release_date,
      summary: req.body.summary,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      res.render("movie_form", {
        title: "Create Movie",
        // authors: allAuthors,
        // genres: allGenres,
        // book: book,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save book.
      await movie.save();
      res.redirect(movie.url);
    }
  }),
];


// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Movie delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Movie delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Movie update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Movie update POST");
});
