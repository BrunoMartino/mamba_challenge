import { useCampaigns } from "@/context/CampaignContext";
import { Category, Status } from "@prisma/client";
import { useState } from "react";
import SelectComponent from "./SelectComponent";
import Button from "./ButtomComponent";
import CreateCampaign from "./CreateCampaing";

/**
 * Componente ActionsMenu - Exibe botões e selects para filtragem e criação de campanhas.
 * @returns {JSX.Element} Elemento JSX representando o menu de ações.
 */
const ActionsMenu = () => {
  const { filterCampaigns } = useCampaigns();
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "">("");
  const [showCreateCampaign, setShowCreateCampaign] = useState<boolean>(false);

  /**
   * Aplica os filtros de status e categoria nas campanhas.
   * Chama a função filterCampaigns do contexto.
   */
  const applyFIlters = async () => {
    await filterCampaigns(
      statusFilter !== "" ? statusFilter : undefined,
      categoryFilter !== "" ? categoryFilter : undefined
    );
  };

  /**
   * Alterna a exibição do modal de criação de campanhas.
   */
  const toggleCreateCampaing = () => {
    setShowCreateCampaign((camp) => !camp);
  };

  return (
    <div className="py-8 flex flex-col px-4">
      <div className="flex flex-col-reverse gap-10 justify-between items-center md:flex-row">
        <Button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 self-start mb-6"
          onClick={toggleCreateCampaing}
        >
          {showCreateCampaign ? "Fechar" : "Nova Campanha"}
        </Button>
        <div className="flex flex-col py-4 px-8 gap-4 items-end md:flex-row md:items-center md:justify-between md:max-w-3xl">
          <SelectComponent
            value={statusFilter}
            onChange={(value: string) => setStatusFilter(value as Status | "")}
            options={Object.values(Status)}
            placeholder="Todos os Status"
          />
          <SelectComponent
            value={categoryFilter}
            onChange={(value: string) =>
              setCategoryFilter(value as Category | "")
            }
            options={Object.values(Category)}
            placeholder="Todas as Categorias"
          />
          <Button
            className="relative inline-flex w-64 items-center justify-center p-0.5 my-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 max-w-max"
            onClick={applyFIlters}
          >
            Filtrar
          </Button>
        </div>
      </div>
      {showCreateCampaign && <CreateCampaign />}
    </div>
  );
};

export default ActionsMenu;
