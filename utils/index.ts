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

type ObjectType = { [key: string]: any };

const generateTypesFromObject = <T extends ObjectType>(
  obj: T,
  typeName: string = 'GeneratedType',
): string => {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be a valid object.');
  }

  const typeProperties: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key as keyof T];
      const valueType = typeof value;

      let propertyType: string;

      if (valueType === 'string') {
        propertyType = 'string';
      } else if (valueType === 'number') {
        propertyType = 'number';
      } else if (valueType === 'boolean') {
        propertyType = 'boolean';
      } else if (Array.isArray(value)) {
        const arrayItemType = value.length > 0 ? typeof value[0] : 'any';
        propertyType = `${arrayItemType}[]`;
      } else if (valueType === 'object' && value !== null) {
        propertyType = generateTypesFromObject(value, `${typeName}_${key}`);
      } else {
        propertyType = 'any';
      }

      typeProperties.push(`${key}: ${propertyType};`);
    }
  }

  return `type ${typeName} = {\n  ${typeProperties.join('\n  ')}\n};`;
};
