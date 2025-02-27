import { useState } from "react";
import { useCampaigns } from "../context/CampaignContext";
import { Status, Category } from "@prisma/client";
import Button from "./ButtomComponent";
import TextInput from "./TextInputComponent";
import SelectComponent from "./SelectComponent";
import DateTimeComponent from "./DateTimeComponent";
import TextareaComponent from "./TextAreaComponent";

const CreateCampaign = () => {
  const today = new Date();
  const todayIso = today.toISOString().split("T")[0];
  const currentTime = today.toTimeString().split(" ")[0].slice(0, 5);

  const { addCampaign, setExpiredCampaigns } = useCampaigns();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateInitial, setDateInitial] = useState(todayIso);
  const [timeInitial, setTimeInitial] = useState(currentTime);
  const [dateEnd, setDateEnd] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [status, setStatus] = useState<Status>(Status.PAUSADA);
  const [category, setCategory] = useState("");

  const handleNameChange = (value: string) => setName(value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handleDateInitialChange = (value: string) => {
    setDateInitial(value);
  };

  const handleTimeInitialChange = (value: string) => {
    setTimeInitial(value);
  };
  const handleDateEndChange = (value: string) => {
    setDateEnd(value);
  };

  const handleTimeEndChange = (value: string) => {
    setTimeEnd(value);
  };
  const handleCategoryChange = (value: string) => setCategory(value);
  const handleStatusChange = (value: Status) => setStatus(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedCampaign = {
      name,
      description,
      dateInitial: new Date(`${dateInitial}T${timeInitial}:00Z`).toISOString(),
      dateEnd: new Date(`${dateEnd}T${timeEnd}:00Z`).toISOString(),
      status,
      category,
    };
    await addCampaign(formattedCampaign);
    await setExpiredCampaigns();
  };

  const clearFields = () => {
    setName("");
    setDescription("");
    setDateInitial(todayIso);
    setTimeInitial(currentTime);
    setDateEnd("");
    setTimeEnd("");
    setStatus(Status.PAUSADA);
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-md flex flex-col max-w-5xl"
    >
      <div className="flex flex-col gap-6 items-center justify-between px-5 md:flex-row md:gap-10 md:justify-start">
        <div className="flex flex-col items-center justify-center gap-8">
          <div>
            <TextInput
              inputName="name"
              value={name}
              onChange={handleNameChange}
              required
              placeholder="Nome da Campanha"
            />
          </div>
          <div>
            <TextareaComponent
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Descrição"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <DateTimeComponent
            labelDate="Data Inicial"
            dateValue={dateInitial}
            timeValue={timeInitial}
            onDateChange={handleDateInitialChange}
            onTimeChange={handleTimeInitialChange}
            minDate={todayIso}
            required
          />
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
      <div className="flex justify-start gap-10 items-center px-5">
        <SelectComponent
          inputName="status"
          value={status}
          onChange={handleStatusChange}
          options={Object.values(Status)}
          placeholder="Status"
        />
        <SelectComponent
          inputName="category"
          value={category}
          onChange={handleCategoryChange}
          options={Object.values(Category)}
          placeholder="Categorias"
        />
      </div>
      <div className="self-end">
        <Button
          type="submit"
          className="relative inline-flex w-64 items-center justify-center p-0.5 my-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 max-w-max"
        >
          Criar Campanha
        </Button>
        <Button
          onClick={clearFields}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
        >
          Limpar Campos
        </Button>
      </div>
    </form>
  );
};

export default CreateCampaign;
