import { IoIosStarOutline, IoMdStar, IoMdStarHalf } from "react-icons/io";

const StarDisplay = ({ numStars }) => {
  const showStars = (numStars) => {
    const stars = [];
    const maxStars = 5;

    // Clamp the rating between 0 and 5
    const rating = Math.min(Math.max(numStars, 0), maxStars);

    // Calculate full and half-filled stars
    const numFilledStars = Math.floor(rating);
    const hasHalfStar = rating - numFilledStars >= 0.5;
    const numEmptyStars = maxStars - numFilledStars - (hasHalfStar ? 1 : 0);

    // Add filled stars
    for (let i = 0; i < numFilledStars; i++) {
      stars.push(<IoMdStar key={`filled-${i}`} />);
    }

    // Add half-filled star if needed
    if (hasHalfStar) {
      stars.push(<IoMdStarHalf key="half" />);
    }

    // Add empty stars
    for (let i = 0; i < numEmptyStars; i++) {
      stars.push(<IoIosStarOutline key={`empty-${i}`} />);
    }

    return stars;
  };

  return <div className="star-display">{showStars(numStars)}</div>;
};

export default StarDisplay;
