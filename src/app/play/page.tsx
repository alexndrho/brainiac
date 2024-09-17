"use client";

import { useState } from "react";
import CategoryPanel from "./steps/CategoryPanel";
import DifficultyPanel from "./steps/DifficultyPanel";
import Game from "./steps/Game";
import {
  CategoryEnum,
  DifficultyEnum,
  NumberOfQuestionType,
  StepEnum,
} from "@/types/PlayEnum";

export default function Play() {
  const [step, setStep] = useState<StepEnum>(StepEnum.CATEGORY);
  const [category, setCategory] = useState<CategoryEnum>(CategoryEnum.RANDOM);
  const [numberOfQuestions, setNumberOfQuestions] =
    useState<NumberOfQuestionType>(10);
  const [difficulty, setDifficulty] = useState<DifficultyEnum>(
    DifficultyEnum.MEDIUM
  );

  switch (step) {
    case StepEnum.CATEGORY:
      return (
        <CategoryPanel
          setCategory={(category: CategoryEnum) => {
            setCategory(category);
            setStep(StepEnum.DIFFICULTY);
          }}
        />
      );
    case StepEnum.DIFFICULTY:
      return (
        <DifficultyPanel
          category={category}
          numberOfQuestions={numberOfQuestions}
          difficulty={difficulty}
          setNumberOfQuestions={setNumberOfQuestions}
          setDifficulty={setDifficulty}
          onStart={() => setStep(StepEnum.GAME)}
          onCancel={() => setStep(StepEnum.CATEGORY)}
        />
      );
    case StepEnum.GAME:
      return (
        <Game
          category={category}
          numberOfQuestions={numberOfQuestions}
          difficulty={difficulty}
          onCancel={() => setStep(StepEnum.CATEGORY)}
        />
      );
  }
}
