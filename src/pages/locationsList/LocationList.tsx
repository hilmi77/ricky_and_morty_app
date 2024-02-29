/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchLocations } from "../../service/axios";
import LocationCard from "../../components/locationCard/LocationCard";
import "./LocationList.scss";
import Pagination from "../../components/pagination/Pagination";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  useEffect(() => {
    const getLocations = async () => {
      const data = await fetchLocations();
      console.log("data", data);
      setLocations(data);
    };

    getLocations();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(locations.length / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="container">
        <h1>Locations</h1>
        <div className="locations_list">
          {currentItems.map((location: any) => (
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
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </>
  );
};

export default LocationList;
