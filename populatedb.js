#! /usr/bin/env node

console.log(
    'This script populates some test movies, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Movie = require("./models/movie");
  
  const movies = [];

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createMoives();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  
  
  async function movieCreate(index, title, director, release_date, summary) {
    const moviedetail = {
      title: title,
      director: director,
      release_date: release_date,
      summary: summary
    };
  
    const movie = new Movie(moviedetail);
    await movie.save();
    movies[index] = movie;
    console.log(`Added movie: ${title}`);
  }
  
  
  
  async function createMoives() {
    console.log("Adding Movies");
    await Promise.all([
      movieCreate(0,
        "Furiosa: A Mad Max Saga",
        "George Miller",
        "May 24, 2024",
        "Snatched from the Green Place of Many Mothers, young Furiosa falls into the hands of a great biker horde led by the warlord Dementus. Sweeping through the Wasteland, they come across the Citadel, presided over by the Immortan Joe. As the two tyrants fight for dominance, Furiosa soon finds herself in a nonstop battle to make her way home.I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
        // "9781473211896",
      ),
      movieCreate(1,
        "Fall Guy",
        "David Leitch",
        "May 3, 2024",
        "After leaving the business one year earlier, battle-scarred stuntman Colt Seavers springs back into action when the star of a big studio movie suddenly disappears. As the mystery surrounding the missing actor deepens, Colt soon finds himself ensnared in a sinister plot that pushes him to the edge of a fall more dangerous than any stunt.",
      ),
      movieCreate(1,
        "Dune: Part 2",
        "Denis Villeneuve",
        "March 1, 2024",
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
      ),
    ]);
  }
  
