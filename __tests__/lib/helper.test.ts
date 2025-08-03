import { generatePrompt } from "@/lib/helper";

describe("generatePrompt", () => {
  it("should generate correct summary prompt", () => {
    const result = generatePrompt("summary", "Frontend Developer");
    expect(result).toBe(
      "Job Title: Frontend Developer. Depending on the job title, please provide a summary only for experts for my resume in 4 lines (no extra description, no extra starting introduction needed, just 4 lines actual summary)."
    );
  });

  it("should generate correct experience prompt", () => {
    const result = generatePrompt("experience", "Backend Developer");
    expect(result).toBe(
      `Job Title: Backend Developer. Generate only 3 bullet points (no paragraphs, no bold text, no extra description). Highlight key responsibilities, challenges faced and how they were solved, and main contribution areas. Write each point within or less then two lines. Format like this:
• point one
• point two
`
    );
  });

  it("should generate correct project prompt", () => {
    const result = generatePrompt("project", "AI Resume Builder");
    expect(result).toBe(
      `Project Name: AI Resume Builder. Generate only 3 bullet points (no paragraphs, no bold text, no extra description) with what I faced while working on this project, how I solved those challenges, what I learned, and what features I implemented. Write each point within or less then two lines. Format like this:
• point one
• point two
`
    );
  });

  it("should generate correct skills prompt", () => {
    const result = generatePrompt("skills", "Full Stack Developer");
    expect(result).toBe(
      "Resume Title: Full Stack Developer. Suggest 10 major relevant skills (like React.js, Node.js) for this title in a comma-separated format. Only skills name, no extra description."
    );
  });
});
