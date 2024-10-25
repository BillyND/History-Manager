import { Button } from "./ui/button";

export default function HistoryInput({
  inputValue,
  handleInputChange,
  handleUndo,
  handleRedo,
  canUndo,
  canRedo,
}: {
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="flex-grow border border-input px-4 py-2 rounded-md bg-background text-foreground"
        placeholder="Type something..."
      />
      <Button onClick={handleUndo} variant="outline" disabled={!canUndo}>
        Undo
      </Button>
      <Button onClick={handleRedo} variant="outline" disabled={!canRedo}>
        Redo
      </Button>
    </div>
  );
}
