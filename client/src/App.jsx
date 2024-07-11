import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <div className="pt-14 lg:pt-8">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
