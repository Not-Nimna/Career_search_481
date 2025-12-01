"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Calendar, Clock, ChevronRight, ExternalLink, CheckCircle2, Bookmark, BookmarkCheck, Shield, Activity, Terminal, Server, Lock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JobDetailSentinel() {
  const [saved, setSaved] = useState(false);

  const job = useMemo(
    () => ({
      id: "sentinel-networks-cybersecurity-coop",
      title: "Cybersecurity Co-op",
      company: "Sentinel Networks",
      location: "Edmonton, AB (Hybrid)",
      workplace: "Hybrid",
      commitment: "Co-op Term (Summer 2026)",
      deadlineISO: "2025-11-05T23:59:00-07:00",
      posted: "5h ago",
      duration: "4–8 months",
      stipend: "$27–$33/hour (depending on experience)",
      teams: ["Security Operations", "Threat Intelligence"],
      tags: ["Threat Intel", "Splunk", "Python"],
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
                <div className="flex justify-end gap-2 min-w-[260px]">
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
                Join Sentinel Networks&apos; security operations team to support threat detection, log analysis, and incident response automation. You&apos;ll work alongside SOC analysts and engineers to keep systems secure and respond quickly to
                emerging threats.
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
                <li>Support the security operations team with day-to-day monitoring and analysis.</li>
                <li>Investigate alerts surfaced in SIEM dashboards and other monitoring tools.</li>
                <li>Help tune detection content to reduce noise and improve signal quality.</li>
                <li>Collaborate with analysts and engineers on incident workflows and runbooks.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Document investigations and findings in a consistent, repeatable format.</li>
                <li>Contribute to automation ideas for common investigation tasks.</li>
                <li>Participate in weekly security reviews and knowledge-sharing sessions.</li>
                <li>Learn how a modern SOC operates in real-world environments.</li>
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
                <li>Monitor SIEM dashboards and investigate security alerts.</li>
                <li>Write and tune detection rules in Splunk or similar tools.</li>
                <li>Automate common investigation tasks using Python scripts.</li>
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
                  <li>Interest in cybersecurity, SOC operations, or incident response.</li>
                  <li>Basic familiarity with SIEM tools or log analysis workflows.</li>
                  <li>Python scripting skills and comfort with Linux basics.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Nice to have</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Coursework or projects related to information security.</li>
                  <li>Exposure to Splunk, Elastic, or other SIEM platforms.</li>
                  <li>Understanding of common attack techniques and security frameworks.</li>
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
                <li>Hands-on experience in a security operations center environment.</li>
                <li>Mentorship from experienced SOC analysts and security engineers.</li>
                <li>Exposure to real-world incidents, detections, and response workflows.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Stronger Python automation skills applied to security problems.</li>
                <li>Experience with SIEM dashboards, detections, and log pipelines.</li>
                <li>A clearer view of career paths in cybersecurity and threat intel.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Questions</h2>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Questions about this posting or the application process? Email{" "}
              <a href="mailto:careers@university.example" className="underline">
                careers@university.example
              </a>{" "}
              and a coordinator can help.
            </CardContent>
          </Card>

          {/* EEO */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Equal opportunity</h2>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Sentinel Networks is an equal opportunity employer. We welcome applicants from all backgrounds and provide reasonable accommodations throughout the hiring process.</CardContent>
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

          {/* Security stack you'll touch */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Security stack you’ll touch</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <Badge variant="outline" className="justify-start gap-1">
                <Shield className="h-4 w-4" /> SIEM / Detections
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Activity className="h-4 w-4" /> Threat Intel
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Terminal className="h-4 w-4" /> Python Scripts
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Server className="h-4 w-4" /> Log Pipelines
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Lock className="h-4 w-4" /> Linux / Hardening
              </Badge>
            </CardContent>
          </Card>

          {/* Company */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Company</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="font-medium text-foreground">Sentinel Networks</div>
              <p>Sentinel Networks secures critical infrastructure and enterprise environments through managed detection and response, threat intelligence, and hands-on security operations.</p>
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
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Real SOC experience on live systems
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Strong foundation for security careers
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Mix of investigation and automation work
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
