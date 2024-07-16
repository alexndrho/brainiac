enum StepEnum {
  CATEGORY,
  DIFFICULTY,
  GAME,
}

enum CategoryEnum {
  RANDOM = "random",
  GENERAL_KNOWLEDGE = "general_knowledge",
  SCIENCE = "science",
  SPORT_AND_LEISURE = "sport_and_leisure",
  FILM_AND_TV = "film_and_tv",
  MUSIC = "music",
  HISTORY = "history",
  GEOGRAPHY = "geography",
  ART_AND_LITERATURE = "art_and_literature",
  FOOD_AND_DRINK = "food_and_drink",
}

enum DifficultyEnum {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

const CategoryLabel = {
  [CategoryEnum.RANDOM]: {
    label: "Random 🎲",
    color: "red",
  },
  [CategoryEnum.GENERAL_KNOWLEDGE]: {
    label: "General Knowledge 💡",
    color: "blue",
  },
  [CategoryEnum.SCIENCE]: {
    label: "Science 🧪",
    color: "green",
  },
  [CategoryEnum.SPORT_AND_LEISURE]: {
    label: "Sport & leisure ⚽",
    color: "grape",
  },
  [CategoryEnum.FILM_AND_TV]: {
    label: "Film & TV 🎞️",
    color: "gray",
  },
  [CategoryEnum.MUSIC]: {
    label: "Music 🎹",
    color: "pink",
  },
  [CategoryEnum.HISTORY]: {
    label: "History 📜",
    color: "yellow",
  },
  [CategoryEnum.GEOGRAPHY]: {
    label: "Geography 🌎",
    color: "orange",
  },
  [CategoryEnum.ART_AND_LITERATURE]: {
    label: "Art & Literature 📚",
    color: "indigo",
  },
  [CategoryEnum.FOOD_AND_DRINK]: {
    label: "Food & Drink 🍔",
    color: "lime",
  },
} as const;

export { StepEnum, CategoryEnum, DifficultyEnum, CategoryLabel };
