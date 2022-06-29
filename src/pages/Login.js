import { useNavigate } from "react-router";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "../Config/Auth";
import Spinner from "./Component/Spinner";
import { useProfileContext } from "../Config/ProfileKaryawan";

const Login = () => {
  const [isSpin, setIsSpin] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [hideBox, setHideBox] = useState(true);
  const navigate = useNavigate();
  const { setAndGetTokens } = useAuth();
  const { setAndGetProfile } = useProfileContext();

  const var_username = useRef();
  const var_pw = useRef();

  const hideBoxOnClick = () => {
    setHideBox(!hideBox);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsSpin(true);
      const login = await axios.post(
        `https://arjasa-care-api.herokuapp.com/api/v1/login`,
        {
          username: var_username.current.value,
          password: var_pw.current.value,
        }
      );
      console.log(login.data.data.token);
      console.log(login.data.data);
      setAndGetTokens(login.data.data.token);
      setAndGetProfile({
        nama: `${login.data.data.karyawan.fullname}`,
        username: `${login.data.data.karyawan.username}`,
        is_karyawan: `${login.data.data.karyawan.is_karyawan}`,
      });
      setIsSpin(true);
      navigate("/", { replace: true });
    } catch (err) {
      setErrMsg(err.response.data.message);
    }
    setIsSpin(false);
  };

  const showFeedback = () => {
    if (isSpin) return <Spinner />;
    else if (errMsg != "")
      return (
        <div className={`alert alert-danger text-center`} role="alert">
          {errMsg}
        </div>
      );
  };
  return (
    <>
      <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
          <div class="authentication-inner">
            <div class="card">
              <div class="card-body">
                <div class="app-brand justify-content-center">
                  <span class="app-brand-logo demo"></span>
                  <span class="app-brand-text demo text-body fw-bolder">
                    ArjasaCare
                  </span>
                </div>
                <h4 class="mb-2">Selamat datang di Arjasa Care!</h4>
                <p class="mb-4">Silahkan login terlebih dahulu</p>
                {showFeedback()}
                <form
                  id="formAuthentication"
                  class="mb-3"
                  // method="POST"
                  onSubmit={submitHandler}
                >
                  <div class="mb-3">
                    <label for="email" class="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      name="email_username"
                      placeholder="Masukkan username anda"
                      autofocus
                      ref={var_username}
                    />
                  </div>
                  <div class="mb-3 form-password-toggle">
                    <div class="d-flex justify-content-between">
                      <label class="form-label" for="password">
                        Password
                      </label>
                    </div>
                    <div class="input-group input-group-merge">
                      <input
                        type={hideBox ? "password" : "text"}
                        id="password"
                        class="form-control"
                        name="password"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        aria-describedby="password"
                        ref={var_pw}
                      />
                      <span class="input-group-text cursor-pointer">
                        <i
                          className={"bx bx-" + (hideBox ? "hide" : "show")}
                          onClick={hideBoxOnClick}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary d-grid w-100" type="submit">
                      Log-in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
