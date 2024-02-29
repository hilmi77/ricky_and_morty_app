import React from "react";
import { Link } from "react-router-dom";
import "./LocationCard.scss";

interface LocationCardProps {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

const LocationCard = ({
  id,
  name,
  type,
  dimension,
  residents,
}: LocationCardProps) => {
  return (
    <div className="location-card">
      <h2>{name}</h2>
      <p>
        <strong>Type:</strong> {type}
      </p>
      <p>
        <strong>Dimension:</strong> {dimension}
      </p>
      <p>
        <strong>Residents:</strong> {residents.length}
      </p>
      <Link to={`/locations/${id}`}>View Characters</Link>
    </div>
  );
};

export default LocationCard;
