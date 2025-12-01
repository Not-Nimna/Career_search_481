"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, Clock, Search, ArrowRight, Filter, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// --- Types / Local Storage Keys ---
type SavedJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  deadline: string;
};

type ApplicationSummary = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  status: string;
  submitted: string;
  deadline: string;
  type: string;
};

const SAVED_JOBS_KEY = "careerhub_saved_jobs";
const APPLICATIONS_KEY = "careerhub_applications";

// --- Seed applications (used if localStorage is empty) ---
const APPLICATIONS_SEED: ApplicationSummary[] = [
  {
    id: "APP-2025-001",
    jobTitle: "Software Engg Intern",
    company: "Aurora Robotics Lab",
    location: "Calgary, AB (Hybrid)",
    status: "Under Review",
    submitted: "Oct 28, 2025",
    deadline: "Nov 8, 2025",
    type: "Internship",
  },
  {
    id: "APP-2025-002",
    jobTitle: "Data Analyst Co-op",
    company: "Prairie Health System",
    location: "Remote – Canada",
    status: "Interview Scheduled",
    submitted: "Oct 15, 2025",
    deadline: "Nov 12, 2025",
    type: "Co-op",
  },
  {
    id: "APP-2025-003",
    jobTitle: "Product Design Intern",
    company: "Pixel & Pine",
    location: "Vancouver, BC",
    status: "Offer Received",
    submitted: "Sep 30, 2025",
    deadline: "Oct 15, 2025",
    type: "Internship",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Submitted: "bg-slate-100 text-slate-800",
  "Under Review": "bg-amber-100 text-amber-800",
  "Interview Scheduled": "bg-blue-100 text-blue-800",
  "Offer Received": "bg-emerald-100 text-emerald-800",
  Rejected: "bg-rose-100 text-rose-800",
};

export default function ApplicationsPage() {
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // ✅ Applications now live in state + localStorage
  const [applications, setApplications] = useState<ApplicationSummary[]>(() => {
    if (typeof window === "undefined") return APPLICATIONS_SEED;
    const raw = window.localStorage.getItem(APPLICATIONS_KEY);
    if (!raw) return APPLICATIONS_SEED;
    try {
      return JSON.parse(raw) as ApplicationSummary[];
    } catch {
      return APPLICATIONS_SEED;
    }
  });

  // keep localStorage in sync whenever applications change
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
  }, [applications]);

  // ✅ Saved jobs stay as before
  const [savedJobs] = useState<SavedJob[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(SAVED_JOBS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as SavedJob[];
    } catch {
      return [];
    }
  });

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchesQuery = a.jobTitle.toLowerCase().includes(query.toLowerCase()) || a.company.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = !filterStatus || a.status === filterStatus;
      return matchesQuery && matchesStatus;
    });
  }, [applications, query, filterStatus]);

  const filteredSaved = useMemo(() => {
    return savedJobs.filter((j) => {
      const q = query.toLowerCase();
      return j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
    });
  }, [query, savedJobs]);

  const shortSlug = (name: string) => name.split(" ")[0].toLowerCase();

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-[#F8F7F4]/90 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/home" className="inline-flex items-center gap-2">
              <img src="/logo.png" alt="University Logo" className="h-10 w-10" />
              <span className="font-semibold">University Career Hub</span>
            </Link>
          </div>

          <Link href="/profile">
            <Button variant="destructive" size="sm" className="gap-2 bg-slate-700 text-white hover:bg-slate-800 transition-all hover:-translate-y-[1px] hover:shadow-md">
              <ExternalLink className="h-4 w-4" /> Profile
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {/* Title + Search Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-[min(60vw,360px)]">
              <Input placeholder="Search jobs or companies…" value={query} onChange={(e) => setQuery(e.target.value)} className="h-9 pl-9" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setFilterStatus(null)}>
              <Filter className="h-4 w-4" /> Clear Filters
            </Button>
          </div>
          <Link href="/home" className="ml-auto">
            <Button variant="outline" className="gap-2">
              ← Back to Home
            </Button>
          </Link>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {[...new Set(applications.map((a) => a.status))].map((s) => (
            <button key={s} onClick={() => setFilterStatus(filterStatus === s ? null : s)} className={`px-2.5 py-1 rounded-full border text-sm transition ${filterStatus === s ? "bg-slate-900 text-white border-slate-900" : "bg-white"}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Application list */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((app) => {
            const slug = shortSlug(app.company); // e.g. "aurora"
            return (
              <Link key={app.id} href={`/${slug}application`} className="block">
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="rounded-2xl h-full hover:shadow-lg transition">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold leading-tight">{app.jobTitle}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Building2 className="h-4 w-4" /> {app.company}
                          </p>
                        </div>
                        <Badge className={`rounded-full text-xs font-medium ${STATUS_COLORS[app.status] ?? ""}`}>{app.status}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="text-sm text-muted-foreground space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> Submitted {app.submitted}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Deadline {app.deadline}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">{app.location}</div>
                      <div className="text-xs text-slate-500">Type: {app.type}</div>
                    </CardContent>

                    <CardFooter className="justify-end">
                      <Button variant="secondary" className="gap-2 w-full">
                        View Application <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <Card className="col-span-full rounded-2xl">
              <CardContent className="py-12 text-center text-muted-foreground">No applications found. Try adjusting your filters.</CardContent>
            </Card>
          )}
        </div>

        {/* Saved roles (from Home page) */}
        {filteredSaved.length > 0 && (
          <section className="mt-10 space-y-3">
            <h2 className="text-lg font-semibold">Saved roles (not yet applied)</h2>
            <p className="text-xs text-muted-foreground">These are jobs you saved from the home page. Use this list to decide what to apply to next.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSaved.map((job) => (
                <Card key={job.id} className="rounded-2xl h-full hover:shadow-lg transition">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold leading-tight">{job.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Building2 className="h-4 w-4" /> {job.company}
                        </p>
                      </div>
                      <Badge className="rounded-full text-xs font-medium bg-slate-100 text-slate-800">Saved</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> Deadline {job.deadline}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{job.location}</div>
                    <div className="text-xs text-slate-500">Type: {job.type}</div>
                  </CardContent>

                  <CardFooter className="justify-end">
                    <Button variant="secondary" className="gap-2 w-full" asChild>
                      <Link href={`/jobdetails${job.id}`}>
                        Apply now <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t ">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">Track the progress of all your internship and co-op applications in one place.</div>
      </footer>
    </div>
  );
}
