"use client";

import { ComponentType } from "react";
import { Zap, Trophy, Swords, UserStar } from "lucide-react";

import { Card } from "@/components/ui/card";

import {
  Questionnaire,
  QuestionnaireProgress,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireDescription,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireActions,
  QuestionnaireError,
  QuestionnairePrevious,
  QuestionnaireNext,
  QuestionnaireSubmit,
} from "@/components/ui/questionnaire";

type Question = {
  title: string;
  description: string;
  name: string;
  required: boolean;
  choices: Choice[];
};
type Choice = {
  label: string;
  value: string;
  description: string;
  icon: ComponentType;
};

const questions: Question[] = [
  {
    name: "format",
    title: "Match Format",
    description: "Select the format for the match.",
    required: true,
    choices: [
      {
        label: "Best of 3",
        value: "bo3",
        description: "Quick match - 2 wins.",
        icon: Zap,
      },
      {
        label: "Best of 5",
        value: "bo5",
        description: "Standard match - 3 wins.",
        icon: Trophy,
      },
    ],
  },
  {
    name: "assignment",
    title: "Player Assignment",
    description: "Select the assignment for the match.",
    required: true,
    choices: [
      {
        label: "Host Decides",
        value: "host",
        description: 'The host decides who is "home" and who is "away".',
        icon: UserStar,
      },
      {
        label: "Rock Paper Scissors",
        value: "rps",
        description: 'Winner decides who is "home" and who is "away".',
        icon: Swords,
      },
    ],
  },
];

export default function NewLobbyTab() {
  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">Set Up a new Lobby</h2>
      <Questionnaire className="mx-auto max-w-md" items={questions}>
        {questions.map((question) => (
          <QuestionnaireItem
            key={question.name}
            name={question.name}
            required={question.required}
          >
            <QuestionnaireTitle>{question.title}</QuestionnaireTitle>
            <QuestionnaireDescription>
              {question.description}
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              {question.choices.map((choice) => {
                const Icon: ComponentType = choice.icon;
                return (
                  <QuestionnaireChoice key={choice.value} value={choice.value}>
                    <div className="flex items-center space-x-2">
                      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-sm p-2">
                      <Icon />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{choice.label}</span>
                        <span className="text-muted-foreground">
                          {choice.description}
                        </span>
                      </div>
                    </div>
                  </QuestionnaireChoice>
                );
              })}
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
        ))}
        <QuestionnaireActions>
          <QuestionnairePrevious>Previous</QuestionnairePrevious>
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Create Lobby</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </Card>
  );
}
