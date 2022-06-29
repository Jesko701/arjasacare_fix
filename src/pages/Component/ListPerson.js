import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListPerson = (props) => {
  const navigate = useNavigate();

  const handleDetailClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <div className="card mb-4" id="list-produk">
        <div className="card-body">
          <h3 className="card-title">List Pelanggan</h3>
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nomor</th>
                  <th>Nama</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {props.pelanggan.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(props.page - 1) * 10 + (index + 1)}</td>
                    <td>{item.nama}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          handleDetailClick(item.id);
                        }}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPerson;
