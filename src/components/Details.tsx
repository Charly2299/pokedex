
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import pika from '../assets/pikachu_oscuro.png';
import { Sparkles, Star } from "lucide-react"; 

type Pokemon = {
  name: string;
  id: number;
  types: string[];
  images: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: Stats;
};

type Stats = {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
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

function Details() {
  const baseURl: string = "https://pokeapi.co/api/v2";
  const { name } = useParams();
 const [isShiny, setIsShiny] = useState(false);
 /*  const [pokemon, setPokemon] = useState<Pokemon | null>(null); */
   const { data, getDataAxios, error, loading, setData } = useFetch<Pokemon | null>();


   useEffect(() => {
   getDataAxios(`${baseURl}/pokemon/${name}`)

   }, [name])

// ✅ Función para obtener la imagen actual
  const getCurrentImage = () => {
    if (!pokemon) return '';
    
    if (isShiny) {
      return  pokemon?.images.shiny || pokemon?.images.normal || pika;
    } else {
      return  pokemon?.images.normal || pika;
    }
  };

  // ✅ Función para toggle entre normal y shiny
  const toggleShiny = () => {
    setIsShiny(!isShiny);
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
      normal: "#e5e7eb",    // gray-300
    };
    return mediumColors[type] || "#e5e7eb";
  }
  

    

  const pokemon = useMemo(() => {
    if (!data) return null;

 
    return {
      // Datos básicos
      name: data.name,
      id: data.id,
      height: data.height,
      weight: data.weight,
      
      // Transformar types
      types: data.types?.map((t) => t.type.name) || [],
      
      // Agarrar solo las imágenes que necesitas
      images: {
        normal: data.sprites?.front_default,
        shiny: data.sprites?.front_shiny,
        
      },
      
      // Transformar abilities
      abilities: data.abilities?.map((ab) => ab.ability.name) || [],
      
      // Agarrar stats específicos
      stats: {
        hp: data.stats?.[0]?.base_stat || 0,
        attack: data.stats?.[1]?.base_stat || 0,
        defense: data.stats?.[2]?.base_stat || 0,
        special_attack: data.stats?.[3]?.base_stat || 0,
        special_defense: data.stats?.[4]?.base_stat || 0,
        speed: data.stats?.[5]?.base_stat || 0,
      }
    };
  }, [data]);
   
  return (
    <div  className='details__container
        flex flex-col mx-auto
        lg:w-[70%] w-full min-[350px]
        text-pri-dark 
        border-8 rounded-2xl p-6
        transition-all duration-500
       
      ' 
     style={{
    borderColor: getTypeDarkColor(data?.types?.[0]?.type?.name),
    background: isShiny 
      ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 25%, #fde68a 50%, #fbbf24 100%)'
      : getTypeMediumColor(data?.types?.[0]?.type?.name),
   
  }}
      >

<div className="mb-10">
        <header className=" ">
            <Link to={'/pokedex'} className="
        bg-blue-400 
          hover:border-blue-500
         hover:text-blue-600
       hover:scale-105 
         p-2 rounded
         ">Back</Link>
        </header>
</div>


      {!data && loading && (
        <div
          className="flex flex-col justify-center items-center
            w-full 

            "
        >
          <p>Loading....</p>
        </div>
      )}


<div className="flex  flex-col sm:flex-row ">
      <div className=" w-full sm:w-[50%] md:w-[50%] lg:w-[50%]  p-4 ">
        <h2 className="font-bold">{name?.toUpperCase()}</h2>
<p className="p-4">#{data?.id.toString().padStart(4, "0")}</p>
<div className="flex justify-center w-full relative py-4">
            <div className="relative">
              <img 
                src={getCurrentImage()} 
                alt={`${pokemon?.name} ${isShiny ? 'shiny' : 'normal'}`}
                className="w-[310px] min-w-[300px] h-auto border-4 border-amber-400 rounded-lg shadow-xl
                  transition-all duration-500 hover:scale-102
                "
                style={{
                  filter: isShiny ? 'brightness(1.1) saturate(1.2)' : 'none' 
                }}
              />
              
              {/*  Botón toggle shiny en la esquina derecha */}
              <button
                onClick={toggleShiny}
                className={`absolute -top-2 -right-2 p-3 rounded-full border-2 font-bold
                  transition-all duration-300 hover:scale-110 shadow-lg
                  ${isShiny 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500  border-yellow-300 animate-pulse' 
                    : 'bg-gray-400  border-gray-300 hover:bg-gray-450'
                  }
                `}
                title={isShiny ? 'Show Normal' : 'Show Shiny'}
              >
                {isShiny ? (
                  <Star size={20} className="fill-current" />
                ) : (
                  <Sparkles size={20} />
                )}
              </button>

            
              <div className={`absolute bottom-2 left-2 px-2 py-2 rounded-full text-xs font-bold 
                ${isShiny 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 ' 
                  : 'bg-gray-400 '
                }
              `}>
                {isShiny ? 'SHINY' : 'NORMAL'}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center  p-2">
      <p className="p-2">Heigth: {pokemon?.height}</p>
      <p className="p-2">Weigth: {pokemon?.weight}</p>
      </div>

      </div>
      
      

      

      <div className=" flex flex-col 
    w-full sm:w-[50%]  p-4 
      ">
        <h3 className="flex justify-center font-bold mb-4">STATS</h3>
        
        <div className="space-y-8 w-full ">
          {/* HP */}
          <div className="flex items-center justify-between ">
            <span className="w-20  font-medium text-base">Hp: {pokemon?.stats.hp}/255</span>
            <div className="flex-1 ml-10  bg-gray-300 rounded-full h-6 relative">
              <div 
                className="bg-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((pokemon?.stats.hp || 0) / 255 * 100, 100)}%` }}
              ></div>
              <span className="absolute right-2 top-0 text-xs font-bold  text-pri-dark">
                {pokemon?.stats.hp}
              </span>
            </div>
          </div>

          {/* Attack */}
          <div className="flex items-center justify-between">
            <span className="w-20 text-base font-medium">Atk: {pokemon?.stats.attack}/190</span>
            <div className="flex-1 ml-10 bg-gray-300 rounded-full h-6 relative">
              <div 
                className="bg-red-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((pokemon?.stats.attack || 0) / 190 * 100, 100)}%` }}
              ></div>
              <span className="absolute right-2 top-0 text-xs font-bold text-pri-dark">
                {pokemon?.stats.attack}
              </span>
            </div>
          </div>

          {/* Defense */}
          <div className="flex items-center justify-between">
            <span className="w-20 text-base font-medium">Def: {pokemon?.stats.defense}/250</span>
            <div className="flex-1 ml-10 bg-gray-300 rounded-full h-6 relative">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((pokemon?.stats.defense || 0) / 250 * 100, 100)}%` }}
              ></div>
              <span className="absolute right-2 top-0 text-xs font-bold text-pri-dark">
                {pokemon?.stats.defense}
              </span>
            </div>
          </div>

          {/* Speed */}
          <div className="flex items-center justify-between">
            <span className="w-20 text-base font-medium">Speed: {pokemon?.stats.speed}/180</span>
            <div className="flex-1 ml-10 bg-gray-300 rounded-full h-6 relative">
              <div 
                className="bg-yellow-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((pokemon?.stats.speed || 0) / 180 * 100, 100)}%` }}
              ></div>
              <span className="absolute right-2 top-0 text-xs font-bold text-pri-dark">
                {pokemon?.stats.speed}
              </span>
            </div>
          </div>

          {/* Special Attack */}
          <div className="flex items-center justify-between">
            <span className="w-20 text-base  font-medium">Sp. Atk: {pokemon?.stats.special_attack}/194</span>
            <div className="flex-1 ml-10 bg-gray-300 rounded-full h-6 relative">
              <div 
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((pokemon?.stats.special_attack || 0) / 194 * 100, 100)}%` }}
              ></div>
              <span className="absolute right-2 top-0 text-xs font-bold text-pri-dark">
                {pokemon?.stats.special_attack}
              </span>
            </div>
          </div>

          {/* Special Defense */}
          <div className="flex items-center justify-between">
            <span className="w-20 text-base font-medium">Sp. Def: {pokemon?.stats.special_defense}/250</span>
            <div className="flex-1 ml-10 bg-gray-300 rounded-full h-6 relative">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((pokemon?.stats.special_defense || 0) / 250 * 100, 100)}%` }}
              ></div>
              <span className="absolute right-2 top-0 text-xs font-bold text-pri-dark">
                {pokemon?.stats.special_defense}
              </span>
            </div>
          </div>
        </div>
      </div>
    
</div>

    

      <div className="flex flex-col p-4 mx-auto mt-4">
        <h3 className="flex justify-center font-bold mb-4">HABILITIES</h3>
         <div  className="flex flex-row ">
         {pokemon?.abilities.map((ab) => {
          return (
            
              <p key={ab} className="bg-gray-500 p-2 rounded-2xl m-2 text-center flex items-center">{ab}</p>
            
          );
        })}
</div>
      </div>


      <div className="flex flex-col p-4 justify-center mx-auto ">
        <h3 className="flex justify-center font-bold mb-4">TYPES</h3>
        <div  className="flex flex-row ">
        {pokemon?.types.map((t) => {
          return (
            <div >
              <p className="bg-gray-500 p-2 rounded-2xl m-2 text-center flex items-center" key={t}>{t}</p>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default Details;

/* 

  useEffect(() => {
    axios.get(`${baseURl}/pokemon/${name}`).then((res) => {
      setPokemon({
        name: res.data.name,
        id: res.data.id,
        types: res.data.types.map((t: Type) => t.type.name),
        images: [
          res.data.sprites.other["official-artwork"].front_default,
          res.data.sprites.other["official-artwork"].front_shiny,
        ] 
        height: res.data.height,
        weight: res.data.weight,

        abilities: res.data.abilities.map((ab: Ability) => ab.ability.name),
        stats: {
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          special_attack: res.data.stats[3].base_stat,
          special_defense: res.data.stats[4].base_stat,

          speed: res.data.stats[5].base_stat,
        },
      });
    });
  }, [name]); */
