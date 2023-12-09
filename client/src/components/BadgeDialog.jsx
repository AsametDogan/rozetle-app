import React from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { IconClose } from "../assets/images";
const BadgeDialog = ({ openDetail, handleOpenDetail, badgeData }) => {
  //badgeData = {title,imgUrl,categoryId,totalCount,restCount,price}
  return (
    <Dialog
      className=" max-h-[90%] overflow-y-scroll scrollbar-hide"
      open={openDetail}
      handler={handleOpenDetail}
      size="lg"
    >
      <DialogHeader className="flex justify-between items-center">
        {badgeData.title || "Rozet Adı"}
        <button
          onClick={handleOpenDetail}
          className=" hover:bg-red-50   p-2 rounded-lg outline-none"
        >
          <img src={IconClose} alt="close" className="w-5 h-5" />
        </button>{" "}
      </DialogHeader>
      <DialogBody divider className="flex flex-col gap-10 py-8 ">
        <div className="flex down-md:flex-col gap-5">
          <img
            className="max-w-[400px] w-full rounded-lg shadow-md z-50 down-md:self-center"
            alt="badge"
            src={badgeData.imgUrl}
          />
          <div className="flex flex-col gap-2 text-gray-900">
            <p>
              <b className="font-semibold">Rozet Adı: </b>
              {badgeData.title || "Can Polat Rozeti"}
            </p>
            <p>
              <b className="font-semibold">Kategori: </b>
              {badgeData.categoryId || "Kardeşlik"}
            </p>
            <p>
              <b className="font-semibold">Rozetin Stoğu: </b>
              {badgeData.categoryId || "500"}
            </p>
            <p>
              <b className="font-semibold">Sahip Olan Kişi Sayısı: </b>
              {badgeData.categoryId || "37"}
            </p>
            <div className="h-full flex flex-col   items-center justify-center gap-3">
              <p>Bu rozeti sen de hemen göndermek ister misin?</p>
              <button className="bg-gradient-to-r from-rzt_purple_light to-rzt_blue px-3 py-1.5 rounded-lg text-white hover:from-white hover:to-white border border-rzt_purple_light hover:text-rzt_purple_light transition-all font-semibold">
                Gönder
              </button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default BadgeDialog;
