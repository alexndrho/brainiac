interface IQuestion {
  id: string;
  category: string;
  tags: string[];
  difficulty: string;
  regions: string[];
  isNiche: boolean;
  question: {
    text: string;
  };
  correctAnswer: string;
  incorrectAnswers: string[];
  type: "text_choice" | "image_choice";
}

export default IQuestion;
