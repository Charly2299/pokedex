import { useState } from "react";
type Pokemon = {
  name: string;
  url: string;
};

export function usePagination({ pokemons }: { pokemons: Pokemon[] }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;
  const totalPage = Math.ceil(pokemons.length / itemsPerPage);
  const range: [] = [];
  const maxVisibleButtons = 3;
  const half = Math.floor(maxVisibleButtons / 2);
  let start = Math.max(1, page - half);
  let end = start + maxVisibleButtons - 1;
  const paginatedPokemons = pokemons.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (end > totalPage) {
    end = totalPage;
    start = Math.max(1, end - maxVisibleButtons + 1);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  const goToPage = (current: number) => {
    setPage(Math.max(1, Math.min(current, totalPage)));
  };

  const prev = () => goToPage(page - 1);
  const next = () => goToPage(page + 1);


   const goToFirstPage = () => {
    setPage(1);
  };
  
 
  const goToLastPage = () => {
    setPage(totalPage);
  };

  const isFirstPage = page === 1;
  
  
  const isLastPage = page === totalPage;

  return {
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
  };
}
