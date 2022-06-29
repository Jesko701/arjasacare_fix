import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Dashboard from "./Component/Dashboard";
import ListPerson from "./Component/ListPerson";
import Search from "./Component/Search";
import { useAuth } from "../Config/Auth";
import Spinner from "./Component/Spinner";
import Pagination from "./Component/Pagination";
import axios from "axios";

const Home = () => {
  const { authToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [pelanggan, setPelanggan] = useState([]);
  const [data, setData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const page = searchParams.get("page") || 1;

  const getPelanggan = useCallback(async (page, keyword) => {
    document.title = "Arjasa Care | Home";
    setIsLoading(true);
    let url = `https://arjasa-care-api.herokuapp.com/api/v1/pelanggan?page=${page}`;
    if (keyword !== "") url += `&keyword=${keyword}`;
    try {
      const response = await axios({
        method: "get",
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const arr = response.data.data.data;
      console.log(arr);
      console.log(authToken);
      setPelanggan(
        arr.map((item) => ({
          id: item.id,
          nama: item.nama,
        }))
      );

      setData({
        currentPage: response.data.data.currentPage,
        totalPage: response.data.data.totalPage,
        totalData: response.data.data.totalData,
      });
    } catch (err) {}

    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPelanggan(page, keyword);
  }, [getPelanggan]);

  const searchSubmitHandler = (keywordInp) => {
    setSearchParams({ keyword: keywordInp });
    getPelanggan(page, keywordInp);
  };

  const movePage = (page) => {
    if (keyword == "") setSearchParams({ page });
    else setSearchParams({ page, keyword });

    getPelanggan(page, keyword);
  };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Dashboard />
          <div className="layout-page">
            <Search handleSearch={searchSubmitHandler} />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">Pelanggan /</span>{" "}
                  Daftar Pelanggan
                </h4>
                {!isLoading ? (
                  <>
                    <ListPerson pelanggan={pelanggan} page={page}/>
                    <Pagination
                      currentPage={data.currentPage}
                      totalPages={data.totalPage}
                      itemsPerPage={10}
                      onChangePage={movePage}
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

export default Home;
