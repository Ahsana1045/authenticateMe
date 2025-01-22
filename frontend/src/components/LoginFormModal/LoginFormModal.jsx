import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  //useEffect to reset state upon opening modal

  useEffect(() => {
    setCredential("");
    setPassword("");
    setErrors({});
  }, []);

  //useEffect to store errors

  useEffect(() => {
    const errors = {};

    if (credential.length < 4) {
      errors.credential = "";
    }

    if (password.length < 6) {
      errors.password = "";
    }

    setErrors(errors);
  }, [credential, password]);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className='credentials-textbox'>
        <label className='credential-input'>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            // placeholder={'Username or Email'}
            required
          />
        </label>
        <label className='credential-input'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // placeholder={'Password'}
            required
          />
        </label>
        </div>
        {Object.values(errors).map((key, index) => (
          <p key={index}>{errors[key]}</p>
        ))}
     <div className="errors-object">
        {errors.credential && <p>{errors.credential}</p>}
        {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='login-modal-buttons'>
        <button
        className='login-modal-button'
        type="submit"
        disabled={Object.values(errors).length > 0}>
          Log In
        </button>

{/* // ! Demo user should not flash on the input, onClick login(user password) */}
        <button
        className='demo-user-modal-button'
        style={{cursor:'pointer'}}
          type="submit"
          onClick={() => {
            setCredential("Mama");
            setPassword("password");
          }}
        >
          {" "}
          Log in as Demo User
        </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;




// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal'
// // import { Navigate } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
// import './LoginForm.css';

// function LoginFormModal() {
//   const dispatch = useDispatch();
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors({});
//     return dispatch(sessionActions.login({ credential, password }))
//       .then(closeModal)
//       .catch(async (res) => {
//         const data = await res.json();
//         if (data && data.errors) {
//           setErrors(data.errors);
//         }
//       });
//   };

//   return (
//     <>
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username or Email
//           <input
//             type="text"
//             value={credential}
//             onChange={(e) => setCredential(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.credential && (
//           <p>{errors.credential}</p>
//         )}
//         <button type="submit">Log In</button>
//       </form>
//     </>
//   );
// }

// export default LoginFormModal;
