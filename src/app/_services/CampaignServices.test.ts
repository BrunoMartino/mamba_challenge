import { mockDeep, mockReset } from "jest-mock-extended";
import { db } from "../_libs/prisma"; // Mock do Prisma
import { Status, Category } from "@prisma/client";
import {
  getAllCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  updateExpiredCampaigns,
  searchCampaigns,
} from "./CampaignServices";

// Criando mock do Prisma
jest.mock("../_libs/prisma", () => ({
  db: mockDeep<typeof db>(),
}));

const mockDb = db as any; // Para evitar erro de tipagem

beforeEach(() => {
  mockReset(mockDb); // Resetando o mock antes de cada teste
});

describe("Campaign Services", () => {
  test("🔍 Deve retornar todas as campanhas filtradas", async () => {
    mockDb.campaign.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Campanha 1",
        status: Status.PAUSADA,
        category: Category.SEO,
      },
      {
        id: "2",
        name: "Campanha 2",
        status: Status.PAUSADA,
        category: Category.SEO,
      },
    ]);

    const result = await getAllCampaigns({
      status: Status.PAUSADA,
      category: Category.SEO,
    });

    expect(mockDb.campaign.findMany).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
        status: Status.PAUSADA,
        category: Category.SEO,
      },
      select: expect.any(Object),
      orderBy: { dateInsert: "asc" },
    });

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Campanha 1");
  });

  test("🆕 Deve criar uma nova campanha", async () => {
    const dateInitial = new Date(); // Data de início
    const dateEnd = new Date(dateInitial);
    dateEnd.setDate(dateInitial.getDate() + 1);
    const newCampaign = {
      id: "abc12345",
      name: "Nova Campanha",
      description: "Descrição",
      status: Status.PAUSADA,
      category: Category.SEO,
      dateInsert: new Date(),
      dateInitial: dateInitial,
      dateEnd: dateEnd,
      deletedAt: null,
    };

    mockDb.campaign.create.mockResolvedValue(newCampaign);

    const result = await createCampaign(newCampaign);

    expect(mockDb.campaign.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ name: "Nova Campanha" }),
      select: expect.any(Object),
    });

    expect(result.name).toBe("Nova Campanha");
  });

  test("📝 Deve atualizar uma campanha existente", async () => {
    const dateInitial = new Date(); // Data de início
    const dateEnd = new Date(dateInitial);
    dateEnd.setDate(dateInitial.getDate() + 1);
    const existingCampaign = {
      id: "abc12345",
      name: "Nova Campanha",
      description: "Descrição",
      status: Status.PAUSADA,
      category: Category.SEO,
      dateInsert: new Date(),
      dateInitial: dateInitial,
      dateEnd: dateEnd,
      deletedAt: null,
    };

    mockDb.campaign.findUnique.mockResolvedValue(existingCampaign);
    mockDb.campaign.update.mockResolvedValue({
      ...existingCampaign,
      name: "Campanha Atualizada",
    });

    const result = await updateCampaign("123abc45", {
      ...existingCampaign,
      name: "Campanha Atualizada",
      description: existingCampaign.description || "Descrição atualizada",
      deletedAt: existingCampaign.deletedAt ?? null,
    });

    expect(mockDb.campaign.update).toHaveBeenCalledWith({
      where: { id: "123abc45", deletedAt: null },
      data: expect.objectContaining({ name: "Campanha Atualizada" }),
      select: expect.any(Object),
    });

    expect(result.name).toBe("Campanha Atualizada");
  });

  test("🚫 Deve lançar erro ao tentar atualizar uma campanha inexistente", async () => {
    mockDb.campaign.findUnique.mockResolvedValue(null);

    await expect(
      updateCampaign("999", { name: "Teste" } as any)
    ).rejects.toThrow("Campanha não Encontrada");
  });

  test("🗑️ Deve deletar uma campanha", async () => {
    mockDb.campaign.findUnique.mockResolvedValue({
      id: "123abc45",
      status: Status.PAUSADA,
    });

    await deleteCampaign("123abc45");

    expect(mockDb.campaign.update).toHaveBeenCalledWith({
      where: { id: "123abc45" },
      data: { deletedAt: expect.any(Date), status: "EXPIRADA" },
    });
  });

  test("📅 Deve atualizar campanhas expiradas", async () => {
    const expiredCampaigns = [
      { id: "1", dateEnd: new Date("2023-01-01"), status: Status.PAUSADA },
      { id: "2", dateEnd: new Date("2023-02-01"), status: Status.PAUSADA },
    ];

    mockDb.campaign.findMany.mockResolvedValue(expiredCampaigns);
    mockDb.campaign.updateMany.mockResolvedValue({ count: 2 });

    const result = await updateExpiredCampaigns();

    expect(mockDb.campaign.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ["1", "2"] } },
      data: { status: Status.EXPIRADA },
    });

    expect(result.updated).toBe(2);
  });

  test("🔍 Deve buscar campanhas pelo termo de pesquisa", async () => {
    mockDb.campaign.findMany.mockResolvedValue([
      { id: "1", name: "Campanha Teste", description: "Teste de busca" },
    ]);

    const result = await searchCampaigns("Teste");

    expect(mockDb.campaign.findMany).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
        OR: [{ id: { contains: "Teste" } }, { name: { contains: "Teste" } }],
      },
      select: expect.any(Object),
      orderBy: { dateInsert: "asc" },
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Campanha Teste");
  });
});
