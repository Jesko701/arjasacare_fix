import React, { useEffect } from "react";
import Dashboard from "./Component/Dashboard";
import FormTransaksi from "./Component/FormTransaksi";

const TambahTransaksi = () => {
  useEffect(() => {
    document.title = "Arjasa Care | Tambah Transaksi";
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
                  <span className="text-muted fw-light">Transaksi /</span>{" "}
                  Tambah Transaksi
                </h4>
                <FormTransaksi />
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

export default TambahTransaksi;
