import { Route, Routes } from "react-router-dom";
import Home from "./Layout/Home/Home";
import Shop from "./Layout/Shop/Shop";
import Contact from "./Layout/Contact/Contact";
import Authentication from "./Layout/Authentication/Authentication";
import Navbar from "./Layout/Navbar/Navbar";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="Shop" element={<Shop />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
