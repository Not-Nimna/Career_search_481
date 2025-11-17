"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Mic2, Users, Wrench, FileText, Calendar, Clock, Search, Filter, ExternalLink, Bookmark, BookmarkCheck, ChevronRight, PlayCircle, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// --- Types ---
export type Resource = {
  id: string;
  title: string;
  kind: "Seminar" | "Workshop" | "Toolkit" | "Guide" | "Webinar" | "Panel" | "Video Series";
  host: string;
  location: string; // or "Online"
  date?: string; // for events
  duration?: string; // e.g., "1h", "2.5h"
  tags: string[];
  blurb: string;
  href?: string;
};

type KindFilter = "All" | Resource["kind"];

const KIND_OPTIONS: KindFilter[] = ["All", "Seminar", "Workshop", "Toolkit", "Guide", "Webinar", "Panel", "Video Series"];

// --- Mock data ---
const RESOURCES: Resource[] = [
  {
    id: "r1",
    title: "ATS-Proof Resume Lab",
    kind: "Workshop",
    host: "Career Centre",
    location: "ENG 214",
    date: "Nov 9, 2:00–3:30 PM",
    duration: "90m",
    tags: ["Resume", "ATS", "Templates"],
    blurb: "Hands-on session to transform your resume into an ATS-friendly, impact-driven document.",
    href: "#",
  },
  {
    id: "r2",
    title: "Tech Interview 101 (DSA Crash)",
    kind: "Seminar",
    host: "Google DSC",
    location: "Online (Zoom)",
    date: "Nov 12, 6:00–7:00 PM",
    duration: "60m",
    tags: ["Interviews", "DSA", "LeetCode"],
    blurb: "A crisp overview of common patterns, do/don'ts, and practice routines.",
    href: "#",
  },
  {
    id: "r3",
    title: "Networking for Introverts",
    kind: "Webinar",
    host: "Alumni Office",
    location: "Online",
    date: "Nov 14, 5:00–6:00 PM",
    duration: "60m",
    tags: ["Networking", "Communication"],
    blurb: "Scripts and tactics to start conversations and follow up effectively.",
    href: "#",
  },
  {
    id: "r4",
    title: "Portfolio Starter Kit",
    kind: "Toolkit",
    host: "Career Centre",
    location: "Download",
    tags: ["Portfolio", "GitHub", "Design"],
    blurb: "A curated set of templates: landing page, case study, and project README formats.",
    href: "#",
  },
  {
    id: "r5",
    title: "Coffee Chat with RBC DS Team",
    kind: "Panel",
    host: "RBC",
    location: "MacHall B",
    date: "Nov 16, 3:00–4:30 PM",
    duration: "90m",
    tags: ["Data", "Networking"],
    blurb: "Meet data scientists and ask about projects, stacks, and pathways.",
    href: "#",
  },
  {
    id: "r6",
    title: "Cover Letter in 30 Minutes",
    kind: "Guide",
    host: "Career Centre",
    location: "Article",
    tags: ["Cover Letter", "Writing"],
    blurb: "A pragmatic template and examples for different roles (SWE, Data, Product).",
    href: "#",
  },
  {
    id: "r7",
    title: "Mock Interview Night",
    kind: "Workshop",
    host: "WIT Club",
    location: "ICT 122",
    date: "Nov 18, 6:30–8:30 PM",
    duration: "2h",
    tags: ["Interviews", "Behavioral", "Peer"],
    blurb: "Practice behavioral + tech rounds with seniors and alumni mentors.",
    href: "#",
  },
  {
    id: "r8",
    title: "Career Strategy Video Series",
    kind: "Video Series",
    host: "Career Centre",
    location: "Playlist",
    tags: ["Strategy", "Planning"],
    blurb: "Short, binge-able videos: goal setting, targeting roles, footprint building.",
    href: "#",
  },
  {
    id: "r9",
    title: "LinkedIn Profile Tear-Downs",
    kind: "Seminar",
    host: "Alumni Office",
    location: "Online",
    date: "Nov 20, 4:30–5:30 PM",
    duration: "60m",
    tags: ["LinkedIn", "Brand"],
    blurb: "Live review of student profiles with actionable feedback.",
    href: "#",
  },
  {
    id: "r10",
    title: "Negotiation Basics for Interns",
    kind: "Guide",
    host: "Career Centre",
    location: "Article",
    tags: ["Offer", "Negotiation"],
    blurb: "Scripts and principles for discussing compensation respectfully.",
    href: "#",
  },
];

const KIND_COLORS: Record<Resource["kind"], string> = {
  Seminar: "bg-amber-100 text-amber-900",
  Workshop: "bg-blue-100 text-blue-900",
  Toolkit: "bg-emerald-100 text-emerald-900",
  Guide: "bg-slate-200 text-slate-900",
  Webinar: "bg-purple-100 text-purple-900",
  Panel: "bg-rose-100 text-rose-900",
  "Video Series": "bg-indigo-100 text-indigo-900",
};

type ResourceCardProps = {
  r: Resource;
  saved: boolean;
  scheduled?: boolean;
  onSave: () => void;
  onOpen: () => void;
};

function ResourceCard({ r, saved, scheduled, onSave, onOpen }: ResourceCardProps) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl h-full cursor-pointer transition hover:shadow-lg hover:-translate-y-0.5" onClick={onOpen} role="button">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold leading-tight">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {r.host} · {r.location}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={`rounded-full text-xs ${KIND_COLORS[r.kind]}`}>{r.kind}</Badge>
              {scheduled && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-900 px-2 py-0.5 text-[11px]">
                  <Calendar className="h-3 w-3" />
                  Scheduled
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{r.blurb}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {r.date && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {r.date}
              </span>
            )}
            {r.duration && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {r.duration}
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {r.tags.map((t) => (
              <Badge key={t} variant="outline" className="rounded-full">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            variant="secondary"
            className="gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}>
            {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {saved ? "Saved" : "Save"}
          </Button>
          <Button
            variant="destructive"
            className="gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}>
            Open <ExternalLink className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

type ResourceModalProps = {
  resource: Resource | null;
  open: boolean;
  saved: boolean;
  scheduled: boolean;
  onClose: () => void;
  onToggleSave: () => void;
  onToggleSchedule: () => void;
};

function ResourceModal({ resource, open, saved, scheduled, onClose, onToggleSave, onToggleSchedule }: ResourceModalProps) {
  if (!open || !resource) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      {/* click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.18 }} className="relative z-50 w-full max-w-xl">
        <Card className="rounded-3xl shadow-2xl border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold leading-snug">{resource.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {resource.host} · {resource.location}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {resource.date && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {resource.date}
                    </span>
                  )}
                  {resource.duration && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {resource.duration}
                    </span>
                  )}
                  <Badge className={`rounded-full text-xs ${KIND_COLORS[resource.kind]}`}>{resource.kind}</Badge>
                </div>
              </div>
              <button onClick={onClose} className="rounded-full border bg-white p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition">
                <X className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-700">{resource.blurb}</p>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((t) => (
                <Badge key={t} variant="outline" className="rounded-full text-xs">
                  {t}
                </Badge>
              ))}
            </div>

            {/* Scheduling section */}
            <div className="mt-4 rounded-2xl border bg-slate-50 px-4 py-3 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Add this to your schedule</p>
                  <p className="text-xs text-muted-foreground">Mark it as scheduled to keep track of events you plan to attend.</p>
                </div>
                <Button size="sm" variant={scheduled ? "destructive" : "default"} className="gap-2" onClick={onToggleSchedule}>
                  <Calendar className="h-4 w-4" />
                  {scheduled ? "Scheduled" : "Add to schedule"}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-3">
            <Button variant="secondary" className="gap-2" onClick={onToggleSave}>
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {saved ? "Saved" : "Save resource"}
            </Button>
            {resource.href && (
              <a href={resource.href} target="_blank" rel="noreferrer">
                <Button variant="outline" className="gap-2">
                  Open link <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<KindFilter>("All");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [scheduled, setScheduled] = useState<Record<string, boolean>>({});
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);

  const allKinds = useMemo<KindFilter[]>(() => KIND_OPTIONS, []);
  const allTags = useMemo(() => Array.from(new Set(RESOURCES.flatMap((r) => r.tags))).sort(), []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return RESOURCES.filter((r) => {
      const base = [r.title, r.host, r.location, r.kind, ...r.tags, r.blurb].join(" ").toLowerCase();
      const matchesQ = base.includes(q);
      const matchesKind = typeFilter === "All" || r.kind === typeFilter;
      const matchesTag = !tagFilter || r.tags.includes(tagFilter);
      return matchesQ && matchesKind && matchesTag;
    });
  }, [query, typeFilter, tagFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Link href="/home" className="inline-flex items-center gap-2">
              <img src="/logo.png" alt="University Logo" className="h-10 w-10" />
              <span className="font-semibold">University Career Hub</span>
            </Link>
          </div>

          <Link href="/profile">
            <Button variant="destructive" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" /> Profile
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 space-y-8">
        {/* Filters */}
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-[min(60vw,480px)]">
              <Input placeholder="Search seminars, workshops, guides…" className="h-10 pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                setTypeFilter("All");
                setTagFilter(null);
                setQuery("");
              }}>
              <Filter className="h-4 w-4" /> Clear
            </Button>
          </div>
        </div>

        <section>
          <div className="flex flex-wrap gap-3 items-center">
            {/* Kind selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Type:</span>
              <div className="flex flex-wrap gap-2">
                {allKinds.map((k) => (
                  <button
                    key={k}
                    onClick={() => setTypeFilter(k)}
                    className={`px-2.5 py-1 rounded-full border text-sm transition ${typeFilter === k ? "bg-[#FF6961] text-black border-transparent hover:bg-[#e85a54]" : "bg-white text-slate-700 hover:bg-slate-50"}`}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
            {/* Tag selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tag:</span>
              <div className="flex flex-wrap gap-2">
                {["All", ...allTags].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTagFilter(t === "All" ? null : t)}
                    className={`px-2.5 py-1 rounded-full border text-sm ${(tagFilter ?? "All") === t ? "bg-[#FF6961] text-black hover:bg-[#e85a54] focus-visible:ring-[#FF6961]/30" : "bg-white text-slate-700 hover:bg-slate-50"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Strips */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Featured this week</h2>
            <a href="#" className="text-sm text-primary inline-flex items-center gap-1">
              See all <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.slice(0, 3).map((r) => (
              <ResourceCard
                key={r.id}
                r={r}
                saved={!!saved[r.id]}
                scheduled={!!scheduled[r.id]}
                onSave={() =>
                  setSaved((s) => ({
                    ...s,
                    [r.id]: !s[r.id],
                  }))
                }
                onOpen={() => setActiveResource(r)}
              />
            ))}
          </div>
        </section>

        {/* All resources */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">All resources</h2>
            <div className="text-sm text-muted-foreground">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r) => (
              <ResourceCard
                key={r.id}
                r={r}
                saved={!!saved[r.id]}
                scheduled={!!scheduled[r.id]}
                onSave={() =>
                  setSaved((s) => ({
                    ...s,
                    [r.id]: !s[r.id],
                  }))
                }
                onOpen={() => setActiveResource(r)}
              />
            ))}
            {filtered.length === 0 && (
              <Card className="rounded-2xl col-span-full">
                <CardContent className="py-12 text-center text-muted-foreground">No results. Try another type or tag.</CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* CTA Blocks */}
        <section className="grid lg:grid-cols-2 gap-4">
          <Card className="rounded-2xl">
            <CardContent className="py-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Book a 1:1 with a Career Advisor</h3>
                <p className="text-sm text-muted-foreground mt-1">Resume reviews, mock interviews, and offer discussion.</p>
              </div>
              <Button variant="destructive" className="gap-2">
                Book Now <Calendar className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="py-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Watch: Career Strategy Series</h3>
                <p className="text-sm text-muted-foreground mt-1">Bite-sized videos to level up your plan.</p>
              </div>
              <Button variant="secondary" className="gap-2">
                <PlayCircle className="h-4 w-4" /> Start
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground">New resources drop weekly. Check back often or save your favorites.</div>
      </footer>

      {/* Modal on top with blurred background */}
      <ResourceModal
        resource={activeResource}
        open={!!activeResource}
        saved={activeResource ? !!saved[activeResource.id] : false}
        scheduled={activeResource ? !!scheduled[activeResource.id] : false}
        onClose={() => setActiveResource(null)}
        onToggleSave={() => {
          if (!activeResource) return;
          setSaved((s) => ({
            ...s,
            [activeResource.id]: !s[activeResource.id],
          }));
        }}
        onToggleSchedule={() => {
          if (!activeResource) return;
          setScheduled((s) => ({
            ...s,
            [activeResource.id]: !s[activeResource.id],
          }));
        }}
      />
    </div>
  );
}
