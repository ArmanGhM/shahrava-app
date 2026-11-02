import { test } from "node:test";
import assert from "node:assert";
import { CITIES, getCityById, searchCities } from "../src/data/cities.js";

test("CITIES is non-empty", () => {
  assert.ok(CITIES.length > 0);
});

test("getCityById is case-insensitive", () => {
  assert.strictEqual(getCityById("TOKYO").id, "tokyo");
});

test("getCityById returns Tehran fallback", () => {
  assert.strictEqual(getCityById("nonexistent").id, "tehran");
});

test("searchCities matches Persian", () => {
  assert.ok(searchCities("تهران").some(c => c.id === "tehran"));
});
