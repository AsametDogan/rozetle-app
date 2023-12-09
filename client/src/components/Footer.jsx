import { Typography } from "@material-tailwind/react";
import React from "react";
import { ImgLogo } from "../assets/images";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="flex w-full  flex-row flex-wrap items-center justify-between sm:justify-center gap-y-6 gap-x-12 border-t border-blue-gray-500 py-6 text-center md:justify-between">
      <img className="w-[300px]" src={ImgLogo} alt="logo" />
      <Typography color="blue-gray" className="font-normal">
        &copy; 2023 Rozetle
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Rozetle
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#Rozet Nedir"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Rozet Nedir?
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#Neden Rozetle"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Neden Rozetle?
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#Nasıl Kullanılır"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Nasıl Kullanılır?
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#Şimdi Rozetlemeye Başla"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Şimdi Rozetlemeye Başla
          </Typography>
        </li>
        <li>
          <Typography
            onClick={() => navigate("/privacy-policy")}
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 cursor-pointer"
          >
            KVKK
          </Typography>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
