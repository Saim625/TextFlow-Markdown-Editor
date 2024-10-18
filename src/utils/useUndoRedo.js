// useUndoRedo.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInputText } from "./textSlice";

export const useUndoRedo = () => {
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const inputText = useSelector((store) => store.text.inputText);
  const dispatch = useDispatch();

  const addToUndoStack = (currentText) => {
    // Avoid adding the same text twice to the undo stack
    if (undoStack[undoStack.length - 1] !== currentText) {
      setUndoStack((prev) => [...prev, currentText]);
      console.log("Added to Undo Stack:", currentText);
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack.pop();
      setRedoStack((prev) => [...prev, inputText]); // Save current state to redo stack
      setUndoStack([...undoStack]); // Update undo stack after pop
      dispatch(setInputText(previousState)); // Restore previous state
      console.log("Undo:", previousState);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      addToUndoStack(inputText); // Save current state to undo stack
      dispatch(setInputText(nextState)); // Restore next state
      setRedoStack([...redoStack]); // Update redo stack after pop
      console.log("Redo:", nextState);
    }
  };

  return { handleUndo, handleRedo, addToUndoStack };
};

export default useUndoRedo;
