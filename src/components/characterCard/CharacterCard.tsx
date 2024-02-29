import "./CharacterCard.scss";

interface CharacterCardProps {
  id: string;
  name: string;
  status: string;
  image: string;
  location: {
    name: string;
  };
}

const CharacterCard = ({
  id,
  name,
  status,
  image,
  location,
}: CharacterCardProps) => {
  const statusColor =
    status === "Alive" ? "green" : status === "Dead" ? "red" : "grey";

  return (
    <div className="card" key={id}>
      <img src={image} alt={name} />
      <h1 className="card-name">{name}</h1>
      <div className="status-container">
        <div
          className="status-dot"
          style={{ backgroundColor: statusColor }}
        ></div>
        <p className="status-text"> {status}</p>
      </div>

      <p> {location.name}</p>
    </div>
  );
};

export default CharacterCard;
