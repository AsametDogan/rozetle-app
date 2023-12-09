import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { IconHidePass, IconViewPass } from "../../assets/images";
import { getMyInfo, login } from "../../services/authService.ts";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const handleChangeVisible = () => {
    setVisible(!visible);
  };
  const notify = () => toast.error("Giriş Yapılamadı !");

  const handleLogin = async () => {
    let result;
    result = await login(data.email, data.password);

    if (result) {
      navigate("/admin/badges");
    } else {
      notify();
    }
  };

  useEffect(() => {
    async function fetchInfo() {
      const response = await getMyInfo();
      return response;
    }

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetchInfo().then((a) => {
        if (a.success) {
          window.location.href = "/admin/badges";
        } else {
        }
      });
    }
  }, []);

  return (
    <div
      className={
        "flex justify-center items-center w-screen h-screen bg-rzt_bg text-sm"
      }
    >
      <div className="max-w-[780px] w-full sm:h-full justify-center bg-gradient-to-r from-rzt_blue to-rzt_purple border  px-5 pb-5  rounded-lg shadow-md flex flex-col  items-center">
        <p
          className={
            "font-bold text-2xl sm:text-xl text-white bg-rzt_blue_dark sm:bg-white sm:text-black    px-8 py-2 rounded-t-xl -translate-y-5 "
          }
        >
          Giriş Yap
        </p>

        <div className="flex flex-col gap-7 my-4">
          <div className="flex items-center relative z-0 rounded-br-xl rounded-tl-xl bg-gray-100 px-2  group">
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              className="block py-2.5 px-1 w-64 text-sm outline-none text-gray-700 bg-transparent appearance-none peer"
              placeholder=" "
              required
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute translate-x-2 text-sm text-white duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:translate-y-0 peer-focus:scale-[85%] peer-focus:-translate-y-[26px]"
            >
              E Posta
            </label>
          </div>
          <div className="flex items-center relative z-0 rounded-br-xl rounded-tl-xl bg-gray-100 px-2  group">
            <input
              type={visible ? "text" : "password"}
              name="password"
              id="password"
              value={data.password}
              className="block py-2.5 px-1 w-64 text-sm outline-none text-gray-700 bg-transparent appearance-none peer"
              placeholder=" "
              required
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute translate-x-2 text-sm text-white duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:translate-y-0 peer-focus:scale-[85%] peer-focus:-translate-y-[26px]"
            >
              Şifre
            </label>
            <button onClick={handleChangeVisible}>
              <img
                className="w-5 h-5 outline-none"
                src={visible ? IconHidePass : IconViewPass}
                alt="hide view"
              />
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className={
                "bg-rzt_bg hover:bg-rzt_gray_dark transition-all px-4 font-semibold text-base  py-1.5 rounded-lg  "
              }
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
