import { cn } from "@/lib/utils";

export function AllSteps({
  allSteps,
  currentStepIndex,
  listRef,
}: {
  allSteps: string[];
  currentStepIndex: number;
  listRef: React.RefObject<HTMLUListElement>;
}) {
  return (
    <div className="bg-popover rounded-md p-4">
      <h2 className="text-xl font-semibold mb-3 text-popover-foreground">
        {`All Steps (${allSteps.length}) `}
      </h2>
      <ul ref={listRef} className="space-y-2 max-h-60 overflow-y-auto">
        {allSteps.map((step, index) => (
          <li
            key={index}
            className={cn(
              "px-3 py-2 rounded-md break-words",
              index === currentStepIndex
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {`${index + 1}. ${step}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
