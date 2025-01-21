import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import "./SearchBar.css";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);


  useEffect(() => {
    // Set custom placeholder text for date inputs
    const checkInInput = document.getElementById("check-in-date");
    if (checkInInput) {
      checkInInput.placeholder = "Select Check-in Date";
    }

    const checkOutInput = document.getElementById("check-out-date");
    if (checkOutInput) {
      checkOutInput.placeholder = "Select Check-out Date";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Feature Coming Soon...");
  };

  return (
    <>
      {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}

      <div id="search-bar-container">
        <form onSubmit={handleSubmit} className="search-bar-form">
          <div className="search-bar-field">
            <label htmlFor="location">Where</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search Destinations"
            />
          </div>
          <div className='search-bar-separator'></div>

          <div className="search-bar-field">
            <label htmlFor="check-in-date">Check In</label>
            <input
              type="date"
              id="check-in-date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              placeholder="Add dates"
            />
          </div>
          <div className='search-bar-separator'></div>

          <div className="search-bar-field">
            <label htmlFor="check-out-date">Check Out</label>
            <input
              type="date"
              id="check-out-date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              placeholder="Add dates"
            />
          </div>
          <div className='search-bar-separator'></div>

          <div className="search-bar-field">
            <label htmlFor="guests">Who</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              placeholder="Add Guests"
            />
          </div>
          <button type="submit" className="search-bar-button">
            <HiMiniMagnifyingGlass />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
