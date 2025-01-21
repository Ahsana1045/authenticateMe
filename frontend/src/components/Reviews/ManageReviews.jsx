import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSpotById, updateSpot } from "../../store/spotsReducer";

const UpdateSpotForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [errors, setErrors] = useState({});

  const currentSpot = useSelector((state) => state.spots.currentSpot[0]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSpotById(spotId));
    };

    fetchData();
  }, [dispatch, spotId]);

  useEffect(() => {
    if (currentSpot) {
      setAddress(currentSpot.address);
      setCity(currentSpot.city);
      setState(currentSpot.state);
      setCountry(currentSpot.country);
      setDescription(currentSpot.description);
      setName(currentSpot.name);
      setPrice(currentSpot.price);
      setLat(currentSpot.lat);
      setLng(currentSpot.lng);
    }
  }, [currentSpot]);

  const validateInputs = () => {
    const newErrors = {};

    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!country.trim()) newErrors.country = "Country is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!description.trim() || description.length < 30)
      newErrors.description = "Description needs a minimum of 30 characters";
    if (price < 1) newErrors.price = "Price is required";
    if (lat < -90 || lat > 90)
      newErrors.lat = "Latitude must be between -90 and 90";
    if (lng < -180 || lng > 180)
      newErrors.lng = "Longitude must be between -180 and 180";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateInputs();

    if (isValid) {
      const updatedSpot = {
        address,
        city,
        state,
        country,
        name,
        price,
        description,
        lat,
        lng,
      };

      const response = await dispatch(updateSpot(spotId, updatedSpot));
      if (response && response.id) {
        navigate(`/spots/${response.id}`);
      }
    }
  };

  return (
    <>

    {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
{/* <button
        className="demo-user-modal-button"
        type="submit"
        onClick={() => {
          setAddress("1");
          setCity("1");
          setState("1");
          setCountry("1");
          setName("1");
          setDescription(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          );
          setPrice(1);
          setLat(1);
          setLng(1);
        }}
      >
        {" "}
        Demo Spots
      </button>

      <button
        className="demo-user-modal-button"
        type="submit"
        onClick={() => {
          setAddress(" ");
          setCity(" ");
          setState(" ");
          setCountry(" ");
          setName(" ");
          setDescription("Lore");
          setPrice(1);
          setLat(1);
          setLng(1);
        }}
      >
        {" "}
        Demo Blank Spot Tester
      </button> */}





    <form onSubmit={handleSubmit} id="update-spot-form-container">
      <div id="spot-form-container">
        <header>
          <h2>Update your Spot</h2>
          <h3>Where&apos;s your place located?</h3>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
        </header>

        {/* // Section 1 */}
        <section id="form-country-street-city-state">
          <label className="country-address-input">
            <div className="create-spot-key-input">
              Country{" "}
              <div className="errors-object">
                {errors.country && <p>{errors.country}</p>}
              </div>
            </div>
            <input
              style={{ width: "100%" }}
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
            <label className="country-address-input">
              <div className="create-spot-key-input">
                Street Address{" "}
                <div className="errors-object">
                  {errors.address && <p>{errors.address}</p>}
                </div>
              </div>
              <input
                style={{ width: "100%" }}
                type="text"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>
            <label className="city-state-input">
              <div className="city-input" style={{ width: "60%" }}>
                <div className="create-spot-key-input">
                  City{" "}
                  <div className="errors-object">
                    {errors.city && <p>{errors.city}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "95%" }}
                  type="text"
                  value={city}
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <span>, &nbsp; </span>
              </div>
              <div className="state-input" style={{ width: "40%" }}>
                <div className="create-spot-key-input">
                  State{" "}
                  <div className="errors-object">
                    {errors.state && <p>{errors.state}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  value={state}
                  placeholder="STATE"
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </label>
            <label className="lat-lng-input">
              <div className="lat-input" style={{ width: "40%" }}>
                <div className="create-spot-key-input">
                  Latitude{" "}
                  <div className="errors-object">
                    {errors.lat && <p>{errors.lat}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "95%" }}
                  type="number"
                  value={lat}
                  placeholder="Latitude"
                  onChange={(e) => setLat(e.target.value)}
                  required
                />
                <span>, &nbsp; </span>
              </div>
              <div className="lng-input" style={{ width: "40%" }}>
                <div className="create-spot-key-input">
                  Longitude{" "}
                  <div className="errors-object">
                    {errors.lng && <p>{errors.lng}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "100%" }}
                  type="number"
                  value={lng}
                  placeholder="Longitude"
                  onChange={(e) => setLng(e.target.value)}
                  required
                />
              </div>
            </label>
          </section>

          <hr></hr>

          <header>
            <h2>Describe your place to guests</h2>
            <p>
              Mention the best features of your space, any special amentities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
          </header>

          <label id="description-label" className="description-input">
            <textarea
              style={{ width: "100%" }}
              type="text"
              value={description}
              placeholder="Please write at least 30 characters"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="errors-object">
              {errors.description && <p>{errors.description}</p>}
            </div>
          </label>

          <hr></hr>

          <header>
            <h2>Create a title for your spot</h2>
            <p>
              Catch guests&apos; attention with a spot title that highlights
              what makes your place special.
            </p>
          </header>

          <label className="name-input">
            <input
              style={{ width: "100%" }}
              type="text"
              value={name}
              placeholder="Name of your spot"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="errors-object">
              {errors.name && <p>{errors.name}</p>}
            </div>
          </label>

          <hr></hr>

          <header>
            <h2>Set a base price for your spot</h2>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
          </header>

          <label className="price-input">
            <div className="input-field">
              <span>$</span>
              <input
                style={{ width: "100%" }}
                type="number"
                value={price}
                placeholder="Price per night (USD)"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="errors-object">
              {errors.price && <p>{errors.price}</p>}
            </div>
          </label>

          <hr></hr>

          <button id="create-update-spot-button" type="submit">
          Update Your Spot
        </button>
        </div>
      </form>
    </>
  );
};

export default UpdateSpotForm;
