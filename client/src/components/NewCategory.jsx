import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { createCategory } from "../services/categoryService.ts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewCategory = ({ open, handleOpen }) => {
  const [title, setTitle] = useState("");

  const handleClickAdd = async () => {
    const response = await createCategory(title);
    if (response) {
      toast.success("Başarıyla Eklendi");
    } else {
      toast.error("Başarısız");
    }

    setTimeout(() => {
      setTitle("");
      handleOpen();
    }, 3000);
  };
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="max-w-[500px] "
    >
      <DialogHeader>Kategori Ekleme</DialogHeader>
      <DialogBody>
        <Input
          variant="outlined"
          label="Kategori Adı"
          color="deep-purple"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Vazgeç</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleClickAdd}>
          <span>Ekle</span>
        </Button>
      </DialogFooter>
      <ToastContainer autoClose={3000} />
    </Dialog>
  );
};

export default NewCategory;
