import { Category, Status } from "@prisma/client";
import z from "zod";

/**
 * Esquema de validação para a criação de uma campanha.
 *
 * @schema createCampaignSchema
 * @description Este schema valida os dados fornecidos para criar uma campanha.
 *
 * @property {string} name - O nome da campanha, deve ter pelo menos 3 caracteres.
 * @property {string | undefined} description - Descrição da campanha, pode ser opcional.
 * @property {Status} status - Status da campanha, o valor padrão é 'PAUSADA'.
 * @property {Category} category - Categoria da campanha, um dos valores do enum `Category`.
 * @property {Date} dateInitial - Data de início da campanha, definida automaticamente para a data atual.
 * @property {Date} dateEnd - Data de término da campanha.
 *
 * @throws {Error} Se a data de término for menor ou igual à data de início.
 */
export const createCampaignSchema = z
  .object({
    name: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
    description: z.string().optional(),
    status: z.nativeEnum(Status).default(Status.PAUSADA),
    category: z.nativeEnum(Category),
    dateInitial: z.coerce.date().default(() => new Date()),
    dateEnd: z.coerce.date(),
  })
  .superRefine((data, ctx) => {
    if (data.dateEnd <= data.dateInitial) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "A data de expiração da campanha precisa ser maior que a de início",
        path: ["dateEnd"],
      });
    }
  });

/**
 * Esquema de validação para a atualização de uma campanha.
 *
 * @schema updateCampaignSchema
 * @description Este schema valida os dados fornecidos para atualizar uma campanha.
 *
 * @property {string | undefined} name - O nome da campanha, opcional e deve ter pelo menos 3 caracteres.
 * @property {string | undefined} description - Descrição da campanha, opcional.
 * @property {Status | undefined} status - Status da campanha, opcional.
 * @property {Date | undefined} dateInitial - Data de início da campanha, opcional.
 * @property {Date | undefined} dateEnd - Data de término da campanha, opcional.
 *
 * @throws {Error} Se a data de término for menor ou igual à data de início.
 */
export const updateCampaignSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nome precisa ter pelo menos 3 caracteres")
      .optional(),
    description: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
    dateInitial: z.coerce.date().optional(),
    dateEnd: z.coerce.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.dateEnd && data.dateInitial && data.dateEnd <= data.dateInitial) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "A data de expiração da campanha precisa ser maior que a de início",
        path: ["dateEnd"],
      });
    }
  });
