# History Manager

The History Manager is a TypeScript class that provides undo and redo functionality for managing a history of states. It's designed to be flexible and can work with any type of state.

## Features

- Add new states to the history
- Undo and redo operations
- Prevent rapid consecutive additions (debounce)
- Clear entire history
- Check if undo or redo operations are possible
- Retrieve current state and index
- Get all steps in the history
