import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorFlash from "./ErrorFlash";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const limit = 8;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`/places?page=${currentPage}&limit=8`);
        setPlaces(response.data);
      } catch (error) {
        console.error("Error loading places:", error);
      }
    };

    fetchPlaces();
  }, [currentPage]);

  const handlePageChange = async (page) => {
    try {
      const response = await axios.get(`/places?page=${page}&limit=${limit}`);
      const newPlaces = response.data;

      if (newPlaces.length === 0 && page > 1) {
        //alert("No more places to load");
        setErrorMessage("No more places to load...");
        return;
      }

      setCurrentPage(page);
      setPlaces(newPlaces);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseError = () => {
    setErrorMessage("");
  };

  return (
    <>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.map((place) => (
          <Link to={`/place/${place._id}`} key={place.title}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl aspect-square"
                  src={"http://localhost:8000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm truncate text-gray-400">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4 mx-auto">
        {currentPage > 1 && (
          <button
            className="px-4 py-2 border bg-primary text-white border-white rounded-lg mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        <button
          className="px-4 py-2 border bg-primary text-white border-white rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {errorMessage && (
        <ErrorFlash message={errorMessage} onClose={handleCloseError} />
      )}
    </>
  );
}
