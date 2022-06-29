import React from "react";
import { CSVLink } from "react-csv";


const ListTransaksiKaryawan = (props) => {
  const headers = [
    { label: "ID Transaksi", key: "id" },
    { label: "Waktu Transaksi", key: "created_at" },
    { label: "Keluhan", key: "keluhan" },
    { label: "Saran", key: "saran" },
    { label: "Nama Obat", key: "nama_obat" },
    { label: "Alergi", key: "alergi" },
  ];

  const csvReport = {
    filename: `transaksi_${props.nama}.csv`,
    headers,
    data: props.data,
  };
  return (
    <>
      <div className="card mb-4" id="list-produk">
        <div className="card-body">
          <h3 className="card-title">List Transaksi</h3>
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID Transaksi</th>
                  <th>Waktu Transaksi</th>
                  <th>Keluhan</th>
                  <th>Saran</th>
                  <th>Nama Obat</th>
                  <th>Alergi</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {props.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.created_at}</td>
                    <td>{item.keluhan}</td>
                    <td>{item.saran}</td>
                    <td>{item.nama_obat}</td>
                    <td>{item.alergi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mx-auto float-end">
            <CSVLink className="btn btn-success mt-3" {...csvReport}>
              Export CSV
            </CSVLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTransaksiKaryawan;
