"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Building2, Search, Filter, Bell, ExternalLink, ChevronRight, AlarmClock, MapPin, FileDown } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// --- Types ---
export type Deadline = {
  id: string;
  title: string; // e.g., Software Engineering Intern
  company: string; // e.g., Aurora Robotics Lab
  type: "Internship" | "Co-op" | "New Grad" | "Scholarship" | "Event";
  location: string; // e.g., Calgary, AB (Hybrid) or Remote – Canada
  dueISO: string; // ISO string: 2025-11-08T23:59:00-07:00
  tags: string[]; // e.g., ["SWE", "AI"]
  link?: string; // Apply page
  notes?: string; // Extra info
};

// --- Mock data ---
const DEADLINES: Deadline[] = [
  {
    id: "d1",
    title: "Software Engineering Intern",
    company: "Aurora Robotics Lab",
    type: "Internship",
    location: "Calgary, AB (Hybrid)",
    dueISO: "2025-11-08T23:59:00-07:00",
    tags: ["SWE", "Python", "React"],
    link: "/apply/aurora-robotics-lab",
    notes: "Use the in‑app Apply flow.",
  },
  { id: "d2", title: "Data Analyst Co-op", company: "Prairie Health System", type: "Co-op", location: "Remote – Canada", dueISO: "2025-11-12T17:00:00-07:00", tags: ["SQL", "Tableau"], link: "#" },
  { id: "d3", title: "Product Design Intern", company: "Pixel & Pine", type: "Internship", location: "Vancouver, BC (On‑site)", dueISO: "2025-11-10T23:59:00-07:00", tags: ["Figma", "UX"], link: "#" },
  { id: "d4", title: "Cloud DevOps Intern", company: "Northstar Energy", type: "Internship", location: "Calgary, AB", dueISO: "2025-11-18T23:59:00-07:00", tags: ["AWS", "Terraform"], link: "#" },
  { id: "d5", title: "Women in Tech Panel (RSVP)", company: "WIT Club", type: "Event", location: "MacHall A", dueISO: "2025-11-14T17:30:00-07:00", tags: ["Panel", "Networking"], link: "#", notes: "Arrive 10 minutes early." },
  { id: "d6", title: "RBC DS Resume Clinic (RSVP)", company: "RBC", type: "Event", location: "Room ENG 210", dueISO: "2025-11-10T11:00:00-07:00", tags: ["Resume", "Data"], link: "#" },
];
const selectedChip = "bg-[#FF6961] text-black border-[#FF6961]";
const unselectedChip = "bg-white text-slate-700 border-slate-200 hover:bg-[#FFE2E0]";

// --- Utils ---
const fmtDate = (iso: string) => new Date(iso).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric" });
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
const daysLeft = (iso: string) => {
  const now = new Date();
  const due = new Date(iso);
  const ms = due.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
};
const groupByDate = (items: Deadline[]) => {
  const m = new Map<string, Deadline[]>();
  for (const d of items) {
    const key = new Date(d.dueISO).toDateString();
    const arr = m.get(key) ?? [];
    arr.push(d);
    m.set(key, arr);
  }
  // sort by date asc
  return Array.from(m.entries()).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());
};

function toICS(d: Deadline) {
  const dt = new Date(d.dueISO);
  const tzless = (x: Date) => x.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const uid = `${d.id}@careerhub.example`;
  const summary = `${d.title} — ${d.company}`;
  const desc = `Type: ${d.type}\nLocation: ${d.location}\nTags: ${d.tags.join(", ")}\n${d.link ? "Apply: " + d.link : ""}`;
  const start = tzless(dt);
  const end = tzless(new Date(dt.getTime() + 60 * 60 * 1000)); // 1h window
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//University Career Hub//Deadlines//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${tzless(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${d.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  return URL.createObjectURL(blob);
}

// --- Components ---
function DeadlineItem({ d }: { d: Deadline }) {
  const remaining = daysLeft(d.dueISO);
  const severity = remaining <= 2 ? "bg-rose-100 text-rose-800" : remaining <= 7 ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900";
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold leading-tight">{d.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Building2 className="h-4 w-4" /> {d.company}
              </p>
            </div>
            <Badge className={`rounded-full text-xs ${severity}`}>{remaining <= 0 ? "Due" : `${remaining} day${remaining !== 1 ? "s" : ""} left`}</Badge>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {fmtDate(d.dueISO)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {fmtTime(d.dueISO)}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {d.location}
            </span>
            <Badge variant="secondary" className="rounded-full text-xs">
              {d.type}
            </Badge>
          </div>
          {d.notes && <div className="text-xs">{d.notes}</div>}
          <div className="flex flex-wrap gap-2">
            {d.tags.map((t) => (
              <Badge key={t} variant="outline" className="rounded-full">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="gap-2" onClick={() => window.open(toICS(d), "_blank")}>
              <FileDown className="h-4 w-4" /> Add to Calendar
            </Button>
            <Button variant="ghost" className="gap-2" onClick={() => alert("Reminder set (mock)")}>
              <Bell className="h-4 w-4" /> Remind me
            </Button>
          </div>
          <Button variant="destructive" className="gap-2" onClick={() => (d.link ? (window.location.href = d.link) : alert("No link provided"))}>
            Apply <ExternalLink className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function DeadlinesPage() {
  const [query, setQuery] = useState("");
  // const [typeFilter, setTypeFilter] = useState<Deadline["type"] | "All">("All");
  const TYPE_OPTIONS = ["All", "Internship", "Co-op", "New Grad", "Scholarship", "Event"] as const;
  type TypeFilter = (typeof TYPE_OPTIONS)[number];
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [monthFilter, setMonthFilter] = useState<string | "All">("All");
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const allTypes = useMemo(() => TYPE_OPTIONS, []);
  const allMonths = useMemo(() => ["All", ...Array.from(new Set(DEADLINES.map((d) => new Date(d.dueISO).toLocaleString(undefined, { month: "long", year: "numeric" }))))], []);
  const allTags = useMemo(() => Array.from(new Set(DEADLINES.flatMap((d) => d.tags))).sort(), []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return DEADLINES.filter((d) => {
      const base = [d.title, d.company, d.location, d.type, ...d.tags].join(" ").toLowerCase();
      const matchesQ = base.includes(q);
      const matchesType = typeFilter === "All" || d.type === typeFilter;
      const monthLabel = new Date(d.dueISO).toLocaleString(undefined, { month: "long", year: "numeric" });
      const matchesMonth = monthFilter === "All" || monthLabel === monthFilter;
      const matchesTag = !tagFilter || d.tags.includes(tagFilter);
      return matchesQ && matchesType && matchesMonth && matchesTag;
    }).sort((a, b) => new Date(a.dueISO).getTime() - new Date(b.dueISO).getTime());
  }, [query, typeFilter, monthFilter, tagFilter]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span className="font-semibold">Deadlines</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-[min(60vw,420px)]">
              <Input placeholder="Search role, company, tags…" value={query} onChange={(e) => setQuery(e.target.value)} className="h-10 pl-9" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                setQuery("");
                setTypeFilter("All");
                setMonthFilter("All");
                setTagFilter(null);
              }}>
              <Filter className="h-4 w-4" /> Clear
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <div className="grid gap-3 md:grid-cols-3">
          {/* Type */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Type:</span>
            {allTypes.map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-2.5 py-1 rounded-full border text-sm ${typeFilter === t ? "bg-[#FF6961] text-black border-[#FF6961]" : "bg-white hover:bg-[#FFE2E0]"}`}>
                {t}
              </button>
            ))}
          </div>
          {/* Month */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Month:</span>
            {allMonths.map((m) => (
              <button key={m} onClick={() => setMonthFilter(m)} className={`px-2.5 py-1 rounded-full border text-sm ${monthFilter === m ? "bg-[#FF6961] text-black border-[#FF6961]" : "bg-white hover:bg-[#FFE2E0]"}`}>
                {m}
              </button>
            ))}
          </div>
          {/* Tag */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Tag:</span>
            {["All", ...allTags].map((t) => (
              <button key={t} onClick={() => setTagFilter(t === "All" ? null : t)} className={`px-2.5 py-1 rounded-full border text-sm ${(tagFilter ?? "All") === t ? "bg-[#FF6961] text-black border-[#FF6961]" : "bg-white hover:bg-[#FFE2E0]"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Groups */}
      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {grouped.map(([dateKey, items]) => (
          <section key={dateKey}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold">{new Date(dateKey).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</h2>
              <div className="text-xs text-muted-foreground">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((d) => (
                <DeadlineItem key={d.id} d={d} />
              ))}
            </div>
          </section>
        ))}

        {grouped.length === 0 && (
          <Card className="rounded-2xl">
            <CardContent className="py-12 text-center text-muted-foreground">No deadlines match your filters.</CardContent>
          </Card>
        )}

        {/* Tips / CTA */}
        <section className="grid lg:grid-cols-2 gap-4">
          <Card className="rounded-2xl">
            <CardContent className="py-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Never miss a deadline</h3>
                <p className="text-sm text-muted-foreground mt-1">Add important dates to your calendar and set reminders.</p>
              </div>
              <Button variant="secondary" className="gap-2" onClick={() => alert("Bulk export (mock)")}>
                <AlarmClock className="h-4 w-4" /> Export .ics
              </Button>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="py-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Pro tip: Apply early</h3>
                <p className="text-sm text-muted-foreground mt-1">Many roles review on a rolling basis — aim to submit a week ahead.</p>
              </div>
              <Button variant="destructive" className="gap-2" onClick={() => (window.location.href = "/jobs")}>
                Browse Jobs <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground">Dates are provided by employers and the Career Centre. Always confirm times on the application page.</div>
      </footer>
    </div>
  );
}
