import { useRef, useState } from "react";
import { useName } from "../context/nameContext";
import { Link, useNavigate } from "react-router";

import Squirtle from "../assets/squirtle_b.png";
import entrenador from "../assets/entrenador_pixel.png";
import entrenadora from "../assets/entrenadorapixel.png";
import { useTrainer } from "../context/trainerContext";


/* import { Switch } from "@/components/ui/switch" */

function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { name, getName } = useName();

  const { trainer, getTrainer } = useTrainer();

  const navigate = useNavigate();

  /*   const [theme, setTheme] = useState("light"); */

  /*  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (!htmlElement) return;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [theme]); */

  /*   const handleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }; */

  const handleSetName = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();

    setError(null);

    if (!trainer) {
      setError("Please select your trainer first!");
      return;
    }
    if (!value) {
      setError("You can´t leave it empty");
      return;
    }
    if (value.length > 15) {
      setError("Name must be 15 characters or less");
      inputRef.current!.value = "";
      return;
    }

    if (value.length < 2) {
      setError("Name must be at least 2 characters long");
      inputRef.current!.value = "";
      return;
    }
    getName(inputRef.current?.value as string);
    inputRef.current!.value = "";
    navigate("/pokedex");
  };

  const handleTrainerSelect = (selectedTrainer: "male" | "female") => {
    getTrainer(selectedTrainer);
    setError(null); // Limpiar error si había
  };



  return (
    <div
      className="home__content
       transition-all duration-200 ease-in-out
      flex flex-col justify-center items-center
      min-w-[300px] w-full min-h-[60dvh]

   
     text-pri-dark
        dark:text-pri-light
      "
    >
     
      {!name && (
        <div
          className="header__container
        
        transition-all duration-200 
        flex flex-col justify-center items-center w-[90%] max-w-[700px] mx-auto    "
        >
          <p
            className="flex text-center
          m-2 mb-4
          "
          >
            Select your trainer{" "}
          </p>
          <div className="flex flex-row gap-2">
            <div
              onClick={() => handleTrainerSelect("male")}
              className={`cursor-pointer transition-all duration-200 rounded-2xl p-2
                ${
                  trainer === "male"
                    ? "border-4 border-blue-500 bg-blue-300 shadow-lg scale-105"
                    : "border-4 border-blue-300 hover:border-blue-400 hover:scale-102"
                }
              `}
            >
              <img
                src={entrenador}
                alt="Male Trainer"
                className="w-[120px] h-auto rounded-xl"
              />
              <p className="text-center mt-2 text-sm font-medium">
                {trainer === "male" ? " Male" : "Male"}
              </p>
            </div>

            <div
              onClick={() => handleTrainerSelect("female")}
              className={`cursor-pointer transition-all duration-200 rounded-2xl p-2
                ${
                  trainer === "female"
                    ? "border-4 border-pink-500 bg-pink-300 shadow-lg scale-105"
                    : "border-4 border-pink-300 hover:border-pink-400 hover:scale-102"
                }
              `}
            >
              <img
                src={entrenadora}
                alt="Female Trainer"
                className="w-[120px] h-auto rounded-xl"
              />
              <p className="text-center mt-2 text-sm font-medium">
                {trainer === "female" ? " Female" : "Female"}
              </p>
            </div>
          </div>

          <p
            className="flex text-center
          m-2 mb-4
          "
          >
            To start, enter your name{" "}
          </p>

          <form onSubmit={handleSetName} className="flex flex-col  w-full">
            <input
              type="text"
              ref={inputRef}
              placeholder="Trainer name...."
              className=" px-4 py-2 
              border-4 outline-none
            
             mb-2
             hover:border-blue-500
    hover:shadow-md
    
    transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-blue-400 p-2 rounded
              
              cursor-pointer  
        px-4 py-2 
        border-4
      mb-2
         hover:border-blue-500
         hover:text-blue-600
    hover:shadow-md
    transition-all duration-200"
            >
              Enter
            </button>
          </form>
          {error && (
            /*  mt-4 p-3 */
            <p
              className="rounded border text-center p-2 text-xl 
             border-yellow-600 bg-yellow-500/80
              text-yellow-900
          
   m-6
          "
            >
              {error}
            </p>
          )}
        </div>
      )}

      {name && trainer && (
        <div
          className="home__container
          flex flex-col 
          justify-center items-center
          
          "
        >
          <h2 className="text-center">
            Hi again {name},return to the pokedex
          </h2>

          <img
            src={Squirtle}
            alt=""
            className="w-[300px] h-auto flex 
justify-center items-center
 my-5
"
          />
          <Link to={"/pokedex"}>
            <button
              type="button"
              className="
          
            p-2 rounded
            cursor-pointer 
            text-center
             bg-blue-400 
          hover:border-blue-500
         hover:text-blue-900
            hover:scale-102 active:scale-98
            border-4
            "
            >
              Go to the pokedex
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
