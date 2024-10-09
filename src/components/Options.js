import React, { useState } from "react";
import { setInputText } from "../utils/textSlice";
import { useDispatch, useSelector } from "react-redux";
import getSelectionDetails from "../utils/getSelectionDetails";

const Options = () => {
  const dispatch = useDispatch();
  const inputText = useSelector((store) => store.text.inputText);
  const [isOpen, setIsOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const applyBold = () => {
    const { textarea, start, end, selectedText } =
      getSelectionDetails(inputText);
    const newText = `${inputText.slice(
      0,
      start
    )}**${selectedText}**${inputText.slice(end)}`;
    dispatch(setInputText(newText));
    textarea.setSelectionRange(start + 2, end + 2);
  };
  const applyItalic = () => {
    const { textarea, start, end, selectedText } =
      getSelectionDetails(inputText);
    const newText = `${inputText.slice(
      0,
      start
    )}*${selectedText}*${inputText.slice(end)}`;
    dispatch(setInputText(newText));
    textarea.setSelectionRange(start + 2, end + 2);
  };
  const applyHeading = (headingLevel) => {
    const { textarea, start, end, selectedText } =
      getSelectionDetails(inputText);
    const newText = `${inputText.slice(0, start)}${"#".repeat(
      headingLevel
    )} ${selectedText}\n${inputText.slice(end)}`;
    dispatch(setInputText(newText));
    textarea.setSelectionRange(start + 2, end + 2);
  };
  const applyUnorderedList = () => {
    const { textarea, start, end, selectedText } =
      getSelectionDetails(inputText);
    const lines = selectedText.split("\n");
    const newText = lines.map((line) => `- ${line}`).join("\n");
    const updatedText = `${inputText.slice(
      0,
      start
    )}${newText}\n${inputText.slice(end)}`;
    dispatch(setInputText(updatedText));
    textarea.setSelectionRange(start, end + lines.length * 2);
  };
  const applyOrderedList = () => {
    const { textarea, start, end, selectedText } =
      getSelectionDetails(inputText);
    const lines = selectedText.split("\n");
    const newText = lines
      .map((line, index) => `${index + 1}. ${line}`)
      .join("\n");
    const updatedText = `${inputText.slice(
      0,
      start
    )}${newText}\n${inputText.slice(end)}`;
    dispatch(setInputText(updatedText));
    textarea.setSelectionRange(start, end + lines.length * 3);
  };
  const applyLink = () => {
    const { textarea, start, end, selectedText } =
      getSelectionDetails(inputText);
    const url = prompt("Enter the URL:");
    if (url) {
      const newText = `${inputText.slice(
        0,
        start
      )}[${selectedText}](${url})${inputText.slice(end)}`;
      dispatch(setInputText(newText));
      textarea.setSelectionRange(
        start + selectedText.length + url.length + 4,
        end + selectedText.length + url.length + 4
      );
    }
  };
  const applyImage = () => {
    const imageUrl = prompt("Enter the image URL:");
  
    // Only proceed if a URL is provided
    if (imageUrl) {
      const altText = prompt("Enter alt text for the image:") || "Image";
      const { textarea, start, end } = getSelectionDetails(inputText);
      
      // Markdown syntax for an image: ![alt text](image_url)
      const markdownImage = `![${altText}](${imageUrl})`;
      
      // Insert the image markdown into the text, replacing the selected text
      const newText = `${inputText.slice(0, start)}${markdownImage}${inputText.slice(end)}`;
      dispatch(setInputText(newText));
      
      // Adjust the cursor position after the image
      textarea.setSelectionRange(start + markdownImage.length, start + markdownImage.length);
    }
  };
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleListDropdown = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <div className="grid grid-cols-3  sm:flex m-2">
      <button
        className="bg-blue-500 p-2 rounded text-white m-1 w-20"
        onClick={applyBold}
      >
        Bold
      </button>
      <button
        className="bg-green-500 text-white p-2 rounded m-1 w-20"
        onClick={applyItalic}
      >
        Italic
      </button>
      <div className="relative">
        <button
          className="bg-yellow-500 text-white p-2 rounded m-1 w-20"
          onClick={toggleDropdown}
        >
          Heading
        </button>
        {isOpen && (
          <div className="absolute w-20 mt-2 bg-white border rounded shadow-lg">
            <button
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full"
              onClick={() => {
                applyHeading(1);
                setIsOpen(false);
              }}
            >
              H1
            </button>
            <button
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full"
              onClick={() => {
                applyHeading(2);
                setIsOpen(false);
              }}
            >
              H2
            </button>
            <button
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full"
              onClick={() => {
                applyHeading(3);
                setIsOpen(false);
              }}
            >
              H3
            </button>
          </div>
        )}
      </div>
      <button className="bg-red-500 text-white p-2 rounded m-1 w-20" onClick={applyImage}>
        Image
      </button>
      <div className="relative">
        <button
          className="bg-purple-500 text-white p-2 rounded m-1 w-20"
          onClick={toggleListDropdown}
        >
          List
        </button>
        {isListOpen && (
          <div className="absolute w-20 mt-2 bg-white border rounded shadow-lg">
            <button
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full"
              onClick={() => {
                applyUnorderedList();
                setIsListOpen(false);
              }}
            >
              ●
            </button>
            <button
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full"
              onClick={() => {
                applyOrderedList();
                setIsListOpen(false);
              }}
            >
              1.
            </button>
          </div>
        )}
      </div>
      <button className="bg-teal-500 text-white p-2 rounded m-1 w-20" onClick={applyLink}>
        Link
      </button>
    </div>
  );
};

export default Options;
