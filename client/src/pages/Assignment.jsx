import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GifGetBadge } from "../assets/gifs/celebrate";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { getAssign } from "../services/assignService.ts";
import { ImgAppstore, ImgLogo, ImgPlaystore } from "../assets/images";

const Assignment = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleOpenDetail = () => setOpenDetail(!openDetail);

  const [openAccordion, setOpenAccordion] = useState(1);
  const handleOpenAccordion = (value) =>
    setOpenAccordion(openAccordion === value ? 0 : value);

  const getRandomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [assign, setAssign] = useState();

  async function fetchAssign() {
    const response = await getAssign(id);

    if (response) {
      setAssign(response.data.data);
    } else {
      navigate("/not-found");
    }
  }
  useEffect(() => {
    fetchAssign();
  }, []);
  console.log(assign);
  const handleClickHome = () => {
    window.location.href = "https://www.rozetle.com";
  };

  return (
    <div className="w-screen h-screen items-center justify-center flex bg-rzt_bg overflow-hidden">
      <div className="bg-white p-7 sm:px-5 down-md:h-[95%] max-h-[95%]  rounded-lg shadow max-w-[1279px] w-full flex flex-col gap-3 overflow-y-scroll scrollbar-hide ">
        <button
          onClick={handleClickHome}
          className="w-full  border-b-4 border-rzt_blue flex sm:justify-center mb-5"
        >
          <img
            src={ImgLogo}
            alt="Logo Rozetle"
            className="w-[300px] sm:w-[250px]"
          />
        </button>
        <p className="text-3xl down-md:text-2xl font-bold border-b-2">
          TEBRİKLER !!!
        </p>
        <p>Bir rozet aldınız</p>
        <p>
          {assign?.assignment?.senderId?.name +
            " " +
            assign?.assignment?.senderId?.surname || ""}{" "}
          sana <b> {assign?.assignment?.badgeId?.title} </b>
          rozetini gönderdi
        </p>
        <p className="italic">{assign?.assignment?.description}</p>
        <div className="grid grid-cols-2 down-md:grid-cols-1 gap-8 items-center justify-center">
          <div className="place-self-center max-w-[70%] md:max-w-[80%] sm:max-w-[95%] group relative flex">
            <img
              onClick={handleOpenDetail}
              src={assign?.assignment?.badgeId?.badgeImg}
              className=" shadow-xl rounded-lg  cursor-pointer"
              alt="assigned badge"
            />
            <div className="opacity-0 group-hover:opacity-80 sm:opacity-80 transition-all absolute  bottom-0 w-full bg-white p-2 text-sm justify-center flex ">
              <p className=" font-semibold">
                {
                  //rozet detayları
                }
              </p>
            </div>
          </div>
          <img
            className="md:w-[80%] sm:w-[90%] place-self-center"
            src={GifGetBadge[getRandomNum(0, 9)]}
            alt="congratulations "
          />
          <div>
            <Accordion open={openAccordion === 1}>
              <AccordionHeader onClick={() => handleOpenAccordion(1)}>
                Rozetle Nedir?
              </AccordionHeader>
              <AccordionBody>
                <p className="text-justify ">
                  Rozet, anlamı olan, sınırlı sayıda ve özel bir değere sahip
                  dijital sembollerdir. Rozetle uygulaması, kullanıcıların
                  arkadaşlarına veya iş arkadaşlarına değerli rozetler
                  göndermelerini sağlayan yenilikçi bir platformdur. Kişisel
                  anlamları, dostluğu ve deneyimi simgelerken, sosyal medya
                  hesaplarınızda da bunu duyurarak öne çıkmak için mükemmel bir
                  yol sunar.
                </p>
              </AccordionBody>
            </Accordion>
            <Accordion open={openAccordion === 2}>
              <AccordionHeader onClick={() => handleOpenAccordion(2)}>
                Rozeti Nasıl Hesabıma Alabilirim?
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col gap-5">
                  <p className="text-justify">
                    Var olan rozetle hesabınıza{" "}
                    <b className="text-rzt_blue_dark">
                      {assign?.receiver.email}{" "}
                    </b>
                    adresini ekleyerek ya da bu adres ile yeni hesap açarak
                    rozeti hemen hesabına ekleyebilir, sen de rozetler
                    göndermeye başlayabilirsin
                  </p>
                  <div className="flex flex-wrap justify-evenly gap-4">
                    {" "}
                    <button
                      onClick={() => {
                        window.open(
                          "https://play.google.com/store/apps/details?id=com.rozetle.rozetleapp&pli=1",
                          "_blank"
                        );
                      }}
                      s
                      className="hover:scale-[102%] transition-all"
                    >
                      <img
                        src={ImgPlaystore}
                        alt="play-store"
                        className="max-w-[200px]"
                      />
                    </button>
                    <button
                      onClick={() => {
                        window.open(
                          "https://apps.apple.com/tr/app/rozetle/id6471131038?l=tr",
                          "_blank"
                        );
                      }}
                      className="hover:scale-[102%] transition-all"
                    >
                      <img
                        src={ImgAppstore}
                        alt="play-store"
                        className="max-w-[200px]"
                      />
                    </button>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
