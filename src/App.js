import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Error from "./pages/Error";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="Index" element={<Index />} />
          <Route path="LoginPage" element={<LoginPage />} />
          <Route path="*" element={<Error />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
