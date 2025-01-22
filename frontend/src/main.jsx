import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { ModalProvider } from './context/Modal';
// import { Modal } from './context/Modal';

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);

// ERROR but original CODE::
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import App from './App';
// import './index.css';
// import configureStore from './store';
// import { restoreCSRF, csrfFetch } from './store/csrf';
// import * as sessionActions from './store/session';
// import { Modal, ModalProvider } from './context/Modal'

// const store = configureStore();

// // ... const store = configureStore();
// if (import.meta.env.MODE !== 'production') {
//   restoreCSRF();

//   window.csrfFetch = csrfFetch;
//   window.store = store;
//   window.sessionActions = sessionActions; // <-- ADD THIS LINE
// }

// // if (process.env.NODE_ENV !== 'production') {
// //   window.store = store;
// // }


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ModalProvider>
//       <Provider store={store}>
//         <App />
//         <Modal />
//       </Provider>
//     </ModalProvider>
//   </React.StrictMode>
// );
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
