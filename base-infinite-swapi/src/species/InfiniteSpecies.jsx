import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { fetchSpeciesUrl } from "../API/api";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";

export function InfiniteSpecies() {
  const {
    data: speciesData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["getSpecies"],
    ({ pageParam = initialUrl }) => fetchSpeciesUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll
        loadMore={fetchNextPage}
        hasMore={hasNextPage && !isFetching}
      >
        {speciesData.pages.map((page) => {
          return page.results.map((apiData) => {
            return (
              <Species
                key={apiData.name}
                name={apiData.name}
                language={apiData.language}
                averageLifespan={apiData.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
