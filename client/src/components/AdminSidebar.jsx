import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  IconAdd,
  IconAddBadge,
  IconAddlist,
  IconAssignList,
  IconExport,
  IconList,
  ImgLogo,
} from "../assets/images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../stores/Page";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page.current);

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography
          className="border-b border-gray-400"
          variant="h5"
          color="blue-gray"
        >
          <img src={ImgLogo} alt="app logo" />
        </Typography>
      </div>
      <List>
        <button
          onClick={() => {
            navigate("/admin/badges");
            dispatch(setPage("badges"));
          }}
          className={`${
            page === "badges" ? "bg-orange-400" : ""
          } shadow-lg hover:bg-orange-300 px-3 py-2 rounded-lg  text-black`}
        >
          <div className="flex gap-3 items-center ">
            <img src={IconList} alt="test" className="h-5 w-5 rounded" />
            Tüm Rozetler
          </div>
        </button>

        <button
          onClick={() => {
            navigate("/admin/new-badge");
            dispatch(setPage("new-badge"));
          }}
          className={`${
            page === "new-badge" ? "bg-orange-400" : ""
          } shadow-lg hover:bg-orange-300 px-3 py-2 rounded-lg  text-black`}
        >
          <div className="flex gap-3 items-center ">
            <img src={IconAddBadge} alt="test" className="h-5 w-5 rounded" />
            Yeni Rozet Ekle
          </div>
        </button>
        <button
          onClick={() => {
            navigate("/admin/categories");
            dispatch(setPage("categories"));
          }}
          className={`${
            page === "categories" ? "bg-orange-400" : ""
          } shadow-lg hover:bg-orange-300 px-3 py-2 rounded-lg  text-black`}
        >
          <div className="flex gap-3 items-center ">
            <img src={IconAddlist} alt="test" className="h-5 w-5 rounded" />
            Kategoriler
          </div>
        </button>
        <button
          onClick={() => {
            navigate("/admin/assignments");
            dispatch(setPage("assignments"));
          }}
          className={`${
            page === "assignments" ? "bg-orange-400" : ""
          } shadow-lg hover:bg-orange-300 px-3 py-2 rounded-lg  text-black`}
        >
          <div className="flex gap-3 items-center ">
            <img src={IconAssignList} alt="test" className="h-5 w-5 rounded" />
            Kullanıcı bilgileri
          </div>
        </button>
        <button
          onClick={() => {
            navigate("/admin/new-assign");
            dispatch(setPage("new-assign"));
          }}
          className={`${
            page === "new-assign" ? "bg-orange-400" : ""
          } shadow-lg hover:bg-orange-300 px-3 py-2 rounded-lg  text-black`}
        >
          <div className="flex gap-3 items-center ">
            <img src={IconAdd} alt="test" className="h-5 w-5 rounded" />
            Yeni Atama
          </div>
        </button>
        <button
          onClick={() => {
            navigate("/admin/export");
            dispatch(setPage("export"));
          }}
          className={`${
            page === "export" ? "bg-orange-400" : ""
          } shadow-lg hover:bg-orange-300 px-3 py-2 rounded-lg  text-black`}
        >
          <div className="flex gap-3 items-center ">
            <img src={IconExport} alt="test" className="h-5 w-5 rounded" />
            Excell Dışa Aktarım
          </div>
        </button>
      </List>
    </Card>
  );
};

export default AdminSidebar;
