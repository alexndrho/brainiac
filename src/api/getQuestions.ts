import { Category, Difficulty } from '../pages/Play';
import IQuestion from '../types/IQuestion';

const getQuestions = async (category: Category, difficulty: Difficulty) => {
  const queryCategory =
    category === Category.RANDOM ? '' : `&categories=${category}&`;

  const url = `https://the-trivia-api.com/v2/questions?limit=10&${queryCategory}difficulties=${difficulty}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const data: IQuestion[] = await response.json();

  return data;
};

export default getQuestions;
