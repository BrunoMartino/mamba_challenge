import { searchCampaigns } from "@/app/_services/CampaignServices";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route GET /api/campaigns/search
 * @description Pesquisa campanhas pelo nome ou ID
 * @param {NextRequest} req - Objeto da requisição contendo query params
 * @returns {NextResponse} JSON com os resultados da busca ou mensagem de erro
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json(
        { error: "Por favor, digite um nome ou ID para a busca" },
        { status: 400 }
      );
    }

    const results = await searchCampaigns(q);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "Ocorreu um erro interno" },
      { status: 500 }
    );
  }
}
