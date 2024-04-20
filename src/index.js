import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './store/Context';
import { app } from './firebase/config';
import Context from './store/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <FirebaseContext.Provider value={{app}}>
  <Context>
    <App />
  </Context>
  </FirebaseContext.Provider>
  </React.StrictMode>
);