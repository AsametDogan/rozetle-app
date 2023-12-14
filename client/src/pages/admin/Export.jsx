import React, { useState } from "react";
import { IconDownloadXls } from "../../assets/images";
import {
  exportAssignments,
  exportBadges,
  exportCategories,
  exportUsers,
} from "../../services/adminService.ts";
import { toast } from "react-toastify";
import Loading from "../../components/Loading.jsx";

const Export = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-wrap justify-center py-6 gap-6 h-[90vh] overflow-y-scroll ">
      <button
        onClick={async () => {
          try {
            setLoading(true);
            await exportUsers();
            toast.success("Dosya indirildi");
          } catch (error) {
            toast.error("Bir hata oluştu");
            console.log({ exportUserError: error });
          } finally {
            setLoading(false);
          }
        }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:scale-[101%] hover:shadow-lg gap-4 transition-all w-56 h-56"
      >
        <label className="text-lg font-semibold">Kullanıcılar</label>
        <p>Tüm kullanıcıların listesini indir</p>
        <img src={IconDownloadXls} alt="download" className="h-16" />
      </button>
      <button
        onClick={async () => {
          try {
            setLoading(true);
            await exportBadges();
            toast.success("Dosya indirildi");
          } catch (error) {
            toast.error("Bir hata oluştu");
            console.log({ exportUserError: error });
          } finally {
            setLoading(false);
          }
        }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:scale-[101%] hover:shadow-lg gap-4 transition-all w-56 h-56"
      >
        <label className="text-lg font-semibold">Rozetler</label>
        <p>Tüm rozetlerin listesini indir</p>
        <img src={IconDownloadXls} alt="download" className="h-16" />
      </button>
      <button
        onClick={async () => {
          try {
            setLoading(true);
            await exportCategories();
            toast.success("Dosya indirildi");
          } catch (error) {
            toast.error("Bir hata oluştu");
            console.log({ exportUserError: error });
          } finally {
            setLoading(false);
          }
        }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:scale-[101%] hover:shadow-lg gap-4 transition-all w-56 h-56"
      >
        <label className="text-lg font-semibold">Kategoriler</label>
        <p>Tüm kategorilerin listesini indir</p>
        <img src={IconDownloadXls} alt="download" className="h-16" />
      </button>
      <button
        onClick={async () => {
          try {
            setLoading(true);
            await exportAssignments();
            toast.success("Dosya indirildi");
          } catch (error) {
            toast.error("Bir hata oluştu");
            console.log({ exportUserError: error });
          } finally {
            setLoading(false);
          }
        }}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:scale-[101%] hover:shadow-lg gap-4 transition-all w-56 h-56"
      >
        <label className="text-lg font-semibold">Atamalar</label>
        <p>Tüm atamaların listesini indir</p>
        <img src={IconDownloadXls} alt="download" className="h-16" />
      </button>
      {loading ? <Loading /> : <></>}
    </div>
  );
};

export default Export;
