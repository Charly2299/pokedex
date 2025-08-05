import axios from "axios";
import { useState } from "react";

export function useFetch() {
/*    type Pokemon = {
    name: string;
    url: string;
  };
  */


  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getDataAxios(url: string) {
    setError(null);
    setLoading(true);

    try {
    const response = await axios.get(url);
      
      // ✅ Detectar si es lista o pokémon individual
      if (response.data.results) {
        setData(response.data.results); // Para listas
      } else {
        setData(response.data); // Para pokémon individual
      }
    } 
    catch (error: any) {
      setError(error?.message);
      console.log("error", error);
    } 
    finally {
      setLoading(false);
    }
  }
  return { data, getDataAxios, error, loading ,setData};
}
