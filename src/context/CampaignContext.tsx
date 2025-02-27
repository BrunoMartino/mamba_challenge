"use client";

import { campaignReducer } from "@/reducers/campaignReducer";
import { Campaign, Category, Status } from "@prisma/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-toastify";

/**
 * @typedef {Object} CampaignContextProps
 * @property {Campaign[]} campaigns - Lista de campanhas
 * @property {string} theme - Tema atual
 * @property {(newTheme: string) => void} setTheme - Função para definir o tema
 * @property {() => Promise<void>} fetchCampaigns - Busca todas as campanhas
 * @property {(campaign: Campaign) => Promise<void>} addCampaign - Adiciona uma campanha
 * @property {(query: string) => Promise<void>} searchCampaigns - Pesquisa campanhas por termo
 * @property {(id: string, data: Partial<Campaign>) => Promise<void>} editCampaign - Edita uma campanha existente
 * @property {(id: string) => Promise<Campaign | undefined>} getSingleCampaign - Obtém uma campanha específica
 * @property {(id: string) => Promise<void>} removeCampaign - Remove uma campanha pelo ID
 * @property {() => Promise<void>} setExpiredCampaigns - Atualiza status de campanhas expiradas
 * @property {(status?: Status, category?: Category) => Promise<void>} filterCampaigns - Filtra campanhas por status e categoria
 */

/**
 * @typedef {Object} Props
 * @property {ReactNode} children - Componentes filhos a serem renderizados
 */

interface CampaignContextProps {
  campaigns: Campaign[];
  theme: string;
  setTheme: (newTheme: string) => void;
  fetchCampaigns: () => Promise<void>;
  addCampaign: (campaign: Campaign) => Promise<void>;
  searchCampaigns: (query: string) => Promise<void>;
  editCampaign: (id: string, data: Partial<Campaign>) => Promise<void>;
  getSingleCampaign: (id: string) => Promise<Campaign | undefined>;
  removeCampaign: (id: string) => Promise<void>;
  setExpiredCampaigns: () => Promise<void>;
  filterCampaigns: (
    status?: Status | undefined,
    category?: Category | undefined
  ) => Promise<void>;
}

type Props = {
  children: ReactNode;
};

const STORAGE_KEY = "themeContextKey";

/**
 * Contexto para gerenciamento das campanhas.
 */
export const CampaignContext = createContext<CampaignContextProps | undefined>(
  undefined
);

/**
 * Provedor do contexto de campanhas.
 *
 * @param {Props} props - Propriedades do componente provedor.
 * @returns {JSX.Element} Componente do provedor de campanhas.
 */
export const CampaignProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(campaignReducer, {
    campaigns: [],
    singleCampaign: {} as Campaign,
  });
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  /**
   * Atualiza o status das campanhas expiradas e refaz a busca das campanhas.
   *
   * @returns {Promise<void>}
   */
  const setExpiredCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns/expired-campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok)
        throw new Error("Erro ao atualizar status das campanhas expiradas");

      fetchCampaigns();
    } catch (error) {
      console.error("Erro ao atualizar status das campanhas expiradas", error);
    }
  };

  /**
   * Busca todas as campanhas disponíveis.
   *
   * @returns {Promise<void>}
   */
  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns");
      const data = await res.json();
      dispatch({ type: "getAllCampaigns", payload: data });
    } catch (error) {
      console.error("Erro ao buscar campanhas", error);
    }
  };

  /**
   * Adiciona uma nova campanha.
   *
   * @param {Campaign} campaign - Objeto com os dados da campanha a ser adicionada.
   * @returns {Promise<void>}
   */
  const addCampaign = async (campaign: Campaign) => {
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao adicionar campanha");
      }
      const newCampaign = await res.json();
      dispatch({ type: "addCampaign", payload: newCampaign });
      toast.success("Campanha adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar campanha", error);
      toast.error("Erro ao adicionar campanha");
    }
  };

  /**
   * Edita uma campanha existente.
   *
   * @param {string} id - ID da campanha a ser editada.
   * @param {Partial<Campaign>} data - Dados parciais para atualizar a campanha.
   * @returns {Promise<void>}
   */
  const editCampaign = async (id: string, data: Partial<Campaign>) => {
    try {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updateCampaign = await res.json();
      dispatch({ type: "editCampaign", payload: updateCampaign });
      toast.success("Campanha Editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar campanha", error);
      toast.error("Erro ao editar campanha");
    }
  };

  /**
   * Remove uma campanha pelo seu ID.
   *
   * @param {string} id - ID da campanha a ser removida.
   * @returns {Promise<void>}
   */
  const removeCampaign = async (id: string) => {
    try {
      await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
      dispatch({ type: "deleteCampaign", payload: { id } });
      toast.success("camapanha removida com sucesso");
    } catch (error) {
      console.error("Erro ao deletar campanha", error);
      toast.success("Erro ao remover a campanha");
    }
  };

  /**
   * Pesquisa campanhas com base em um termo de busca.
   *
   * @param {string} query - Termo para pesquisa de campanhas.
   * @returns {Promise<void>}
   */
  const searchCampaigns = async (query: string) => {
    try {
      const res = await fetch(`/api/campaigns/search?q=${query}`);
      if (!res.ok) throw new Error("Erro ao buscar campanhas");

      const data: Campaign[] = await res.json();
      dispatch({ type: "searchCampaign", payload: data });
    } catch (error) {
      console.error("Não foi possivel encontrar a camapanha", error);
    }
  };

  /**
   * Obtém os detalhes de uma única campanha.
   *
   * @param {string} id - ID da campanha a ser buscada.
   * @returns {Promise<Campaign | undefined>} A campanha encontrada ou undefined se não encontrada.
   */
  const getSingleCampaign = async (id: string) => {
    try {
      const res = await fetch(`/api/campaigns/${id}`);
      if (!res.ok) throw new Error("Campanha não encontrada");
      const campaign = await res.json();
      dispatch({ type: "getSingleCampaign", payload: campaign });
      return campaign;
    } catch (error) {
      console.error("Erro ao buscar campanha", error);
      return undefined;
    }
  };

  /**
   * Filtra campanhas com base em status e categoria.
   *
   * @param {Status} [status] - Status para filtrar as campanhas.
   * @param {Category} [category] - Categoria para filtrar as campanhas.
   * @returns {Promise<void>}
   */
  const filterCampaigns = async (status?: Status, category?: Category) => {
    const queryParams = new URLSearchParams();
    if (status) queryParams.append("status", status);
    if (category) queryParams.append("category", category);

    const res = await fetch(`/api/campaigns?${queryParams.toString()}`);
    const filterData: Campaign[] = await res.json();

    dispatch({ type: "filterCampaigns", payload: filterData });
  };

  return (
    <CampaignContext.Provider
      value={{
        campaigns: state.campaigns,
        theme,
        setTheme,
        fetchCampaigns,
        addCampaign,
        editCampaign,
        removeCampaign,
        searchCampaigns,
        getSingleCampaign,
        setExpiredCampaigns,
        filterCampaigns,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de campanhas.
 *
 * @returns {CampaignContextProps | undefined} O contexto de campanhas.
 */
export const useCampaigns = () => useContext(CampaignContext);
