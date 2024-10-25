/**
 * HistoryManager class for managing a history of states with undo and redo functionality.
 * @template T The type of the state being managed.
 */
export class HistoryManager<T> {
  private store: T[]; // Stores the history steps as an array
  private currentIndex: number; // Tracks the current position in history
  private lastStepTime: number; // Timestamp of the last added step

  /**
   * Initializes a new instance of HistoryManager.
   */
  constructor() {
    this.store = [];
    this.currentIndex = -1;
    this.lastStepTime = 0;
  }

  /**
   * Adds a new step to the history.
   * @param value The state to be added as a new step.
   */
  addStep(value: T): void {
    const currentTime = Date.now();

    // Prevent rapid consecutive additions
    if (currentTime - this.lastStepTime < 200) {
      if (this.currentIndex >= 0) {
        this.store[this.currentIndex] = value;
      } else {
        this.store.push(value);
        this.currentIndex = 0;
      }

      // Store time to avoid creating more Step under 200ms
      this.lastStepTime = currentTime;

      return;
    }

    // Remove any future steps (redo history)
    const nextStep = this.currentIndex + 1;
    if (nextStep < this.store.length) {
      this.store = this.store.slice(0, nextStep);
    }

    // Add the new step and update the current index
    this.store.push(value);
    this.currentIndex = nextStep;
    this.lastStepTime = currentTime;
  }

  /**
   * Moves the current state one step back in history.
   * @returns The previous state or undefined if at the beginning of history.
   */
  undo(): T | undefined {
    if (this.canUndo()) {
      this.currentIndex--;
      return this.store[this.currentIndex];
    }

    return undefined;
  }

  /**
   * Moves the current state one step forward in history.
   * @returns The next state or undefined if at the end of history.
   */
  redo(): T | undefined {
    const nextStep = this.currentIndex + 1;

    if (nextStep < this.store.length) {
      this.currentIndex = nextStep;
      return this.store[this.currentIndex];
    }

    return undefined;
  }

  /**
   * Clears all history and resets the manager.
   */
  clearStore(): void {
    this.store = [];
    this.currentIndex = -1;
    this.lastStepTime = 0;
  }

  /**
   * Checks if an undo operation is possible.
   * @returns True if undo is possible, false otherwise.
   */
  canUndo(): boolean {
    return this.currentIndex > -1;
  }

  /**
   * Checks if a redo operation is possible.
   * @returns True if redo is possible, false otherwise.
   */
  canRedo(): boolean {
    return this.currentIndex < this.store.length - 1;
  }

  /**
   * Retrieves the current state in the history.
   * @returns The current state or undefined if history is empty.
   */
  getCurrentStep(): T | undefined {
    return this.store[this.currentIndex];
  }

  /**
   * Retrieves the current step index.
   * @returns The current step index.
   */
  getCurrentStepIndex(): number {
    return this.currentIndex;
  }

  /**
   * Retrieves all steps in the history.
   * @returns A new array containing all history steps.
   */
  getAllSteps(): T[] {
    return [...this.store];
  }
}
