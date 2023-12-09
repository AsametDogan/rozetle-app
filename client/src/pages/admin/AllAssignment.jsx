import React, { useEffect, useState } from "react";
import { getInfo } from "../../services/assignService.ts";
import { ToastContainer, toast } from "react-toastify";
import { Radio } from "@material-tailwind/react";

const AllAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("sent");

  async function fetchAssignments() {
    const response = await getInfo();
    if (response) {
      //toast.success("Rozetlemeler getirildi");
      setAssignments(response);
    } else {
      toast.error("Rozetlemeler getirilemedi");
    }
  }
  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleRadio = (e) => {
    setSort(e.target.value);
  };
  const filteredData = assignments.filter((item) => {
   
    if (!assignments) {
      return [];
    }
    return (
      item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.nickName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.email[0].toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div className="flex overflow-y-hidden">
      <div className="flex flex-col  w-full gap-5 py-5 items-center overflow-y-scroll scrollbar-hide">
        {assignments?.length > 0 ? (
          filteredData
            .sort((a, b) =>
              sort === "sent"
                ? b.sentCount - a.sentCount
                : b.receivedCount - a.receivedCount
            )
            .map((data, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white grid grid-cols-2 gap-4 w-[75%] min-w-[550px]"
              >
                <div className="flex flex-col gap-2 text-sm">
                  <p className="">
                    <b>İsim Soyisim: </b> {data?.name + " " + data?.surname}
                  </p>
                  <p className="">
                    <b>Nickname: </b> {data?.nickName}
                  </p>
                  <p className="">
                    <b>Birincil e-posta: </b> {data?.email[0]}
                  </p>
                  <p className="">
                    <b>Telefon numarası: </b> {data?.phone}
                  </p>
                  <p className="">
                    <b>Kullanıcı Rolü: </b> {data?.role}
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  {" "}
                  <p className="">
                    <b>Gönderme sayısı: </b> {data.sentCount}
                  </p>
                  <p className="">
                    <b>Alma sayısı: </b> {data.receivedCount}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <></>
        )}
        <ToastContainer />
      </div>
      <div>
        <div>{`Toplam ${assignments?.length || ""} kayıtlı kullanıcı`}</div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded-md mb-4 max-h-10"
        />
        <label>Sıralama Azalan:</label>
        <div className="flex gap-10">
          <Radio
            onChange={handleRadio}
            value={"sent"}
            name="type"
            label="Gönderme"
            defaultChecked
          />
          <Radio
            onChange={handleRadio}
            value={"received"}
            name="type"
            label="Alma"
          />
        </div>
      </div>
    </div>
  );
};

export default AllAssignment;