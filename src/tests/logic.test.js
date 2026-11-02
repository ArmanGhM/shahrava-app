/**
 * SHAHRAVA — Data Logic Smoke Tests
 * Run: npm test
 */

import { test } from "node:test";
import assert from "node:assert";
import { CITIES, getCityById, searchCities } from "../src/data/cities.js";

test("CITIES array is non-empty", () => {
  assert.ok(CITIES.length > 0, "CITIES should have at least 1 entry");
});

test("getCityById returns Tehran for unknown id", () => {
  assert.strictEqual(getCityById("nonexistent-city").id, "tehran");
});

test("getCityById is case-insensitive", () => {
  assert.strictEqual(getCityById("TOKYO").id, "tokyo");
  assert.strictEqual(getCityById("Paris").id, "paris");
  assert.strictEqual(getCityById("TEHRAN").id, "tehran");
});

test("searchCities matches Persian city name", () => {
  const results = searchCities("تهران");
  assert.ok(results.some((c) => c.id === "tehran"));
});

test("searchCities matches English city name", () => {
  const results = searchCities("paris");
  assert.ok(results.some((c) => c.id === "paris"));
});

test("searchCities filters by continent", () => {
  const european = searchCities("", "europe");
  assert.ok(european.length > 0);
  assert.ok(european.every((c) => c.continent === "europe"));
});

test("All cities have required bilingual fields", () => {
  CITIES.forEach((city) => {
    assert.ok(city.id, `Missing id`);
    assert.ok(city.nameFa && city.nameEn, `Missing name for ${city.id}`);
    assert.ok(
      city.taglineFa && city.taglineEn,
      `Missing tagline for ${city.id}`,
    );
    assert.ok(
      city.overviewFa && city.overviewEn,
      `Missing overview for ${city.id}`,
    );
    assert.ok(
      Array.isArray(city.attractions),
      `Missing attractions for ${city.id}`,
    );
    assert.ok(
      city.climate?.highs?.length === 12,
      `Wrong climate length for ${city.id}`,
    );
    assert.ok(
      Array.isArray(city.populationHistory),
      `Missing pop history for ${city.id}`,
    );
  });
});

test("All attractions have bilingual yearBuilt", () => {
  let checked = 0;
  CITIES.forEach((city) => {
    (city.attractions || []).forEach((attr) => {
      if (attr.yearBuilt) {
        assert.ok(
          typeof attr.yearBuilt === "object",
          `yearBuilt must be { fa, en } object for ${city.id}/${attr.id}`,
        );
        assert.ok(attr.yearBuilt.fa, `Missing yearBuilt.fa for ${attr.id}`);
        assert.ok(attr.yearBuilt.en, `Missing yearBuilt.en for ${attr.id}`);
        checked++;
      }
    });
  });
  assert.ok(checked > 0, "No yearBuilt fields checked (data might be empty)");
});

test("All attractions have valid coordinates", () => {
  CITIES.forEach((city) => {
    (city.attractions || []).forEach((attr) => {
      assert.ok(
        Array.isArray(attr.coordinates) && attr.coordinates.length === 2,
        `Invalid coordinates for ${attr.id}`,
      );
      const [lat, lon] = attr.coordinates;
      assert.ok(
        lat >= -90 && lat <= 90,
        `Latitude out of range for ${attr.id}`,
      );
      assert.ok(
        lon >= -180 && lon <= 180,
        `Longitude out of range for ${attr.id}`,
      );
    });
  });
});

test("All attractions have both FA and EN names", () => {
  CITIES.forEach((city) => {
    (city.attractions || []).forEach((attr) => {
      assert.ok(attr.nameFa, `Missing nameFa for ${attr.id}`);
      assert.ok(attr.nameEn, `Missing nameEn for ${attr.id}`);
      assert.ok(attr.category, `Missing category for ${attr.id}`);
    });
  });
});

test("CITIES has 13 curated cities", () => {
  // If you add/remove cities, update this count
  assert.strictEqual(CITIES.length, 13);
});
