import React from "react";
import { GifError404 } from "../assets/gifs";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-8 items-center p-10 sm:p-5">
      <p className="text-3xl font-bold">Bulunamadı</p>
      <img className="max-w-[600px] w-[90%]" src={GifError404} alt="404" />
      <p className="text-xl font-semibold">Linki kontrol edip tekrar deneyiniz</p>
    </div>
  );
};

export default NotFound;
