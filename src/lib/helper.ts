export function generatePrompt(
  type: "summary" | "experience" | "project" | "skills",
  data: string
) {
  switch (type) {
    case "summary":
      return `Job Title: ${data}. Depending on the job title, please provide a summary for my resume in 4 to 5 lines without any extra description.`;
    case "experience":
      return `Job Title: ${data}. Generate only 5 bullet points (no paragraphs, no bold text, no extra description). Keep each point to the point within 2 lines. Format like this:
• point one
• point two
`;
    case "project":
      return `Project Name: ${data}. Generate only 5 bullet points (no paragraphs, no bold text, no extra description). Keep each point to the point within 2 lines. Format like this:
• point one
• point two
`;
    case "skills":
      return `Resume Title: ${data}. Suggest 10 relevant skills for this title in a comma-separated format. Only skills name, no extra description.`;
  }
}
