import { Suspense } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { fetchUrl } from "../API/api";
import Loading from "../Loading";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery(
      "sw-people",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
        refetchOnWindowFocus: false,
      }
    );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll
        loadMore={fetchNextPage}
        hasMore={hasNextPage && !isFetching}
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
