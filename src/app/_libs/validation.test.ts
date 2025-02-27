import { createCampaignSchema, updateCampaignSchema } from "./validation"; // Ajuste o caminho
import { Status, Category } from "@prisma/client";

describe("createCampaignSchema", () => {
  // Teste de dados válidos
  test("deve validar uma campanha válida", () => {
    const validData = {
      name: "Campanha de SEO",
      description: "Campanha para promover o produto.",
      status: "PAUSADA",
      category: "SEO",
      dateInitial: new Date(),
      dateEnd: new Date(new Date().setDate(new Date().getDate() + 1)),
    };

    const result = createCampaignSchema.safeParse(validData);
    expect(result.success).toBe(true); // Espera que a validação seja bem-sucedida
  });

  // Teste de nome inválido (menor que 3 caracteres)
  test("não deve aceitar nome com menos de 3 caracteres", () => {
    const invalidData = {
      name: "Te", // Nome inválido
      description: "Campanha válida",
      status: "PAUSADA",
      category: "INVALID_CATEGORY",
      dateInitial: new Date(),
      dateEnd: new Date(new Date().setDate(new Date().getDate() + 1)),
    };

    const result = createCampaignSchema.safeParse(invalidData);
    expect(result.success).toBe(false); // Espera que a validação falhe
    expect(result.error.issues[0].message).toBe(
      "Nome precisa ter pelo menos 3 caracteres"
    ); // Mensagem de erro esperada
  });

  // Teste de data de término menor ou igual à data de início
  test("não deve aceitar data de término menor ou igual à data de início", () => {
    const invalidData = {
      name: "Campanha de SEO",
      description: "Campanha para promover o produto.",
      status: Status.PAUSADA,
      category: Category.SEO,
      dateInitial: new Date(),
      dateEnd: new Date("2024-01-01T12:00:00Z"), // Data inválida
    };

    const result = createCampaignSchema.safeParse(invalidData);
    expect(result.success).toBe(false); // Espera que a validação falhe
    expect(result.error.issues[0].message).toBe(
      "A data de expiração da campanha precisa ser maior que a de início"
    );
  });

  // Teste de categoria inválida
  test("não deve aceitar categoria inválida", () => {
    const invalidData = {
      name: "Campanha de SEO",
      description: "Campanha para promover o produto.",
      status: Status.PAUSADA,
      category: "INVALID_CATEGORY", // Categoria inválida
      dateInitial: new Date(),
      dateEnd: new Date("2024-03-31T12:00:00Z"),
    };

    const result = createCampaignSchema.safeParse(invalidData);
    expect(result.success).toBe(false); // Espera que a validação falhe
    expect(result.error.issues[0].message).toBe(
      "Invalid enum value. Expected 'SEO' | 'SOCIAL_MEDIA' | 'ADS' | 'EMAIL_MARKETING' | 'CONTENT_MARKETING' | 'ANALYTICS', received 'INVALID_CATEGORY'"
    ); // Mensagem de erro esperada
  });
});

describe("updateCampaignSchema", () => {
  // Teste de dados válidos
  test("deve validar uma atualização de campanha válida", () => {
    const validData = {
      name: "Campanha de SEO Atualizada",
      description: "Atualização da campanha existente.",
      status: Status.ATIVA, // Status válido
      category: Category.SEO, // Categoria válida
      dateInitial: new Date("2024-01-01T12:00:00Z"),
      dateEnd: new Date("2024-03-31T12:00:00Z"),
    };

    const result = updateCampaignSchema.safeParse(validData);
    expect(result.success).toBe(true); // Espera que a validação seja bem-sucedida
  });

  // Teste de nome inválido (menor que 3 caracteres)
  test("não deve aceitar nome com menos de 3 caracteres", () => {
    const invalidData = {
      name: "Te", // Nome inválido
      description: "Campanha válida",
      status: Status.PAUSADA,
      category: Category.SEO,
      dateInitial: new Date(),
      dateEnd: new Date("2024-03-31T12:00:00Z"),
    };

    const result = updateCampaignSchema.safeParse(invalidData);
    expect(result.success).toBe(false); // Espera que a validação falhe
    expect(result.error.issues[0].message).toBe(
      "Nome precisa ter pelo menos 3 caracteres"
    ); // Mensagem de erro esperada
  });

  // Teste de data de término menor ou igual à data de início
  test("não deve aceitar data de término menor ou igual à data de início", () => {
    const invalidData = {
      name: "Campanha de SEO Atualizada",
      description: "Campanha válida",
      status: Status.PAUSADA,
      category: Category.SEO,
      dateInitial: new Date(),
      dateEnd: new Date("2024-01-01T12:00:00Z"), // Data inválida
    };

    const result = updateCampaignSchema.safeParse(invalidData);
    expect(result.success).toBe(false); // Espera que a validação falhe
    expect(result.error.issues[0].message).toBe(
      "A data de expiração da campanha precisa ser maior que a de início"
    );
  });

  // Teste de dados parciais (somente alguns campos fornecidos)
  test("deve aceitar dados parciais para atualização", () => {
    const partialData = {
      name: "Campanha Parcial", // Nome válido
      description: undefined, // Descrição opcional
      status: undefined, // Status opcional
      category: Category.PROMOCAO, // Categoria válida
      dateInitial: undefined, // Data de início opcional
      dateEnd: new Date("2024-03-31T12:00:00Z"),
    };

    const result = updateCampaignSchema.safeParse(partialData);
    expect(result.success).toBe(true); // Espera que a validação seja bem-sucedida
  });
});
