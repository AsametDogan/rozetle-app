import React from "react";
import { GifProcessing } from "../assets/gifs";

const RepairPage = () => {
  return (
    <div className="flex flex-col gap-8 items-center p-10 sm:p-5">
      <p className="text-3xl font-bold">Tadilattayız</p>
      <img className="max-w-[600px] w-[90%]" src={GifProcessing} alt="tadilat" />
    </div>
  );
};

export default RepairPage;
