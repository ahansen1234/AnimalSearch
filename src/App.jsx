import { useState, useEffect } from 'react';

function App() {

  const { search, animals } = useAnimalSearch();

  return (
    <main>
      <h1> Animal Search</h1>
      <input type="text" placeholder="Search" onChange={(e) => search(e.target.value)} />
      <ul>
        {animals.map((animal) => (
            <Animal key={animal.id} {...animal} />
        ))}
        {animals.length === 0 && "No Animals Found!"}
      </ul>
    </main>
  )
}

function Animal({type, name, age, gender}) {
  return (
    <li>
      <strong>{type}</strong> {name} is a {gender} and {age} years old
    </li>
  )
}

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:7070?' + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };

  return { search, animals };
}

export default App
