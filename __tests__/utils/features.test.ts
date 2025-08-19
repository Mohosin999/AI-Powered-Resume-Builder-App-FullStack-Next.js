import { features, aiFeatures } from "@/utils/features";

describe("Features data", () => {
  it("should have correct number of features", () => {
    expect(features.length).toBe(6);
    expect(aiFeatures.length).toBe(4);
  });

  it("each feature should have a title and description", () => {
    features.forEach((feature) => {
      expect(feature).toHaveProperty("title");
      expect(feature).toHaveProperty("description");
      expect(typeof feature.title).toBe("string");
      expect(typeof feature.description).toBe("string");
    });

    aiFeatures.forEach((feature) => {
      expect(feature).toHaveProperty("title");
      expect(feature).toHaveProperty("description");
      expect(feature).toHaveProperty("image");
      expect(typeof feature.title).toBe("string");
      expect(typeof feature.description).toBe("string");
      expect(typeof feature.image).toBe("string");
    });
  });

  it("images in aiFeatures should have valid paths", () => {
    aiFeatures.forEach((feature) => {
      expect(feature.image).toMatch(/^\/img\/.+\.(png|jpg|jpeg|svg)$/);
    });
  });
});
