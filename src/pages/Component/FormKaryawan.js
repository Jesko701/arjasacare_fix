import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Config/Auth";
import Spinner from "./Spinner";

const FormKaryawan = () => {
  const inputNama = useRef(null);
  const inputUsername = useRef(null);
  const inputPassword = useRef(null);
  const inputKonfirmasiPassword = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isKaryawanFirst, setKaryawanFirst] = useState(true);

  const [errNama, setErrNama] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const navigate = useNavigate();

  const [hideBox, setHideBox] = useState(true);

  const { authToken } = useAuth();

  const [dataKaryawan, setDataKaryawan] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  const [listkaryawan, setListKaryawan] = useState([]);

  const hideBoxOnClick = () => {
    setHideBox(!hideBox);
  };

  const handleSubmitKaryawan = async (e) => {
    e.preventDefault();
    handleInput();

    if (dataKaryawan.password != inputKonfirmasiPassword.current.value) {
      alert("Password dan konfirmasi password harus sama");
      return;
    }

    setIsLoading(true);
    setErrNama("");
    setErrUsername("");
    setErrPassword("");
    try {
      console.log("TES 12345566777");
      const data = await axios.post(
        "https://arjasa-care-api.herokuapp.com/api/v1/karyawan",
        { ...dataKaryawan, is_karyawan: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Data berhasil diinput");
      navigate("/", { replace: true });
    } catch (error) {
      const response = error.response.data?.data;
      if (response.username) setErrUsername(response.username[0]);
      if (response.fullname) setErrNama(response.fullname[0]);
      if (response.password) setErrPassword(response.password[0]);
    }
    setIsLoading(false);
  };

  const handleInput = () => {
    let myData = dataKaryawan;
    myData["fullname"] = inputNama.current.value;
    myData["username"] = inputUsername.current.value;
    myData["password"] = inputPassword.current.value;
    setDataKaryawan(myData);
  };

  const handleGetSemuaKaryawan = async (e) => {
    try {
      const data = await axios({
        method: "get",
        url: "https://arjasa-care-api.herokuapp.com/api/v1/karyawan",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setKaryawanFirst(false)
      const karyawans = data.data.data.data;
      const karyawansUsername = karyawans.map((data) => {
        return data.username;
      });
      console.log(karyawansUsername);
      setListKaryawan(karyawansUsername);
    } catch (error) {
      console.log(error);

      alert("Gagal Load Data");
    }
  };

  const handleDeleteKaryawan = async (username, index) => {
    try {
      await axios({
        method: "delete",
        url: `https://arjasa-care-api.herokuapp.com/api/v1/karyawan/${username}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
        const newListKaryawan = listkaryawan.splice(index, 1)  
        setListKaryawan(newListKaryawan)

    } catch (error) {
      alert("Gagal Menghapus Karyawan");
    }
  };

  useEffect(() => {
    if(isKaryawanFirst)
      handleGetSemuaKaryawan();
  }, [listkaryawan]);

  return (
    <>
      <div class="mx-auto"> 
        {isLoading && <Spinner />}
        <form onSubmit={handleSubmitKaryawan}>
          <div class="card mb-4">
            <h5 class="card-header">Form Tambah Karyawan</h5>
            <div class="card-body">
              <div class="mb-3 row">
                <label for="html5-text-input" class="col-md-2 col-form-label">
                  Nama <b>(Wajib)</b>
                </label>
                <div class="col-md-10">
                  <input
                    class={`form-control ${errNama !== "" && "invalid"}`}
                    type="text"
                    placeholder="Nama ..."
                    name="nama"
                    id="html5-text-input"
                    ref={inputNama}
                    required
                  />
                  {errNama !== "" && (
                    <div class="invalid-feedback d-block">{errNama}</div>
                  )}
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-search-input" class="col-md-2 col-form-label">
                  Username <b>(Wajib)</b>
                </label>
                <div class="col-md-10">
                  <input
                    class={`form-control ${errUsername !== "" && "invalid"}`}
                    type="text"
                    placeholder="Username ... "
                    name="username"
                    ref={inputUsername}
                    id="html5-search-input"
                    required
                  />
                  {errUsername !== "" && (
                    <div class="invalid-feedback d-block">{errUsername}</div>
                  )}
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-email-input" class="col-md-2 col-form-label">
                  Password <b>(Wajib)</b>
                </label>
                <div class="col-md-10">
                  <div class="input-group input-group-merge">
                    <input
                      type={hideBox ? "password" : "text"}
                      id="password"
                      class={`form-control ${errPassword !== "" && "invalid"}`}
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                      ref={inputPassword}
                    />
                    <span class="input-group-text cursor-pointer">
                      <i
                        className={"bx bx-" + (hideBox ? "hide" : "show")}
                        onClick={hideBoxOnClick}
                      ></i>
                    </span>
                  </div>
                  {errPassword !== "" && (
                    <div class="invalid-feedback d-block">{errPassword}</div>
                  )}
                </div>
              </div>
              <div class="mb-3 row">
                <label for="html5-email-input" class="col-md-2 col-form-label">
                  Konfirmasi Password <b>(Wajib)</b>
                </label>
                <div class="col-md-10">
                  <input
                    type={hideBox ? "password" : "text"}
                    id="password"
                    class="form-control"
                    name="confirm-password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password"
                    ref={inputKonfirmasiPassword}
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

      <div className="card mb-4" id="list-produk">
        <div className="card-body">
          <h3 className="card-title">List Transaksi</h3>
          <div className="table-responsive text-nowrap">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nomor</th>
                  <th>Username</th>
                  <th>Delete Username</th>
                </tr>
              </thead>
              <tbody>
                {listkaryawan.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item}</td>
                    <td>
                      <button
                        type="button"
                        className="btn rounded-pill btn-outline-danger mr-3"
                        onClick={() => {
                          handleDeleteKaryawan(item,index)
                        }}
                      >
                        Hapus
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

export default FormKaryawan;
