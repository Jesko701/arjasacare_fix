import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormKaryawan from "./Component/FormKaryawan";
import Dashboard from "./Component/Dashboard";

const AddKaryawan = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Arjasa Care | Tambah Karyawan";
    const { is_karyawan } = JSON.parse(localStorage.getItem("profile"));
    if (is_karyawan === "true") navigate(-1);
  }, []);
  const openDashboard = () => {
    const html = document.getElementById("html");
    html.classList.add("layout-menu-expanded");
  };
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Dashboard />
          <div className="layout-page">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4" href="#">
                <i className="bx bx-menu bx-sm" onClick={openDashboard}></i>
              </a>
            </div>
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">Karyawan /</span> Tambah
                  Karyawan
                </h4>
                <FormKaryawan />
              </div>
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
};

export default AddKaryawan;
