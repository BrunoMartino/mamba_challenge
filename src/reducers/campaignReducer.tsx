import { Campaign } from "@prisma/client";

/**
 * Tipo de ação para adicionar uma campanha.
 */
type AddCampaign = {
  type: "addCampaign";
  payload: Campaign;
};

/**
 * Tipo de ação para definir campanhas expiradas.
 */
type SetExpiredCampaigns = {
  type: "setExpiredCampaigns";
  payload: Campaign[];
};

/**
 * Tipo de ação para obter todas as campanhas.
 */
type GetAllCampaigns = {
  type: "getAllCampaigns";
  payload: Campaign[];
};

/**
 * Tipo de ação para filtrar campanhas.
 */
type FilterCampaigns = {
  type: "filterCampaigns";
  payload: Campaign[];
};

/**
 * Tipo de ação para obter uma única campanha.
 */
type GetSingleCampaign = {
  type: "getSingleCampaign";
  payload: Campaign;
};

/**
 * Tipo de ação para buscar campanhas.
 */
type SearchCampaign = {
  type: "searchCampaign";
  payload: Campaign[];
};

/**
 * Tipo de ação para editar uma campanha.
 */
type EditCampaign = {
  type: "editCampaign";
  payload: Campaign;
};

/**
 * Tipo de ação para deletar uma campanha.
 */
type DeleteCampaign = {
  type: "deleteCampaign";
  payload: {
    id: string;
  };
};

/**
 * Tipos de ações disponíveis para manipular campanhas.
 */
type campaignActions =
  | AddCampaign
  | SetExpiredCampaigns
  | GetAllCampaigns
  | GetSingleCampaign
  | FilterCampaigns
  | SearchCampaign
  | EditCampaign
  | DeleteCampaign;

/**
 * Estado da campanha contendo a lista de campanhas e uma campanha única.
 */
interface CampaignState {
  campaigns: Campaign[];
  singleCampaign: Campaign;
}

/**
 * Redutor para gerenciar o estado das campanhas.
 * @param {CampaignState} state - Estado atual das campanhas.
 * @param {campaignActions} action - Ação a ser executada no estado.
 * @returns {CampaignState} Novo estado atualizado.
 */
export const campaignReducer = (
  state: CampaignState,
  action: campaignActions
): CampaignState => {
  switch (action.type) {
    case "addCampaign":
      return { ...state, campaigns: [...state.campaigns, action.payload] };
    case "setExpiredCampaigns":
      return {
        ...state,
        campaigns: state.campaigns.map((campaign) =>
          action.payload.some((exp) => exp.id === campaign.id)
            ? { ...campaign, status: "EXPIRADA" }
            : campaign
        ),
      };
    case "getAllCampaigns":
      return { ...state, campaigns: action.payload };
    case "filterCampaigns":
      return { ...state, campaigns: action.payload };
    case "getSingleCampaign":
      return { ...state, singleCampaign: action.payload };
    case "searchCampaign":
      return { ...state, campaigns: action.payload };
    case "editCampaign":
      return {
        ...state,
        campaigns: state.campaigns.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "deleteCampaign":
      return {
        ...state,
        campaigns: state.campaigns.filter((c) => c.id !== action.payload.id),
      };
    default:
      return state;
  }
};
