import "./App.css";
import { InfinitePeople } from "./people/InfinitePeople";
import { InfiniteSpecies } from "./species/InfiniteSpecies";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Suspense } from "react";
import Loading from "./Loading";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <Suspense fallback={<Loading />}>
          {/* <InfinitePeople /> */}
          <InfiniteSpecies />
        </Suspense>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
