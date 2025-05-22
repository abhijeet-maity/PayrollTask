import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { router } from "./router.jsx";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
