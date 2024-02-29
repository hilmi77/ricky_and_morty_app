/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchLocations } from "../../service/axios";
import LocationCard from "../../components/locationCard/LocationCard";
import "./LocationList.scss";

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      const data = await fetchLocations();
      console.log("data", data);
      setLocations(data);
    };

    getLocations();
  }, []);
  return (
    <div className="container">
      <h1>Locations</h1>
      <div className="locations_list">
        {locations.map((location: any) => (
          <LocationCard
            key={location.id}
            id={location.id}
            name={location.name}
            type={location.type}
            dimension={location.dimension}
            residents={location.residents}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationList;
