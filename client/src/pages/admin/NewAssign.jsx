import { Button, Input, Radio, Textarea } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllBadges,
  getAvailableBadges,
} from "../../services/badgeService.ts";
import { sendBadges } from "../../services/adminService.ts";
import Loading from "../../components/Loading.jsx";
const NewAssign = () => {
  const [inputText, setInputText] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBadge, setSelectedBadge] = useState();
  const [list, setList] = useState([]);
  const [allBadges, setAllBadges] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");

  const handleInputChange = (e) => {
    const text = e.target.value.toLowerCase();
    setInputText(text);
    const linesArray = text.split("\n").filter((line) => line.trim() !== "");
    setList(linesArray);
  };
  async function fetchBadges() {
    try {
      setLoadingLabel("Rozetler Getiriliyor...");
      setLoading(true);
      const response = await getAvailableBadges();
      if (response) {
        setAllBadges(response.data);
      } else {
        toast.error("Rozetler Getirilemedi");
      }
    } catch (error) {
      toast.error("Rozetler Getirilemedi");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchBadges();
  }, []);

  const handleSelectRadio = (e) => {
    setSelectedBadge(e.target.value);
  };
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
  console.log(selectedBadge);
  console.log(list);

  return (
    <div className="flex flex-col items-center py-6">
      <div className="bg-white p-8 rounded-lg flex divide-x-2  gap-5 items-center">
        <div className="flex flex-col gap-10 items-center">
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
            <br />
            <p className="text-sm">
              {"Gönderilecek rozet sayısı:" + list.length}
            </p>
          </div>
          <Textarea
            size="md"
            className="w-[500px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            label="Açıklama"
          />
          <Button
            onClick={async () => {
              try {
                setLoadingLabel("Rozetleniyor...");
                setLoading(true);
                await sendBadges({
                  badgeId: selectedBadge,
                  description: description,
                  receiversData: list,
                }).then((res) => {
                  if (res === 200) {
                    toast.success("Rozet Gönderme işlemi başarılı");
                    setDescription("");
                    setInputText("");
                    setList([]);
                  } else {
                    toast.error("Bir hata oluştu");
                  }
                });
              } catch (error) {
                toast.error("Bir hata oluştu");
              } finally {
                setLoading(false);
              }
            }}
            className="px-3 py-2 bg-teal-800 text-white hover:bg-teal-500 hover:shadow-lg transition-all rounded-lg"
          >
            GÖNDER
          </Button>
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
      {loading ? <Loading label={loadingLabel} /> : <></>}
      <ToastContainer />
    </div>
  );
};

export default NewAssign;
