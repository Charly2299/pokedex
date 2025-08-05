import { useEffect } from "react";

import pikachu_oscuro from "../assets/pikachu_oscuro.png";
import { useFetch } from "../hooks/useFetch";


/* 
type Pokemon2 = {
  name: string;
  id: number;
  image: string;
};

 */
type Pokemon = {
  id: number;
  name: string;
  types: { slot: number; type: { name: string; url: string } }[];
  sprites: {
    front_default?: string;
    front_shiny?: string;
    [key: string]: string | undefined;
  };
};

function Item({ url }: { url: string }) {
  const { data, getDataAxios,  loading } = useFetch();

  useEffect(() => {
    getDataAxios(url);
  }, []);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      fire: "#ef4444", water: "#3b82f6", grass: "#22c55e",
      electric: "#eab308", psychic: "#a855f7", ice: "#06b6d4",
      dragon: "#4f46e5", dark: "#4D5B70", fairy: "#ec4899",
      fighting: "#dc2626", poison: "#7c3aed", ground: "#a3a3a3",
      flying: "#60a5fa", bug: "#65a30d", rock: "#78716c",
      ghost: "#6b21a8", steel: "#64748b", normal: "#9ca3af",
    };
    return colors[type] || "#6b7280";
  };

  const getTypeDarkColor = (type: string) => {
    const darkColors: Record<string, string> = {
      fire: "#dc2626",      // red-600
      water: "#2563eb",     // blue-600
      grass: "#16a34a",     // green-600
      electric: "#ca8a04",  // yellow-600
      psychic: "#9333ea",   // purple-600
      ice: "#0891b2",       // cyan-600
      dragon: "#4338ca",    // indigo-700
      dark: "#1f2937",      // gray-800
      fairy: "#db2777",     // pink-600
      fighting: "#b91c1c",  // red-700
      poison: "#7c3aed",    // violet-600
      ground: "#78716c",    // stone-500
      flying: "#2563eb",    // blue-600
      bug: "#4d7c0f",       // lime-700
      rock: "#57534e",      // stone-600
      ghost: "#581c87",     // purple-800
      steel: "#475569",     // slate-600
      normal: "#6b7280",    // gray-500
    };
    return darkColors[type] || "#6b7280";
  };

  const getTypeMediumColor = (type: string) => {
    const mediumColors: Record<string, string> = {
      fire: "#fecaca",      // red-200
    water: "#bfdbfe",     // blue-200
    grass: "#bbf7d0",     // green-200
    electric: "#fde68a",  // yellow-200
    psychic: "#e9d5ff",   // purple-200
    ice: "#a5f3fc",       // cyan-200
    dragon: "#c7d2fe",    // indigo-200
    dark: "#e5e7eb",      // gray-200
    fairy: "#fbcfe8",     // pink-200
    fighting: "#fecaca",  // red-200
    poison: "#ddd6fe",    // violet-200
    ground: "#e7e5e4",    // neutral-200
    flying: "#bfdbfe",    // blue-200
    bug: "#d9f99d",       // lime-200
    rock: "#e7e5e4",      // stone-200
    ghost: "#e9d5ff",     // purple-200
    steel: "#e2e8f0",     // slate-200
    normal: "#e5e7eb",             // gray-300
    };
    return mediumColors[type] || "#d1d5db";
  };

  return (
    <div
      className="card
    transition-all duration-200 ease-in-out
  text-base sm:text-base md:text-base lg:text-base
  text-pri-dark
  "
    >
      {!data && loading && (
        <div
          className="flex flex-col justify-center items-center
            w-full 
            h-[480px] mt-5 mb-5
            border-8
            rounded 
            px-2 
            gap-x-2
            "
        >
          <p>Loading....</p>
        </div>
      )}

      {
        /* !loading &&  */ data && "types" in data && Array.isArray((data as Pokemon).types) && (
          <div
            className="flex flex-col justify-center items-center
            w-full 
            h-[480px] mt-5 mb-5
            border-8
            rounded 
            px-2 
            gap-x-2
            "
            style={{
              borderColor: getTypeDarkColor((data as Pokemon).types?.[0]?.type?.name),
              background:getTypeMediumColor((data as Pokemon).types?.[0]?.type?.name)
            }}
          >
            <h3 className="
            text-center font-bold h-[70px] flex justify-center items-center 
             text-base sm:text-base md:text-base lg:text-base
            ">{(data as Pokemon)?.name.toUpperCase()}</h3>
             <p>#{(data as Pokemon)?.id.toString().padStart(4, "0")}</p>

           

            <img
              src={
                (data as Pokemon)?.sprites?.front_default ||
                (data as Pokemon)?.sprites?.front_shiny ||
                pikachu_oscuro
              }
              alt={(data as Pokemon)?.name}
              className="focus-in rounded object-cover w-[250px] h-auto   border-8 mt-2"
            />

            <div className="h-[80px] flex flex-row justify-center items-center gap-x-2">
                {(data as Pokemon)?.types?.map((t: { slot: number; type: { name: string; url: string } }, index: number) => <div key={t?.type?.name || index} 
                className="border-4 rounded p-1"
                 style={{ 
      backgroundColor: getTypeColor(t?.type?.name),
      borderColor: getTypeColor(t?.type?.name)
    }}
                >{t?.type?.name}</div> )}
            </div>
            
         
          </div>
        )
      }
    </div>
  );
}

export default Item;

/* const [pokemon, setPokemon] = useState<null | Pokemon>(null); */

/*   useEffect(() => {
    axios.get(url).then((res) => {
      setPokemon({
        name: res.data.name,
        id: res.data.id,
        types: res.data.types.map((t: Type) => t.type.name),
        images: [
          res.data.sprites.other["official-artwork"].front_default,
          res.data.sprites.other["official-artwork"].front_shiny,
        ] ,
        height: res.data.height,
        weight: res.data.weight,
        abilities: res.data.abilities.map((ab: Ability) => ab.ability.name),
      });
    });
  }, []); */

/*   type Pokemon = {
  name: string;
  id: number;
  types: string[];
  images: string[];
  height: number;
  weight: number;
  abilities: string[];
};


type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Ability = {
  ability: {
    name: string;
    url: string;
  };
};
 */
