"use client";

import { useCampaigns } from "@/context/CampaignContext";
import { useEffect, useState } from "react";
import SingleCampaignModal from "./SingleCampaignModal";

const ListCampaigns = () => {
  const { campaigns, setExpiredCampaigns } = useCampaigns() || {
    campaigns: [],
    setExpiredCampaigns: () => {},
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Data Inválida";

    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (campaign: string) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCampaign(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setExpiredCampaigns();
  }, []);

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="flex justify-center">
        <p className="text-3xl mx-auto py-44 font-semibold">
          Não há campanhas disponíveis.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center uppercase">
        Campanhas
      </h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Criada em:
            </th>
            <th scope="col" className="px-6 py-3">
              Data Início
            </th>
            <th scope="col" className="px-6 py-3">
              Data Fim
            </th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign, index) => (
            <tr
              key={campaign.id || `temp-${index}`}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">{campaign.id}</td>
              <td className="px-6 py-4">{campaign.category}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                onClick={() => openModal(campaign)}
              >
                {campaign.name}
              </th>
              <td className="px-6 py-4">{campaign.status}</td>
              <td className="px-6 py-4">
                {formatDateTime(campaign.dateInsert)}
              </td>
              <td className="px-6 py-4">
                {formatDateTime(campaign.dateInitial)}
              </td>
              <td className="px-6 py-4">{formatDateTime(campaign.dateEnd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedCampaign && (
        <SingleCampaignModal
          campaignId={selectedCampaign.id}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ListCampaigns;
