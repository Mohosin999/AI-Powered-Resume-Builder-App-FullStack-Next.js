/**
 * Function to Generate Prompt
 *
 * @param type type will be a string
 * @param data data will be a string
 */
export function generatePrompt(
  type: "summary" | "experience" | "project" | "skills",
  data: string
) {
  switch (type) {
    case "summary":
      return `Job Title: ${data}. Depending on the job title, please provide a summary for experts for my resume within 4 to 5 lines (no extra description, no extra starting introduction needed, just 4 to 5 lines actual summary). Always generate an output, never return null or undefined.`;
    case "experience":
      return `Job Title: ${data}. Generate only 3 bullet points (no paragraphs, no bold text, no extra description). Highlight key responsibilities, challenges faced and how they were solved, and main contribution areas. Write each point within two lines or less then two lines. Must give bullet point before starting each line •, no other bullet types (*, -, #, 1., etc.) are permitted. Always generate an output, never return null or undefined. Don't use space among bullet points. Format like this:
• point one
• point two
`;
    case "project":
      return `Project Name: ${data}. Generate only 3 bullet points (no paragraphs, no bold text, no extra description) with what I faced while working on this project, how I solved those challenges, what I learned, and what features I implemented. Write each point within two lines or less then two lines. Must give bullet point before starting each line •, no other bullet types (*, -, #, 1., etc.) are permitted. Always generate an output, never return null or undefined. Don't use space among bullet points. Format like this:
• point one
• point two
`;
    case "skills":
      return `Resume Title: ${data}. Suggest 10 major relevant skills (like React.js, Node.js) for this title in a comma-separated format. Only skills name, no extra description. If the input is "Senior Frontend Developer", a perfect output would be:
React.js, JavaScript (ES6+), TypeScript, Node.js, GraphQL, Webpack, CI/CD, Jest, UI/UX Design Principles, Agile Methodologies. Always generate an output, never return null or undefined.`;
  }
}
