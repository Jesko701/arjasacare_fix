import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useAuth } from "../../Config/Auth";
import { useProfileContext } from "../../Config/ProfileKaryawan";

const Dashboard = () => {
  const pathName = useLocation().pathname;
  const menuActive = {
    produk: pathName == "/",
    tambahPelanggan: pathName == "/RegPelanggan",
    tambahKaryawan: pathName == "/tambahKaryawan",
    daftarTransaksi: pathName == "/daftarTransaksi",
    profile: pathName == "/profile",
  };
  const closeDashboard = () => {
    const html = document.getElementById("html");
    html.classList.remove("layout-menu-expanded");
  };

  const isKaryawan =
    JSON.parse(localStorage.getItem("profile")).is_karyawan === "true";

  const { setAndGetTokens } = useAuth();
  const { setAndGetProfile } = useProfileContext();

  const logoutHandler = (e) => {
    if (window.confirm("Apakah anda yakin ingin logout?")) {
      setAndGetTokens();
      setAndGetProfile();
      localStorage.clear();
    }
  };
  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <NavLink to="/" className="app-brand-link">
            <i className="bx bxs-bolt-circle bx-lg"></i>
            <span className="app-brand-text demo menu-text fw-bolder ms-2">
              ArjasaCare
            </span>
          </NavLink>
          <a className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i
              onClick={closeDashboard}
              className="bx bx-chevron-left bx-sm align-middle"
            ></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Produk</span>
          </li>
          <li className={`menu-item ${menuActive.produk ? "active" : ""}`}>
            <NavLink to="/" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-group"></i>
              <div>List Pelanggan</div>
            </NavLink>
          </li>

          <li
            className={`menu-item ${
              menuActive.tambahPelanggan ? "active" : ""
            }`}
          >
            <NavLink to="/RegPelanggan" className="menu-link">
              <i className="menu-icon tf-icons bx bx-user-plus"></i>
              <div>Form Tambah Pelanggan</div>
            </NavLink>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Karyawan</span>
          </li>
          <li className={`menu-item ${menuActive.profile ? "active" : ""}`}>
            <NavLink to="/profile" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-user"></i>
              <div data-i18n="User interface">Profil</div>
            </NavLink>
          </li>
          
          {!isKaryawan && (
            <li
              className={`menu-item ${
                menuActive.tambahKaryawan ? "active" : ""
              }`}
            >
              <NavLink to="/tambahKaryawan" className="menu-link">
                <i className="menu-icon tf-icons bx bxs-file-plus"></i>
                <div data-i18n="Support">Tambah Karyawan</div>
              </NavLink>
            </li>
          )}

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Transaksi</span>
          </li>
          <li
            className={`menu-item ${
              menuActive.daftarTransaksi ? "active" : ""
            }`}
          >
            <NavLink to="/daftarTransaksi" className="menu-link">
              <i className="menu-icon tf-icons bx bxs-book-alt"></i>
              <div data-i18n="Support">Daftar Transaksi</div>
            </NavLink>
          </li>
          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Logout</span>
          </li>
          <li className="menu-item">
            <a
              className="menu-link"
              style={{ cursor: "pointer" }}
              onClick={logoutHandler}
            >
              <i className="menu-icon tf-icons bx bx-power-off"></i>
              <div data-i18n="Support">Logout</div>
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Dashboard;
