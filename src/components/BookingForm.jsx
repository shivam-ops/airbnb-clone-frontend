import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingForm({ place }) {
  const [checkIn, setCheckin] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    if (!user) {
      alert("Please log in first");
    } else if (!checkIn || !checkOut || !name || !mobile) {
      alert("Please provide all required fields");
    }

    const bookingData = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phoneNumber: mobile,
      place: place._id,
      user: user._id,
      price: numberOfNights * place.price,
    };

    const response = await axios.post("/bookings/", bookingData);
    console.log(response.data);
    const bookingId = response.data._id;

    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label htmlFor="">Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label htmlFor="">Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label htmlFor="">No. of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Mobile number:</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place&nbsp;
        {numberOfNights > 0 && <span>for ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
