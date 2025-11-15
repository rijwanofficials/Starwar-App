import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../hooks/useApi";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHomeworld } = useApp();

  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`https://swapi.dev/api/people/${id}/`);
        const data = await res.json();
        if (!mounted) return;

        setCharacter(data);

        if (data.homeworld) {
          const hw = await getHomeworld(data.homeworld);
          if (mounted) setHomeworld(hw);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCharacter();
    return () => {
      mounted = false;
    };
  }, [id, getHomeworld]);

  if (loading) return <Loader full={true} />;

  if (!character)
    return (
      <div className="text-center text-red-400 mt-10">
        Character not found
      </div>
    );

  const infoRows = [
    { label: "Height", value: `${character.height} m` },
    { label: "Mass", value: `${character.mass} kg` },
    { label: "Birth Year", value: character.birth_year },
    { label: "# of Films", value: character.films.length },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <button
        className="mb-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h2 className="text-3xl font-bold mb-4">{character.name}</h2>

      <img
        src={`https://picsum.photos/seed/modal-${encodeURIComponent(
          character.name
        )}/800/500`}
        alt={character.name}
        className="w-full h-64 md:h-72 object-cover rounded-lg shadow-md mb-6"
      />

      <div className="space-y-3">
        {infoRows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between px-4 py-2 bg-gray-800/50 rounded-md shadow-sm"
          >
            <span className="font-semibold text-gray-300">{row.label}</span>
            <span className="text-white">{row.value}</span>
          </div>
        ))}

        {homeworld && (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-md shadow-sm">
            <strong className="block mb-2 text-lg">Homeworld</strong>
            <div className="space-y-1 text-gray-300">
              <div className="flex justify-between">
                <span className="font-semibold">Name:</span>
                <span>{homeworld.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Terrain:</span>
                <span>{homeworld.terrain}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Climate:</span>
                <span>{homeworld.climate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Population:</span>
                <span>{homeworld.population}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
