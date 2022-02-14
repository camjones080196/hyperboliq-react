import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <div
      className="App"
      style={{
        position: "absolute",
        backgroundColor: "#272727",
        flex: 1,
        height: "100%",
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
