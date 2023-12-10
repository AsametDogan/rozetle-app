import React from "react";
import { IconDownloadXls } from "../../assets/images";
import {
  exportAssignments,
  exportBadges,
  exportCategories,
  exportUsers,
} from "../../services/adminService.ts";

const Export = () => {
  return (
    <div className="flex flex-wrap justify-center py-6 gap-6 h-[90vh] overflow-y-scroll ">
      <button
        onClick={async () => {
          await exportUsers();
        }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:scale-[101%] hover:shadow-lg gap-4 transition-all w-56 h-56"
      >
        <label className="text-lg font-semibold">Kullanıcılar</label>
        <p>Tüm kullanıcıların listesini indir</p>
        <img src={IconDownloadXls} alt="download" className="h-16" />
      </button>
      <button
        onClick={async () => {
          await exportBadges();
        }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:scale-[101%] hover:shadow-lg gap-4 transition-all w-56 h-56"
      >
        <label className="text-lg font-semibold">Rozetler</label>
        <p>Tüm rozetlerin listesini indir</p>
        <img src={IconDownloadXls} alt="download" className="h-16" />
      </button>
      <button
        onClick={async () => {
          await exportCategories();
        }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:scale-[101%] hover:shadow-lg gap-4 transition-all w-56 h-56"
      >
        <label className="text-lg font-semibold">Kategoriler</label>
        <p>Tüm kategorilerin listesini indir</p>
        <img src={IconDownloadXls} alt="download" className="h-16" />
      </button>
      <button
        onClick={async () => {
          await exportAssignments();
        }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:scale-[101%] hover:shadow-lg gap-4 transition-all w-56 h-56"
      >
        <label className="text-lg font-semibold">Atamalar</label>
        <p>Tüm atamaların listesini indir</p>
        <img src={IconDownloadXls} alt="download" className="h-16" />
      </button>
    </div>
  );
};

export default Export;
