import React from "react";
import ReactDOM from "react-dom/client"; // Use the correct ReactDOM import for React 18
import App from "./App";
import "antd/dist/reset.css"; // Import Ant Design styles

// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
