"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { HouseId } from "@/lib/types";

interface HouseContextType {
  activeHouse: HouseId;
  setHouse: (house: HouseId) => void;
}

const HouseContext = createContext<HouseContextType>({
  activeHouse: "teresa",
  setHouse: () => { },
});

export function HouseProvider({ children }: { children: React.ReactNode }) {
  const [activeHouse, setActiveHouse] = useState<HouseId>("teresa");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sas_student_house") as HouseId | null;
      if (saved && ["teresa", "amartya", "tagore", "raman"].includes(saved)) {
        setActiveHouse(saved);
      }
    }
  }, []);

  const setHouse = (house: HouseId) => {
    setActiveHouse(house);
    if (typeof window !== "undefined") {
      localStorage.setItem("sas_student_house", house);
    }
  };

  return (
    <HouseContext.Provider value={{ activeHouse, setHouse }}>
      {children}
    </HouseContext.Provider>
  );
}

export function useHouse() {
  return useContext(HouseContext);
}
