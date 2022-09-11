import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { fetchUrl } from "../API/api";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  return <InfiniteScroll />;
}
