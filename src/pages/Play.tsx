import { useState } from 'react';
import CategoryPanel from '../components/CategoryPanel';
import DifficultyPanel from '../components/DifficultyPanel';
import Game from '../components/Game';

enum Step {
  CATEGORY,
  DIFFICULTY,
  GAME,
}

enum Category {
  RANDOM = 'random',
  GENERAL_KNOWLEDGE = 'general_knowledge',
  SCIENCE = 'science',
  SPORT_AND_LEISURE = 'sport_and_leisure',
  FILM_AND_TV = 'film_and_tv',
  MUSIC = 'music',
  HISTORY = 'history',
  GEOGRAPHY = 'geography',
}

const CategoryLabel = {
  [Category.RANDOM]: {
    label: 'Random 🎲',
    color: 'red',
  },
  [Category.GENERAL_KNOWLEDGE]: {
    label: 'General Knowledge 💡',
    color: 'blue',
  },
  [Category.SCIENCE]: {
    label: 'Science 🧪',
    color: 'green',
  },
  [Category.SPORT_AND_LEISURE]: {
    label: 'Sport & leisure ⚽',
    color: 'grape',
  },
  [Category.FILM_AND_TV]: {
    label: 'Film & TV 🎞️',
    color: 'gray',
  },
  [Category.MUSIC]: {
    label: 'Music 🎹',
    color: 'pink',
  },
  [Category.HISTORY]: {
    label: 'History 📜',
    color: 'yellow',
  },
  [Category.GEOGRAPHY]: {
    label: 'Geography 🌎',
    color: 'orange',
  },
} as const;

enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

const Play = () => {
  const [step, setStep] = useState(Step.CATEGORY);
  const [category, setCategory] = useState<Category>(Category.RANDOM);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);

  const resetSettings = () => {
    setStep(Step.CATEGORY);
    setCategory(Category.RANDOM);
    setDifficulty(Difficulty.MEDIUM);
  };

  if (step === Step.CATEGORY) {
    return (
      <CategoryPanel
        onNextStep={() => setStep(Step.DIFFICULTY)}
        onCategoryChange={setCategory}
        onCancel={resetSettings}
      />
    );
  } else if (step === Step.DIFFICULTY) {
    return (
      <DifficultyPanel
        category={category}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStart={() => setStep(Step.GAME)}
        onCancel={() => setStep(Step.CATEGORY)}
      />
    );
  } else if (step === Step.GAME) {
    return (
      <Game
        category={category}
        difficulty={difficulty}
        onCancel={resetSettings}
      />
    );
  }
};

export default Play;
export { Category, CategoryLabel, Difficulty };
