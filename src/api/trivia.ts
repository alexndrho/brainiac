import { CategoryEnum, DifficultyEnum } from "@/types/PlayEnum";
import IQuestion from "@/types/IQuestion";

const fetchQuestions = async (
  category: CategoryEnum,
  difficulty: DifficultyEnum
) => {
  const queryCategory =
    category === CategoryEnum.RANDOM ? "" : `&categories=${category}&`;

  const url = `https://the-trivia-api.com/v2/questions?limit=10&${queryCategory}difficulties=${difficulty}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data: IQuestion[] = await response.json();

  return data;
};

export { fetchQuestions };
