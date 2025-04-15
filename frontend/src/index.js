import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Inject Roboto font (for Material UI)
const robotoLink = document.createElement('link');
robotoLink.rel = 'stylesheet';
robotoLink.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
document.head.appendChild(robotoLink);

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();