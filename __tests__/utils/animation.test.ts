import { fadeInUp } from "@/utils/animation";

describe("fadeInUp animation object", () => {
  it("has correct initial values", () => {
    expect(fadeInUp.initial).toEqual({ opacity: 0, y: -30 });
  });

  it("has correct animate values", () => {
    expect(fadeInUp.animate).toEqual({ opacity: 1, y: 0 });
  });

  it("has correct exit values", () => {
    expect(fadeInUp.exit).toEqual({ opacity: 0, y: -30 });
  });

  it("has correct transition duration", () => {
    expect(fadeInUp.transition).toEqual({ duration: 0.6 });
  });

  it("has correct viewport settings", () => {
    expect(fadeInUp.viewport).toEqual({ once: true, amount: 0 });
  });
});
