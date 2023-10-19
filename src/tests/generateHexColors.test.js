import {
  generateRandomColor,
  validateHexColor,
} from "../utils/generateHexColors";

describe("generateRandomColor", () => {
  test("deve gerar uma cor hexadecimal válida", () => {
    const randomColor = generateRandomColor();
    expect(validateHexColor(randomColor)).toBe(true);
  });
});

describe("validateHexColor", () => {
  test("deve retornar true para uma cor hexadecimal válida", () => {
    const validHexColor = "#FFA500"; // Laranja é uma cor válida
    expect(validateHexColor(validHexColor)).toBe(true);
  });

  test("deve retornar false para uma cor hexadecimal inválida", () => {
    const invalidHexColor = "#12345"; // Menos de 6 dígitos hexadecimais
    expect(validateHexColor(invalidHexColor)).toBe(false);
  });
});
