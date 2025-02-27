import { Campaign, Category, Status } from "@prisma/client";
import { db } from "../_libs/prisma";
import {
  createCampaignSchema,
  updateCampaignSchema,
} from "../_libs/validation";
import { nanoid } from "nanoid/non-secure";

/**
 * Obtém todas as campanhas com base no status e categoria fornecidos.
 *
 * @function getAllCampaigns
 * @param {Object} params - Parâmetros de filtragem para as campanhas.
 * @param {Status} params.status - O status das campanhas a serem filtradas.
 * @param {Category} params.category - A categoria das campanhas a serem filtradas.
 * @returns {Promise<Campaign[]>} Retorna uma lista de campanhas.
 */
export const getAllCampaigns = async ({
  status,
  category,
}: {
  status: Status;
  category: Category;
}) => {
  return await db.campaign.findMany({
    where: {
      deletedAt: null,
      ...(status ? { status } : {}),
      ...(category ? { category } : {}),
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      category: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
    orderBy: {
      dateInsert: "asc",
    },
  });
};

/**
 * Obtém uma campanha única pelo seu ID.
 *
 * @function singleCampaign
 * @param {string} id - O ID da campanha a ser buscada.
 * @returns {Promise<Campaign | null>} Retorna a campanha ou `null` se não encontrada.
 */
export const singleCampaign = async (id: string) => {
  return await db.campaign.findUnique({
    where: { id, deletedAt: null },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      category: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
  });
};

/**
 * Cria uma nova campanha no banco de dados.
 *
 * @function createCampaign
 * @param {Campaign} data - Os dados da campanha a ser criada.
 * @returns {Promise<Campaign>} Retorna a campanha criada.
 */
export const createCampaign = async (data: Campaign) => {
  const validatedData = createCampaignSchema.parse(data);
  const campaign = db.campaign.create({
    data: {
      id: nanoid(8),
      ...validatedData,
    },
    select: {
      name: true,
      description: true,
      status: true,
      category: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
  });
  return campaign;
};

/**
 * Atualiza uma campanha existente no banco de dados.
 *
 * @function updateCampaign
 * @param {string} id - O ID da campanha a ser atualizada.
 * @param {Campaign} data - Os novos dados para a campanha.
 * @returns {Promise<Campaign>} Retorna a campanha atualizada.
 * @throws {Error} Se a campanha não for encontrada ou se a data de expiração for menor que a data de início.
 */
export const updateCampaign = async (id: string, data: Campaign) => {
  const validatedData = updateCampaignSchema.parse(data);

  const currentCampaign = await db.campaign.findUnique({
    where: { id, deletedAt: null },
  });
  if (!currentCampaign) {
    throw new Error("Campanha não Encontrada");
  }

  if (
    validatedData.dateEnd &&
    validatedData.dateInitial &&
    validatedData.dateEnd <= validatedData.dateInitial
  ) {
    throw new Error(
      "A data de expiração precisa ser maior que a data de início"
    );
  }
  const updatedCampaign = await db.campaign.update({
    where: {
      id,
      deletedAt: null,
    },
    data: validatedData,
    select: {
      name: true,
      description: true,
      status: true,
      category: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
  });
  return updatedCampaign;
};

/**
 * Marca uma campanha como deletada e a define como "EXPIRADA".
 *
 * @function deleteCampaign
 * @param {string} id - O ID da campanha a ser deletada.
 * @returns {Promise<void>} Não retorna nada.
 * @throws {Error} Se a campanha não for encontrada.
 */
export const deleteCampaign = async (id: string) => {
  const item = await db.campaign.findUnique({
    where: { id, deletedAt: null },
  });

  if (!item) {
    throw new Error("Campanha não encontrada");
  }

  await db.campaign.update({
    where: { id },
    data: { deletedAt: new Date(), status: "EXPIRADA" },
  });
};

/**
 * Atualiza o status das campanhas expiradas para "EXPIRADA".
 *
 * @function updateExpiredCampaigns
 * @returns {Promise<Object>} Retorna o número de campanhas atualizadas.
 */
export const updateExpiredCampaigns = async () => {
  const today = new Date();
  const expiredCampaigns = await db.campaign.findMany({
    where: {
      dateEnd: { lt: today },
      status: { not: Status.EXPIRADA },
    },
  });

  if (expiredCampaigns.length === 0) {
    console.log("Nenhuma campanha expirou");
    return { updated: 0 };
  }

  await db.campaign.updateMany({
    where: { id: { in: expiredCampaigns.map((c) => c.id) } },
    data: { status: Status.EXPIRADA },
  });

  console.log(`Atualizadas ${expiredCampaigns.length} campanhas para EXPIRADA`);
  return { updated: expiredCampaigns.length };
};

/**
 * Realiza a busca por campanhas com base no termo de pesquisa.
 *
 * @function searchCampaigns
 * @param {string} searchTerm - O termo de pesquisa para buscar nas campanhas.
 * @returns {Promise<Campaign[]>} Retorna uma lista de campanhas que correspondem ao termo de pesquisa.
 */
export const searchCampaigns = async (searchTerm: string) => {
  return await db.campaign.findMany({
    where: {
      deletedAt: null,
      OR: [
        { id: { contains: searchTerm } },
        { name: { contains: searchTerm } },
      ],
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      category: true,
      dateInsert: true,
      dateInitial: true,
      dateEnd: true,
    },
    orderBy: {
      dateInsert: "asc",
    },
  });
};
