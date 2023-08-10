// format date
export const formatDate = (data: String, result_type: String) => {
  console.log('data:::', data);
  console.log('result_type:::', result_type);
};

//
export const pasteHandler = (event: Event) => {
  event.preventDefault(); // Prevent the default paste behavior
  const clipboardData = (event as ClipboardEvent).clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData('text/plain');
  console.log(pastedText);
  // Do whatever validation or processing you need to do with the pasted text
};

//
export const dropHandler = (event: Event) => {
  event.preventDefault(); // Prevent the default drop behavior
};
