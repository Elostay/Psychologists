import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Psychologists from "./components/Psychologists";
import SharedLayout from "./components/SharedLayout";
import Favourites from "./components/Favourites";
// import { AuthProvider } from "./auth";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="psychologists" element={<Psychologists />} />
          <Route path="favourites" element={<Favourites />} />
        </Route>
      </Routes>
      {/* <AuthProvider/> */}
    </div>
  );
};

export default App;
