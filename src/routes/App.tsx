import { Routes, Route } from "react-router";
import "../App.css";
import Home from "../components/Home";
import Pokedex from "../components/Pokedex";
import Details from "../components/Details";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from '../layouts/MainLayout';
import Pikachu from '../assets/pikachu_charging.png'
function App() {
  return (
    <div className="poke__container
     bg-pri-light text-pri-dark 
    dark:bg-pri-dark dark:text-pri-light
    
    transition-all duration-200 ease-in-out
    text-0.5xl sm:text-xl md:text-2xl lg:text-3xl   

    flex flex-grid justify-content items-center
    justify-center 
    min-w-[300px] w-full min-h-[100dvh]
    m-0
     
    ">
      
   
    

       <Routes>
      {/* Rutas con layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        
        <Route path="pokedex" element={<ProtectedRoute />}>
          <Route index element={<Pokedex />} />
          <Route path=":name" element={<Details />} />
        </Route>
      </Route>

      {/* Rutas sin layout (como 404) */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center m-0">
          <h2 className="text-2xl font-bold">404 Not Found</h2>

          <img src={Pikachu} alt="" className="w-[300px] h-auto"/>
        </div>
      } />
    </Routes>


</div>

  );

 
}

export default App;
