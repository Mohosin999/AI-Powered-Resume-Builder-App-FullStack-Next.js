export function generatePrompt(
  type: "summary" | "experience" | "project" | "skills",
  data: string
) {
  switch (type) {
    case "summary":
      return `Job Title: ${data}. Depending on the job title, please provide a summary for my resume in 4 to 5 lines without any extra description.`;
    case "experience":
      return `Job Title: ${data}. Generate only 3 bullet points (no paragraphs, no bold text, no extra description). Highlight key responsibilities, challenges faced and how they were solved, and main contribution areas. Write each point within or less then two lines. Format like this:
• point one
• point two
`;
    case "project":
      return `Project Name: ${data}. Generate only 3 bullet points (no paragraphs, no bold text, no extra description) with what I faced while working on this project, how I solved those challenges, what I learned, and what features I implemented. Write each point within or less then two lines. Format like this:
• point one
• point two
`;
    case "skills":
      return `Resume Title: ${data}. Suggest 7 major relevant skills (like React.js, Node.js) for this title in a comma-separated format. Only skills name, no extra description.`;
  }
}
