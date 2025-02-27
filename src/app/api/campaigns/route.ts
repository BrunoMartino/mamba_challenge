// import * as CampaignServices from "@/app/_services/CampaignServices";
// import { createCampaignSchema } from "@/app/_libs/validation";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const status = searchParams.get("status") || undefined;
//     const category = searchParams.get("category") || undefined;

//     const campaigns = await CampaignServices.getAllCampaigns({
//       status,
//       category,
//     });
//     return NextResponse.json(campaigns, { status: 200 });
//   } catch {
//     return NextResponse.json(
//       { message: "erro ao buscar campanhas" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();
//     const validatedData = createCampaignSchema.parse(data);
//     const createdCampaign = await CampaignServices.createCampaign(
//       validatedData
//     );
//     return NextResponse.json(createdCampaign, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message || "Erro ao criar campanha" },
//       { status: 400 }
//     );
//   }
// }

import * as CampaignServices from "@/app/_services/CampaignServices";
import { createCampaignSchema } from "@/app/_libs/validation";
import { NextRequest, NextResponse } from "next/server";

/**
 * @typedef {Object} Campaign
 * @property {string} id - Identificador único da campanha.
 * @property {string} name - Nome da campanha.
 * @property {string} description - Descrição da campanha.
 * @property {string} status - Status da campanha (ex: ATIVA, EXPIRADA).
 * @property {string} category - Categoria da campanha.
 * @property {string} dateInsert - Data de criação da campanha.
 * @property {string} dateInitial - Data de início da campanha.
 * @property {string} dateEnd - Data de término da campanha.
 */

/**
 * Rota GET para buscar todas as campanhas, opcionalmente filtradas por status e categoria.
 *
 * @param {NextRequest} req - Objeto de requisição do Next.js.
 * @returns {Promise<NextResponse>} Retorna um array de campanhas no formato JSON.
 *
 * @example
 * GET /api/campaigns?status=ATIVA&category=MARKETING
 *
 * @response
 * [
 *   {
 *     "id": "abc123",
 *     "name": "Campanha de Teste",
 *     "description": "Descrição da campanha",
 *     "status": "ATIVA",
 *     "category": "MARKETING",
 *     "dateInsert": "2024-02-26T12:00:00Z",
 *     "dateInitial": "2024-03-01T12:00:00Z",
 *     "dateEnd": "2024-03-31T12:00:00Z"
 *   }
 * ]
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const category = searchParams.get("category") || undefined;

    const campaigns = await CampaignServices.getAllCampaigns({
      status,
      category,
    });
    return NextResponse.json(campaigns, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Erro ao buscar campanhas" },
      { status: 500 }
    );
  }
}

/**
 * Rota POST para criar uma nova campanha.
 *
 * @param {NextRequest} req - Objeto de requisição do Next.js contendo os dados da campanha no corpo da requisição.
 * @returns {Promise<NextResponse>} Retorna a campanha recém-criada em JSON.
 *
 * @example
 * POST /api/campaigns
 *
 * @requestBody
 * {
 *   "name": "Nova Campanha",
 *   "description": "Descrição da nova campanha",
 *   "status": "ATIVA",
 *   "category": "VENDAS",
 *   "dateInitial": "2024-04-01T12:00:00Z",
 *   "dateEnd": "2024-04-30T12:00:00Z"
 * }
 *
 * @response
 * {
 *   "id": "xyz789",
 *   "name": "Nova Campanha",
 *   "description": "Descrição da nova campanha",
 *   "status": "ATIVA",
 *   "category": "VENDAS",
 *   "dateInsert": "2024-02-26T12:00:00Z",
 *   "dateInitial": "2024-04-01T12:00:00Z",
 *   "dateEnd": "2024-04-30T12:00:00Z"
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = createCampaignSchema.parse(data);
    const createdCampaign = await CampaignServices.createCampaign(
      validatedData
    );
    return NextResponse.json(createdCampaign, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Erro ao criar campanha" },
      { status: 400 }
    );
  }
}
