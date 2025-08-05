import { useEffect, useState } from "react";
import { useName } from "../context/nameContext";
import axios from "axios";
import List from "./List";
import { useFetch } from "../hooks/useFetch";

import Form from "./Form";
import { usePagination } from "../hooks/usePagination";
import Pagination from "./Pagination";
import entrenador from "../assets/entrenador_pixel.png";
import entrenadora from "../assets/entrenadorapixel.png";
import { useTrainer } from "../context/trainerContext";

const defaultType = {
  ghost: "Ghost",
  dark: "Dark",
  electric: "Electric",
  normal: "Normal",
  fire: "Fire",
  psychic: "Psychic",
  flying: "Flying",
  steel: "Steel",
  poison: "Poison",
  dragon: "Dragon",
  water: "Water",
  ice: "Ice",
  rock: "Rock",
  fighting: "Fighting",
  grass: "Grass",
  bug: "Bug",
  ground: "Ground",
  fairy: "Fairy",
};
/* type DefaultType = keyof typeof defaultType; */



function Pokedex() {
  type Pokemon = {
    name: string;
    url: string;
  };

  type TypeFiltered = {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  };

  

  /*   const [pokemons, setPokemons] = useState<Pokemon[]>([]); */

  const [value, setValue] = useState<string>("");

  const [type, setType] = useState<string>("");



  const [pokemonsTyped, setPokemonsTyped] = useState<Pokemon[]>([]);

  const { name } = useName();
  const { trainer } = useTrainer();
  const baseURl: string = "https://pokeapi.co/api/v2";

  function onChangeInpt(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
  }

  function onChangeType(e: React.ChangeEvent<HTMLSelectElement>): void {
    setType(e.target.value);
  }

  const { data, getDataAxios, error, loading } = useFetch();

  useEffect(() => {
    getDataAxios(`${baseURl}/pokemon/?limit=1302`);
  }, []);

  const filteredPokemons = (type ? pokemonsTyped : data ?? []).filter((p) =>
    p.name.toLowerCase().includes(value.toLowerCase())
  );

  const {
    page,
    totalPage,
    range,
    paginatedPokemons,
    prev,
    next,
    goToPage,
    setPage,
    goToFirstPage,    
    goToLastPage,
    isFirstPage,
       isLastPage
  } = usePagination({ pokemons: filteredPokemons });


 



  useEffect(() => {
    if (!type) {
      return;
    }
    axios.get(`${baseURl}/type/${type}`).then((res) => {
      const filteredByType = res.data.pokemon.map(
        (e: TypeFiltered) => e.pokemon.name
      );
      
      setPokemonsTyped(
        data ? data.filter((p) => filteredByType.includes(p.name)) : []
      );
    });
  }, [type]); 

  useEffect(() => {
    setPage(1);
  }, [filteredPokemons?.length]);

  /*   console.log(value); */



  return (
    <div
      className="pokedex__container
    transition-all duration-200 ease-in-out
      flex flex-col justify-center items-center
       w-full max-w-8xl mx-auto  
        min-h-[60dvh] px-4   
   

   text-pri-dark
        dark:text-pri-light
    "
    >
      <header className="mt-4">
        <div className="flex flex-col  items-center space-y-1">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl px-[10px]">
            Welcome <span className="font-bold text-blue-600">{name}</span> to
            the Pokedex
          </h2>

          {/* ✅ Imagen centrada separadamente */}
          <div className="flex justify-center">
            {trainer === "female" ? (
              <img
                src={entrenadora}
                alt="Female Trainer"
                className="w-[80px] h-auto rounded-xl border-4 
                bg-pink-300 border-pink-400
                "
              />
            ) : (
              <img
                src={entrenador}
                alt="Male Trainer"
                className="w-[80px] h-auto rounded-xl border-4 
                bg-blue-300 border-blue-400
           "
              />
            )}
          </div>
        </div>
      </header>

      <Form
        onChangeInpt={onChangeInpt}
        value={value}
        defaultType={defaultType}
        onChangeType={onChangeType}
        type={type}
      />
      

      {/* {filteredPokemons?.length === 0 && <p>No hay pokemon que mostrar</p>}  */}
      <List
        pokemons={filteredPokemons}
        paginatedPokemons={paginatedPokemons}
      ></List>

 {filteredPokemons?.length > 0 &&   <Pagination
        page={page}
        totalPage={totalPage}
        range={range}
        prev={prev}
        next={next}
        goToPage={goToPage}
        goToFirstPage={goToFirstPage}    
        goToLastPage={goToLastPage}
        isFirstPage={isFirstPage}       
        isLastPage={isLastPage} 
      /> }



    </div>
  );
}

export default Pokedex;

/* 1er peticion sin usar fetch sin el useFetchAxios */

/*   useEffect(() => {
    axios.get(`${baseURl}/pokemon/?limit=20`).then((res) => {
      setPokemons(res?.data?.results);
     
    });
  }, []); */
/* console.log(pokemons); */

/* intento de segunda peticion usando usefetch - useFetchAxios */
/*   useEffect(() => {
      if (!type) {
      return;
    }
       getDataAxios(`/type/${type}`);
 const filteredByType = data ? data.map(
        (e: TypeFiltered) => e.pokemon?.name
      ) : [];
 setPokemonsTyped(data ? data.filter((p) => filteredByType.includes(p?.name)) : []);
  }, [type]);
 console.log(type);
 */
