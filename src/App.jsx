import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./components/Index";
import Login from "./components/Login";
import Layout from "./Layout";
import Register from "./components/Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./components/Profile";
import Profile from "./components/Profile";
import Places from "./components/Places";
import { PlaceForm } from "./components/PlaceForm";
import Place from "./components/Place";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<PlaceForm />} />
          <Route path="/account/places/:id" element={<PlaceForm />} />
          <Route path="/place/:id" element={<Place />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
