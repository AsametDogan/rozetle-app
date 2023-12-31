import React, { useEffect, useState } from "react";
import { BadgeCard, Loading, UpdateBadge } from "../../components";
import { getAllBadges } from "../../services/badgeService.ts";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "@material-tailwind/react";

const Badges = () => {
  const [allBadges, setAllBadges] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchBadges() {
    try {
      setLoading(true);
      const response = await getAllBadges();
      if (response) {
        setAllBadges(response.data);
      } else {
        toast.error("Rozetle Getirilemedi");
      }
    } catch (error) {
      toast.error("Rozetle Getirilemedi");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchBadges();
  }, []);
  const filteredData = allBadges?.filter((item) => {
    if (!allBadges) {
      return [];
    }
    return item?._doc?.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div className="flex flex-col h-full w-full gap-5  items-center overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-5">
          <label>Ara </label>
          <input
            className="outline-none px-2.5 py-0.5 rounded-lg"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {`Toplam ${allBadges?.length || ""} kayıtlı Rozet`}
      </div>

      {filteredData ? (
        filteredData.map((badge, index) => (
          <BadgeCard fetchBadges={fetchBadges} badge={badge} key={index} />
        ))
      ) : (
        <></>
      )}
      <ToastContainer />
      {loading ? <Loading /> : <></>}
    </div>
  );
};

export default Badges;
