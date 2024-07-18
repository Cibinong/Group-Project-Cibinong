import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>

  );
}

export default App;
