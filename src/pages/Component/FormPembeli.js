import axios from "axios";
import React, { useRef, useState } from "react";
import { useAuth } from "../../Config/Auth";
import Spinner from "./Spinner";

const FormPembeli = () => {
  const inputNama = useRef(null);
  const inputAlamat = useRef(null);
  const inputGambarTTD = useRef(null);
  const inputNomorHP = useRef(null);
  const { authToken } = useAuth();

  const [getDataPembeli, setDataPembeli] = useState({
    nama: "",
    nomor_hp: "",
    alamat: null,
    tanda_tangan: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [noTelpMessage, setNoTelpMessage] = useState("");
  const [ttdMsg, setTtdMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    addDataIntoUseState();
    const bodyFormData = new FormData();
    bodyFormData.append("nama", getDataPembeli.nama);
    bodyFormData.append("nomor_hp", getDataPembeli.nomor_hp);
    bodyFormData.append("alamat", getDataPembeli.alamat);
    bodyFormData.append("tanda_tangan", getDataPembeli.tanda_tangan);
    setNoTelpMessage("");
    setTtdMsg("");
    setIsLoading(true);
    try {
      const insert = await axios({
        method: "post",
        url: "https://arjasa-care-api.herokuapp.com/api/v1/pelanggan",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert("Data berhasil di-input");
    } catch (error) {
      const data = error.response.data.data;

      if (data != null) setNoTelpMessage(data["nomor_hp"][0]);
      else setTtdMsg(error.response.data.message);
    }
    setIsLoading(false);
  };

  const addDataIntoUseState = () => {
    let data = getDataPembeli;
    data["nama"] = inputNama.current.value;
    data["alamat"] = inputAlamat.current.value;
    data["nomor_hp"] = inputNomorHP.current.value;
    data["tanda_tangan"] = inputGambarTTD.current.files[0];
    setDataPembeli(data);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div class="mx-auto">
        <div class="card mb-4">
          <h5 class="card-header">Form Pelanggan</h5>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <label for="html5-text-input" class="col-md-4 col-form-label">
                    Nama <b>(Wajib)*</b>
                  </label>
                  <div class="col-md-10">
                    <input
                      autoFocus
                      class="form-control"
                      type="text"
                      name="nama"
                      placeholder="Nama......"
                      id="html5-text-input"
                      ref={inputNama}
                      required
                    />
                  </div>
                </div>
                <div class="col">
                  <label
                    for="html5-search-input"
                    class="col-md-7 col-form-label"
                  >
                    Nomor HP <b>(10 - 15 Karakter)*</b>
                  </label>
                  <div class="col-md-12">
                    <input
                      class={`form-control ${
                        noTelpMessage !== "" && "invalid"
                      }`}
                      type="number"
                      name="nomorHP"
                      placeholder="Nomor HP...."
                      id="html5-search-input"
                      ref={inputNomorHP}
                      required
                    />
                    {noTelpMessage !== "" && (
                      <div class="invalid-feedback d-block">
                        {noTelpMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-email-input" class="col-form-label">
                  Alamat
                </label>
                <div>
                  <input
                    class="form-control"
                    type="text"
                    name="alamat"
                    placeholder="Alamat...."
                    id="html5-email-input"
                    ref={inputAlamat}
                  />
                </div>
              </div>

              <div class="mb-3 row" />
              <div class="row">
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Masukkan gambar tanda-tangan{" "}
                  </label>
                  <input
                    class={`form-control ${ttdMsg !== "" && "invalid"}`}
                    type="file"
                    id="formFile"
                    name="gambar"
                    accept="image/*"
                    ref={inputGambarTTD}
                  />
                  {ttdMsg !== "" && (
                    <div class="invalid-feedback d-block">{ttdMsg}</div>
                  )}
                </div>
              </div>
              <div className="mx-auto float-end">
                <button type="submit" class="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
            <br />
          </form>
        </div>
      </div>
    </>
  );
};

export default FormPembeli;
