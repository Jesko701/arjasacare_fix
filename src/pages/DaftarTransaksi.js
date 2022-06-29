import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import ListTransaksi from "./Component/ListTransaksi";
import { useAuth } from "../Config/Auth";
import Spinner from "./Component/Spinner";
import axios from "axios";

const DaftarTransaksi = () => {
  const { authToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  const search = useRef();

  const getTransaksi = useCallback(async (keyword) => {
    document.title = "Arjasa Care | List Transaksi";
    setIsLoading(true);
    let url = "https://arjasa-care-api.herokuapp.com/api/v1/transaksi";
    if (keyword !== "") url += `?keyword=${keyword}`;
    const response = await axios({
      method: "get",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    setData(
      response.data.data.map((item) => ({
        id: item.id,
        waktu_transaksi: item.created_at,
        nama_pelanggan: item.pelanggan.nama,
        keluhan: item.keluhan,
        saran: item.saran,
        nama_obat: item.nama_obat,
        alergi: item.alergi,
      }))
    );

    console.log(response.data.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTransaksi(keyword);
  }, [getTransaksi]);

  const submitSearchHandler = (e) => {
    e.preventDefault();

    const keyword = search.current.value;
    setSearchParams({ keyword  });
    getTransaksi(keyword);

  };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Dashboard />
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">Transaksi /</span>{" "}
                  Daftar Transaksi
                </h4>
                <div className="col-5 mx-auto">
                  <div className="card mb-4">
                    <div className="card-body">
                      <form
                        onSubmit={submitSearchHandler}
                      >
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Cari berdasarkan keluhan atau nama obat"
                          ref={search}
                        />
                        <button
                          type="submit"
                          className="btn btn-primary float-end mt-3"
                        >
                          Cari Transaksi
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {!isLoading ? (
                  <ListTransaksi
                    data={data}
                    onSubmitSearch={submitSearchHandler}
                  />
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

export default DaftarTransaksi;
