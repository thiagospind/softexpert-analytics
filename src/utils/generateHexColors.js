export const generateRandomColor = () => {
  let randomColor;
  do {
    randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } while (!validateHexColor(randomColor));
  return randomColor;
};

const validateHexColor = (hexColor) => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
    return false;
  }
  for (let i = 1; i < hexColor.length; i++) {
    const char = hexColor.charAt(i);
    if (!/[0-9A-Fa-f]/.test(char)) {
      return false;
    }
  }
  return true;
};
