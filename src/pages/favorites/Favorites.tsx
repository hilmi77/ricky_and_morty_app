import React from "react";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../features/favoritesSlice";
import CharacterCard from "../../components/characterCard/CharacterCard";
import { RootState } from "../../store";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((state: RootState) => selectFavorites(state));
  console.log("favorites", favorites);

  return (
    <div className="favorites-page">
      <Link to="/" className="back-to-location">
        Back to Location
      </Link>
      <h1>My Favorites</h1>
      <div className="favorites-container">
        {favorites.length > 0 ? (
          favorites.map((character) => (
            <CharacterCard key={character.id} {...character} />
          ))
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
