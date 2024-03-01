import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchCharacters,
  fetchCharactersByLocation,
} from "../../service/axios";
import CharacterCard from "../../components/characterCard/CharacterCard";
import "./CharacterDetail.scss";
import Pagination from "../../components/pagination/Pagination";

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
}

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [relatedCharacters, setRelatedCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(4);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      const fetchedCharacterData = await fetchCharacters(id || "");
      setCharacter(fetchedCharacterData);

      const locationId = fetchedCharacterData.location.url.split("/").pop();
      if (locationId) {
        const locationData = await fetchCharactersByLocation(
          Number(locationId)
        );

        setRelatedCharacters(
          Array.isArray(locationData) ? locationData : [locationData]
        );
      }
    };
    fetchCharacterDetails();
  }, [id]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = relatedCharacters.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(relatedCharacters.length / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      <Link to="/" className="back-to-location">
        Back to Locations
      </Link>

      {character && (
        <>
          <h1>Character Details</h1>
          <div>
            <h2>{character.name}</h2>
            <p>Species: {character.species}</p>
            <p>Type: {character.type}</p>
            <p>Gender: {character.gender}</p>
            <p>Origin: {character.origin.name}</p>
            <img src={character.image} alt={`${character.name}`} />
          </div>
          <div className="related-characters">
            <h2>Related Characters</h2>
            {currentItems.map((char) => (
              <CharacterCard key={char.id} {...char} />
            ))}
          </div>
        </>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </>
  );
};

export default CharacterDetails;
