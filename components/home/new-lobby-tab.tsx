"use client";

import { ComponentType, SubmitEventHandler, useContext, useState } from "react";
import { Zap, Trophy, Swords, UserStar, Crown, House } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Questionnaire,
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
  QuestionnaireProgress,
} from "@/components/ui/questionnaire";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";


import { AppContext } from "@/lib/hooks/useApp";

type Question = {
  title: string;
  description: string;
  name: string;
  required: boolean;
  choices: Choice[];
  icon: ComponentType;
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
    icon: Crown,
    title: "How is the winner decided?",
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
    icon: House,
    title: "Who is the home player?",
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
  const [formDisabled, setFormDisabled] = useState(false);
  const { lobby } = useContext(AppContext);
  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const format = formData.get("format") as string;
    const assignment = formData.get("assignment") as string;
    setFormDisabled(true);
    try {
      await lobby.create(format, assignment);
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error",
        description: "Failed to create lobby.",
      });
    }
    setFormDisabled(false);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Up a new Lobby</CardTitle>
        <CardDescription>Configure a new lobby in two steps.</CardDescription>
      </CardHeader>
      <Questionnaire
        className="mx-auto max-w-md"
        items={questions}
        onSubmit={onSubmit}
      >
        <CardContent>
          <QuestionnaireProgress
            className="w-full"
            render={(props, state) => (
              <div {...props}>
                <div className="mb-2 flex gap-1.5" aria-hidden="true">
                  {Array.from({ length: state.total }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < state.current
                          ? "h-1.5 flex-1 rounded-full bg-primary"
                          : "h-1.5 flex-1 rounded-full bg-muted"
                      }
                    />
                  ))}
                </div>
                <span>
                  Step {state.current} of {state.total}
                </span>
              </div>
            )}
          />
          <Separator className="my-2" />
          {questions.map((question) => (
            <QuestionnaireItem
              key={question.name}
              name={question.name}
              required={question.required}
            >
              <div className="mb-4 flex space-x-2">
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-sm p-2">
                  <question.icon />
                </div>
                <div className="flex flex-col">
                  <QuestionnaireTitle>{question.title}</QuestionnaireTitle>
                  <QuestionnaireDescription>
                    {question.description}
                  </QuestionnaireDescription>
                </div>
              </div>
              <QuestionnaireChoices>
                {question.choices.map((choice) => {
                  const Icon: ComponentType = choice.icon;
                  return (
                    <QuestionnaireChoice
                      key={choice.value}
                      value={choice.value}
                    >
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
        </CardContent>
        <CardFooter>
          <QuestionnaireActions>
            <QuestionnairePrevious disabled={formDisabled}>Previous</QuestionnairePrevious>
            <QuestionnaireNext disabled={formDisabled}>Next</QuestionnaireNext>
            <QuestionnaireSubmit disabled={formDisabled}>Create Lobby</QuestionnaireSubmit>
          </QuestionnaireActions>
        </CardFooter>
      </Questionnaire>
    </Card>
  );
}
