import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AddressLink from "./AddressLink";
import PlaceGallery from "./PlaceGallery";
import BookingDates from "./BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get("/bookings")
        .then((response) => {
          console.log(response.data);
          const foundBooking = response.data.find(({ _id }) => _id === id);
          console.log(foundBooking);
          if (foundBooking) {
            setBooking(foundBooking);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  if (!booking) {
    return "Loading...";
  }

  async function cancelBooking(e) {
    e.preventDefault();
    try {
      const response = await axios.delete(`/bookings/${id}`);
      console.log(response.data);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/bookings"} />;
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 mb-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary p-6 text-white rounded-2xl">
            <div>Total Price</div>
            <div className="text-3xl">${booking.price}</div>
          </div>
          <button
            onClick={cancelBooking}
            className="bg-primary p-6 text-white text-2xl rounded-2xl py-9"
          >
            Cancel Booking
          </button>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
