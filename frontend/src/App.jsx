// // frontend/src/App.jsx

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import { Modal } from "./context/Modal";
// import Landing from './components/LandingPage/Landing'
import Spots from "./components/Spots/Spots";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateNewSpotForm";
import ManageSpots from "./components/Spots/ManageSpots";
import UpdateSpotForm from "./components/Spots/UpdateSpotForm";
import ManageReviews from "./components/Reviews/ManageReviews";
// import SearchBar from "./components/Search/SearchBar";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      {/* <SearchBar /> */}
      {/* <hr style={{fontWeight: 'lighter'}}/> */}
      {isLoaded && <Outlet />}
      <hr />
    </>
  );
}

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Landing />
  // },
  {
    element: <Layout />,
    children: [
      {
        path: "/spots/current/",
        element: <ManageSpots />,
      },
      {
        path: "/spots/new",
        element: <CreateSpotForm />,
      },
      {
        path: "/spots/:spotId/edit",
        element: <UpdateSpotForm />,
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetails />,
      },
      {
        path: "/",
        element: <Spots />,
      },
      {
        path: "/reviews/current",
        element: <ManageReviews />,
      },
      // {
      //   path: 'login',
      //   element: <LoginFormModal/>
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found!</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

//SIXTH
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Navigation from './components/Navigation/Navigation';
// import * as sessionActions from './store/session';
// import Spots from './components/SpotsComponent/Spots';
// import { Modal } from './context/Modal';

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       <Modal/>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <Spots/>
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

//FIFTH
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// // import LoginFormPage from './components/LoginFormPage/LoginFormPage';
// import SignupFormModal from './components/SignupFormModal/SignupFormModal';
// import Navigation from './components/Navigation/Navigation';
// import * as sessionActions from './store/session';

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <h1>Welcome!</h1>
//       },
//       // {
//       //   path: 'login',
//       //   element: <LoginFormPage />
//       // },
//       {
//         path: 'signup',
//         element: <SignupFormModal />
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;



//FOURTH
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage/SignupFormPage';
// import * as sessionActions from './store/session';

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true);
//     });
//   }, [dispatch]);

//   return (
//     <>
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <h1>Welcome!</h1>
//       },
//       {
//         path: '/login',
//         element: <LoginFormPage />
//       },
//       {
//         path: '/signup',
//         element: <SignupFormPage />
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

//THIRD
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage/LoginFormPage';
// import * as sessionActions from './store/session';

// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoaded(true);
//     });
//   }, [dispatch]);

//   return (
//     <>
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <h1>Welcome!</h1>
//       },
//       {
//         path: '/login',
//         element: <LoginFormPage />
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;


//SECOND
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage/LoginFormPage';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <h1>Welcome!</h1>
//   },
//   {
//     path: '/login',
//     element: <LoginFormPage />
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }
// export default App;



//FIRST
// function App() {
//   return <h1> Hello from App </h1>;
// }
// export default App;
