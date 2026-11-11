"use client";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/data";

export default function ProjectsPage() {
  const [query, setQuery] = useState(""); const [rows, setRows] = useState<Project[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/projects?q=${encodeURIComponent(query)}`, { signal: controller.signal }).then(async (response) => {
      const result = await response.json() as { data?: Project[]; error?: { message?: string } };
      if (!response.ok) throw new Error(result.error?.message ?? "Projects could not be loaded.");
      setRows(result.data ?? []);
    }).catch((reason: unknown) => { if (reason instanceof Error && reason.name !== "AbortError") setError(reason.message || "Projects could not be loaded."); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [query]);
  return <><header className="topline"><div><div className="eyebrow">Workspace</div><h1 className="page-title">Projects</h1></div><span className="date-label">{rows.length} projects</span></header><div className="toolbar"><p className="count-label" style={{ margin: 0 }}>Browse and search your project work.</p><label><span className="sr-only">Search projects</span><input className="search-box" type="search" placeholder="Search projects or clients…" value={query} onChange={(event) => { setLoading(true); setError(""); setQuery(event.target.value); }} /></label></div><div className="panel"><div className="table-wrap"><table className="data-table"><thead><tr><th>Project</th><th>Client</th><th>Status</th><th>Progress</th><th>Due date</th><th>Team</th></tr></thead><tbody>{rows.map((project) => <tr key={project.id}><td><div className="project-name">{project.name}</div><div className="subtext">{project.id}</div></td><td>{project.client}</td><td><span className={`status ${project.status === "Paused" ? "status-paused" : project.status === "Complete" ? "status-complete" : ""}`}><i className="status-dot" />{project.status}</span></td><td><span className="progress-line"><span style={{ width: `${project.progress}%` }} /></span><span className="progress-number">{project.progress}%</span></td><td>{project.dueDate}</td><td><div className="avatars" aria-label={`Team members: ${project.team.join(", ")}`}>{project.team.map((person, index) => <span key={person} className="avatar" style={{ background: ["#dce9dd", "#e9e1f4", "#f4e5d8"][index % 3] }}>{person}</span>)}</div></td></tr>)}</tbody></table>{loading && <div className="empty-state" role="status">Loading projects…</div>}{error && <div className="empty-state" role="alert"><strong>Could not load projects</strong>{error}</div>}{!loading && !error && rows.length === 0 && <div className="empty-state"><strong>No projects found</strong>Try a different project or client name.{query && <button type="button" onClick={() => { setLoading(true); setError(""); setQuery(""); }}>Clear search</button>}</div>}</div></div></>;
}
