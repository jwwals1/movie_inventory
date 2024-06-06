const Movie = require("../models/movie");
const asyncHandler = require("express-async-handler");


exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [
    numMoives,
  ] = await Promise.all([
    Movie.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Movie List Home",
    book_count: numMoives,
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
  const [movie, movieInstance] = await Promise.all([
    // Movie.findById(req.params.id).populate("author").populate("genre").exec(),
    // movieInstances.find({ movie: req.params.id }).exec(),
  ]);

  if (movie === null) {
    // No results.
    const err = new Error("Movie not found");
    err.status = 404;
    return next(err);
  }

  res.render("movie_detail", {
    movie: movie,
    // book_instances: movieInstances,
  });
});


// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Movie create GET");
});

// Handle book create on POST.
exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Movie create POST");
});

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
