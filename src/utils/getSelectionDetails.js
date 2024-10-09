
const getSelectionDetails = (inputText) => {
      const textarea = document.querySelector('textarea'); 
      const start = textarea.selectionStart; 
      const end = textarea.selectionEnd; 
      const selectedText = inputText.slice(start, end);
    return {textarea, start, end, selectedText}
};

export default getSelectionDetails;
