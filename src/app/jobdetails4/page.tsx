"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Calendar, Clock, ChevronRight, ExternalLink, CheckCircle2, Bookmark, BookmarkCheck, PenTool, LayoutTemplate, MousePointer2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JobDetailPixelPine() {
  const [saved, setSaved] = useState(false);

  const job = useMemo(
    () => ({
      id: "pixel-pine-product-design-intern",
      title: "Product Design Intern",
      company: "Pixel & Pine",
      location: "Vancouver, BC (On-site)",
      workplace: "On-site",
      commitment: "Full-time Internship (Summer 2026)",
      deadlineISO: "2025-11-10T23:59:00-07:00",
      posted: "3d ago",
      duration: "4 months",
      stipend: "$26–$32/hour (depending on experience)",
      teams: ["Product Design", "UX Research"],
      tags: ["Figma", "Prototyping", "UX"],
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
                Join Pixel & Pine&apos;s product design team to prototype mobile experiences and help shape delightful user journeys. You&apos;ll work closely with design leads and researchers to test ideas, synthesize feedback, and iterate quickly.
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
                <li>Work with design leads to prototype mobile and web experiences.</li>
                <li>Contribute to end-to-end design flows from initial concepts to polished UIs.</li>
                <li>Collaborate with product and engineering partners on requirements and constraints.</li>
                <li>Help maintain and extend the shared design system and component libraries.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Support user research planning, note-taking, and synthesis.</li>
                <li>Explore multiple directions and present design decisions clearly.</li>
                <li>Document patterns and guidelines for future iterations.</li>
                <li>Contribute to weekly critiques and design reviews.</li>
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
                <li>Produce high-fidelity Figma prototypes for mobile and web.</li>
                <li>Run moderated and unmoderated usability tests.</li>
                <li>Synthesize feedback and iterate on design flows.</li>
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
                  <li>Figma expertise and comfort with component libraries.</li>
                  <li>Portfolio of student or side-project UX work.</li>
                  <li>Understanding of user research fundamentals.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Nice to have</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Experience prototyping micro-interactions or motion.</li>
                  <li>Exposure to usability testing tools and methods.</li>
                  <li>Basic familiarity with front-end handoff (e.g., specs, dev-ready files).</li>
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
                <li>Mentorship from senior product designers and design leads.</li>
                <li>Hands-on experience running usability tests and synthesizing insights.</li>
                <li>Real shipped work to feature in your portfolio.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Practice presenting design decisions to cross-functional partners.</li>
                <li>Experience working with design systems and component libraries.</li>
                <li>A clearer sense of your path in product design and UX.</li>
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
            <CardContent className="text-sm text-muted-foreground">Pixel &amp; Pine is an equal opportunity employer. We welcome applicants from all backgrounds and provide reasonable accommodations throughout the hiring process.</CardContent>
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

          {/* Design tools / Tech you’ll touch */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Design tools you’ll use</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <Badge variant="outline" className="justify-start gap-1">
                <PenTool className="h-4 w-4" /> Figma
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <LayoutTemplate className="h-4 w-4" /> Design Systems
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <MousePointer2 className="h-4 w-4" /> Prototyping
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Calendar className="h-4 w-4" /> Research Sessions
              </Badge>
            </CardContent>
          </Card>

          {/* Company */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Company</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="font-medium text-foreground">Pixel &amp; Pine</div>
              <p>Pixel &amp; Pine is a product studio focused on thoughtful digital experiences. The team blends research, design, and engineering to ship polished interfaces for clients across consumer and enterprise spaces.</p>
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
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Strong portfolio-building opportunity
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Direct mentorship from design leads
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Hands-on usability testing experience
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
