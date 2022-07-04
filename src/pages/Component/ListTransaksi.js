import React from "react";
import { CSVLink } from "react-csv";

const ListTransaksi = (props) => {
  const headers = [
    { label: "ID Transaksi", key: "id" },
    { label: "Waktu Transaksi", key: "waktu_transaksi" },
    { label: "Nama Pelanggan", key: "nama_pelanggan" },
    { label: "Keluhan", key: "keluhan" },
    { label: "Saran", key: "saran" },
    { label: "Nama Obat", key: "nama_obat" },
    { label: "Alergi", key: "alergi" },
  ];

  const csvReport = {
    filename: `transaksi.csv`,
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
                  <th>Nomor</th>
                  <th>ID Transaksi</th>
                  <th>ID Pelanggan</th>
                  <th>Waktu Transaksi</th>
                  <th>Nama Pelanggan</th>
                  <th>Nomor HP</th>
                  <th>Keluhan</th>
                  <th>Saran</th>
                  <th>Nama Obat</th>
                  <th>Alergi</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {props.data.map((item, nomor) => (
                  <tr key={item.id}>
                    <td>{nomor+1}</td>
                    <td>{item.id}</td>
                    <td>{item.id_pelanggan}</td>
                    <td>{item.waktu_transaksi}</td>
                    <td>{item.nama_pelanggan}</td>
                    <td>{item.nomor_hp}</td>
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
            <CSVLink className="btn btn-success" {...csvReport}>
              Export CSV
            </CSVLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTransaksi;
