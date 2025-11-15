const getSpeciesAccent = (species = []) => {
    if (!Array.isArray(species) || species.length === 0) return "from-slate-700 to-slate-600";
    const palettes = [
        "from-indigo-600 to-indigo-400",
        "from-rose-600 to-rose-400",
        "from-emerald-600 to-emerald-400",
        "from-yellow-500 to-amber-400",
        "from-cyan-600 to-cyan-400",
    ];
    const key = species.join(",");
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash + key.charCodeAt(i)) % 1000;
    }
    return palettes[hash % palettes.length];
}

export default getSpeciesAccent;
