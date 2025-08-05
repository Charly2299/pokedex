type PaginationProps = {
  page: number;
  totalPage: number;
  range: number[];

  prev: () => void;
  next: () => void;
  goToPage: (n: number) => void;
  goToFirstPage: () => void;    // ✅ Nueva prop
  goToLastPage: () => void;
  isFirstPage: boolean;         // ✅ Nueva prop
  isLastPage: boolean;  
};

function Pagination({
  page,
  totalPage,
  range,
  prev,
  next,
  goToPage,
  goToFirstPage,
  goToLastPage,
  isFirstPage,      
  isLastPage 
}: PaginationProps) {
  return (
    <div
      className="
   flex justify-center flex-col gap-2 mt-4 mb-4
    
    text-xs sm:text-sm md:text-base lg:text-lg
     transition-all duration-200 ease-in-out
      
       text-pri-dark
        dark:text-pri-light
    "
    >
      <div className="
      flex justify-center gap-x-1
      ">
        <button
          type="button"
          className="cursor-pointer flex
           hover:scale-105 
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          p-2
           bg-blue-400 
          hover:border-blue-500
         hover:text-blue-600
          border-4
          rounded-lg 
          "
          onClick={prev}
          disabled={page === 1}
        >
          prev
        </button>

        {range.map((n) => (
          <button
            key={n}
            className={`${n === page ? "active" : ""}   
            cursor-pointer flex
          hover:scale-105 
          justify-center  items-center 
          w-[40px]
           p-2
           bg-gray-500
          hover:border-gray-500
        
          
          rounded-lg 
            `}
            type="button"
            onClick={() => goToPage(n)}
          >
            {n}
          </button>
        ))}

        <button type="button" 
        className="cursor-pointer flex
          hover:scale-105 
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          p-2
           bg-blue-400 
          hover:border-blue-500
         hover:text-blue-600
          border-4
          rounded-lg 
          "
        onClick={next} disabled={page === totalPage}>
          next
        </button>
      </div>

      <div className="
      flex justify-center gap-x-2
      ">

 <button
          type="button"
          className="cursor-pointer flex items-center justify-center
           hover:scale-105 
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          p-2
           bg-blue-400 
          hover:border-blue-500
         hover:text-blue-600
          border-4
          rounded-lg 
          "
          onClick={goToFirstPage}
          disabled={isFirstPage} 
        >
        {'<<'}
        </button>

        <p className="flex items-center justify-center">
          {page} of {totalPage}
        </p>

        <button
          type="button"
          className="cursor-pointer flex items-center justify-center
           hover:scale-105 
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          p-2
           bg-blue-400 
          hover:border-blue-500
         hover:text-blue-600
          border-4
          rounded-lg 
          "
          onClick={goToLastPage}
          disabled={isLastPage} 
        >
        {'>>'}
        </button>
      </div>

      {/*  {pokemons.length === 0 && <p>No hay pokemon que mostrar</p>} */}
    </div>
  );
}
export default Pagination;
