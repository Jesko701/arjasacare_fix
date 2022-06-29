import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Config/Auth";
import Spinner from "./Spinner";
import axios from "axios";

const FormTransaksi = () => {
  const inputObat = useRef();
  const inputAlergi = useRef();
  const inputKeluhan = useRef();
  const inputSaran = useRef();

  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitTransaksi = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.post(
        "https://arjasa-care-api.herokuapp.com/api/v1/transaksi/" + id,
        {
          keluhan: inputKeluhan.current.value,
          alergi: inputAlergi.current.value,
          nama_obat: inputObat.current.value,
          saran: inputSaran.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIsLoading(false);
      alert("Data berhasil diinput");
      navigate(`/detail/${id}`);
    } catch (error) {
      setIsLoading(false);
      alert("Data gagal diinput " + error.response.message);
    }
  };

  return (
    <>
      <div class="mx-auto">
        {isLoading && <Spinner />}
        <form onSubmit={handleSubmitTransaksi}>
          <div class="card mb-4">
            <h5 class="card-header">Form Tambah Transaksi</h5>
            <div class="card-body">
              <div class="mb-3 row">
                <label for="html5-search-input" class="col-md-2 col-form-label">
                  Nama Obat <b>(Wajib)</b>
                </label>
                <div class="col-md-10">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="....."
                    name="namaObat"
                    id="html5-search-input"
                    ref={inputObat}
                    required
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-email-input" class="col-md-2 col-form-label">
                  alergi
                </label>
                <div class="col-md-10">
                  <input
                    class="form-control"
                    type="text"
                    name="alergi"
                    placeholder="....."
                    ref={inputAlergi}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-text-input" class="col-md-2 col-form-label">
                  Keluhan
                </label>
                <div class="col-md-8">
                  <textarea
                    class="form-control"
                    rows="5"
                    type="text"
                    placeholder="....."
                    name="nama"
                    id="html5-text-input"
                    ref={inputKeluhan}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-text-input" class="col-md-2 col-form-label">
                  Saran
                </label>
                <div class="col-md-8">
                  <textarea
                    class="form-control"
                    rows="5"
                    type="text"
                    placeholder="....."
                    name="nama"
                    id="html5-text-input"
                    ref={inputSaran}
                  />
                </div>
              </div>
              <div className="mx-auto float-end">
                <button type="submit" class="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormTransaksi;
