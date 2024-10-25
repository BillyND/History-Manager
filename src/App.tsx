import { useCallback, useEffect, useRef, useState } from "react";
import { AllSteps } from "./components/AllSteps";
import { CurrentStep } from "./components/CurrentStep";
import HistoryInput from "./components/HistoryInput";
import { demoHistoryStore } from "./lib/history/history-store";

function App() {
  const [inputValue, setInputValue] = useState("");
  const canUndo = demoHistoryStore.canUndo();
  const canRedo = demoHistoryStore.canRedo();
  const allSteps = demoHistoryStore.getAllSteps() as string[];
  const currentStep = demoHistoryStore.getCurrentStep() as string;
  const currentStepIndex = demoHistoryStore.getCurrentStepIndex();
  const listRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    demoHistoryStore.addStep(newValue);
  };

  const handleUndo = useCallback(() => {
    if (canUndo) {
      const previousValue = demoHistoryStore.undo();
      setInputValue((previousValue || "") as string);
    }
  }, [canUndo]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      const nextValue = demoHistoryStore.redo();
      setInputValue((nextValue || "") as string);
    }
  }, [canRedo]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        event.preventDefault();

        if (event.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
    },
    [handleUndo, handleRedo]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (listRef.current) {
      const currentStepElement = listRef.current.children[currentStepIndex];

      setTimeout(() => {
        currentStepElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }, [currentStepIndex]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">
        History Manager Demo
      </h1>
      <div className="w-full max-w-2xl bg-card rounded-lg shadow-lg p-6">
        <HistoryInput
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        <div className="grid grid-cols-2 gap-6">
          <AllSteps
            allSteps={allSteps}
            currentStepIndex={currentStepIndex}
            listRef={listRef}
          />
          <CurrentStep
            currentStepIndex={currentStepIndex}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
