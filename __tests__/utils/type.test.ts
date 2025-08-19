import {
  PersonalDetails,
  Summary,
  Experience,
  Project,
  Skill,
  Education,
  Resume,
} from "@/utils/type";

describe("Types sanity checks", () => {
  it("PersonalDetails object has correct properties", () => {
    const details: PersonalDetails = {
      resumeId: "r1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      jobTitle: "Developer",
      socialLink: "https://linkedin.com/in/john",
    };

    expect(details).toHaveProperty("resumeId");
    expect(details).toHaveProperty("firstName");
    expect(details).toHaveProperty("lastName");
    expect(details).toHaveProperty("email");
    expect(details).toHaveProperty("jobTitle");
    expect(details).toHaveProperty("socialLink");
  });

  it("Summary object has correct properties", () => {
    const summary: Summary = {
      id: "s1",
      resumeId: "r1",
      content: "Experienced dev",
    };
    expect(summary).toHaveProperty("id");
    expect(summary).toHaveProperty("resumeId");
    expect(summary).toHaveProperty("content");
  });

  it("Experience object has correct properties", () => {
    const exp: Experience = {
      id: "e1",
      jobTitle: "Frontend Dev",
      company: "ABC Corp",
      startDate: "2023-01-01",
      current: true,
      description: "Worked on React apps",
    };
    expect(exp).toHaveProperty("id");
    expect(exp).toHaveProperty("jobTitle");
    expect(exp).toHaveProperty("company");
    expect(exp).toHaveProperty("startDate");
    expect(exp).toHaveProperty("current");
    expect(exp).toHaveProperty("description");
  });

  it("Project object supports optional properties", () => {
    const project: Project = {
      id: "p1",
      name: "Portfolio",
      description: "My personal portfolio",
      url: null,
      repoUrl: null,
      caseStudyUrl: null,
    };
    expect(project).toHaveProperty("id");
    expect(project).toHaveProperty("name");
    expect(project).toHaveProperty("description");
  });

  it("Education object supports optional field and endDate", () => {
    const edu: Education = {
      id: "edu1",
      institution: "XYZ University",
      degree: "BSc CS",
      startDate: "2018-01-01",
      current: true,
    };
    expect(edu).toHaveProperty("institution");
    expect(edu).toHaveProperty("degree");
  });

  it("Skill object has id and name", () => {
    const skill: Skill = { id: "s1", name: "React" };
    expect(skill).toHaveProperty("id");
    expect(skill).toHaveProperty("name");
  });

  it("Resume object has required dates", () => {
    const resume: Resume = {
      id: "r1",
      userId: "u1",
      title: "My Resume",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(resume).toHaveProperty("id");
    expect(resume).toHaveProperty("userId");
    expect(resume).toHaveProperty("title");
    expect(resume.createdAt).toBeInstanceOf(Date);
    expect(resume.updatedAt).toBeInstanceOf(Date);
  });
});
