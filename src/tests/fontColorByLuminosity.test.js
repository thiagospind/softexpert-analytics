import { fontColorByLuminosity } from "../utils/fontColorByLuminosity";

test('Should return "#000" for a light color', () => {
  const result = fontColorByLuminosity("#FFFFFF");
  expect(result).toBe("#000");
});

test('Should return "#fff" for a dark color', () => {
  const result = fontColorByLuminosity("#000000");
  expect(result).toBe("#fff");
});

test('Should return "#fff" for an intermediate luminosity color', () => {
  const result = fontColorByLuminosity("#808080");
  expect(result).toBe("#fff");
});
