import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputText } from "../utils/textSlice";
import getSelectionDetails from "../utils/getSelectionDetails";
import useUndoRedo from "../utils/useUndoRedo";

const Options = () => {
  const { handleUndo, handleRedo, addToUndoStack } = useUndoRedo();
  const dispatch = useDispatch();
  const inputText = useSelector((store) => store.text.inputText);
  const [isOpen, setIsOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  // Add current inputText to undo stack on mount
  useEffect(() => {
    addToUndoStack(inputText);
  }, [inputText]); // Run effect when inputText changes

  const formatText = (newText, adjustment = 0) => {
    addToUndoStack(inputText); // Store the current state
    dispatch(setInputText(newText));
  };

  const applyBold = () => {
    const { textarea, start, end, selectedText } = getSelectionDetails(inputText);
    if (!selectedText) return alert("Please select text to format.");
    const newText = `${inputText.slice(0, start)}**${selectedText}**${inputText.slice(end)}`;
    formatText(newText);
    textarea.setSelectionRange(start + 2, end + 2);
  };

  const applyItalic = () => {
    const { textarea, start, end, selectedText } = getSelectionDetails(inputText);
    if (!selectedText) return alert("Please select text to format.");
    const newText = `${inputText.slice(0, start)}*${selectedText}*${inputText.slice(end)}`;
    formatText(newText);
    textarea.setSelectionRange(start + 1, end + 1);
  };

  const applyHeading = (headingLevel) => {
    const { textarea, start, end, selectedText } = getSelectionDetails(inputText);
    if (!selectedText) return alert("Please select text to format.");
    const headingPrefix = `${"#".repeat(headingLevel)} `;
    const newText = `${inputText.slice(0, start)}${headingPrefix}${selectedText}\n${inputText.slice(end)}`;
    formatText(newText);
    textarea.setSelectionRange(start + headingLevel + 1, end + headingLevel + 1);
  };

  const applyList = (isOrdered) => {
    const { textarea, start, end, selectedText } = getSelectionDetails(inputText);
    if (!selectedText) return alert("Please select text to format.");
    const lines = selectedText.split("\n");
    const newText = lines.map((line, index) => {
      return isOrdered ? `${index + 1}. ${line}` : `- ${line}`;
    }).join("\n");
    const updatedText = `${inputText.slice(0, start)}${newText}${inputText.slice(end)}`;
    formatText(updatedText);
  };

  const applyLink = () => {
    const { textarea, start, end, selectedText } = getSelectionDetails(inputText);
    if (!selectedText) return alert("Please select text to create a link.");
    const url = prompt("Enter the URL:");
    if (url) {
      const linkText = `[${selectedText}](${url})`;
      const newText = `${inputText.slice(0, start)}${linkText}${inputText.slice(end)}`;
      formatText(newText);
      textarea.setSelectionRange(start + linkText.length, start + linkText.length);
    }
  };

  const applyImage = () => {
    const imageUrl = prompt("Enter the image URL:");
    if (!imageUrl) return;
    const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;
    if (!urlPattern.test(imageUrl)) return alert("Please enter a valid URL");
    const altText = prompt("Enter alt text for the image:") || "Image";
    const { textarea, start, end } = getSelectionDetails(inputText);
    const markdownImage = `![${altText}](${imageUrl})`;
    const newText = `${inputText.slice(0, start)}${markdownImage}${inputText.slice(end)}`;
    formatText(newText);
    textarea.setSelectionRange(start + markdownImage.length, start + markdownImage.length);
  };

  return (
    <div className="grid grid-cols-3 sm:flex m-2">
      <button className="bg-blue-500 p-2 rounded text-white m-1 w-20" onClick={applyBold}>
        Bold
      </button>
      <button className="bg-green-500 text-white p-2 rounded m-1 w-20" onClick={applyItalic}>
        Italic
      </button>
      <div className="relative">
        <button className="bg-yellow-500 text-white p-2 rounded m-1 w-20" onClick={() => setIsOpen(!isOpen)}>
          Heading
        </button>
        {isOpen && (
          <div className="absolute w-20 mt-2 bg-white border rounded shadow-lg">
            <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full" onClick={() => { applyHeading(1); setIsOpen(false); }}>H1</button>
            <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full" onClick={() => { applyHeading(2); setIsOpen(false); }}>H2</button>
            <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full" onClick={() => { applyHeading(3); setIsOpen(false); }}>H3</button>
          </div>
        )}
      </div>
      <div className="relative">
        <button className="bg-orange-500 text-white p-2 rounded m-1 w-20" onClick={() => setIsListOpen(!isListOpen)}>
          List
        </button>
        {isListOpen && (
          <div className="absolute w-20 mt-2 bg-white border rounded shadow-lg">
            <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full" onClick={() => { applyList(true); setIsListOpen(false); }}>Ordered</button>
            <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full" onClick={() => { applyList(false); setIsListOpen(false); }}>Unordered</button>
          </div>
        )}
      </div>
      <button className="bg-purple-500 text-white p-2 rounded m-1 w-20" onClick={applyLink}>Link</button>
      <button className="bg-pink-500 text-white p-2 rounded m-1 w-20" onClick={applyImage}>Image</button>
      <button className="bg-gray-600 text-white p-2 rounded m-1 w-20" onClick={handleUndo}>Undo</button>
      <button className="bg-gray-400 text-white p-2 rounded m-1 w-20" onClick={handleRedo}>Redo</button>
    </div>
  );
};

export default Options;
