import { Input, Radio, Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAllBadges } from "../../services/badgeService.ts";
const NewAssign = () => {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState([]);
  const [allBadges, setAllBadges] = useState();
  const [selectedBadge, setSelectedBadge] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const text = e.target.value.toLowerCase();
    setInputText(text);

    const linesArray = text.split("\n").filter((line) => line.trim() !== "");
    setList(linesArray);
  };
  async function fetchBadges() {
    const response = await getAllBadges();
    if (response) {
      setAllBadges(response.data);
    } else {
      toast.error("Rozetle Getirilemedi");
    }
  }
  useEffect(() => {
    fetchBadges();
  }, []);

  const handleSelectRadio = (e) => {
    setSelectedBadge(e.target.value);
  };
  console.log(selectedBadge);
  const filteredData = allBadges?.filter((item) => {
    if (!allBadges) {
      return [];
    }
    return (
      item?._doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?._doc.categoryId.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div className="flex flex-col items-center py-6">
      <div className="bg-white p-8 rounded-lg flex flex-col gap-5 items-center">
        <div className="!w-[500px]">
          <Textarea
            size="lg"
            className="w-[500px]"
            value={inputText}
            onChange={handleInputChange}
            variant="outlined"
            label="Mail Listesi"
          />
          <label className="text-gray-700 text-xs">
            *Her satır yeni bir mail
          </label>
        </div>
        <div className="flex flex-col gap-2 items-center">
          {" "}
          <div className="w-[300px]">
            <Input
              type="search"
              className=" w-[300px]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-[400px] flex flex-col gap-4 max-h-[500px] overflow-y-scroll p-4 rounded-lg">
            {allBadges?.length > 0 ? (
              filteredData.map(({ _doc }, index) => (
                <Radio
                  onChange={handleSelectRadio}
                  value={_doc?._id}
                  key={index}
                  name="description"
                  color="cyan"
                  className="hover:bg-gray-300"
                  label={
                    <div className="!w-full py-4 ">
                      <p className="font-semibold text-gray-800">
                        {_doc?.title}
                      </p>
                      <p>{_doc?.categoryId?.title}</p>
                      <div>
                        <b className="font-semibold text-gray-800">
                          Kalan Stok{" "}
                        </b>
                        {_doc?.restCount === -999
                          ? "Sınırsız"
                          : _doc?.restCount}
                      </div>
                    </div>
                  }
                  containerProps={{
                    className: "-mt-5",
                  }}
                />
              ))
            ) : (
              <>Rozetler Bulunamadı</>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewAssign;
