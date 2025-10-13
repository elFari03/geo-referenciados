const express = require('express');

const router = express.Router();

let movies = [
  {id: 1, title: 'John Wick', year: 2014, category: "Accion"},
  {id: 2, title: 'Deadpool', year: 2016, category: "Accion"},
  {id: 3, title: 'Lalaland', year: 2017, category: "Romance"},
  {id: 4, title: 'Interstellar', year: 2014, category: "Sci-fi"},
  {id: 5, title: 'Se7en', year: 1995, category: "Terror"},
  {id: 6, title: 'Up',year: 2009, category: "Aventura"},
];

//Obtener pelicula
router.get("/", (req, res) => {
  res.json(movies);
});

//Obtener peliculas
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find(m =>m.id == id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json("Not Found");
  }
});

//Crear Pelicula
router.post("/", (req, res) => {
  const {title, year, category} = req.body;
  const newMovie = {
    id: movies.length + 1,
    title,
    year,
    category
  };
  movies.push(newMovie);
  res.status(201).json(
    {
    message: 'Movie added successfully',
    data: newMovie,
    }
  );
});

//Actualizar
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, year, category } = req.body;
  const updateMovie = movies.find(m =>m.id == id);
  if (updateMovie) {
    if (title) updateMovie.title = title;
    if (year) updateMovie.year = year;
    if (category) updateMovie.category = category;
    res.json(
      {
        message: 'Movie updated successfully',
        data: updateMovie
      }
    );
  } else {
    res.status(404).json("Not Found");
  }
});

//Eliminar pelicula
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleteMovie = movies.findIndex(m =>m.id == id);
  if (deleteMovie !== -1) {
    movies.splice(deleteMovie.id, 1);
    res.json({
      message: 'Movie deleted successfully',
      id
    })
  } else {
    res.status(404).json("Not Found");
  }
});

module.exports = router;
