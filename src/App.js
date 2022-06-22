import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Movie from "./Movie";
import Filter from "./Filter";
import "./App.css";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  //when components get on the screen, run fetchPopular
  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    // fetch the popular movie data from the api and store them into the data var.
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    );
    // convert the data format to json format and store them into the movies var.
    const movies = await data.json(); 
    console.log(movies);
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div
        layout
        className="popular-movies"
      >
      <AnimatePresence>
        {filtered.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
