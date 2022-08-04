import { createRoot } from "react-dom/client";
import './index.css';
import { DiveLog } from './basis/DiveLog';
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <DiveLog />
  </BrowserRouter>
);