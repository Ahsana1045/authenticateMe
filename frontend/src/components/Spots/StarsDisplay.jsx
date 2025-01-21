import { PiFishFill, PiFishDuotone, PiFish } from "react-icons/pi";

const StarDisplay = ({ numStars }) => {
  const showStars = (numStars) => {
    const stars = [];
    const maxStars = 5;

    // Check how many should be filled, duotone, and empty
    const rating = Math.min(Math.max(numStars, 0), maxStars);
    // Fully filled stars
    const numFilledStars = Math.floor(rating);

    // Duotone star if there's a decimal
    const duotoneStar = rating - numFilledStars > 0 ? <PiFishDuotone /> : null;

    // Empty stars
    const numEmptyStars = maxStars - numFilledStars - (duotoneStar ? 1 : 0);

    // Filled stars
    for (let i = 0; i < numFilledStars; i++) {
      stars.push(<PiFishFill key={`filled-${i}`} />);
    }

    // Duotone star
    if (duotoneStar) {
      stars.push(duotoneStar);
    }

    // Empty stars
    for (let i = 0; i < numEmptyStars; i++) {
      stars.push(<PiFish key={`empty-${i}`} />);
    }

    return stars;
  };

  return (
    <div className="star-display">
      {showStars(numStars)}
    </div>
  );
};

export default StarDisplay;
