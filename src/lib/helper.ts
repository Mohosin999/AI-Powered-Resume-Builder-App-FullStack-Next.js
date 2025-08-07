/**
 * Function to Generate Prompt
 *
 * @param type type will be a string
 * @param data data will be a string
 * @returns
 */
export function generatePrompt(
  type: "summary" | "experience" | "project" | "skills",
  data: string
) {
  switch (type) {
    case "summary":
      return `Job Title: ${data}. Depending on the job title, please provide a summary for experts for my resume within 4 to 5 lines (no extra description, no extra starting introduction needed, just 4 to 5 lines actual summary).`;
    case "experience":
      return `Job Title: ${data}. Generate only 3 bullet points (no paragraphs, no bold text, no extra description). Highlight key responsibilities, challenges faced and how they were solved, and main contribution areas. Write each point within two lines or less then two lines. Must give bullet point before starting each line •, not *, #, 1/2/3 or others, ok. Format like this:
• point one
• point two
`;
    case "project":
      return `Project Name: ${data}. Generate only 3 bullet points (no paragraphs, no bold text, no extra description) with what I faced while working on this project, how I solved those challenges, what I learned, and what features I implemented. Write each point within two lines or less then two lines. Must give bullet point before starting each line •, not *, #, 1/2/3 or others, ok. Format like this:
• point one
• point two
`;
    case "skills":
      return `Resume Title: ${data}. Suggest 10 major relevant skills (like React.js, Node.js) for this title in a comma-separated format. Only skills name, no extra description.`;
  }
}

/**
 * Features Array to Show in the Home Page
 */
export const features = [
  {
    title: "Generate Resume with AI",
    description:
      "Quickly generate complete resume sections like summaries and bullet points with AI assistance to save time and improve quality.",
  },
  {
    title: "AI-Powered Suggestions",
    description:
      "Receive smart AI suggestions to enhance your resume content, making it more professional, concise, and impactful.",
  },
  {
    title: "Auto-Formatted Professional Layout",
    description:
      "No need to adjust fonts, spacing, or layout—your resume is automatically formatted into a world-class professional template.",
  },

  {
    title: "Skip Sections as You Wish",
    description:
      "You have full control—skip any section you don't want to fill in without affecting the resume format or structure.",
  },
  {
    title: "Preview Your Resume Anytime",
    description:
      "Easily navigate to the Preview Page to see how your resume looks before downloading or submitting.",
  },
  {
    title: "Instant PDF Download",
    description:
      "Download your resume in a high-quality PDF file instantly with a single click, ready for job applications.",
  },
];

/**
 * ========================= Framer Motion Variants =========================
 * Animation Variants
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 100 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, amount: 0 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, amount: 0 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, amount: 0 },
};
