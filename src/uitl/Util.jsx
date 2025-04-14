export const downloadReceipt = (base64Data, fileName) => {
  const byteCharacters = atob(base64Data); // Decode base64 string
  const byteNumbers = new Array(byteCharacters.length)
    .fill(null)
    .map((_, i) => byteCharacters.charCodeAt(i));

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getClassSuffix = (stdClass) => {
  if (!stdClass) return "-";

  const lastDigit = stdClass % 10;
  const lastTwoDigits = stdClass % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return `${stdClass}th`;

  switch (lastDigit) {
    case 1:
      return `${stdClass}st`;
    case 2:
      return `${stdClass}nd`;
    case 3:
      return `${stdClass}rd`;
    default:
      return `${stdClass}th`;
  }
};
