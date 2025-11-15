import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const BASE = "https://swapi.dev/api";

export const AppProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = async (pageOrUrl = 1) => {
    setLoading(true);
    setError(null);
    try {
      const url =
        typeof pageOrUrl === "string"? pageOrUrl: `${BASE}/people/?page=${pageOrUrl}`;
      const res = await fetch(url);
      const data = await res.json();

      setCharacters(data.results || []);
      setCount(data.count);
      setNext(data.next);
      setPrevious(data.previous);
      setPage(typeof pageOrUrl === "number" ? pageOrUrl : 1);
    } catch (err) {
      setError("Failed to load characters",err.message);
    }

    setLoading(false);
  };

  const searchCharacters = async (query) => {
    if (!query) return fetchCharacters(1);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/people/?search=${query}`);
      const data = await res.json();

      setCharacters(data.results || []);
      setCount(data.count);
      setNext(data.next);
      setPrevious(data.previous);
      setPage(1);
    } catch {
      setError("Search failed");
    }
    setLoading(false);
  };

  const getHomeworld = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch homeworld");
    return res.json();
  };

  useEffect(() => {
    fetchCharacters(1);
  }, []);

  return (
    <AppContext.Provider
      value={{
        characters,
        count,
        page,
        next,
        previous,
        loading,
        error,
        fetchCharacters,
        searchCharacters,
        getHomeworld,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
