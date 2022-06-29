import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddKaryawan from "./pages/AddKaryawan";
import AddPembeli from "./pages/AddPembeli";
import Profile from "./pages/Profile";
import DetailPelanggan from "./pages/DetailPelanggan";
import TambahTransaksi from "./pages/tambahTransaksi";
import { useState } from "react";
import { AuthContext } from "./Config/Auth";
import { ProfileContext } from "./Config/ProfileKaryawan";
import { PrivateRoute, RestrictedRoute } from "../src/Config/PrivateRoute";
import DaftarTransaksi from "./pages/DaftarTransaksi";

function App() {
  const isAnyToken = JSON.parse(localStorage.getItem("tokens"));
  const isAnyProfile = JSON.parse(localStorage.getItem("profile"));
  const [authToken, setAuthToken] = useState(isAnyToken);
  const [dataProfile, setDataProfile] = useState(isAnyProfile);

  const setAndGetTokens = (token) => {
    localStorage.setItem("tokens", JSON.stringify(token));
    setAuthToken(token);
  };

  const setAndGetProfile = (object) => {
    localStorage.setItem("profile", JSON.stringify(object));
    setDataProfile(object);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAndGetTokens }}>
      <ProfileContext.Provider value={{ dataProfile, setAndGetProfile }}>
        <div className="app">
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/home" element={<Navigate to="/" />} />
              <Route
                path="/login"
                element={
                  <RestrictedRoute>
                    <Login />
                  </RestrictedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/tambahKaryawan"
                element={
                  <PrivateRoute>
                    <AddKaryawan />
                  </PrivateRoute>
                }
              />
              <Route
                path="/RegPelanggan"
                element={
                  <PrivateRoute>
                    <AddPembeli />
                  </PrivateRoute>
                }
              />
              <Route
                path="/detail/:id"
                element={
                  <PrivateRoute>
                    <DetailPelanggan />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transaksi/:id"
                element={
                  <PrivateRoute>
                    <TambahTransaksi />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/daftarTransaksi"
                element={
                  <PrivateRoute>
                    <DaftarTransaksi />
                  </PrivateRoute>
                }
              ></Route>
            </Routes>
          </Router>
        </div>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
