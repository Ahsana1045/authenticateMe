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
        src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
        alt="dawg-image"
      />
      <h2>We Have A Place To Stay Tonight!</h2>

      <div onClick={handleSubmit}>
      <button className="enter-website-button"
       ><PiPawPrintFill /> Look at some places! <PiPawPrintFill /></button>
       </div>

    </div>
  );
}
