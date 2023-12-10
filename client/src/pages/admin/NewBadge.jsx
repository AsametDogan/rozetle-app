import {
  Checkbox,
  Input,
  Option,
  Select,
  Typography,
  badge,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../services/categoryService.ts";
import { IconAdd, IconAddlist } from "../../assets/images/index.js";
import { createBadge } from "../../services/badgeService.ts";
import { ToastContainer, toast } from "react-toastify";
import { getAllUsers } from "../../services/authService.ts";
const NewBadge = () => {
  const [badgeData, setBadgeData] = useState({
    title: "",
    categoryId: "",
    totalCount: 0,
    price: 0,
    attainerRoles: [],
    badgeImg: null,
  });
  const [imgPreview, setImgPreview] = useState();
  const [searchUser, setSearchUser] = useState("");
  const [isUnique, setIsUnique] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBadgeData({ ...badgeData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBadgeData({ ...badgeData, badgeImg: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImgPreview(null);
    }
  };

  const [categories, setCategories] = useState();
  async function fetchCategories() {
    const response = await getAllCategory();
    if (response) {
      setCategories(response.data);
    }
  }
  const [users, setUsers] = useState();

  async function fetchUsers() {
    const response = await getAllUsers();
    if (response) {
      setUsers(response);
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
      const formData = new FormData();
      formData.append("badgeImg", badgeData.badgeImg);
      formData.append("title", badgeData.title);
      formData.append("categoryId", badgeData.categoryId);
      formData.append("totalCount", badgeData.totalCount);
      formData.append("price", badgeData.price);
      formData.append("attainerRoles", badgeData.attainerRoles);
      console.log(formData.get("title"));
      const response = await createBadge(formData);
      console.log(response);
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
    if (badgeData?.attainerRoles?.includes(e.target.value)) {
      setBadgeData({
        ...badgeData,
        attainerRoles: badgeData?.attainerRoles?.filter(
          (r) => r !== e.target.value
        ),
      });
    } else {
      setBadgeData({
        ...badgeData,
        attainerRoles: [...badgeData.attainerRoles, e.target.value], //fvgggggggggggggggg
      });
    }
  };
  // console.log(users);
  const filteredData = users?.filter((item) => {
    if (!users) {
      return [];
    }
    return (
      item?.name.toLowerCase().includes(searchUser?.toLowerCase()) ||
      item?.surname.toLowerCase().includes(searchUser?.toLowerCase()) ||
      item?.nickName.toLowerCase().includes(searchUser?.toLowerCase()) ||
      item?.phone.replace(/\s/g, "").includes(searchUser?.replace(/\s/g, ""))
    );
  });
  console.log(badgeData);
  return (
    <div className="flex flex-col h-full w-full gap-5 justify-center  items-center overflow-y-scroll scrollbar-hide">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg flex flex-row justify-center gap-5"
      >
        {isUnique ? (
          <div className="border-r-2 bg-gray-200 p-4 rounded-l-lg border-gray-500 px-5 flex flex-col gap-5 ">
            <Typography
              color="blue-gray"
              className="font-semibold border-b border-gray-600"
            >
              Yetkili Kullanıcılar
            </Typography>
            <div className="flex flex-col items-center  gap-3 overflow-y-scroll scrollbar-hide h-[500px] bg-white p-3 rounded-lg">
              {badgeData.attainerRoles.length > 0 ? (
                users.map((user, index) => {
                  if (badgeData.attainerRoles.includes(user._id)) {
                    return (
                      <div
                        key={index}
                        className="px-2.5 py-1 bg-green-200 rounded-lg	 "
                      >
                        <Typography color="blue-gray" className="font-medium">
                          {user.name + " " + user.surname}
                        </Typography>
                      </div>
                    );
                  }
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col  gap-5 p-2 ">
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
            <input
              type="file"
              name="badgeImg"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 p-2 bg-gray-400 rounded-md"
            />
            <label className="text-xs text-gray-600">
              {" "}
              Seçilen resimlerin 1:1 olduğundan emin olun
            </label>
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
          <div className="flex items-center">
            <div className="w-80">
              <Select
                size="lg"
                label="Kategori seç"
                name="categoryId"
                required
                onChange={(selectedCategoryId) =>
                  setBadgeData({ ...badgeData, categoryId: selectedCategoryId })
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
              value={badgeData?.totalCount}
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
              checked={badgeData?.attainerRoles?.includes("0")}
              onChange={handleCheckBox}
              className="text-sm h-4  w-4"
              label="Kullanıcı"
            />
            <Checkbox
              value={1}
              checked={badgeData?.attainerRoles?.includes("1")}
              onChange={handleCheckBox}
              className="text-sm h-4  w-4"
              label="Kurum"
            />
            <Checkbox
              value={2}
              checked={badgeData?.attainerRoles?.includes("2")}
              onChange={handleCheckBox}
              className="text-sm h-4  w-4"
              label="Yetkinlik"
            />
          </div>
          <div className="h-1 border-t border-gray-600"></div>
          <Checkbox
            value={isUnique}
            checked={isUnique}
            onChange={async () => {
              setIsUnique(!isUnique);
              if (isUnique) {
                setBadgeData({
                  ...badgeData,
                  attainerRoles: [],
                });
              }
              await fetchUsers();
            }}
            className="text-sm h-4  w-4"
            label="Yetkili Seç"
          />
          <p className="text-xs  text-gray-500 -translate-y-5">
            * Gönderebilme yetkisi belirlemek için işaretleyin
          </p>
          <button
            className="border-2 border-gray-500 rounded-lg px-2.5 py-1 hover:text-gray-800 font-semibold bg-orange-600 text-white hover:bg-orange-200 transition-all duration-300"
            type="submit"
          >
            Oluştur
          </button>
        </div>
        {isUnique ? (
          <div className="border-l-2 bg-gray-200 p-4 rounded-r-lg border-gray-500 px-5 flex flex-col gap-5 ">
            <Input
              value={searchUser}
              label="Kişi ekle"
              onChange={(e) => {
                setSearchUser(e.target.value);
              }}
              type="search"
              className="bg-white"
            />
            <div className="flex flex-col gap-3 overflow-y-scroll h-[500px] bg-white p-2 rounded-lg ">
              {filteredData && filteredData?.length !== 0 ? (
                filteredData?.map((user, index) => (
                  <Checkbox
                    key={index}
                    checked={badgeData?.attainerRoles?.includes(user._id)}
                    onChange={() => {
                      if (badgeData?.attainerRoles?.includes(user._id)) {
                        setBadgeData({
                          ...badgeData,
                          attainerRoles: badgeData?.attainerRoles?.filter(
                            (data) => data !== user._id
                          ),
                        });
                      } else {
                        setBadgeData({
                          ...badgeData,
                          attainerRoles: [...badgeData.attainerRoles, user._id],
                        });
                      }
                    }}
                    label={
                      <div>
                        <Typography color="blue-gray" className="font-medium">
                          {user.name + " " + user.surname}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          <span>{user.email[0] || ""}</span>
                          <br />
                          <span>{user.phone || ""}</span>
                          <br />
                          <span>
                            <b>Tip:</b>
                            {user.role === 0
                              ? "Kullanıcı"
                              : user.role === 1
                              ? "Kurum"
                              : "Admin"}
                          </span>
                        </Typography>
                      </div>
                    }
                    containerProps={{
                      className: "-mt-5",
                    }}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewBadge;
