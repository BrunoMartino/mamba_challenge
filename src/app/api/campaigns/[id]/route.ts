import { NextResponse } from "next/server";
import * as CampaignServices from "@/app/_services/CampaignServices";
import { updateCampaignSchema } from "@/app/_libs/validation";

/**
 * @route GET /api/campaigns/[id]
 * @description Obtém os detalhes de uma campanha específica pelo ID
 * @param {Request} req - Objeto da requisição
 * @param {Object} param - Parâmetros da requisição
 * @param {string} param.params.id - ID da campanha a ser buscada
 * @returns {NextResponse} JSON com os detalhes da campanha ou mensagem de erro
 */
export async function GET(req: Request, param: { params: { id: string } }) {
  const { id } = await param.params;
  try {
    const campaign = await CampaignServices.singleCampaign(id);
    if (!campaign) {
      return NextResponse.json(
        { message: "Campanha não encontrada ou deletada" },
        { status: 404 }
      );
    }
    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Erro ao buscar campanha" },
      { status: 500 }
    );
  }
}

/**
 * @route PUT /api/campaigns/[id]
 * @description Atualiza os detalhes de uma campanha específica
 * @param {Request} req - Objeto da requisição contendo o corpo com os novos dados
 * @param {Object} param - Parâmetros da requisição
 * @param {string} param.params.id - ID da campanha a ser atualizada
 * @returns {NextResponse} JSON com a campanha atualizada ou mensagem de erro
 */
export async function PUT(req: Request, param: { params: { id: string } }) {
  const { id } = await param.params;

  try {
    const body = await req.json();
    const validatedBody = updateCampaignSchema.parse(body);
    const updatedCampaign = await CampaignServices.updateCampaign(
      id,
      validatedBody
    );

    return NextResponse.json(updatedCampaign, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Erro ao atualizar campanha" },
      { status: 500 }
    );
  }
}

/**
 * @route DELETE /api/campaigns/[id]
 * @description Exclui uma campanha específica pelo ID
 * @param {Request} req - Objeto da requisição
 * @param {Object} param - Parâmetros da requisição
 * @param {string} param.params.id - ID da campanha a ser deletada
 * @returns {NextResponse} JSON confirmando a exclusão ou mensagem de erro
 */
export async function DELETE(req: Request, param: { params: { id: string } }) {
  const { id } = await param.params;
  try {
    await CampaignServices.deleteCampaign(id);
    return NextResponse.json(
      { message: "Campanha deletada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Campanha não encontrada ou já deletada" },
      { status: 404 }
    );
  }
}
