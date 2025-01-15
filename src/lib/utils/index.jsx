import React, { useState } from "react";
import {
  HomeIcon,
  ClockIcon,
  UserCircleIcon,
  UserGroupIcon,
  PlusCircleIcon,
  DocumentPlusIcon
} from "@heroicons/react/24/solid";
export const navBar = [
 
  {
    link: "/login",
    nameItem: "Login",
  },
  {
    link: "/signup",
    nameItem: "SignUp",
  },
];

export const navSidebar = [
  {
    listItem: [
      {
        link: "/admin",
        nameItem: "Dashboard",
        iconItem: HomeIcon,
      },
    ],
  },
  {
    titleGroup: "Data",
    listItem: [
      {
        // link: "/Role_Lecturer-CreateGame",
        link: "/user",
        nameItem: "User",
        iconItem: UserCircleIcon,
      },
      {
        link: "/Roleadmin",
        nameItem: "Admin",
        iconItem: UserCircleIcon,
      },
      {
        link: "/level",
        nameItem: "Level",
        iconItem: DocumentPlusIcon,
      },
      {
        link: "/skill",
        nameItem: "Skill",
        iconItem: DocumentPlusIcon,
      },
      {
        link: "/profileadmin",
        nameItem: "profileadmin",
        iconItem: DocumentPlusIcon,
      },
      {
        link: "/part",
        nameItem: "Part",
        iconItem: DocumentPlusIcon,
      },
      {
        link: "/topic",
        nameItem: "Topic",
        iconItem: DocumentPlusIcon,
      },
      {
        link: "/question",
        nameItem: "Question",
        iconItem: DocumentPlusIcon,
      },
      {
        link: "/structure",
        nameItem: "Structure",
        iconItem: DocumentPlusIcon,
      },
      {
        link: "/result",
        nameItem: "Result",
        iconItem: DocumentPlusIcon,
      },
    ],
  },
];
