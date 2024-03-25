import React from "react";
import { IoLanguage } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdConstruction, MdOutlineImageSearch } from "react-icons/md";
import { BsFiletypePdf } from "react-icons/bs";

export const SidebarData = [
  {
    title: "Translater",
    path: "/home",
    icon: <IoLanguage />,
    cName: "nav-text",
  },
  // {
  //   title: "Pdf Translation",
  //   path: "/pdf-Translation",
  //   icon: <BsFiletypePdf />,
  //   cName: "nav-text",
  // },
  {
    title: "Image to Text Translation",
    path: "/imageRecognition",
    icon: <MdOutlineImageSearch />,
    cName: "nav-text",
  },
  {
    title: "Voice To Text",
    path: "/voicetotexttage",
    icon: <MdConstruction />,
    cName: "nav-text",
  },
  {
    title: "Community",
    path: "/allpost",
    icon: <MdConstruction />,
    cName: "nav-text",
  },
  // {
  //   title: "My History",
  //   path: "/translatorhistory",
  //   icon: <FaHistory />,
  //   cName: "nav-text",
  // },
];

