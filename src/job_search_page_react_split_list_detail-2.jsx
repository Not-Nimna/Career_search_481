import React, { useMemo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, Calendar, Building2, ArrowRight, Bookmark, BookmarkCheck, ChevronRight, Filter, ExternalLink, Tag, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// --- Types ---
export type Job = {
  id: string;
  title: string;
  company: string;
  location: string; // e.g., "Calgary, AB (Hybrid)" | "Remote – Canada" | "Vancouver, BC (On‑site)"
  type: string; // Internship | Co‑op
  postedAt: string; // "2d" | "5h" | "4d"
  deadline: string; // "Nov 8"
  tags: string[];
  description: string;
  responsibilities: string[];
  qualifications: string[];
};

// --- Mock Data ---
const JOBS: Job[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "Aurora Robotics Lab",
    location: "Calgary, AB (Hybrid)",
    type: "Internship",
    postedAt: "2d",
    deadline: "Nov 8",
    tags: ["Python", "React", "AI"],
    description:
      "Work with the platform team to build student‑facing robotics tooling. Collaborate across firmware and cloud to ship features fast.",
    responsibilities: [
      "Implement UI components and write tests",
      "Ship REST endpoints and integrate telemetry",
      "Participate in code reviews and demos",
    ],
    qualifications: [
      "Enrolled in a CS/SE program",
      "Experience with React + TypeScript",
      "Familiarity with Python APIs",
    ],
  },
  {
    id: "2",
    title: "Data Analyst Co‑op",
    company: "Prairie Health System",
    location: "Remote – Canada",
    type: "Co‑op",
    postedAt: "1d",
    deadline: "Nov 12",
    tags: ["SQL", "Tableau", "ETL"],
    description:
      "Analyze patient wait‑time data and build dashboards for operational insights across clinics.",
    responsibilities: [
      "Create Tableau dashboards",
      "Automate ETL pipelines",
      "Present weekly findings",
    ],
    qualifications: [
      "SQL proficiency",
      "Experience with BI tools",
      "Strong communication",
    ],
  },
  {
    id: "3",
    title: "Cloud DevOps Intern",
    company: "Northstar Energy",
    location: "Calgary, AB",
    type: "Internship",
    postedAt: "4d",
    deadline: "Nov 18",
    tags: ["AWS", "Terraform", "CI/CD"],
    description:
      "Help modernize infrastructure using Terraform and GitHub Actions. Work with platform engineers to improve developer experience.",
    responsibilities: [
      "Write Terraform modules",
      "Build CI/CD workflows",
      "Monitor and document",
    ],
    qualifications: [
      "Familiar with AWS",
      "Knowledge of IaC concepts",
      "Scripting (Python/Bash)",
    ],
  },
  {
    id: "4",
    title: "Product Design Intern",
    company: "Pixel & Pine",
    location: "Vancouver, BC (On‑site)",
    type: "Internship",
    postedAt: "3d",
    deadline: "Nov 10",
    tags: ["Figma", "Prototyping", "UX"],
    description:
      "Work with design leads to prototype mobile experiences and run usability tests.",
    responsibilities: [
      "Produce high‑fidelity prototypes",
      "Run moderated tests",
      "Iterate on feedback",
    ],
    qualifications: [
      "Figma expertise",
      "Portfolio of student projects",
      "Research fundamentals",
    ],
  },
];

// --- Utility helpers ---
const MONTHS: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const parseDeadline = (dead: string): Date | null => {
  const [mon, dayStr] = dead.split(" ");
  const m = MONTHS[mon as keyof typeof MONTHS];
  const d = Number(dayStr);
  if (Number.isNaN(m) || Number.isNaN(d)) return null;
  const now = new Date();
  return new Date(now.getFullYear(), m, d);
};

const matchesPostedWithin = (postedAt: string, window: "any" | "24h" | "3d" | "7d") => {
  if (window === "any") return true;
  const unit = postedAt.endsWith("h") ? "h" : "d";
  const val = Number(postedAt.replace(/[^0-9]/g, ""));
  if (unit === "h") return window === "24h" && val <= 24;
  if (unit === "d") {
    if (window === "24h") return false;
    if (window === "3d") return val <= 3;
    if (window === "7d") return val <= 7;
  }
  return true;
};

const inferWorkMode = (location: string): "Remote" | "Hybrid" | "On‑site" | "Unspecified" => {
  if (/remote/i.test(location)) return "Remote";
  if (/hybrid/i.test(location)) return "Hybrid";
  if (/on.?site/i.test(location)) return "On‑site";
  return "Unspecified";
};

const unique = <T,>(arr: T[]) => Array.from(new Set(arr));

// --- Small components ---
const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs text-muted-foreground bg-white">
    <Tag className="h-3 w-3" /> {children}
  </span>
);

function JobListItem({ job, selected, onSelect, saved, onSave }: {
  job: Job;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
  onSave: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`text-left w-full rounded-xl border p-3 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition ${selected ? "bg-slate-50 border-slate-300" : "bg-white"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium leading-tight">{job.title}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
            <Building2 className="h-4 w-4" /> {job.company}
          </p>
        </div>
        <Button onClick={(e)=>{e.stopPropagation(); onSave();}} size="icon" variant="ghost" aria-label={saved?"Saved":"Save job"}>
          {saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {job.postedAt} ago</span>
        <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> Due {job.deadline}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {job.tags.slice(0,3).map((t)=> <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>)}
      </div>
    </button>
  );
}

function JobDetail({ job, saved, onSave }: { job: Job; saved: boolean; onSave: ()=>void }) {
  return (
    <Card className="rounded-2xl h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold leading-tight">{job.title}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1"><Building2 className="h-4 w-4"/> {job.company} · {job.location}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="gap-2" onClick={onSave} aria-label={saved?"Saved":"Save"}>
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />} {saved?"Saved":"Save"}
            </Button>
            <Button className="gap-2">Apply Now <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" /> Deadline {job.deadline}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> Posted {job.postedAt}</span>
          <Badge variant="secondary" className="text-xs">{job.type}</Badge>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.tags.map((t) => <Pill key={t}>{t}</Pill>)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="font-medium">About the role</h3>
          <p className="text-sm text-muted-foreground mt-1">{job.description}</p>
        </section>
        <section>
          <h3 className="font-medium">Responsibilities</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
            {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </section>
        <section>
          <h3 className="font-medium">Qualifications</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
            {job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </section>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="text-xs text-muted-foreground">Questions? <a href="#" className="underline">careers@university.example</a></div>
        <Button variant="ghost" className="gap-2">Company site <ExternalLink className="h-4 w-4"/></Button>
      </CardFooter>
    </Card>
  );
}

// --- Filters UI ---
function FiltersPopover({
  allTags,
  allTypes,
  allWorkModes,
  allLocations,
  value,
  onChange,
  onClose,
}: {
  allTags: string[];
  allTypes: string[];
  allWorkModes: string[];
  allLocations: string[];
  value: Filters;
  onChange: (f: Filters) => void;
  onClose: () => void;
}) {
  const toggle = (key: keyof Filters, item: string) => {
    const set = new Set(value[key] as string[]);
    set.has(item) ? set.delete(item) : set.add(item);
    onChange({ ...value, [key]: Array.from(set) });
  };

  return (
    <div className="absolute right-0 top-12 z-40 w-[min(92vw,680px)] rounded-2xl border bg-white shadow-xl">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="font-medium">Filters</div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close"><X className="h-5 w-5"/></Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4 p-4">
        {/* Work Mode */}
        <div>
          <div className="text-sm font-medium mb-2">Work mode</div>
          <div className="flex flex-wrap gap-2">
            {allWorkModes.map((m) => (
              <button key={m} onClick={() => toggle("workModes", m)} className={`px-2.5 py-1 rounded-full border text-sm ${value.workModes.includes(m) ? "bg-slate-900 text-white border-slate-900" : "bg-white"}`}>{m}</button>
            ))}
          </div>
        </div>
        {/* Type */}
        <div>
          <div className="text-sm font-medium mb-2">Type</div>
          <div className="flex flex-wrap gap-2">
            {allTypes.map((t) => (
              <button key={t} onClick={() => toggle("types", t)} className={`px-2.5 py-1 rounded-full border text-sm ${value.types.includes(t) ? "bg-slate-900 text-white border-slate-900" : "bg-white"}`}>{t}</button>
            ))}
          </div>
        </div>
        {/* Locations */}
        <div>
          <div className="text-sm font-medium mb-2">Locations</div>
          <div className="flex flex-wrap gap-2 max-h-28 overflow-auto pr-1">
            {allLocations.map((loc) => (
              <button key={loc} onClick={() => toggle("locations", loc)} className={`px-2.5 py-1 rounded-full border text-sm ${value.locations.includes(loc) ? "bg-slate-900 text-white border-slate-900" : "bg-white"}`}>{loc}</button>
            ))}
          </div>
        </div>
        {/* Tags */}
        <div>
          <div className="text-sm font-medium mb-2">Tags / Skills</div>
          <div className="flex flex-wrap gap-2 max-h-28 overflow-auto pr-1">
            {allTags.map((tag) => (
              <button key={tag} onClick={() => toggle("tags", tag)} className={`px-2.5 py-1 rounded-full border text-sm ${value.tags.includes(tag) ? "bg-slate-900 text-white border-slate-900" : "bg-white"}`}>{tag}</button>
            ))}
          </div>
        </div>
        {/* Posted within */}
        <div>
          <div className="text-sm font-medium mb-2">Posted within</div>
          <div className="flex flex-wrap gap-2">
            {(["any","24h","3d","7d"] as const).map((w) => (
              <button key={w} onClick={() => onChange({ ...value, postedWithin: w })} className={`px-2.5 py-1 rounded-full border text-sm ${value.postedWithin===w?"bg-slate-900 text-white border-slate-900":"bg-white"}`}>{w}</button>
            ))}
          </div>
        </div>
        {/* Deadline */}
        <div>
          <div className="text-sm font-medium mb-2">Deadline</div>
          <div className="flex flex-wrap gap-2">
            {(["any","next 7 days","before Nov 15"] as const).map((opt) => (
              <button key={opt} onClick={() => onChange({ ...value, deadline: opt })} className={`px-2.5 py-1 rounded-full border text-sm ${value.deadline===opt?"bg-slate-900 text-white border-slate-900":"bg-white"}`}>{opt}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <div className="text-xs text-muted-foreground">Tip: Click again to deselect a chip.</div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => onChange(DEFAULT_FILTERS)}>Clear</Button>
          <Button onClick={onClose}>Apply</Button>
        </div>
      </div>
    </div>
  );
}

// --- Filters state & logic ---
export type Filters = {
  workModes: string[];
  types: string[];
  tags: string[];
  locations: string[];
  postedWithin: "any" | "24h" | "3d" | "7d";
  deadline: "any" | "next 7 days" | "before Nov 15";
};

const DEFAULT_FILTERS: Filters = {
  workModes: [],
  types: [],
  tags: [],
  locations: [],
  postedWithin: "any",
  deadline: "any",
};

const getAllFacets = (jobs: Job[]) => {
  const allTags = unique(jobs.flatMap((j) => j.tags)).sort();
  const allTypes = unique(jobs.map((j) => j.type));
  const allWork = unique(jobs.map((j) => inferWorkMode(j.location))).filter((x) => x !== "Unspecified");
  // Pull city/province or Remote
  const locs = unique(
    jobs.map((j) => j.location.split("(")[0].trim())
  );
  return { allTags, allTypes, allWorkModes: allWork, allLocations: locs };
};

const applyFilters = (jobs: Job[], f: Filters): Job[] => {
  return jobs.filter((j) => {
    // Work mode
    if (f.workModes.length) {
      const wm = inferWorkMode(j.location);
      if (!f.workModes.includes(wm)) return false;
    }
    // Type
    if (f.types.length && !f.types.includes(j.type)) return false;
    // Tags (all selected must be present)
    if (f.tags.length && !f.tags.every((t) => j.tags.includes(t))) return false;
    // Location (match any selected)
    if (f.locations.length) {
      const loc = j.location.split("(")[0].trim();
      if (!f.locations.includes(loc)) return false;
    }
    // Posted window
    if (!matchesPostedWithin(j.postedAt, f.postedWithin)) return false;
    // Deadline window
    if (f.deadline !== "any") {
      const d = parseDeadline(j.deadline);
      if (!d) return false;
      const today = new Date();
      if (f.deadline === "next 7 days") {
        const in7 = new Date();
        in7.setDate(today.getDate() + 7);
        if (!(d >= today && d <= in7)) return false;
      }
      if (f.deadline === "before Nov 15") {
        const cutoff = parseDeadline("Nov 15");
        if (cutoff && !(d <= cutoff)) return false;
      }
    }
    return true;
  });
};

// --- Layout ---
export default function JobSearchPage() {
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | null>(JOBS[0]?.id ?? null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const { allTags, allTypes, allWorkModes, allLocations } = useMemo(() => getAllFacets(JOBS), []);

  const baseFiltered = useMemo(() => {
    const q = query.toLowerCase();
    return JOBS.filter((j) => [j.title, j.company, j.location, j.type, ...j.tags].join(" ").toLowerCase().includes(q));
  }, [query]);

  const filtered = useMemo(() => applyFilters(baseFiltered, filters), [baseFiltered, filters]);

  useEffect(() => {
    if (filtered.length && !filtered.find(j=> j.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selectedJob = useMemo(() => filtered.find((j) => j.id === selectedId) || filtered[0], [filtered, selectedId]);

  const toggleSave = useCallback((id: string) => setSaved((s) => ({ ...s, [id]: !s[id] })), []);

  const activeCount = useMemo(() => {
    const { workModes, types, tags, locations, postedWithin, deadline } = filters;
    return (
      (workModes.length?1:0) + (types.length?1:0) + (tags.length?1:0) + (locations.length?1:0) + (postedWithin!=="any"?1:0) + (deadline!=="any"?1:0)
    );
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Minimized search bar — top-left */}
      <div className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="relative mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
          <div className="relative w-full max-w-md">
            <Input
              aria-label="Search jobs"
              placeholder="Search roles, skills, company…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 pl-9"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowFilters((v) => !v)}>
            <Filter className="h-4 w-4"/> Filters {activeCount?`(${activeCount})`:""}
          </Button>

          {showFilters && (
            <FiltersPopover
              allTags={allTags}
              allTypes={allTypes}
              allWorkModes={allWorkModes}
              allLocations={allLocations}
              value={filters}
              onChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          )}
        </div>
      </div>

      {/* Two‑pane layout */}
      <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: list */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <Card className="rounded-2xl h-[calc(100vh-140px)] overflow-hidden">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">{filtered.length} match{filtered.length!==1?"es":""}</h2>
                <button className="text-xs text-primary inline-flex items-center gap-1">Sort by date <ChevronRight className="h-3 w-3"/></button>
              </div>
              {/* Active filter chips */}
              <div className="mt-2 flex flex-wrap gap-2">
                {filters.workModes.map((m)=> (
                  <span key={m} className="text-xs inline-flex items-center gap-1 border rounded-full px-2 py-0.5">
                    {m}
                    <button aria-label={`remove ${m}`} onClick={()=> setFilters({...filters, workModes: filters.workModes.filter(x=>x!==m)})}>
                      <X className="h-3 w-3"/>
                    </button>
                  </span>
                ))}
                {filters.types.map((t)=> (
                  <span key={t} className="text-xs inline-flex items-center gap-1 border rounded-full px-2 py-0.5">
                    {t}
                    <button aria-label={`remove ${t}`} onClick={()=> setFilters({...filters, types: filters.types.filter(x=>x!==t)})}>
                      <X className="h-3 w-3"/>
                    </button>
                  </span>
                ))}
                {filters.locations.map((l)=> (
                  <span key={l} className="text-xs inline-flex items-center gap-1 border rounded-full px-2 py-0.5">
                    {l}
                    <button aria-label={`remove ${l}`} onClick={()=> setFilters({...filters, locations: filters.locations.filter(x=>x!==l)})}>
                      <X className="h-3 w-3"/>
                    </button>
                  </span>
                ))}
                {filters.tags.map((t)=> (
                  <span key={t} className="text-xs inline-flex items-center gap-1 border rounded-full px-2 py-0.5">
                    {t}
                    <button aria-label={`remove ${t}`} onClick={()=> setFilters({...filters, tags: filters.tags.filter(x=>x!==t)})}>
                      <X className="h-3 w-3"/>
                    </button>
                  </span>
                ))}
                {(filters.postedWithin!=="any") && (
                  <span className="text-xs inline-flex items-center gap-1 border rounded-full px-2 py-0.5">
                    posted: {filters.postedWithin}
                    <button aria-label="remove posted filter" onClick={()=> setFilters({...filters, postedWithin: "any"})}>
                      <X className="h-3 w-3"/>
                    </button>
                  </span>
                )}
                {(filters.deadline!=="any") && (
                  <span className="text-xs inline-flex items-center gap-1 border rounded-full px-2 py-0.5">
                    deadline: {filters.deadline}
                    <button aria-label="remove deadline filter" onClick={()=> setFilters({...filters, deadline: "any"})}>
                      <X className="h-3 w-3"/>
                    </button>
                  </span>
                )}
                {activeCount>0 && (
                  <button className="text-xs underline ml-1" onClick={()=> setFilters(DEFAULT_FILTERS)}>Clear all</button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0 overflow-y-auto h-full space-y-3">
              {filtered.map((job) => (
                <JobListItem
                  key={job.id}
                  job={job}
                  selected={selectedId === job.id}
                  saved={!!saved[job.id]}
                  onSelect={() => setSelectedId(job.id)}
                  onSave={() => toggleSave(job.id)}
                />
              ))}
              {filtered.length === 0 && (
                <div className="text-sm text-muted-foreground p-6 text-center">No results. Try adjusting filters.</div>
              )}
            </CardContent>
          </Card>
        </aside>

        {/* Right: detail */}
        <main className="lg:col-span-7 xl:col-span-8">
          {selectedJob ? (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <JobDetail job={selectedJob} saved={!!saved[selectedJob.id]} onSave={() => toggleSave(selectedJob.id)} />
            </motion.div>
          ) : (
            <Card className="rounded-2xl">
              <CardContent className="py-12 text-center text-muted-foreground">Select a job from the list to view details.</CardContent>
            </Card>
          )}
        </main>

        {/* Mobile helper (below detail) */}
        <div className="lg:hidden">
          <div className="mt-2 text-center text-xs text-muted-foreground">Tip: On larger screens, the list and details sit side‑by‑side.</div>
        </div>
      </div>
    </div>
  );
}
