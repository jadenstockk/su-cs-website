"use server";

// MY ATTEMPT AT USING DRUPAL AS A BACKEND, BUT IT WAS TOO SLOW AND I GAVE UP

import { Module } from "./types";

type ModuleItem = {
  attributes: {
    field_module_code: string;
    title: string;
    field_year: number;
    field_semester: string;
    field_description: string;
    field_type: "undergraduate" | "postgraduate" | string;
    field_info_link?: string;
    field_lecturer?: string;
    field_lecturer_link?: string;
  };
};

export const getModules = async (): Promise<Module[]> => {
  const res = await fetch(
    "http://1.d.hackathon.devsoc.co.za/jsonapi/node/module",
  );

  const data = await res.json();

  return data["data"].map((item: ModuleItem) => ({
    code: item?.attributes?.field_module_code,
    year: item?.attributes?.field_year,
    name: item?.attributes?.title,
    semester: item?.attributes?.field_semester,
    description: item?.attributes?.field_description,
    infoLink: item?.attributes?.field_info_link,
    lecturer: {
      name: item?.attributes?.field_lecturer,
      link: item?.attributes?.field_lecturer_link,
    },
    type: item?.attributes?.field_type,
  }));
};
