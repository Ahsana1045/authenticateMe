import SpotItems from "./SpotItems";

import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spotsReducer";
import { useEffect } from "react";
import SearchBar from "../Search/SearchBar";

import "./Spots.css";

const Spots = () => {
  let spots = useSelector((state) => Object.values(state.spots.allSpots));
  // console.log('SPOTS PLZ', spots)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

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
    <SearchBar />
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

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// // import { fetchSpots } from '../store/spots';

// const SpotList = () => {
//     const dispatch = useDispatch();
//     const spots = useSelector(state => state.spots.allSpots);
//     const loading = useSelector(state => state.spots.loading);

//     useEffect(() => {
//         dispatch(fetchSpots());
//     }, [dispatch]);

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="spot-list">
//             {spots.map(spot => (
//                 <div key={spot.id} className="spot-card">
//                     <img src={spot.previewImage} alt={spot.name} />
//                     <h3>{spot.name}</h3>
//                     <p>{spot.description}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SpotList;



// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { loadSpotsThunk } from './spotsActions'; // Adjust the import path as necessary
// import { spotsSelector } from './spotsSelectors';
// import './Spots.css'; // Import the CSS file for styling

// class Spots extends Component {
//   componentDidMount() {
//     this.props.loadSpots();
//   }

//   render() {
//     const { spots, isLoading, errors } = this.props;
//     const displayedSpots = spots.slice(0, 8); // Limit to 8 spots

//     if (isLoading) {
//       return <div>Loading...</div>;
//     }

//     if (errors.length > 0) {
//       return <div>Error: {errors.join(', ')}</div>;
//     }

//     return (
//       <div className="spots-container">
//         <h1>Available Spots</h1>
//         <ul className="spots-grid">
//           {displayedSpots.map((spot) => (
//             <li key={spot.id} className="spot-item">
//               <h2>{spot.name}</h2>
//               <p>{spot.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   spots: spotsSelector(state),
//   isLoading: state.spotsState.isLoading,
//   errors: state.spotsState.errors,
// });

// const mapDispatchToProps = (dispatch) => ({
//   loadSpots: () => dispatch(loadSpotsThunk()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Spots);



// import React, { Component } from 'react';
// import { fetchSpots } from './api'; // Make sure to adjust the import path as necessary

// class Spots extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       spots: [],
//       isLoading: true,
//       error: null,
//     };
//   }

//   componentDidMount() {
//     this.loadSpots();
//   }

//   loadSpots = async () => {
//     try {
//       const spots = await fetchSpots();
//       this.setState({ spots, isLoading: false });
//     } catch (error) {
//       this.setState({ error, isLoading: false });
//     }
//   };

//   render() {
//     const { spots, isLoading, error } = this.state;

//     if (isLoading) {
//       return <div>Loading...</div>;
//     }

//     if (error) {
//       return <div>Error: {error.message}</div>;
//     }

//     return (
//       <div>
//         <h1>Available Spots</h1>
//         <ul>
//           {spots.map((spot) => (
//             <li key={spot.id}>
//               <h2>{spot.name}</h2>
//               <p>{spot.description}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default Spots;
