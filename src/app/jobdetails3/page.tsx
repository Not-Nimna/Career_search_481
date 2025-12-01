"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Calendar, Clock, ChevronRight, ExternalLink, CheckCircle2, Bookmark, BookmarkCheck, Cloud, Server, CircuitBoard, GitBranch } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JobDetailNorthstar() {
  const [saved, setSaved] = useState(false);

  const job = useMemo(
    () => ({
      id: "northstar-energy-cloud-devops-intern",
      title: "Cloud DevOps Intern",
      company: "Northstar Energy",
      location: "Calgary, AB",
      workplace: "On-site / Hybrid",
      commitment: "Full-time Internship (4 months)",
      deadlineISO: "2025-11-18T23:59:00-07:00",
      posted: "Oct 24, 2025",
      duration: "4 months",
      stipend: "$28–$35/hour (depending on experience)",
      teams: ["Platform Engineering", "Infrastructure"],
      tags: ["AWS", "Terraform", "CI/CD", "DevOps"],
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
              <p>Help modernize Northstar&apos;s cloud infrastructure using Terraform and GitHub Actions. You&apos;ll work closely with platform engineers to improve developer experience, automate deployments, and keep services reliable.</p>
            </CardContent>
          </Card>

          {/* About the role */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">About the role</h2>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Help design and support infrastructure on AWS for internal teams.</li>
                <li>Use Terraform to define, version, and review infrastructure changes.</li>
                <li>Work with engineers to standardize environments across services.</li>
                <li>Contribute to observability and reliability improvements over time.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Pair with platform engineers on day-to-day tickets and projects.</li>
                <li>Participate in retros, standups, and infra design discussions.</li>
                <li>Document patterns and share back in internal runbooks.</li>
                <li>Learn how DevOps practices shape the developer experience.</li>
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
                <li>Write and maintain Terraform modules for core services.</li>
                <li>Build and monitor CI/CD workflows in GitHub Actions.</li>
                <li>Document infrastructure changes and best practices.</li>
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
                  <li>Familiar with AWS or another major cloud provider.</li>
                  <li>Understanding of basic networking and cloud primitives.</li>
                  <li>Comfortable working in a Linux-based development environment.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Nice to have</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Knowledge of Infrastructure as Code concepts (e.g., Terraform).</li>
                  <li>Experience with CI/CD tools such as GitHub Actions.</li>
                  <li>Scripting experience in Python or Bash.</li>
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
                <li>Hands-on experience with cloud infrastructure at an energy company.</li>
                <li>Exposure to DevOps practices and developer tooling.</li>
                <li>Real examples of Terraform and CI/CD work for your portfolio.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Mentorship from platform and infrastructure engineers.</li>
                <li>Opportunities to improve operational reliability and DX.</li>
                <li>Experience collaborating with multiple product and infra teams.</li>
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
                  <strong>Resume screen</strong> by the platform team.
                </li>
                <li>
                  <strong>Technical screen</strong> (45 min): basic cloud + scripting questions.
                </li>
                <li>
                  <strong>Panel</strong> (60–75 min): system design, DevOps scenarios, and collaboration.
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
            <CardContent className="text-sm text-muted-foreground">Northstar Energy is an equal opportunity employer. We welcome applicants from all backgrounds and provide reasonable accommodations throughout the hiring process.</CardContent>
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

          {/* Tech you’ll touch */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Tech you’ll touch</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <Badge variant="outline" className="justify-start gap-1">
                <Cloud className="h-4 w-4" /> AWS
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <CircuitBoard className="h-4 w-4" /> Terraform
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <GitBranch className="h-4 w-4" /> GitHub Actions
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Server className="h-4 w-4" /> Linux / Servers
              </Badge>
            </CardContent>
          </Card>

          {/* Company */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Company</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="font-medium text-foreground">Northstar Energy</div>
              <p>Northstar Energy focuses on reliable energy delivery and modernization of its digital infrastructure. The platform team supports product and operations teams with secure, automated cloud environments.</p>
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
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Real DevOps experience with AWS & Terraform
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Chance to own CI/CD workflows
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Strong mentorship from platform engineers
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Questions?</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Email{" "}
              <a href="mailto:careers@university.example" className="underline">
                careers@university.example
              </a>{" "}
              for support with this posting.
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
