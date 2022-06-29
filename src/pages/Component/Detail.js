import { useEffect as UseEffect, useState as UseState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import { useAuth } from "../../Config/Auth";
import { useNavigate } from "react-router";
import { timestampFormatter } from "../../helpers";

const Detail = ({ data }) => {
  const { authToken } = useAuth();
  const id = data.id;
  const navigate = useNavigate();

  const handleDeletePelanggan = () => {
    const DeleteData = async () => {
      try {
        const response = await axios.delete(
          `https://arjasa-care-api.herokuapp.com/api/v1/pelanggan/${id}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        navigate("/");
      } catch (err) {}
    };
    DeleteData();
  };

  const kopCSV = [
    { label: "Nama Panjang", key: "fullname" },
    { label: "Nomor HP", key: "nomor_hp" },
    { label: "Alamat", key: "alamat" },
    { label: "Obat", key: "obat" },
    { label: "Alergi", key: "alergi" },
    { label: "Keluhan", key: "keluhan" },
    { label: "Saran", key: "saran" },
  ];

  const [getDetail, setDetail] = UseState([
    {
      fullname: "joy",
      nomor_hp: "0822222222",
      alamat: "Tes",
      obat: "Tes1",
      alergi: "Tes2",
      keluhan: "Keluhan",
      saran: "Saran",
    },
  ]);

  const csvReport = {
    data: getDetail,
    headers: kopCSV,
    filename: "Detail_Pelanggan.csv",
  };

  return (
    <>
      <div className="card mb-4" id="list-produk">
        <div className="card-body">
          <h3 className="card-title">{data.nama}</h3>
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <tbody className="table-border-bottom-0">
                <tr>
                  <td>
                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                    <strong>Nomor HP</strong>
                  </td>
                  <td>{data.nomor_hp}</td>
                </tr>
                <tr>
                  <td>
                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                    <strong>Alamat</strong>
                  </td>
                  <td>{data.alamat}</td>
                </tr>
                <tr>
                  <td>
                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                    <strong>Tanggal Input</strong>
                  </td>
                  <td>{timestampFormatter(data.updated_at || "")}</td>
                </tr>
                <tr>
                  <td>
                    <i className="fab fa-angular fa-lg text-danger me-3"></i>
                    <strong>Tanda Tangan</strong>
                  </td>
                  <td>
                    <button
                      className="btn rounded-pill btn-outline-warning"
                      onClick={() => {
                        alert("Fitur ini belum tersedia sekarang");
                      }}
                    >
                      Lihat
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
         
          <button
            type="button"
            className="btn rounded-pill btn-outline-danger mr-3"
            onClick={handleDeletePelanggan}
          >
            Hapus
          </button>
          <button
            type="button"
            className="btn rounded-pill btn-outline-success float-end"
            onClick={() => {
              navigate(`/transaksi/${id}`);
            }}
          >
            Tambah Transaksi
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
