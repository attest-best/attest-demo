export type ProjectStatus = "Active" | "Paused" | "Complete";
export type Project = { id: string; name: string; client: string; status: ProjectStatus; progress: number; dueDate: string; team: string[] };
export type Activity = { id: string; actor: string; initials: string; action: string; target: string; time: string; color: string };

export const projects: Project[] = [
  { id: "PRJ-1048", name: "Northstar rebrand", client: "Northstar Studio", status: "Active", progress: 78, dueDate: "Nov 18, 2026", team: ["AL", "MK", "JD"] },
  { id: "PRJ-1047", name: "Mobile banking app", client: "Meridian Finance", status: "Active", progress: 54, dueDate: "Nov 24, 2026", team: ["SR", "AL"] },
  { id: "PRJ-1046", name: "Q4 campaign site", client: "Fieldwork Co.", status: "Active", progress: 32, dueDate: "Dec 02, 2026", team: ["MK", "JD", "TW"] },
  { id: "PRJ-1045", name: "Customer research", client: "Morrow Health", status: "Paused", progress: 46, dueDate: "Dec 08, 2026", team: ["TW", "SR"] },
  { id: "PRJ-1044", name: "Partner portal", client: "Lumen Works", status: "Complete", progress: 100, dueDate: "Oct 30, 2026", team: ["JD", "AL"] },
  { id: "PRJ-1043", name: "Design system v2", client: "Atlas Labs", status: "Active", progress: 67, dueDate: "Dec 12, 2026", team: ["SR", "MK", "TW"] },
];

export const activities: Activity[] = [
  { id: "a1", actor: "Alex Lee", initials: "AL", action: "completed the design review for", target: "Northstar rebrand", time: "12 min ago", color: "#dbebdf" },
  { id: "a2", actor: "Sam Rivera", initials: "SR", action: "added 3 tasks to", target: "Mobile banking app", time: "48 min ago", color: "#e9e1f4" },
  { id: "a3", actor: "Morgan Kim", initials: "MK", action: "shared a project update in", target: "Q4 campaign site", time: "2 hours ago", color: "#f4e5d8" },
  { id: "a4", actor: "Jamie Diaz", initials: "JD", action: "marked the project as complete", target: "Partner portal", time: "Yesterday", color: "#dfe8ed" },
  { id: "a5", actor: "Taylor Wong", initials: "TW", action: "uploaded new research to", target: "Customer research", time: "Yesterday", color: "#efe6c8" },
];

export const overview = { openTasks: 24, completedThisWeek: 18, teamMembers: 8, activeProjects: projects.filter((project) => project.status === "Active").length };
