import { useCallback, useReducer } from "react";
import html2canvas from "html2canvas";
import { AnimatePresence } from "framer-motion";
import type { AppState, Answers, Answer, AssessmentResult, IntakeData } from "./lib/types";
import { emptyIntakeData } from "./lib/types";
import { scoreAssessment } from "./lib/assessment";
import { saveSubmission } from "./lib/submission-store";
import { sendToAirtable } from "./lib/airtable";
import { sendToMailerLite, sendResultsToMailerLite, type CompletedCheck } from "./lib/mailerlite";
import { questions } from "./data/questions";
import { AppShell } from "./components/app-shell";
import { IntroScreen } from "./components/intro-screen";
import { IntakeForm } from "./components/intake-form";
import { AssessmentFlow } from "./components/assessment-flow";
import { LoadingScreen } from "./components/loading-screen";
import { ResultScreen } from "./components/result-screen";

interface State {
  appState: AppState;
  intakeData: IntakeData;
  currentStep: number;
  answers: Answers;
  result: AssessmentResult | null;
  completedChecks: CompletedCheck[];
}

type Action =
  | { type: "GO_INTAKE" }
  | { type: "GO_LANDING" }
  | { type: "SUBMIT_INTAKE"; data: IntakeData }
  | { type: "SET_ANSWER"; questionId: string; answer: Answer }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SHOW_LOADING" }
  | { type: "SHOW_RESULT"; result: AssessmentResult }
  | { type: "RESTART" }
  | { type: "CHECK_ANOTHER"; check: CompletedCheck };

const initialState: State = {
  appState: "landing",
  intakeData: emptyIntakeData,
  currentStep: 0,
  answers: {},
  result: null,
  completedChecks: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "GO_INTAKE":
      return { ...state, appState: "intake" };
    case "GO_LANDING":
      return { ...state, appState: "landing" };
    case "SUBMIT_INTAKE":
      return { ...state, appState: "questionnaire", intakeData: action.data, currentStep: 0 };
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answer },
      };
    case "NEXT_STEP":
      if (state.currentStep >= questions.length - 1) {
        return state;
      }
      return { ...state, currentStep: state.currentStep + 1 };
    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
      };
    case "SHOW_LOADING":
      return { ...state, appState: "loading" };
    case "SHOW_RESULT":
      return { ...state, appState: "result", result: action.result };
    case "RESTART":
      return { ...initialState };
    case "CHECK_ANOTHER":
      return {
        ...state,
        appState: "questionnaire",
        currentStep: 0,
        answers: {},
        result: null,
        completedChecks: [...state.completedChecks, action.check],
      };
    default:
      return state;
  }
}

const WORKER_URL = "https://ai-act-check-mailerlite-proxy.nora-f83.workers.dev/";

async function uploadResultImage(canvas: HTMLCanvasElement): Promise<string | undefined> {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) { resolve(undefined); return; }
      const formData = new FormData();
      formData.append("file", blob, `result-${Date.now()}.png`);
      try {
        const res = await fetch(`${WORKER_URL}upload`, { method: "POST", body: formData });
        if (!res.ok) { resolve(undefined); return; }
        const data = await res.json() as { url?: string };
        resolve(data.url);
      } catch {
        resolve(undefined);
      }
    }, "image/png");
  });
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleStart = useCallback(() => dispatch({ type: "GO_INTAKE" }), []);
  const handleIntakeBack = useCallback(() => dispatch({ type: "GO_LANDING" }), []);

  const handleIntakeSubmit = useCallback((data: IntakeData) => {
    const submission = saveSubmission(data);
    sendToAirtable(submission);
    sendToMailerLite(submission);
    dispatch({ type: "SUBMIT_INTAKE", data });
  }, []);

  const handleAnswer = useCallback(
    (questionId: string, answer: Answer) => {
      dispatch({ type: "SET_ANSWER", questionId, answer });
    },
    []
  );

  const handleNext = useCallback(() => {
    if (state.currentStep >= questions.length - 1) {
      dispatch({ type: "SHOW_LOADING" });
      setTimeout(() => {
        const result = scoreAssessment(state.answers, state.intakeData.sector);
        dispatch({ type: "SHOW_RESULT", result });
      }, 1300);
    } else {
      dispatch({ type: "NEXT_STEP" });
    }
  }, [state.currentStep, state.answers, state.intakeData.sector]);

  const handleBack = useCallback(() => {
    if (state.currentStep === 0) {
      dispatch({ type: "GO_INTAKE" });
    } else {
      dispatch({ type: "PREV_STEP" });
    }
  }, [state.currentStep]);

  const handleRestart = useCallback(() => dispatch({ type: "RESTART" }), []);

  const handleCheckAnother = useCallback(() => {
    if (!state.result) return;
    const check: CompletedCheck = {
      systemName: state.intakeData.aiSystemsUsed || "AI-systeem",
      result: state.result,
      completedAt: new Date().toISOString(),
    };
    dispatch({ type: "CHECK_ANOTHER", check });
  }, [state.result, state.intakeData.aiSystemsUsed]);

  const handleSendResults = useCallback(async (captureEl: HTMLElement | null) => {
    if (!state.result) return false;
    const allChecks: CompletedCheck[] = [
      ...state.completedChecks,
      {
        systemName: state.intakeData.aiSystemsUsed || "AI-systeem",
        result: state.result,
        completedAt: new Date().toISOString(),
      },
    ];
    const submission = saveSubmission(state.intakeData);

    let imageUrl: string | undefined;
    if (captureEl) {
      try {
        const canvas = await html2canvas(captureEl, { scale: 1.5, useCORS: true, backgroundColor: "#ffffff" });
        imageUrl = await uploadResultImage(canvas);
      } catch {
        // capture failed — continue without image
      }
    }

    return await sendResultsToMailerLite(submission, allChecks, imageUrl);
  }, [state.result, state.intakeData, state.completedChecks]);

  return (
    <AppShell appState={state.appState}>
      <AnimatePresence mode="wait">
        {state.appState === "landing" && (
          <IntroScreen key="landing" onStart={handleStart} />
        )}
        {state.appState === "intake" && (
          <IntakeForm
            key="intake"
            data={state.intakeData}
            onSubmit={handleIntakeSubmit}
            onBack={handleIntakeBack}
          />
        )}
        {state.appState === "questionnaire" && (
          <AssessmentFlow
            key="assessment"
            sector={state.intakeData.sector}
            currentStep={state.currentStep}
            answers={state.answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {state.appState === "loading" && <LoadingScreen key="loading" />}
        {state.appState === "result" && state.result && (
          <ResultScreen
            key="result"
            result={state.result}
            companyName={state.intakeData.companyName}
            previousChecksCount={state.completedChecks.length}
            onRestart={handleRestart}
            onCheckAnother={handleCheckAnother}
            onSendResults={handleSendResults}
          />
        )}
      </AnimatePresence>
    </AppShell>
  );
}
