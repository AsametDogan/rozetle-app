import {
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createBadge, updateBadge } from "../services/badgeService.ts";
import { getAllCategory } from "../services/categoryService.ts";

const UpdateBadge = ({ open, badge, setOpen }) => {
  const [badgeData, setBadgeData] = useState({
    title: badge?.title,
    categoryId: badge?.categoryId,
    totalCount: badge?.totalCount,
    price: badge?.price,
    attainerRoles: badge?.attainerRoles,
    badgeImg: badge?.badgeImg,
    restCount: badge?.restCount,
  });
  const [imgPreview, setImgPreview] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBadgeData({ ...badgeData, [name]: value });
  };

  const [categories, setCategories] = useState();
  async function fetchCategories() {
    const response = await getAllCategory();
    if (response) {
      setCategories(response.data);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      badgeData.attainerRoles &&
      badgeData.categoryId &&
      badgeData.badgeImg &&
      badgeData.price !== null &&
      badgeData.title &&
      badgeData.totalCount !== null
    ) {
      console.log(badge?._id);
      const response = await updateBadge(badge?._id);
      if (response) {
        toast.success("Başarılı");
        setBadgeData({
          title: "",
          categoryId: "",
          totalCount: 0,
          price: 0,
          attainerRoles: "",
          badgeImg: null,
        });
      } else {
        toast.error("Bir hata oluştu formdata");
      }
    } else {
      toast.error("Tüm Alanları Doldurunuz");
    }
  };
  const handleCheckBox = (e) => {
    if (badgeData?.attainerRoles?.includes(Number(e.target.value))) {
      setBadgeData({
        ...badgeData,
        attainerRoles: badgeData?.attainerRoles?.filter(
          (r) => r != Number(e.target.value)
        ),
      });
    } else {
      setBadgeData({
        ...badgeData,
        attainerRoles: [...badgeData.attainerRoles, Number(e.target.value)], //fvgggggggggggggggg
      });
    }
  };
  console.log(badgeData);
  return (
    <Dialog open={open} handler={setOpen}>
      <DialogHeader>Its a simple dialog.</DialogHeader>
      <DialogBody>
        <div className="flex flex-col h-full w-full gap-5 justify-center  items-center overflow-y-scroll scrollbar-hide">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg flex flex-col items-center gap-5"
          >
            <div className="mb-4 flex flex-col gap-2 items-center">
              {imgPreview && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Image Preview
                  </label>
                  <img
                    src={imgPreview}
                    alt="Preview"
                    className="h-32 w-32 object-contain rounded-md shadow-lg ring-2 ring-blue-gray-400 flex items-center justify-center"
                  />
                </div>
              )}
            </div>
            <Input
              variant="outlined"
              label="Rozet Başlığı"
              required
              name="title"
              color="deep-purple"
              type="text"
              value={badgeData?.title}
              onChange={handleInputChange}
              // onChange={(e) =>
              //  setBadgeData({ ...badgeData, title: e.target.value })
              //}
            />
            <div className="flex flex-col items-center">
              {badge?.categoryId?.title}
              <div className="w-80">
                <Select
                  size="lg"
                  label="Yeni Kategori"
                  name="categoryId"
                  required
                  onChange={(selectedCategoryId) =>
                    setBadgeData({
                      ...badgeData,
                      categoryId: selectedCategoryId,
                    })
                  }
                  selected={(element) =>
                    element &&
                    React.cloneElement(element, {
                      disabled: true,
                      className:
                        "flex items-center opacity-100 px-0 gap-2 pointer-events-none ",
                    })
                  }
                >
                  {categories ? (
                    categories.map(({ title, _id }) => (
                      <Option
                        key={title}
                        value={_id}
                        className="flex items-center gap-2"
                      >
                        {title}
                      </Option>
                    ))
                  ) : (
                    <></>
                  )}
                </Select>
              </div>
            </div>
            <div className="flex w-full flex-col gap-1">
              <Input
                variant="outlined"
                label="Total Adet"
                name="totalCount"
                required
                color="deep-purple"
                type="number"
                disabled={badgeData?.totalCount === "-999"}
                value={Number(badgeData?.totalCount)}
                onChange={handleInputChange}
                //onChange={(e) => {
                //   setBadgeData({ ...badgeData, totalCount: e.target.value });
                //   }}
              />
              <Checkbox
                checked={badgeData?.totalCount === "-999"}
                onChange={() => {
                  if (badgeData?.totalCount !== "-999") {
                    setBadgeData({ ...badgeData, totalCount: "-999" });
                  } else {
                    setBadgeData({ ...badgeData, totalCount: "0" });
                  }
                }}
                className="text-sm h-4  w-4"
                label="Sınırsız"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Input
                  variant="outlined"
                  label="Ücret"
                  color="deep-purple"
                  required
                  type="number"
                  value={badgeData?.price}
                  onChange={(e) => {
                    if ((e.target.value < 0) & (e.target.value != -999)) {
                      setBadgeData({ ...badgeData, price: 0 });
                    } else {
                      setBadgeData({ ...badgeData, price: e.target.value });
                    }
                  }}
                />
                <p>TL</p>
              </div>
              <p className="text-gray-600 text-xs px-2">
                Ücretsiz gönderim için 0 giriniz
              </p>
            </div>
            <div>
              {" "}
              <Checkbox
                value={0}
                checked={badgeData?.attainerRoles?.includes(0)}
                onChange={handleCheckBox}
                className="text-sm h-4  w-4"
                label="Kullanıcı"
              />
              <Checkbox
                value={1}
                checked={badgeData?.attainerRoles?.includes(1)}
                onChange={handleCheckBox}
                className="text-sm h-4  w-4"
                label="Kurum"
              />
              <Checkbox
                value={2}
                checked={badgeData?.attainerRoles?.includes(2)}
                onChange={handleCheckBox}
                className="text-sm h-4  w-4"
                label="Yetkinlik"
              />
            </div>
          </form>
          <ToastContainer />
        </div>
      </DialogBody>
      <DialogFooter>
        <div className="flex gap-3 p-2">
          <button
            onClick={setOpen}
            className="bg-red-100 px-3 py-1 rounded-lg border border-white hover:bg-white hover:border-red-500 transition-all hover:scale-[103%]"
          >
            <span className="text-red-600">Vazgeç</span>
          </button>
          <button
            className=" px-3 py-1 rounded-lg border border-white hover:bg-green-300 group hover:border-green-500 transition-all hover:scale-[103%]"
            onClick={handleSubmit}
          >
            <span className="text-green-800 font-semibold group-hover:text-white">
              Güncelle
            </span>
          </button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateBadge;
