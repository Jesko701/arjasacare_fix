import React, { useState, useEffect } from "react";
import Dashboard from "./Component/Dashboard";
import Detail from "./Component/Detail";
import { useAuth } from "../Config/Auth";
import { useParams } from "react-router-dom";
import Spinner from "./Component/Spinner";
import axios from "axios";
import ListTransaksiKaryawan from "./Component/ListTransaksiKaryawan";

const DetailPelanggan = () => {
  const [dataPelanggan, setDataPelanggan] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { authToken } = useAuth();

  const { id } = useParams();

  useEffect(() => {
    document.title = "Arjasa Care | Detail Pelanggan";
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://arjasa-care-api.herokuapp.com/api/v1/pelanggan/${id}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setDataPelanggan(response.data.data);
      } catch (err) {}
      setIsLoading(false);
    };
    fetchData();
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
                {!isLoading ? (
                  <>
                    <Detail data={dataPelanggan} />
                    <ListTransaksiKaryawan
                      data={dataPelanggan.transaksi || []}
                      nama={dataPelanggan.nama}
                      
                    />
                  </>
                ) : (
                  <Spinner />
                )}
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

export default DetailPelanggan;
