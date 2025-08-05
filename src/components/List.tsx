import { Link } from "react-router";
import Item from "./Item";
import pokemon from '../assets/pikachu_oscuro.png'

/* import { useEffect } from "react"; */
/* import { usePagination } from "../hooks/usePagination"; */


interface Pokemon {
  name: string;
  url: string;
}



function List({ pokemons, paginatedPokemons }: { pokemons: Pokemon[]; paginatedPokemons: Pokemon[] }) {

  
  return (
    <div className="
    
    w-full grid grid-cols-[repeat(auto-fill,minmax(300px,400px))] gap-x-3 justify-center items-center  
     transition-all duration-200 ease-in-out text-pri-dark
        dark:text-pri-light
    ">
      

        {paginatedPokemons.map((p) => (
          <Link key={p?.url} to={`/pokedex/${p.name}`}
    className="hover:scale-101"
          >
            
            <Item url={p?.url}></Item>

          </Link>
        ))}

         {pokemons.length === 0 && <div className="flex flex-col justify-center items-center
            w-full 
            h-[50%]] 
          
          col-span-full 
            
           ">
         <p className="text-center">No pokemons to show</p> 
         <img src={pokemon} alt="" className="focus-in rounded object-cover w-[250px] h-auto   border-8 mt-2"/>
          </div>}
      

     

    
    </div>
  );
}
export default List;



/* const { page, totalPage, range, paginatedPokemons, prev, next, goToPage,setPage } = usePagination({ pokemons }); */

/*  useEffect(() => {
   setPage(1)
  }, [pokemons.length])
 */

/* 
  const [page, setPage] = useState(1)
  const itemsPerPage = 50
  const totalPage = Math.ceil(pokemons.length / itemsPerPage)
  const range:[] = []
  const maxVisibleButtons= 5
  const half = Math.floor(maxVisibleButtons/2)
  let start = Math.max(1,page-half)
  let end = start + maxVisibleButtons - 1

  const prev=()=>goToPage(page-1)
  const next=()=>goToPage(page+1)

const paginatedPokemons= pokemons.slice((page - 1) * itemsPerPage,page * itemsPerPage)

if(end>totalPage){
  end=totalPage
  start=Math.max(1,end-maxVisibleButtons +1)
}

for(let i=start;i<=end;i++){
  range.push(i)
}
 const goToPage = (current: number) => {
    setPage(Math.max(1, Math.min(current, totalPage)));
  };


 */

 {/*    <div>
            <button type="button" onClick={prev} disabled={page===1}>prev</button>
               <p>{page} of {totalPage}</p>
               {range.map(n=>(
                <button key={n}
                className={`${n===page?'active':''}`}
                type="button"
                onClick={()=>goToPage(n)}
                >
{n}
                </button>
               ))}
        
     
        <button type='button' onClick={next} disabled={page===totalPage}>next</button>
      </div> */}
