import { Search } from "lucide-react";
import React from "react";

interface FormProps {
  onChangeInpt: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  defaultType: Record<string, unknown>;
  onChangeType: React.ChangeEventHandler<HTMLSelectElement>;
  type: string;
}

// Crear funciones helper para colores
const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: "#ef4444", // red-500
    water: "#3b82f6", // blue-500
    grass: "#22c55e", // green-500
    electric: "#eab308", // yellow-500
    psychic: "#a855f7", // purple-500
    ice: "#06b6d4", // cyan-500
    dragon: "#4f46e5", // indigo-600
    dark: "#4D5B70", // gray-800
    fairy: "#ec4899", // pink-500
    fighting: "#dc2626", // red-600
    poison: "#7c3aed", // violet-600
    ground: "#a3a3a3", // neutral-400
    flying: "#60a5fa", // blue-400
    bug: "#65a30d", // lime-600
    rock: "#78716c", // stone-500
    ghost: "#6b21a8", // purple-800
    steel: "#64748b", // slate-500
    normal: "#9ca3af", // gray-400
  };
  return colors[type] || "#6b7280"; // gray-500 default
};


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  };

 


function Form({
  onChangeInpt,
  value,
  defaultType,
  onChangeType,
  type,
}: FormProps) {
  return (
    <div
      className="pokedex__form-container
      flex w-full  min-w-[300px] max-w-[1000px]
      
      p-2
      text-base sm:text-base md:text-base lg:text-base
       text-pri-dark
        dark:text-pri-light
      "
    >
      <form
        className="pokedex__form
      flex flex-col w-full  gap-2
      md:flex-row lg:flex-row xl:flex-row 2xl:flex-row  
      justify-center items-center
    
      p-2
      "
        onSubmit={handleSubmit}
      >
        <div
          className="pokedex__form-search
        justify-center items-center
        flex w-full md:w-[70%]
       
        "
        >
          <input
            className="pokedex__form-input
              rounded flex-1 min-w-0 
              px-4 py-2 
              border-4 outline-none
             h-12
             bg-blue-400 p-2
          hover:border-blue-500
         hover:text-blue-900
    hover:shadow-md
    transition-all duration-200
   
        "
            type="text"
            placeholder="Pokemon Name..."
            value={value.toLowerCase()}
            onChange={onChangeInpt}
          />
       {/*    <button
            className="pokedex__form-button 
        cursor-pointer  flex-shrink-0 
        px-4 py-2 
        rounded-[0_6px_6px_0]  border-4 border-l-2
      
     
        flex items-center justify-center
        h-12
        bg-blue-400 p-2
          hover:border-blue-500
         hover:text-blue-600
    hover:shadow-md
    transition-all duration-200
        "
          >
            Search
          </button> */}
        </div>

        <div
          className="flex  justify-center items-center
        w-[50%] md:w-[25%] md:min-w-[150px]
        "
        >
          <select
            className="pokedex__form-select
    px-4 py-2  h-12 
    rounded-lg border-4 outline-none cursor-pointer
    transition-all duration-300
 w-[13ch]  
    min-w-[13ch]
    max-w-[20ch]
    hover:shadow-lg hover:scale-[1.02]
  "
            name="selectType"
            id="selectType"
            value={type}
            onChange={onChangeType}
            style={{
              backgroundColor: getTypeColor(type),
            }}
          >
            <option
              value=""
              style={{ backgroundColor: "#6b7280", color: "white" }}
            >
              All Types
            </option>

            {Object.entries(defaultType).map(([key, name]) => (
              <option
                key={key}
                value={key}
                className="capitalize font-medium"
                style={{
                  backgroundColor: getTypeColor(key),

                  color: "white",
                  padding: "8px 12px",
                }}
              >
                {String(name)}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

export default Form;
