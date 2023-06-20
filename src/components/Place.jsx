import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          <a
            className="my-2 block font-semibold underline"
            target="_blank"
            href={"https://maps.google.com/?q=" + place.address}
            rel="noreferrer"
          >
            {place?.address}
          </a>
          <div className="grid gap-2 grid-cols-[2fr_1fr]">
            <div>
              {place.photos?.[0] && (
                <img
                  src={"http://localhost:8000/uploads/" + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <div className="grid">
              {place.photos?.[1] && (
                <img
                  src={"http://localhost:8000/uploads/" + place.photos[1]}
                  alt=""
                />
              )}
              {place.photos?.[2] && (
                <img
                  src={"http://localhost:8000/uploads/" + place.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
