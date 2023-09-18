// format date
export const formatDate = (data: String, result_type: String) => {
  console.log('data:::', data);
  console.log('result_type:::', result_type);
};

export const pasteHandler = (event: Event) => {
  event.preventDefault(); // Prevent the default paste behavior
  const clipboardData = (event as ClipboardEvent).clipboardData || window?.clipboardData;
  const pastedText = clipboardData.getData('text/plain');
  console.log(pastedText);
  // Do whatever validation or processing you need to do with the pasted text
};

export const formatNumber = (num: any) => {
  const value = parseFloat(num).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return value;
};

export const copyToClipboard = (text: string) => {
  // Create a text area element to hold the text you want to copy
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);

  // Select the text within the text area
  textarea.select();

  try {
    // Attempt to copy the selected text to the clipboard
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy text to clipboard:', err);
  } finally {
    // Remove the temporary text area element
    document.body.removeChild(textarea);
  }
};
export const dropHandler = (event: Event) => {
  event.preventDefault(); // Prevent the default drop behavior
};
 