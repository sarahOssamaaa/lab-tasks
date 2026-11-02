import { useState } from 'react';

function App() {
  
  const [movies, setMovies] = useState([
    { id: 1, title: 'Inception' },
    { id: 2, title: 'Interstellar' }
  ]);

  
  const [newTitle, setNewTitle] = useState('');

  
  const addMovie = (e) => {
    e.preventDefault();
    if (newTitle === '') return;

    const movie = {
      id: Date.now(),
      title: newTitle
    };

    setMovies([...movies, movie]);
    setNewTitle(''); 
  };

  
  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎬 My Movie Watch List</h1>

      {/* Form to add a movie */}
      <form onSubmit={addMovie} style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
          Add Movie
        </button>
      </form>

      {/* Conditional Rendering: Show message if list is empty */}
      {movies.length === 0 ? (
        <p>Your watch list is empty!</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              {movie.title}{' '}
              <button 
                onClick={() => deleteMovie(movie.id)}
                style={{ marginLeft: '1rem', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;