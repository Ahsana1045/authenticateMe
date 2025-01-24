// frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";


import "./Navigation.css";

import ptstLogo from "../Images/ptstLogo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <>
    <li>
    <NavLink to='/spots/new' className='create-a-new-spot'>Create a New Spot</NavLink>
    </li>
    <li>
      <ProfileButton user={sessionUser} className="user-buttons" />
    </li>
    </>
  ) : (
    <>
      {/* <li>
        <OpenModalButton
          className="sign-up-button"
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />

      </li>
      <li>
        <OpenModalButton
          className="log-in-button"
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />

      </li> */}
      <li>
        <ProfileButton user={null} className="user-buttons" />
      </li>
    </>
  );

  return (
    <>
      <nav id="navbar">
        <NavLink id="home-icon" to="/" style={{fontSize: '20px'}}>
          <img
            src={ptstLogo}
            style={{ height: "70px", width: "auto" }}
            alt="PTST Logo"
          />
        </NavLink>
        <div id="nav-right-side">
          {isLoaded && sessionLinks}
        </div>
      </nav>
      <hr />
    </>
  );
}

export default Navigation;


//SECOND Greed pop up
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import logoImage from '../../../public/ptstLogo.png'
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);

//   return (
//     <div className='navWrapper-wrapper'>
//     <ul className='nav-Wrapper'>
//       <li className='homeButton'>
//         <a className='logo-picture' href="/">
//         <img className='logo-image' src={logoImage} alt="" />
//         </a>
//         <NavLink to="/"></NavLink>
//       </li>
//       {isLoaded && (
//         <li className='profile-Button'>
//           <ProfileButton user={sessionUser} />
//         </li>
//       )}
//     </ul>
//     </div>
//   );
// }

// export default Navigation;


//FIRST
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../LoginFormModal/LoginFormModal';
// import SignupFormModal from '../SignupFormModal/SignupFormModal';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   const sessionLinks = sessionUser ? (
//     <li>
//       <ProfileButton user={sessionUser} />
//     </li>
//   ) : (
//     <>
//       <li>
//         <OpenModalButton
//           buttonText="Log In"
//           modalComponent={<LoginFormModal />}
//         />
//       </li>
//       <li>
//         <OpenModalButton
//           buttonText="Sign Up"
//           modalComponent={<SignupFormModal />}
//         />
//       </li>
//     </>
//   );

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;
