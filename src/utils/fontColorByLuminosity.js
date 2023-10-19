export const fontColorByLuminosity = (hex) => {
  hex = hex.replace(/^#/, "");

  // Converte o valor hexadecimal para valores de R, G e B
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calcula a luminosidade
  const luminosity = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminosity > 128 ? "#000" : "#fff";
};
