/**
 * Turn text into colored text
 * @param text - The text you want to format to rainbow colors.
 * @example rainbowText('This is rainbow text!');
 */
function rainbowText(text: string): string {
  const rainbowCode: string[] = [
    "§4",
    "§c",
    "§6",
    "§e",
    "§g",
    "§2",
    "§a",
    "§b",
    "§3",
    "§9",
    "§5",
    "§d",
  ];
  const letter: string[] = text.replace(/§./g, "").split("");

  let newMessage: string = "";
  let rainbowIndex: number = 0;

  letter.forEach((letter) => {
    if (letter !== " ") {
      newMessage += `${rainbowCode[rainbowIndex]}${letter}`;
      rainbowIndex + 1 >= rainbowCode.length
        ? (rainbowIndex = 0)
        : rainbowIndex++;
    } else newMessage += " ";
  });

  return newMessage;
}

/**
 * This will display in text in thousands, millions and etc... For ex: "1400 -> "1.4k", "1000000" -> "1M", etc...
 * @param number - The number you want to convert
 * @example metricNumbers(15000);
 */
function metricNumbers(value: number): string | number {
  const types: string[] = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  const selectType: number = (Math.log10(value) / 3) | 0;

  if (selectType == 0) return value;
  let scaled: number = value / Math.pow(10, selectType * 3);

  return scaled.toFixed(1) + types[selectType];
}

/**
 * Will format your number. For ex: "1400" -> "1,400", "1000000" -> "1,000,000", etc...
 * @param number - The number you want to convert
 * @example thousandsSeparator(15000);
 */
function thousandsSeparator(value: number): string {
  if (typeof value !== "number") return;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Encrypt text
 * @param text
 */
function EncryptText(text: string): string {
  return text
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(10);
    })
    .join("|");
}

/**
 * Decrypt text
 * @param encrypt
 */
function DecryptText(encrypt: string): string {
  return encrypt
    .split("|")
    .map((char) => {
      return String.fromCharCode(parseInt(char, 10));
    })
    .join("");
}

export {
  rainbowText,
  metricNumbers,
  thousandsSeparator,
  EncryptText,
  DecryptText,
};
