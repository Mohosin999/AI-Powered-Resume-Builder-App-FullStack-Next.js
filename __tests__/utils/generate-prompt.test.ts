import { generatePrompt } from "@/utils/generate-prompt";

describe("generatePrompt", () => {
  const data = "Senior Frontend Developer";

  it("generates summary prompt correctly", () => {
    const prompt = generatePrompt("summary", data);
    expect(prompt).toContain(`Job Title: ${data}`);
    expect(prompt).toContain("please provide a summary");
  });

  it("generates experience prompt correctly", () => {
    const prompt = generatePrompt("experience", data);
    expect(prompt).toContain(`Job Title: ${data}`);
    expect(prompt).toContain("Generate only 3 bullet points");
    expect(prompt).toContain("• point one");
  });

  it("generates project prompt correctly", () => {
    const prompt = generatePrompt("project", data);
    expect(prompt).toContain(`Project Name: ${data}`);
    expect(prompt).toContain("Generate only 3 bullet points");
    expect(prompt).toContain("• point one");
  });

  it("generates skills prompt correctly", () => {
    const prompt = generatePrompt("skills", data);
    expect(prompt).toContain(`Resume Title: ${data}`);
    expect(prompt).toContain("Suggest 10 major relevant skills");
    expect(prompt).toContain("React.js");
  });

  it("always returns a string", () => {
    expect(typeof generatePrompt("summary", data)).toBe("string");
    expect(typeof generatePrompt("experience", data)).toBe("string");
    expect(typeof generatePrompt("project", data)).toBe("string");
    expect(typeof generatePrompt("skills", data)).toBe("string");
  });
});
