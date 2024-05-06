import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import App from "./App.jsx";
import "./index.css";
import "./reset.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
        <ToastContainer
            position="bottom-center"
            autoClose={1300}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
        />
    </React.StrictMode>
);
