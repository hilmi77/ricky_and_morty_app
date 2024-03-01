import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorites from "./pages/favorites/Favorites";
import LocationList from "./pages/locationsList/LocationList";
import CharacterDetails from "./pages/characterDetails/CharacterDetails";
import LocationsCharacters from "./pages/locationCharacters/LocationsCharacters";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/locations/:locationId"
          element={<LocationsCharacters />}
        />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
