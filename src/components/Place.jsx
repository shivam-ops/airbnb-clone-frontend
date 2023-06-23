import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "./BookingForm";
import PlaceGallery from "./PlaceGallery";
import AddressLink from "./AddressLink";

export default function Place() {
  const { id } = useParams();
  console.log(id);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios
        .get("/places/" + id)
        .then((response) => {
          console.log(response.data);
          setPlace(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <div>
      {place ? (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
          <h1 className="text-3xl">{place?.title}</h1>
          <AddressLink>{place.address}</AddressLink>

          <PlaceGallery place={place} />

          <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
              <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
              </div>
              Check-in: {place.checkIn}
              <br />
              Check-out: {place.checkOut}
              <br />
              Max guests: {place.maxGuests}
            </div>
            <div>
              <BookingForm place={place} />
            </div>
          </div>
          <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
              <h2 className="font-semibold text-2xl">Extra Info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm tet-gray-700 leading-5">
              {place.extraInfo}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
