import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import UIControlContext, {
  UIControlProvider,
} from "context/UIControl";
const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <>
    <UIControlProvider>
      <App />
    </UIControlProvider>
  </>
);
