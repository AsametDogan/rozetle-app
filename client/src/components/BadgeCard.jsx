import React, { useState } from "react";
import { IconDelete, IconEdit } from "../assets/images";
import UpdateBadge from "./UpdateBadge";
import { changeIsActive } from "../services/adminService.ts";
import { Switch } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const convertDate = (date) => {
  const inputDate = new Date(date);
  const gun = inputDate.getDate();
  const ay = inputDate.getMonth() + 1; // Ay değeri 0-11 arasında olduğu için 1 ekleyin
  const yil = inputDate.getFullYear();
  const saat = inputDate.getHours();
  const dakika = inputDate.getMinutes();
  const formattedDate = `${gun}.${ay}.${yil} - ${saat}:${dakika}`;
  return formattedDate;
};

const BadgeCard = ({ badge, fetchBadges }) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleEdit = () => setOpenUpdate(!openUpdate);

  return (
    <div
      className={`${
        badge._doc.isActive ? "bg-white" : "bg-red-200"
      } rounded-lg shadow-lg p-5 w-[780px] flex gap-5 group hover:scale-[101%] transition-all border-2`}
    >
      <img
        src={badge?._doc?.badgeImg}
        alt="badge"
        className="max-w-[250px] rounded-lg shadow object-contain"
      />
      <div className="grid grid-cols-2 w-full ">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-xl place-self-center">
            {badge?._doc?.title}
          </p>
          <p>
            <b>Kategori:</b> {badge?._doc?.categoryId?.title}
          </p>
          <p>
            <b>Toplam:</b>{" "}
            {badge?._doc?.totalCount === -999
              ? "Sınırsız"
              : badge?._doc?.totalCount}
          </p>
          <p>
            <b>Kalan:</b>{" "}
            {badge?._doc?.restCount === -999
              ? "Sınırsız"
              : badge?._doc?.restCount}
          </p>
          <p>
            <b>Yapılan gönderme:</b> {badge?.count}
          </p>
          <p>
            <b>Ücret:</b> {badge?._doc?.price} TL
          </p>
          <p>
            <b>Roller:</b> {badge?._doc?.attainerRoles?.map((x) => x + " ")}
          </p>
          <p>
            <b>Oluşturma tarihi:</b>
            <br /> {convertDate(badge?._doc?.createdDate)}
          </p>
        </div>
        <div className="flex flex-col justify-center  items-end gap-5">
          <div className="flex flex-col justify-center  items-center gap-5">
            <button
              onClick={handleEdit}
              className="rounded-lg p-2 bg-gray-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-300  "
            >
              <img className="h-6 w-6" src={IconEdit} alt="edit" />
            </button>
            <Switch
              checked={badge._doc.isActive}
              onClick={async () => {
                const res = await changeIsActive({
                  badgeId: badge._doc._id,
                });

                if (res?.success) {
                  toast.success(
                    badge._doc.title + " Rozeti aktiflik durumu değiştirildi"
                  );
                }
                await fetchBadges();
              }}
              className="rounded-lg p-2 bg-gray-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-200"
              circleProps={{
                className: "opacity-0 group-hover:opacity-100",
              }}
            />
            <span className="opacity-0 group-hover:opacity-80">
              {badge._doc.isActive ? "Aktif" : "Pasif"}
            </span>
          </div>
          <UpdateBadge
            badge={badge?._doc}
            open={openUpdate}
            setOpen={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
