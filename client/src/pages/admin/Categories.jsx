import React, { useEffect, useState } from "react";
import { Loading, NewCategory } from "../../components";
import { IconAccept, IconAdd, IconEdit } from "../../assets/images";
import {
  getAllCategory,
  updateCategory,
} from "../../services/categoryService.ts";
import { Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";

const Categories = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [edit, setEdit] = useState();

  async function fetchCategories() {
    try {
      setLoading(true);
      const response = await getAllCategory();
      if (response) {
        setCategories(response.data);
        //toast.success("Kategoriler getirildi");
      } else {
        toast.error("Kategoriler getirilemedi");
      }
    } catch (error) {
      toast.error("Kategoriler getirilemedi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenDialog = async () => {
    setOpenDialog(!openDialog);
    const result = await fetchCategories();
  };

  const handleUpdate = async (_id) => {
    const result = await updateCategory({ categoryId: _id, title: newTitle });
    if (result) {
      toast.success(`${newTitle} başarıyla güncellendi`);
      setNewTitle("");
      setEdit("");
      await fetchCategories();
    } else {
      toast.error(`Güncelleme başarısız`);
      setEdit("");
    }
  };

  return (
    <div className="flex flex-col h-full w-full gap-5 justify-center  items-center overflow-y-scroll scrollbar-hide ">
      <div className="bg-white p-8 rounded-lg flex flex-col items-center gap-5 ">
        <button
          onClick={() => {
            setOpenDialog(true);
          }}
          className="px-3 py-1.5 rounded-lg bg-rzt_green_dull font-semibold text-white hover:bg-rzt_green transition-all hover:scale-[102%] shadow-lg flex items-center gap-3 "
        >
          Yeni kategori ekle
          <img className="h-6 w-6 p-0.5" src={IconAdd} />
        </button>
        <NewCategory handleOpen={handleOpenDialog} open={openDialog} />
        <div className="max-h-[600px] overflow-y-scroll flex flex-col ">
          {categories ? (
            categories.map(({ _id, title }, index) => (
              <div
                key={index}
                className={`flex gap-2 items-center px-3 rounded-lg border-b border-gray-500 ${
                  edit === _id ? "bg-gray-300" : ""
                }`}
              >
                <Input
                  disabled={edit !== _id}
                  variant="static"
                  value={edit !== _id ? title : newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`!bg-white  ${
                    edit === _id ? "!bg-gray-300" : ""
                  } `}
                />
                <button
                  className={`p-1 rounded-lg hover:bg-green-100 transition-all  ${
                    edit !== _id ? "flex" : "hidden"
                  }`}
                  onClick={() => {
                    setNewTitle(title);
                    setEdit(_id);
                  }}
                >
                  <img className="h-5 w-6" src={IconEdit} alt="edit" />
                </button>
                <button
                  className={`p-1 rounded-lg hover:bg-green-100 transition-all  ${
                    edit == _id ? "flex" : "hidden"
                  }`}
                  onClick={() => {
                    handleUpdate(_id);
                  }}
                >
                  <img className="h-5 w-6" src={IconAccept} alt="edit" />
                </button>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <ToastContainer autoClose={2500} />
      {loading ? <Loading /> : <></>}
    </div>
  );
};

export default Categories;
