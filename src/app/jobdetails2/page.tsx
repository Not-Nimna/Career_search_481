"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Calendar, Clock, ChevronRight, Briefcase, BarChart3, Database, ExternalLink, CheckCircle2, Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JobDetailPrairie() {
  const [saved, setSaved] = useState(false);

  const job = useMemo(
    () => ({
      id: "prairie-health-data-analyst-coop",
      title: "Data Analyst Co-op",
      company: "Prairie Health System",
      location: "Remote – Canada",
      workplace: "Remote",
      commitment: "Full-time Co-op (4 months)",
      deadlineISO: "2025-11-12T23:59:00-07:00",
      posted: "Oct 25, 2025",
      duration: "4 months",
      stipend: "$26–$32/hour (depending on experience)",
      teams: ["Analytics", "Operations"],
      tags: ["SQL", "Tableau", "ETL", "Analytics"],
    }),
    []
  );

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-[#F8F7F4]/90 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
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

      <main className="mx-auto max-w-6xl px-4 py-6 grid gap-6 lg:grid-cols-12">
        {/* Left column */}
        <section className="lg:col-span-8 space-y-6">
          {/* Title card */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold leading-tight">{job.title}</h1>
                  <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="h-4 w-4" /> {job.company}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                    <span>•</span>
                    <span>{job.commitment}</span>
                  </p>
                </div>
                <div className="flex justify-end gap-2 min-w-[300px]">
                  <span className="text-sm text-muted-foreground">Deadline:</span>
                  <span className="font-medium">{fmtDate(job.deadlineISO)}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <Badge key={t} variant="outline" className="rounded-full">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Analyze patient wait-time data and build dashboards that drive real operational decisions across clinics. You&apos;ll partner with operations, schedulers, and clinic leads to surface insights and reduce bottlenecks in patient flow.
              </p>
            </CardContent>
          </Card>

          {/* About the role */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">About the role</h2>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Own end-to-end analytics flows for wait-time and throughput metrics.</li>
                <li>Build and maintain Tableau dashboards used by clinic managers.</li>
                <li>Work with raw data from clinical and scheduling systems.</li>
                <li>Communicate findings with clear visuals and summaries.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Partner with operations leads to prioritize questions and hypotheses.</li>
                <li>Contribute to a shared analytics layer and documentation.</li>
                <li>Support ad-hoc deep dives on spikes, bottlenecks, and trends.</li>
                <li>Help define better data quality checks over time.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Responsibilities</h2>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Create Tableau dashboards to track KPIs across clinics.</li>
                <li>Automate ETL pipelines from clinical and scheduling systems.</li>
                <li>Present weekly findings to operations stakeholders.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Qualifications</h2>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-2">Minimum</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Currently enrolled in a program such as CS, Data Science, or Statistics.</li>
                  <li>SQL proficiency and experience querying large datasets.</li>
                  <li>Comfort working with spreadsheets and data cleaning.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Nice to have</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Hands-on experience with at least one BI tool (e.g., <strong>Tableau</strong>, <strong>Power BI</strong>).
                  </li>
                  <li>Familiarity with basic ETL concepts and data pipelines.</li>
                  <li>Strong written and verbal communication skills.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* What you'll gain */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">What you’ll gain</h2>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Experience working with real healthcare operations data.</li>
                <li>Practice building dashboards used by non-technical stakeholders.</li>
                <li>Exposure to how analytics aligns with patient outcomes.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Remote-friendly environment with flexible collaboration.</li>
                <li>Feedback and mentorship from senior analysts and managers.</li>
                <li>Ownership over a portfolio-ready analytics project.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Interview process */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Interview process</h2>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Resume screen</strong> by the analytics team.
                </li>
                <li>
                  <strong>Technical screen</strong> (45 min): SQL questions and a simple analytics scenario.
                </li>
                <li>
                  <strong>Panel</strong> (60 min): case-style questions with analytics + operations.
                </li>
                <li>
                  <strong>Offer</strong> & start-date discussion.
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* EEO */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Equal opportunity</h2>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Prairie Health System is an equal opportunity employer. We welcome applicants from all backgrounds and provide reasonable accommodations throughout the hiring process.</CardContent>
          </Card>
        </section>

        {/* Right column */}
        <aside className="lg:col-span-4">
          <div className="flex justify-end">
            <Link href="/jobsearch">
              <Button variant="outline" className="gap-2">
                ← Back to Search
              </Button>
            </Link>
          </div>

          {/* At a glance */}
          <Card className="rounded-2xl mt-4">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">At a glance</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center justify-between">
                <span>Posted</span>
                <span>{job.posted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Deadline</span>
                <span>{fmtDate(job.deadlineISO)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Duration</span>
                <span>{job.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Workplace</span>
                <span>{job.workplace}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Teams</span>
                <span>{job.teams.join(", ")}</span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 w-full">
              <Button variant="destructive" className="w-full gap-2" onClick={() => router.push("/applyjob")}>
                Proceed to application <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="secondary" className="w-full gap-2" onClick={() => setSaved((s) => !s)}>
                {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                {saved ? "Saved" : "Save job"}
              </Button>
            </CardFooter>
          </Card>

          {/* Tech stack */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Tech you’ll touch</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <Badge variant="outline" className="justify-start gap-1">
                <Database className="h-4 w-4" /> SQL
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <BarChart3 className="h-4 w-4" /> Tableau / BI
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Briefcase className="h-4 w-4" /> ETL / Pipelines
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Clock className="h-4 w-4" /> Operations KPIs
              </Badge>
            </CardContent>
          </Card>

          {/* Company */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Company</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="font-medium text-foreground">Prairie Health System</div>
              <p>Prairie Health System operates a network of clinics and care centres. The analytics team partners with operations to improve access, reduce wait times, and support better patient experiences.</p>
              <a className="inline-flex items-center gap-1 text-primary underline" href="#">
                Company Site <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          {/* Why this role */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Why this role</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Direct impact on patient experience
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Strong exposure to BI and dashboards
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Remote-friendly data team
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">Always verify the deadline and application requirements on the employer page. This posting is for demonstration purposes.</div>
      </footer>
    </div>
  );
}
