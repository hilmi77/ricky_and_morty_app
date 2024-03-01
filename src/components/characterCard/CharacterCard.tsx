import { Link } from "react-router-dom";
import "./CharacterCard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "../../features/favoritesSlice";

interface CharacterCardProps {
  id: string;
  name: string;
  status: string;
  image: string;
  location: {
    name: string;
  };
  onRemoveFavorite?: (id: string) => void;
}

const CharacterCard = ({
  id,
  name,
  status,
  image,
  location,
}: CharacterCardProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((character) => character.id === id);

  const handleAddFavorite = () => {
    dispatch(addFavorite({ id, name, status, image, location }));
  };
  console.log("favorites", favorites);

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(id));
  };

  const statusColor =
    status === "Alive" ? "green" : status === "Dead" ? "red" : "grey";

  return (
    <div className="card" key={id}>
      <img src={image} alt={name} />
      <Link to={`/character/${id}`} className="card-name">
        {name}
      </Link>
      <div className="status-container">
        <div
          className="status-dot"
          style={{ backgroundColor: statusColor }}
        ></div>
        <p className="status-text"> {status}</p>
      </div>
      <p> {location.name}</p>
      {isFavorite ? (
        <button onClick={handleRemoveFavorite} className="remove-favorite-btn">
          Remove from Favorites
        </button>
      ) : (
        <button onClick={handleAddFavorite} className="add-favorite-btn">
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default CharacterCard;
