import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement } from "react";

import { theme } from "../../theme";
import { Loading } from "./Loading";
import { Navbar } from "./Navbar";
import { Routes } from "./Routes";
import { QueryClientProvider } from "react-query";
import { qeuryClient } from "../../react-query/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";

export function App(): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={qeuryClient}>
        <Navbar />
        <Loading />
        <Routes />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
