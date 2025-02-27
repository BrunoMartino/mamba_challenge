// import { updateExpiredCampaigns } from "@/app/_services/CampaignServices";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const result = await updateExpiredCampaigns();
//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     console.log("falha em atualizar status das camapanhas", error);
//     return NextResponse.json({ error: "Erro interno" }, { status: 500 });
//   }
// }

import { updateExpiredCampaigns } from "@/app/_services/CampaignServices";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route POST /api/campaigns/update-expired
 * @description Atualiza o status das campanhas expiradas no sistema
 * @param {NextRequest} req - Objeto da requisição
 * @returns {NextResponse} JSON confirmando a atualização ou mensagem de erro
 */
export async function POST(req: NextRequest) {
  try {
    const result = await updateExpiredCampaigns();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log("Falha ao atualizar status das campanhas", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
