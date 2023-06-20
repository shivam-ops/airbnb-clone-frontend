import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Place() {
  const { id } = useParams();
  console.log(id);
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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

  if (showAllPhotos) {
    return (
      <div className="fixed bg-white min-w-full min-h-screen">show photos</div>
      {place?.photos?.length > 0 && place.photos.map(photo => (
        <div><img src={"http://localhost/8000/uploads/" + photo} alt="" /></div>
      ))}
    )
  }

  return (
    <div>
      {place ? (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
          <h1 className="text-3xl">{place?.title}</h1>
          <a
            className="my-2 block font-semibold underline"
            target="_blank"
            href={"https://maps.google.com/?q=" + place.address}
            rel="noreferrer"
          >
            {place?.address}
          </a>

          <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
              <div>
                {place.photos?.[0] && (
                  <img
                    className="aspect-square object-cover"
                    src={"http://localhost:8000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="grid">
                {place.photos?.[1] && (
                  <img
                    className="aspect-square object-cover"
                    src={"http://localhost:8000/uploads/" + place.photos[1]}
                    alt=""
                  />
                )}
                <div className="overflow-hidden">
                  {place.photos?.[2] && (
                    <img
                      className="aspect-square object-cover relative top-2"
                      src={"http://localhost:8000/uploads/" + place.photos[2]}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowAllPhotos(true)}
              className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
                />
              </svg>
              Show more photos
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
