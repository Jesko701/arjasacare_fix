const ProfileKaryawan = ({ profile }) => {
  const checkKaryawan = (isKaryawan) => {
    if (isKaryawan === "false") return "Admin";
    return "Karyawan";
  };

  const statusKaryawan = checkKaryawan(profile.is_karyawan);

  return (
    <>
      <div class="card col-md-12">
        <h5 class="card-header">Informasi Akun</h5>
        <div class="card-body">
          <div class="d-flex mb-3">
            <div class="flex-grow-1 row">
              <div class="col-9 mb-sm-0 mb-2">
                <h6 class="mb-0">Nama : {`${profile.nama}`}</h6>
              </div>
            </div>
          </div>
          <div class="d-flex mb-3">
            <div class="flex-grow-1 row">
              <div class="col-9 mb-sm-0 mb-2">
                <h6 class="mb-0">Username : {`${profile.username}`}</h6>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <div class="flex-grow-1 row">
              <div class="col-9 mb-sm-0 mb-2">
                <h6 class="mb-0">Status : {`${statusKaryawan}`}</h6>
              </div>
              <div class="col-3 text-end"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileKaryawan;
