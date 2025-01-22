import SpotItems from "./SpotItems";

import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spotsReducer";
import { useEffect } from "react";
// import SearchBar from "../Search/SearchBar";

import "./Spots.css";

const Spots = () => {
  let spots = useSelector((state) => Object.values(state.spots.allSpots));
  // console.log('SPOTS PLZ', spots)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  // Check if allSpots is defined and has spots
  console.log("SPOTSSSSSS: ", spots);


  // const handleDelete = (spotId) => {
  //   const remove = dispatch(deleteSpot(spotId));
  //   if (remove) {
  //     console.log("Successfully removed spot");
  //   } else {
  //     console.log("Failed to remove spot");
  //   }
  // };

  return (
    <>
    <section>
    {/* <SearchBar /> */}
    <hr />
      <ul>
        <div className="spots-container">
          {spots.map((spot) => {
            return <SpotItems spot={spot} key={spot.id} />;
          })}
        </div>
      </ul>
    </section>
    </>
  );
};

export default Spots;
