import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Game } from "./components/Game/Game";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Game />,
  },
  {
    path: "/:game_id?/:player_type?",
    element: <Game />,
  },
  {
    path: "/login",
    element: <Game />,
  },
]);


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
