export function CurrentStep({
  currentStepIndex,
  currentStep,
}: {
  currentStepIndex: number;
  currentStep: string | undefined;
}) {
  return (
    <div className="bg-popover rounded-md p-4">
      <h2 className="text-xl font-semibold mb-3 text-popover-foreground">
        Current Step
      </h2>
      <div className="bg-muted text-muted-foreground px-3 py-2 rounded-md break-words">
        {currentStepIndex + 1}. {currentStep || "N/A"}
      </div>
    </div>
  );
}
