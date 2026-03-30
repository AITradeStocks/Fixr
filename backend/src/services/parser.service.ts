export type ServiceCategory = "plumbing" | "electrical" | "handyman" | "general";
export type ProblemType = "leak" | "install" | "repair" | "blocked_drain" | "damage" | "unknown";
export type Severity = "low" | "medium" | "high";

export interface ParsedJob {
  category: ServiceCategory;
  problemType: ProblemType;
  severity: Severity;
  estimatedTimeMinutes: number;
  partsRequired: boolean;
}

export async function parseJob(description: string): Promise<ParsedJob> {
  const text = description.toLowerCase();

  const category: ServiceCategory =
    text.includes("leak") || text.includes("sink") || text.includes("drain") || text.includes("tap")
      ? "plumbing"
      : text.includes("light") || text.includes("power") || text.includes("switch")
        ? "electrical"
        : text.includes("mount") || text.includes("paint") || text.includes("assemble")
          ? "handyman"
          : "general";

  const problemType: ProblemType =
    text.includes("leak")
      ? "leak"
      : text.includes("install")
        ? "install"
        : text.includes("block") || text.includes("drain")
          ? "blocked_drain"
          : text.includes("damage")
            ? "damage"
            : text.includes("repair") || text.includes("fix")
              ? "repair"
              : "unknown";

  const severity: Severity =
    text.includes("flood") || text.includes("burst") || text.includes("urgent")
      ? "high"
      : text.includes("worse") || text.includes("broken") || text.includes("not working")
        ? "medium"
        : "low";

  return {
    category,
    problemType,
    severity,
    estimatedTimeMinutes: category === "plumbing" ? 45 : category === "electrical" ? 60 : 75,
    partsRequired: text.includes("replace") || text.includes("mixer") || text.includes("tap") || text.includes("switch")
  };
}
