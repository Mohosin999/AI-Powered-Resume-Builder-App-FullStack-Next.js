import {
  createResume,
  updateResume,
  deleteResume,
  getResumes,
  getResumeById,
  upsertPersonalDetails,
  getPersonalDetails,
  upsertSummary,
  getSummary,
  getExperiences,
  upsertExperience,
  deleteExperience,
  getProjects,
  upsertProject,
  deleteProject,
  getEducations,
  upsertEducation,
  deleteEducation,
  getSkills,
  createSkill,
  deleteSkill,
} from "@/actions/resume-actions";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// ========== MOCKS ==========
jest.mock("@/lib/db", () => ({
  prisma: {
    user: { findUnique: jest.fn() },
    resume: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    personalDetails: { findUnique: jest.fn(), upsert: jest.fn() },
    summary: { findUnique: jest.fn(), upsert: jest.fn() },
    experience: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
    project: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
    education: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
    skill: {
      findMany: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn((cb) => cb(prisma)),
  },
}));

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// ========== COMMON MOCK DATA ==========
const userId = "user-123";
const dbUser = { id: "db-user-1", clerkId: userId };

beforeEach(() => {
  jest.clearAllMocks();
  (auth as unknown as jest.Mock).mockResolvedValue({ userId });
  (prisma.user.findUnique as jest.Mock).mockResolvedValue(dbUser);
});

// ========== TESTS ==========
describe("Resume Actions", () => {
  it("createResume - success", async () => {
    const mockResume = {
      id: "resume-1",
      title: "My Resume",
      userId: dbUser.id,
    };
    (prisma.resume.create as jest.Mock).mockResolvedValue(mockResume);

    const formData = new FormData();
    formData.append("title", "My Resume");

    const result = await createResume(formData);
    expect(result).toBe("resume-1");
  });

  it("updateResume - success", async () => {
    const formData = new FormData();
    formData.append("id", "resume-1");
    formData.append("title", "Updated Resume");

    await updateResume(formData);
    expect(prisma.resume.update).toHaveBeenCalledWith({
      where: { id: "resume-1", userId: dbUser.id },
      data: { title: "Updated Resume" },
    });
  });

  it("deleteResume - success", async () => {
    await deleteResume("resume-1");
    expect(prisma.resume.delete).toHaveBeenCalled();
  });

  it("getResumes - returns resumes", async () => {
    const mockResumes = [{ id: "resume-1", title: "My Resume" }];
    (prisma.resume.findMany as jest.Mock).mockResolvedValue(mockResumes);

    const result = await getResumes();
    expect(result).toEqual(mockResumes);
  });

  it("getResumeById - returns resume", async () => {
    const mockResume = { id: "resume-1", title: "My Resume" };
    (prisma.resume.findUnique as jest.Mock).mockResolvedValue(mockResume);

    const result = await getResumeById("resume-1");
    expect(result).toEqual(mockResume);
  });
});

describe("Personal Details", () => {
  it("upsertPersonalDetails - success", async () => {
    const formData = new FormData();
    formData.append("resumeId", "resume-1");
    formData.append("firstName", "John");
    formData.append("lastName", "Doe");
    formData.append("email", "john@example.com");
    formData.append("jobTitle", "Developer");

    await upsertPersonalDetails(formData);
    expect(prisma.personalDetails.upsert).toHaveBeenCalled();
  });

  it("getPersonalDetails - success", async () => {
    const mockDetails = { resumeId: "resume-1", firstName: "John" };
    (prisma.personalDetails.findUnique as jest.Mock).mockResolvedValue(
      mockDetails
    );

    const result = await getPersonalDetails("resume-1");
    expect(result).toEqual(mockDetails);
  });
});

describe("Summary", () => {
  it("upsertSummary - success", async () => {
    const formData = new FormData();
    formData.append("resumeId", "resume-1");
    formData.append("content", "Summary here");

    await upsertSummary(formData);
    expect(prisma.summary.upsert).toHaveBeenCalled();
  });

  it("getSummary - success", async () => {
    const mockSummary = { resumeId: "resume-1", content: "Summary here" };
    (prisma.summary.findUnique as jest.Mock).mockResolvedValue(mockSummary);

    const result = await getSummary("resume-1");
    expect(result).toEqual(mockSummary);
  });
});

describe("Experiences", () => {
  it("getExperiences - returns list", async () => {
    (prisma.experience.findMany as jest.Mock).mockResolvedValue([
      { id: "exp-1" },
    ]);
    const result = await getExperiences("resume-1");
    expect(result).toHaveLength(1);
  });

  it("upsertExperience - creates experience", async () => {
    const formData = new FormData();
    formData.append("resumeId", "resume-1");
    formData.append("jobTitle", "Dev");
    formData.append("company", "Company");
    formData.append("startDate", "2023-01-01");
    formData.append("description", "Work");

    await upsertExperience(formData);
    expect(prisma.experience.create).toHaveBeenCalled();
  });

  it("deleteExperience - success", async () => {
    (prisma.experience.findFirst as jest.Mock).mockResolvedValue({
      id: "exp-1",
      resumeId: "resume-1",
    });
    const formData = new FormData();
    formData.append("id", "exp-1");

    await deleteExperience(formData);
    expect(prisma.experience.delete).toHaveBeenCalledWith({
      where: { id: "exp-1" },
    });
  });
});

describe("Projects", () => {
  it("getProjects - returns list", async () => {
    (prisma.project.findMany as jest.Mock).mockResolvedValue([
      { id: "proj-1" },
    ]);
    const result = await getProjects("resume-1");
    expect(result).toHaveLength(1);
  });

  it("upsertProject - creates project", async () => {
    const formData = new FormData();
    formData.append("resumeId", "resume-1");
    formData.append("name", "Project");
    formData.append("description", "Desc");

    await upsertProject(formData);
    expect(prisma.project.create).toHaveBeenCalled();
  });

  it("deleteProject - success", async () => {
    (prisma.project.findFirst as jest.Mock).mockResolvedValue({
      id: "proj-1",
      resumeId: "resume-1",
    });
    const formData = new FormData();
    formData.append("id", "proj-1");

    await deleteProject(formData);
    expect(prisma.project.delete).toHaveBeenCalled();
  });
});

describe("Education", () => {
  it("getEducations - returns list", async () => {
    (prisma.education.findMany as jest.Mock).mockResolvedValue([
      { id: "edu-1" },
    ]);
    const result = await getEducations("resume-1");
    expect(result).toHaveLength(1);
  });

  it("upsertEducation - creates education", async () => {
    const formData = new FormData();
    formData.append("resumeId", "resume-1");
    formData.append("institution", "School");
    formData.append("degree", "BS");
    formData.append("startDate", "2020-01-01");

    await upsertEducation(formData);
    expect(prisma.education.create).toHaveBeenCalled();
  });

  it("deleteEducation - success", async () => {
    (prisma.education.findFirst as jest.Mock).mockResolvedValue({
      id: "edu-1",
      resumeId: "resume-1",
    });
    const formData = new FormData();
    formData.append("id", "edu-1");

    await deleteEducation(formData);
    expect(prisma.education.delete).toHaveBeenCalled();
  });
});

describe("Skills", () => {
  it("getSkills - returns list", async () => {
    (prisma.skill.findMany as jest.Mock).mockResolvedValue([{ id: "skill-1" }]);
    const result = await getSkills("resume-1");
    expect(result).toHaveLength(1);
  });

  it("createSkill - success", async () => {
    const formData = new FormData();
    formData.append("resumeId", "resume-1");
    formData.append("name", "React");

    await createSkill(formData);
    expect(prisma.skill.create).toHaveBeenCalled();
  });

  it("deleteSkill - success", async () => {
    (prisma.skill.findFirst as jest.Mock).mockResolvedValue({
      id: "skill-1",
      resumeId: "resume-1",
    });
    const formData = new FormData();
    formData.append("id", "skill-1");

    await deleteSkill(formData);
    expect(prisma.skill.delete).toHaveBeenCalled();
  });
});
