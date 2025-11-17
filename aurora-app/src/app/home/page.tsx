"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, ExternalLink, GraduationCap, Calendar, Briefcase, Building2, Filter, Star, ArrowRight, Bookmark, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// --- Mock Data ---
const JOBS = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "Aurora Robotics Lab",
    location: "Calgary, AB (Hybrid)",
    type: "Internship",
    postedAt: "2d",
    deadline: "Nov 8",
    tags: ["Python", "React", "AI"],
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
  },
  {
    id: "5",
    title: "Cybersecurity Co‑op",
    company: "Sentinel Networks",
    location: "Edmonton, AB (Hybrid)",
    type: "Co‑op",
    postedAt: "5h",
    deadline: "Nov 5",
    tags: ["Threat Intel", "Splunk", "Python"],
  },
  {
    id: "6",
    title: "Machine Learning Intern",
    company: "Maple Vision AI",
    location: "Toronto, ON (Remote)",
    type: "Internship",
    postedAt: "5d",
    deadline: "Nov 20",
    tags: ["PyTorch", "CV", "MLOps"],
  },
];

const DEADLINES = [
  { label: "Apple Cupertino Online Assessment", date: "Nov 8", href: "#" },
  { label: "Maple Vision AI — ML Intern", date: "Nov 20", href: "#" },
  { label: "Prairie Health — Data Co‑op", date: "Nov 12", href: "#" },
  { label: "Northstar Energy — DevOps Intern", date: "Nov 18", href: "#" },
  // New tasks / deadlines
  { label: "Pixel & Pine — Product Design Intern", date: "Nov 10", href: "#" },
  { label: "Sentinel Networks — Cybersecurity Co-op", date: "Nov 5", href: "#" },
  { label: "Aurora Robotics Lab — SWE Intern", date: "Nov 15", href: "#" },
  { label: "UCalgary CS Club — Hackathon Registration", date: "Nov 3", href: "#" },
  { label: "RBC — New Grad SWE", date: "Dec 1", href: "#" },
  { label: "Google STEP Intern — Application", date: "Dec 5", href: "#" },
  { label: "Amazon Propel — Online Assessment", date: "Dec 7", href: "#" },
  { label: "TD — Data Science Co-op", date: "Dec 9", href: "#" },
];

const QUICK_LINKS = [
  {
    title: "Applications",
    desc: "Track submissions, statuses, and interview times.",
    icon: <Briefcase className="h-5 w-5" aria-hidden />,
    route: "/Applications",
  },
  {
    title: "Resources",
    desc: "Resume templates, cover letters, and guides.",
    icon: <GraduationCap className="h-5 w-5" aria-hidden />,
    route: "/resources",
  },
  {
    title: "Deadlines",
    desc: "All upcoming cut‑offs in one place.",
    icon: <Calendar className="h-5 w-5" aria-hidden />,
    route: "/deadlines",
  },
  {
    title: "Networking",
    desc: "Clubs, alumni, mentors, and events.",
    icon: <Building2 className="h-5 w-5" aria-hidden />,
    route: "/network",
  },
];

// --- Components ---
function JobCard({ job }: { job: (typeof JOBS)[number] }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold leading-tight">{job.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <Star className="h-4 w-4" aria-hidden /> {job.company}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs px-2 py-1">
              {job.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" /> Posted {job.postedAt}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Deadline {job.deadline}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <Badge key={t} variant="outline" className="rounded-full">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="secondary" className="gap-2">
            <Bookmark className="h-4 w-4" /> Save
          </Button>
          <Button variant="destructive" className="gap-2">
            View & Apply <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function CareerHome() {
  const [query, setQuery] = useState("");
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [showAllDeadlines, setShowAllDeadlines] = useState(false);
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return JOBS.filter((j) => {
      const base = [j.title, j.company, j.location, j.type, ...j.tags].join(" ").toLowerCase();
      const matchRemote = !onlyRemote || /remote/.test(j.location.toLowerCase());
      return base.includes(q) && matchRemote;
    });
  }, [query, onlyRemote]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Topbar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="University Logo" className="h-10 w-10" />
            <span className="font-semibold">University Career Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#jobs">
              Jobs
            </a>
            <a className="hover:text-foreground" href="#deadlines">
              Deadlines
            </a>
            <a className="hover:text-foreground" href="#links">
              Quick Links
            </a>
            <a className="hover:text-foreground" href="#resources">
              Resources
            </a>
          </nav>
          <Link href="/profile">
            <Button variant="destructive" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" /> Profile
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero / Search */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold tracking-tight">
              Welcome back — let’s find your next opportunity.
            </motion.h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">Search internships, co‑ops, and entry‑level roles from trusted employers. Save roles, track applications, and never miss a deadline.</p>

            <div className="mt-6">
              <div className="rounded-2xl border bg-white p-3 shadow-sm">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Input aria-label="Search jobs" placeholder="Search by role, skill, company, or location…" value={query} onChange={(e) => setQuery(e.target.value)} className="h-12 pl-10 text-base" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  <Button variant="outline" className="h-12 gap-2" onClick={() => setOnlyRemote((v) => !v)}>
                    <Filter className="h-4 w-4" /> {onlyRemote ? "Remote Only ✓" : "Remote Only"}
                  </Button>
                  <Button
                    variant="destructive"
                    className="h-12 gap-2"
                    onClick={() => {
                      const q = query.trim();
                      router.push(`/jobsearch${q ? `?q=${encodeURIComponent(q)}` : ""}`);
                    }}>
                    <Search className="h-5 w-5" /> Search
                  </Button>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                Popular:{" "}
                <button className="underline hover:no-underline mr-3" onClick={() => setQuery("software engineer")}>
                  software engineer
                </button>
                <button className="underline hover:no-underline mr-3" onClick={() => setQuery("data analyst")}>
                  data analyst
                </button>
                <button className="underline hover:no-underline" onClick={() => setQuery("product design")}>
                  product design
                </button>
              </div>
            </div>
          </div>

          {/* Deadlines at a glance */}
          <aside id="deadlines" className="lg:col-span-1 relative">
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Deadlines at a Glance</h2>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {DEADLINES.slice(0, 4).map((d) => (
                  <a key={d.label} href={d.href} className="flex items-center justify-between rounded-xl border p-3 hover:bg-slate-50">
                    <span className="text-sm font-medium leading-tight">{d.label}</span>
                    <Badge className="rounded-full" variant="secondary">
                      {d.date}
                    </Badge>
                  </a>
                ))}
              </CardContent>

              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => setShowAllDeadlines(true)}>
                  View all deadlines
                </Button>
              </CardFooter>
            </Card>

            {/* ✅ DEADLINES MODAL OVERLAY (ADD THIS PART) */}
            {showAllDeadlines && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl px-4">
                  <Card className="rounded-2xl shadow-xl border max-h-[85vh] flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <div>
                          <h2 className="text-lg font-semibold">All Deadlines</h2>
                          <p className="text-xs text-muted-foreground">All upcoming assessments & application cut-offs.</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setShowAllDeadlines(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </CardHeader>

                    {/* 🔥 Scrollable list area */}
                    <CardContent className="space-y-3 overflow-y-auto pr-1 max-h-[60vh]">
                      {DEADLINES.map((d) => (
                        <a key={d.label} href={d.href} className="flex items-center justify-between rounded-xl border px-3 py-2.5 hover:bg-slate-50">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium leading-tight">{d.label}</span>
                            <span className="text-xs text-muted-foreground">Application deadline</span>
                          </div>
                          <Badge className="rounded-full" variant="secondary">
                            {d.date}
                          </Badge>
                        </a>
                      ))}
                    </CardContent>

                    <CardFooter className="flex justify-end gap-2 border-t bg-slate-50/60">
                      <Button variant="outline" onClick={() => setShowAllDeadlines(false)}>
                        Back
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Recommended Jobs */}
      <section id="jobs" className="mx-auto max-w-7xl px-4 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <Link href="/jobsearch" passHref>
            <Button variant="ghost" className="gap-2">
              See more...
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          {filtered.length === 0 && (
            <Card className="sm:col-span-2 lg:col-span-3 rounded-2xl">
              <CardContent className="py-10 text-center text-muted-foreground">No matches yet. Try a different query or clear filters.</CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section id="links" className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Quick Links</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUICK_LINKS.map((q) => (
              <div key={q.title} onClick={() => router.push(q.route)} className="group rounded-2xl border p-5 bg-gradient-to-br from-slate-50 to-white hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="rounded-xl p-2 border bg-white">{q.icon}</span>
                  <span className="font-medium">{q.title}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{q.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                  Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & CTA */}
      <section id="resources" className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Resources</h2>
        </div>
        <Card className="rounded-2xl">
          <CardContent className="md:flex items-center justify-between gap-6 py-8">
            <div>
              <h3 className="text-xl font-semibold">Sharpen your application</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">Use our resume templates, ATS‑ready formats, and interview prep kits. Join weekly clinics and get feedback from career advisors and alumni.</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" /> Resume Templates
              </Button>
              <Button variant="destructive" className="gap-2">
                <ExternalLink className="h-4 w-4" /> Book Advising
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground">© {new Date().getFullYear()} University Career Centre · Built for students</div>
      </footer>
    </div>
  );
}
