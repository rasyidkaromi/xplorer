import React from 'react';
import ReactDOM from "react-dom/client";
import { App } from './App';

const initDocument = () => {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.background = "linear-gradient(#f500af, #04050d)";
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.height = '100vh';
  document.body.style.color = '#fff';
  document.body.style.fontFamily = 'Work Sans, sans-serif';
  return document.getElementById("root") as HTMLElement;
}
ReactDOM.createRoot(initDocument()).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// overflowY: 'scroll',
