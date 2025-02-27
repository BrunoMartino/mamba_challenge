"use client";

import { useCampaigns } from "@/context/CampaignContext";
import { useState } from "react";
import TextInput from "./TextInputComponent";
import Button from "./ButtomComponent";

const Searchbar = () => {
  const { searchCampaigns } = useCampaigns();
  const [query, setQuery] = useState<string>("");

  const handleSearch = async () => {
    if (query.trim()) {
      await searchCampaigns(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <TextInput
        value={query}
        onChange={setQuery}
        onKeyDown={handleKeyPress}
        placeholder="Procure por NOME ou ID"
      />

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-sm">
        <Button
          className="relative inline-flex w-64 items-center justify-center p-0.5 my-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 max-w-max"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default Searchbar;
