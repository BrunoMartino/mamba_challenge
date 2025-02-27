"use client";

import { useCampaigns } from "@/context/CampaignContext";
import { useState } from "react";
import TextInput from "./TextInputComponent";
import Button from "./ButtomComponent";

/**
 * Componente de barra de busca para procurar campanhas por nome ou ID.
 *
 * Utiliza o contexto de campanhas (`useCampaigns`) para realizar a busca, passando a query inserida pelo usuário.
 * O componente é composto por um campo de texto (`TextInput`) e um botão de busca (`Button`).
 *
 * @component
 * @example
 * return <Searchbar />;
 */
const Searchbar = () => {
  const { searchCampaigns } = useCampaigns();
  const [query, setQuery] = useState<string>("");

  /**
   * Função responsável por realizar a busca de campanhas.
   * Se a query não estiver vazia, chama a função `searchCampaigns` com o valor da query.
   *
   * @async
   * @function handleSearch
   * @returns {Promise<void>}
   */
  const handleSearch = async () => {
    if (query.trim()) {
      await searchCampaigns(query);
    }
  };
  /**
   * Função que trata o evento de pressionar uma tecla no campo de texto.
   * Se a tecla pressionada for "Enter", a busca é executada.
   *
   * @function handleKeyPress
   * @param {React.KeyboardEvent<HTMLInputElement>} e - O evento de teclado gerado ao pressionar uma tecla.
   */
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
