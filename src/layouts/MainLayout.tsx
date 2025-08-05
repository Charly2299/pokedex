import { Outlet } from "react-router";
import { Link } from "react-router";
import { useName } from "../context/nameContext";
import { useTheme } from "../context/darkContext";
import luna from "../assets/luna.png";
import sol from "../assets/sol.png";
import home2 from '../assets/home2.png'
import { useTrainer } from "../context/trainerContext";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
function MainLayout() {
  const { name, cleanName } = useName();

 const {cleanTrainer} =useTrainer()
  const { isDark, toggleTheme} = useTheme();
   const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
      // Simula una carga de 2 segundos (reemplaza por tu fetch real)
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);
  
  return (
    <div
      className="poke__container
      
      transition-all duration-200 ease-in-out
      text-base sm:text-lg md:text-xl lg:text-2xl   
      
      flex flex-col  
     
    "
    >
       {isLoading && <Spinner />}
      {/* Navigation */}
      <nav
        className="poke__nav
        bg-red-light text-pri-light
border-b-black border-b-15  
         
 w-full

 p-2
 flex 
     
      "
      >
        <div
          className="flex 
        w-full 
        justify-between items-center "
        >


          {/* NAVBAR SI YA ESTA INGRESADO EL USUARIO */}
          {name && (
            <div className="flex justify-between items-center w-full px-4">
              <Link to="/" className="hover:scale-110 active:scale-95">
               <img src={home2} alt=""
               className="w-[25px] h-auto"
               />
              </Link>
              <Link to="/pokedex" className="hover:text-sec-dark
              hover:scale-110 active:scale-95
              ">
                Pokedex
              </Link>
              <button
                onClick={()=>{cleanName();cleanTrainer()}}
                className="hover:text-sec-dark
            cursor-pointer 
            hover:scale-110 active:scale-95
            "
              >
                Logout
              </button>

              <button
                onClick={toggleTheme}
                className="hover:text-sec-dark
            cursor-pointer
            hover:scale-110 active:scale-95"
              >
                {isDark ? <img src={sol} 
                className="w-[30px] h-auto"
                ></img> : <img src={luna}
                className="w-[30px] h-auto"
                ></img>}
              </button>
            </div>
          )}


          {/* NAVBAR SI NO ESTA INGRESADO EL USUARIO */}
          {!name && (
            <div className="flex justify-between items-center w-full px-4">
              <h1 className="font-bold">Welcome to the Pokedex</h1>
              <button
                onClick={toggleTheme}
                className="hover:text-sec-dark cursor-pointer 
        transition-all duration-200
        hover:scale-110 active:scale-95
         py-1 rounded-lg  sm:px-10 md:px-20"
              >
                {isDark ? (
                  <img src={sol} className="w-[40px] h-auto"></img>
                ) : (
                  <img src={luna} className="w-[40px] h-auto"></img>
                )}
              </button>
            </div>
          )}



        </div>
      </nav>

      {/* Contenido dinámico */}
      <main
        className="poke__main
        flex-1 flex flex-col
         w-[100dvw]
        p-4
      "
      >
        <Outlet /> {/* Aquí se renderizan los componentes de cada ruta */}
      </main>

      {/* Footer */}
      <footer
        className="poke__footer
        bg-gray-800 text-sec-light
        p-2 text-center flex justify-center items-center
      "
      >
        <p>Gotta catch 'em all!</p>
      </footer>
    </div>
  );
}
export default MainLayout;
