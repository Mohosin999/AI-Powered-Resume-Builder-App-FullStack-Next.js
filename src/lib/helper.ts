export function generatePrompt(
  type: "summary" | "experience" | "project" | "skills",
  data: string
) {
  switch (type) {
    case "summary":
      return `Job Title: ${data}. Depending on the job title, please provide a summary for my resume in 4 to 5 lines without any extra description.`;
    case "experience":
      return `Job Title: ${data}. Generate only 4–5 concise bullet points (no paragraphs, no bold text, no extra description). Keep each point short and to the point. Format like this:
• point one
• point two
`;
    case "project":
      return `Project Name: ${data}. Generate a 3–5 bullet point description detailing purpose, technologies, and key features.`;
    case "skills":
      return `Resume Title: ${data}. Suggest 6–8 relevant skills for this title in a comma-separated format.`;
  }
}
