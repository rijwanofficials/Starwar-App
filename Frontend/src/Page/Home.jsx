import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import { useApp } from "../hooks/useApi";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const { characters, page, count, previous, next, fetchCharacters } = useApp();
  const navigate = useNavigate();

  const handleClick = (character) => {
    const id = character.url.split("/").filter(Boolean).pop();
    navigate(`/profile/${id}`);
  };

  const handlePageChange = (urlOrPage) => {
    if (!urlOrPage) return;
    fetchCharacters(urlOrPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((c) => (
          <CharacterCard key={c.url} person={c} onOpen={handleClick} />
        ))}
      </div>

      <Pagination page={page} count={count} previous={previous} next={next} onChange={handlePageChange} />

      <div className="mt-4 text-sm text-right">Total: {count}</div>
    </>
  );
};

export default HomePage;
