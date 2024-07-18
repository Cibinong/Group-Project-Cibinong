import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import Breeds from "./pages/Breeds";
import CatForm from "./pages/CatForm";
import UserCats from "./pages/UserCats";
import BreedDetail from "./pages/BreedDetail";
import Chat from "./pages/Chat";

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/");
  }
  return null;
};

const isNotLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const router = createBrowserRouter([
  { path: "/register", element: <Register />, loader: isLoggedIn },
  { path: "/login", element: <Login />, loader: isLoggedIn },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cats", element: <UserCats />, loader: isNotLoggedIn },
      { path: "/create", element: <CatForm />, loader: isNotLoggedIn },
      { path: "/chat", element: <Chat />, loader: isNotLoggedIn },
      { path: "/chat/:AuthorId", element: <Chat />, loader: isNotLoggedIn },
      { path: "/cat-breeds", element: <Breeds />, loader: isNotLoggedIn },
      
      {
        path: "/cat-breeds/:id",
        element: <BreedDetail />,
        loader: isNotLoggedIn,
      },
    ],
  },
]);
