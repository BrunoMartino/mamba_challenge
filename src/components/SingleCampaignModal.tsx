import { useState, useEffect } from "react";
import { useCampaigns } from "@/context/CampaignContext"; // Atualize o caminho conforme necessário
import TextInput from "./TextInputComponent";
import TextareaComponent from "./TextAreaComponent";
import SelectComponent from "./SelectComponent";
import { Campaign, Category, Status } from "@prisma/client";
import DateTimeComponent from "./DateTimeComponent";
import Button from "./ButtomComponent";

interface CampaignModalProps {
  campaignId: string;
  closeModal: () => void;
}

/**
 * SingleCampaignModal component.
 * Modal que exibe os detalhes de uma campanha, permitindo editar, excluir ou visualizar as informações.
 *
 * @component
 * @example
 * return (
 *   <SingleCampaignModal
 *     campaignId="1"
 *     closeModal={() => console.log("Modal fechado")}
 *   />
 * )
 *
 * @param {Object} props - Props para o componente.
 * @param {string} props.campaignId - ID da campanha a ser exibida no modal.
 * @param {Function} props.closeModal - Função para fechar o modal.
 *
 * @returns {JSX.Element|null} - O modal renderizado ou null se a campanha não estiver carregada.
 */

const SingleCampaignModal: React.FC<CampaignModalProps> = ({
  campaignId,
  closeModal,
}) => {
  const {
    getSingleCampaign,
    editCampaign,
    removeCampaign,
    setExpiredCampaigns,
  } = useCampaigns();
  const [campaign, setCampaign] = useState<Campaign | null>(null); // Ajuste o tipo conforme necessário
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<Category | string>("");
  const [status, setStatus] = useState<Status | string>("");
  const [dateInitial, setDateInitial] = useState<string>("");
  const [timeInitial, setTimeInitial] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [timeEnd, setTimeEnd] = useState<string>("");

  /**
   * Efeito que carrega os dados da campanha ao montar o componente.
   *
   * @returns {void}
   */
  useEffect(() => {
    const fetchCampaign = async () => {
      const data = await getSingleCampaign(campaignId);
      setCampaign(data);
      if (data) {
        const initialDate = new Date(data.dateInitial);
        const endDate = new Date(data.dateEnd);
        setDateInitial(initialDate.toISOString().split("T")[0]);
        setTimeInitial(initialDate.toISOString().split("T")[1].substring(0, 5));

        setDateEnd(endDate.toISOString().split("T")[0]);
        setTimeEnd(endDate.toISOString().split("T")[1].substring(0, 5));

        setName(data.name);
        setDescription(data.description);
        setCategory(data.category);
        setStatus(data.status);
        setDateInitial(initialDate.toISOString().split("T")[0]);
        setTimeInitial(initialDate.toISOString().split("T")[1].substring(0, 5));

        setDateEnd(endDate.toISOString().split("T")[0]);
        setTimeEnd(endDate.toISOString().split("T")[1].substring(0, 5));
      }
    };

    fetchCampaign();
  }, []);

  /**
   * Ativa o modo de edição para a campanha.
   *
   * @returns {void}
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Salva as alterações feitas na campanha.
   *
   * @returns {Promise<void>} - Promise que representa a operação de salvar.
   */
  const handleSave = async () => {
    if (campaign) {
      const initialDateTime = new Date(
        `${dateInitial}T${timeInitial}:00`
      ).toISOString();
      const endDateTime = new Date(`${dateEnd}T${timeEnd}:00`).toISOString();

      await editCampaign(campaign.id, {
        name,
        description,
        category,
        status,
        dateInitial: initialDateTime,
        dateEnd: endDateTime,
      });
      await setExpiredCampaigns();

      setIsEditing(false);
    }
  };

  /**
   * Exclui a campanha.
   *
   * @returns {Promise<void>} - Promise que representa a operação de exclusão.
   */
  const handleDelete = async () => {
    if (campaign) {
      await removeCampaign(campaign.id);
      closeModal();
    }
  };

  /**
   * Atualiza o estado do nome da campanha.
   *
   * @param {string} value - O novo valor do nome.
   *
   * @returns {void}
   */
  const handleNameChange = (value: string) => {
    setName(value);
  };

  /**
   * Atualiza o estado da descrição da campanha.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - O evento de mudança da descrição.
   *
   * @returns {void}
   */
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  /**
   * Atualiza o estado da categoria da campanha.
   *
   * @param {string} value - O novo valor da categoria.
   *
   * @returns {void}
   */
  const handleCategoryChange = (value: string) => setCategory(value);

  /**
   * Atualiza o estado do status da campanha.
   *
   * @param {Status} value - O novo valor do status.
   *
   * @returns {void}
   */
  const handleStatusChange = (value: Status) => setStatus(value);
  /**
   * Atualiza o estado da data inicial da campanha.
   *
   * @param {string} value - O novo valor da data inicial.
   *
   * @returns {void}
   */
  const handleDateInitialChange = (value: string) => {
    setDateInitial(value);
  };
  /**
   * Atualiza o estado do horário inicial da campanha.
   *
   * @param {string} value - O novo valor do horário inicial.
   *
   * @returns {void}
   */
  const handleTimeInitialChange = (value: string) => {
    setTimeInitial(value);
  };

  /**
   * Atualiza o estado da data final da campanha.
   *
   * @param {string} value - O novo valor da data final.
   *
   * @returns {void}
   */
  const handleDateEndChange = (value: string) => {
    setDateEnd(value);
  };

  /**
   * Atualiza o estado do horário final da campanha.
   *
   * @param {string} value - O novo valor do horário final.
   *
   * @returns {void}
   */
  const handleTimeEndChange = (value: string) => {
    setTimeEnd(value);
  };

  if (!campaign) return null;

  return (
    <div className="fixed overflow-y-auto inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{campaign.name}</h2>
        <form>
          <div className="flex gap-8 py-5 flex-col md:flex-row">
            <div className="flex flex-col">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <TextInput
                  inputName="name"
                  value={name}
                  onChange={handleNameChange}
                  disabled={!isEditing}
                  placeholder=""
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>

                <TextareaComponent
                  name="description"
                  value={description}
                  onChange={handleDescChange}
                  disabled={!isEditing}
                  placeholder=""
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <SelectComponent
                  inputName="category"
                  value={category}
                  onChange={handleCategoryChange}
                  options={Object.values(Category)}
                  placeholder="Categorias"
                  disabled={!isEditing}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <SelectComponent
                  inputName="status"
                  value={status}
                  onChange={handleStatusChange}
                  options={Object.values(Status)}
                  placeholder="Status"
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="flex md:flex-col gap-5 items-center justify-center">
              <div className="mb-4">
                <DateTimeComponent
                  labelDate="Data Inicial"
                  dateValue={dateInitial}
                  timeValue={timeInitial}
                  onDateChange={handleDateInitialChange}
                  onTimeChange={handleTimeInitialChange}
                  minDate={dateInitial}
                  required
                />
              </div>

              <div className="mb-4">
                <DateTimeComponent
                  labelDate="Data Final"
                  dateValue={dateEnd}
                  timeValue={timeEnd}
                  onDateChange={handleDateEndChange}
                  onTimeChange={handleTimeEndChange}
                  minDate={dateInitial}
                  required
                />
              </div>
            </div>
          </div>
        </form>

        <div className="flex justify-between">
          {isEditing ? (
            <Button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
              onClick={handleSave}
            >
              Salvar
            </Button>
          ) : (
            <Button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              onClick={handleEdit}
            >
              Editar
            </Button>
          )}

          <Button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            onClick={handleDelete}
          >
            Remover
          </Button>

          <Button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            onClick={closeModal}
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleCampaignModal;
