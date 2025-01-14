import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import './Navigation.css'; // Import the CSS file IT GOES WHITE WHEN INVOKED

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  ) : (
    <>
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      {/* <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li> */}
    </>
  );

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
