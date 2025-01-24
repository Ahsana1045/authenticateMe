// import SpotItems from "./SpotItems";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllSpots } from "../../store/spotsReducer";
// import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom'
// import "./Spots.css";

// const Spots = () => {
//   const dispatch = useDispatch();
//   const spots = useSelector((state) => Object.values(state.spots.allSpots));

//   const [currentPage, setCurrentPage] = useState(1);
//   const spotsPerPage = 8;

//   useEffect(() => {
//     dispatch(getAllSpots());
//   }, [dispatch]);

//   // Pagination logic
//   const indexOfLastSpot = currentPage * spotsPerPage;
//   const indexOfFirstSpot = indexOfLastSpot - spotsPerPage;
//   const currentSpots = spots.slice(indexOfFirstSpot, indexOfLastSpot);

//   const totalPages = Math.ceil(spots.length / spotsPerPage);

//   return (
//     <>
//       <section>
//         <ul>
//           <div className="spots-container">
//             {currentSpots.map((spot) => (
//               <SpotItems spot={spot} key={spot.id} />
//             ))}
//           </div>
//         </ul>

//         {/* Pagination Controls */}
//         <div className="pagination">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span> Page {currentPage} of {totalPages} </span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Spots;


//WITHOUT PAGINATION
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
  // console.log("SPOTSSSSSS: ", spots);


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
    {/* <hr /> */}
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


// //With PAGINATION
// import SpotItems from "./SpotItems";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllSpots } from "../../store/spotsReducer";
// import { useEffect, useState } from "react";

// import "./Spots.css";

// const Spots = () => {
//   const spots = useSelector((state) => Object.values(state.spots.allSpots));
//   const dispatch = useDispatch();

//   const [currentPage, setCurrentPage] = useState(1);
//   const spotsPerPage = 8; // 4 spots per row * 2 rows

//   useEffect(() => {
//     dispatch(getAllSpots());
//   }, [dispatch]);

//   // Pagination logic
//   const indexOfLastSpot = currentPage * spotsPerPage;
//   const indexOfFirstSpot = indexOfLastSpot - spotsPerPage;
//   const currentSpots = spots.slice(indexOfFirstSpot, indexOfLastSpot);

//   const totalPages = Math.ceil(spots.length / spotsPerPage);

//   // Handlers for pagination buttons
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <section>
//         <div className="spots-container">
//           {currentSpots.map((spot) => (
//             <SpotItems spot={spot} key={spot.id} />
//           ))}
//         </div>
//         <div className="pagination-controls">
//           <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//             Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Spots;
