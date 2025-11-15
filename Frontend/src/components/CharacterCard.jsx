import getSpeciesAccent from "../utils/getSpeciesAccent";

const CharacterCard = ({ person, onOpen }) => {
  const accent = getSpeciesAccent(person.species);
  const img = `https://picsum.photos/seed/${encodeURIComponent(person.name)}/400/260`;

  return (
    <div
      onClick={() => onOpen(person)}
      className={`rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition duration-300 ${accent} bg-gradient-to-r`}
    >
      <div className="relative w-full h-44 md:h-48 lg:h-52">
        <img
          src={img}
          alt={person.name}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      </div>
      <div className="p-3 bg-white/80">
        <h3 className="font-semibold text-lg text-gray-900 text-center">
          {person.name}
        </h3>
      </div>
    </div>
  );
};

export default CharacterCard;
