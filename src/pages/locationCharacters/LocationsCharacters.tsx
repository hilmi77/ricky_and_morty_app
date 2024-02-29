import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCharactersByLocation } from "../../service/axios";
import CharacterCard from "../../components/characterCard/CharacterCard";
import "./LocationCharacters.scss";
import Pagination from "../../components/pagination/Pagination";

// Karakter tipini tanımlama
interface Character {
  id: string;
  name: string;
  status: string;
  image: string;
  location: {
    name: string;
  };
}

const LocationCharacters: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharactersByLocation(Number(locationId));
      // API'den dönen veriyi doğrudan Character[] tipine dönüştürme
      setCharacters(Array.isArray(data) ? data : [data]); // Eğer API'den dönen veri yapısal olarak uygunsa
      setFilteredCharacters(Array.isArray(data) ? data : [data]); // Başlangıçta tüm karakterleri göster
      console.log("character-data", data);
    };

    getCharacters();
  }, [locationId]);

  useEffect(() => {
    let result = characters;

    if (statusFilter) {
      result = result.filter((character) => character.status === statusFilter);
    }

    if (searchQuery) {
      result = result.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCharacters(result);
  }, [statusFilter, searchQuery, characters]);

  useEffect(() => {
    const container = document.getElementById("characters-container");
    if (container) {
      container.scrollIntoView();
    }
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCharacters.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <h1 className="title">LOCATİON CHARACTERS</h1>
      <Link to="/" className="back-link">
        Back to Locations
      </Link>
      <div className="filter-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="status-select"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          {/* <option value="Dead">Dead</option> */}
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="characters-container">
        {currentItems.map((character) => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </>
  );
};

export default LocationCharacters;
