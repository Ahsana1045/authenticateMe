import { useNavigate } from "react-router-dom";

import "./Landing.css";

import { PiPawPrintFill } from "react-icons/pi";

export default function Landing() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/spots");
  };

  return (
    <div id="landing-container">
      <h1 className="landing-title">PTST</h1>
      <img
        className="feijai-landing-image"
        src="https://res.cloudinary.com/dfj8lsesn/image/upload/v1717368083/catbnb/feijai.jpg"
        alt="kitty-image"
      />
      <h2>Hello Everynyan!</h2>

      <div onClick={handleSubmit}>
      <button className="enter-website-button"
       ><PiPawPrintFill /> Look at some spots! <PiPawPrintFill /></button>
       </div>

    </div>
  );
}
