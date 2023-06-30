import { useEffect, useState } from "react";
import Amenities from "./Amenities";
import axios from "axios";
import Nav from "./Nav";
import PhotosUploader from "./PhotosUploader";
import { Navigate, useParams } from "react-router-dom";
import ErrorFlash from "./ErrorFlash";

export function PlaceForm() {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setAmenities(data.amenities);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckout(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const handleCloseError = () => {
    setErrorMessage("");
  };

  async function savePlace(e) {
    e.preventDefault();

    const placeData = {
      id,
      title,
      address,
      photos: addedPhotos.flat(),
      description,
      amenities,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    // if (!placeData) {
    //   //alert("Please provide all required fields");
    //   setErrorMessage("Please provide all required fields");

    //   return;
    // }

    const priceErrors = validatePrice(Number(placeData.price));
    if (priceErrors.length > 0) {
      setErrorMessage("Price validation failed:\n" + priceErrors.join("\n"));
      return;
    }

    if (id) {
      //update
      try {
        const response = await axios.put("/places", { id, ...placeData });
        console.log(response.data);
        setRedirect(true);
      } catch (error) {
        console.error(error.response.data);
        setErrorMessage(error.response.data.detail);
      }
    } else {
      //new place
      try {
        const response = await axios.post("/places", { ...placeData });
        console.log(response.data);
        setRedirect(true);
      } catch (error) {
        console.error(error.response.data);
        setErrorMessage(error.response.data.detail);
      }
    }
  }

  async function deletePlace(e) {
    e.preventDefault();

    try {
      const response = await axios.delete(`/places/${id}`);
      console.log(response.data);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  function validatePrice(price) {
    const errors = [];

    if (!Number.isInteger(price)) {
      errors.push("Price should be an integer");
    }
    if (price <= 0) {
      errors.push("Price should be greater than 0");
    }

    return errors;
  }

  return (
    <>
      <div>
        <Nav />
        <form onSubmit={savePlace}>
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-gray-500 text-sm">
            Title for your place. Should be short and catchy as in advertisment.
          </p>
          <input
            type="text"
            placeholder="title, for example: My lovely apartment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2 className="text-2xl mt-4">Address</h2>
          <p className="text-gray-500 text-sm">Address to this place</p>
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <h2 className="text-2xl mt-4">Photos</h2>
          <p className="text-gray-500 text-sm">more = better</p>
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          <h2 className="text-2xl mt-4">Description</h2>
          <p className="text-gray-500 text-sm">description of the place</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Amenities selected={amenities} onChange={setAmenities} />
          <h2 className="text-2xl mt-4">Extra info</h2>
          <p className="text-gray-500 text-sm">house rules, etc</p>
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
          <h2 className="text-2xl mt-4">Check in & out times</h2>
          <p className="text-gray-500 text-sm">
            add check in & out times, remember to have some time window for
            cleaning the room between guests
          </p>
          <div className="grid gap-2 sm:grid-cols-4 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <select
                type="text"
                //placeholder="14:00"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              >
                <option value="">--</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <select
                type="text"
                //placeholder="11:00"
                value={checkOut}
                onChange={(e) => setCheckout(e.target.value)}
              >
                <option value="">--</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
              </select>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <select
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          {!id ? (
            // Rendered when adding a new place
            <button className="primary my-4">Save</button>
          ) : (
            // Rendered when updating a place
            <>
              <button className="primary my-4">Save</button>
              <button
                onClick={deletePlace}
                className="secondary text-black my-4"
              >
                Delete listing
              </button>
            </>
          )}
        </form>
        {errorMessage && (
          <ErrorFlash message={errorMessage} onClose={handleCloseError} />
        )}
      </div>
    </>
  );
}
