import React, { useState } from "react";
import { IconDelete, IconEdit } from "../assets/images";
import UpdateBadge from "./UpdateBadge";

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

const BadgeCard = ({ badge }) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleEdit = () => setOpenUpdate(!openUpdate);

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-[780px] flex gap-5 group hover:scale-[101%] transition-all">
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
        <div className="flex flex-col justify-center items-end gap-5">
          <button
            onClick={handleEdit}
            className="rounded-lg p-2 bg-gray-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-300  "
          >
            <img className="h-6 w-6" src={IconEdit} alt="edit" />
          </button>
          <button className="rounded-lg p-2 bg-gray-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-200">
            <img className="h-6 w-6" src={IconDelete} alt="delete" />
          </button>
        </div>
        <UpdateBadge
          badge={badge?._doc}
          open={openUpdate}
          setOpen={handleEdit}
        />
      </div>
    </div>
  );
};

export default BadgeCard;
