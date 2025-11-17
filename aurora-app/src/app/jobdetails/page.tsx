"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Calendar, Clock, Share2, Bookmark, BookmarkCheck, ChevronRight, Briefcase, Code, Cpu, CircuitBoard, Network, Bot, GraduationCap, ExternalLink, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import Link from "next/link";
export default function JobDetailAurora() {
  const [saved, setSaved] = useState(false);

  const job = useMemo(
    () => ({
      id: "aurora-robotics-lab-internship",
      title: "Software Engineering Intern — Robotics",
      company: "Aurora Robotics Lab",
      location: "Calgary, AB (Hybrid)",
      workplace: "Hybrid",
      commitment: "Full‑time Internship (May–Aug 2026)",
      deadlineISO: "2025-11-08T23:59:00-07:00",
      posted: "Oct 20, 2025",
      duration: "16 weeks",
      stipend: "$28–$34/hour (depending on experience)",
      teams: ["Perception", "Controls", "Infrastructure"],
      tags: ["SWE", "Python", "C++", "ROS", "CV", "Robotics"],
    }),
    []
  );

  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const router = useRouter();

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
                <div className="flex  justify-end gap-2 min-w-[300px]">
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
              <p>Join Aurora’s robotics team to build production‑quality software that brings autonomous systems to the real world. You’ll work alongside engineers across perception, controls, and infrastructure to ship features that matter.</p>
            </CardContent>
          </Card>

          {/* About the role */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">About the role</h2>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Implement services and pipelines in <strong>Python</strong> and <strong>C++</strong> for robotics workloads.
                </li>
                <li>Build, test, and deploy ROS/ROS2 nodes for motion, control, and perception.</li>
                <li>Contribute to CI/CD and infra for simulation and on‑robot testing.</li>
                <li>Profile and optimize algorithms for performance and reliability.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Collaborate with cross‑functional teammates (controls, CV, infra).</li>
                <li>Write clean, well‑documented code and participate in code reviews.</li>
                <li>Own small projects end‑to‑end with mentorship and weekly demos.</li>
                <li>Follow safety and lab procedures during on‑robot experiments.</li>
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
                  <li>Currently pursuing a BSc in Software/Computer Engineering or related.</li>
                  <li>
                    Proficiency in <strong>Python</strong> and one of <strong>C++/Go</strong>.
                  </li>
                  <li>
                    Version control with <strong>Git</strong>; comfort with Linux tooling.
                  </li>
                  <li>
                    Familiarity with <strong>ROS/ROS2</strong> and basic robotics concepts.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Nice to have</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Coursework/projects in <strong>controls</strong>, <strong>computer vision</strong>, or <strong>SLAM</strong>.
                  </li>
                  <li>
                    Experience with <strong>Docker</strong>, <strong>CI/CD</strong>, or cloud compute.
                  </li>
                  <li>Simulation experience (Gazebo, Isaac, PyBullet) or hardware bring‑up.</li>
                  <li>Testing frameworks (pytest, gtest) and profiling tools.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* What you'll learn / benefits */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">What you’ll gain</h2>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Mentorship from senior robotics and infrastructure engineers.</li>
                <li>End‑to‑end exposure: sim → on‑robot testing → field results.</li>
                <li>Real impact: contribute to demos used by partners and customers.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Competitive compensation: {job.stipend}.</li>
                <li>Hybrid work with lab access and modern dev environment.</li>
                <li>Peer community: intern cohort events and tech talks.</li>
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
                  <strong>Resume screen</strong> by the hiring team.
                </li>
                <li>
                  <strong>Technical screen</strong> (45 min): Python/C++ coding + basic robotics.
                </li>
                <li>
                  <strong>Panel</strong> (75 min): system design, ROS, and troubleshooting.
                </li>
                <li>
                  <strong>Offer</strong> & timeline discussion.
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* EEO & notes */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Equal opportunity</h2>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Aurora Robotics Lab is an equal opportunity employer. We welcome applicants from all backgrounds and provide reasonable accommodations throughout the hiring process.</CardContent>
          </Card>
        </section>

        {/* Right column */}
        <aside className="lg:col-span-4 ">
          <Link href="/jobsearch">
            <Button variant="outline" className="gap-2">
              ← Back to Search
            </Button>
          </Link>

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

            {/* fix starts here */}
            <CardFooter className="flex flex-col gap-2 w-full">
              <Button variant="destructive" className="w-full gap-2" onClick={() => router.push("/applyjob")}>
                Apply Now <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="secondary" className="w-full gap-2" onClick={() => setSaved((s) => !s)}>
                {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                {saved ? "Saved" : "Save job"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Tech you’ll touch</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <Badge variant="outline" className="justify-start gap-1">
                <Code className="h-4 w-4" /> Python
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Code className="h-4 w-4" /> C++
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Bot className="h-4 w-4" /> ROS / ROS2
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Cpu className="h-4 w-4" /> CV/Perception
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <CircuitBoard className="h-4 w-4" /> CI/CD
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Network className="h-4 w-4" /> Docker/Linux
              </Badge>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Company</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="font-medium text-foreground">Aurora Robotics Lab</div>
              <p>We build reliable autonomy for real‑world environments. Our teams span perception, controls, and production infrastructure.</p>
              <a className="inline-flex items-center gap-1 text-primary underline" href="#">
                Website <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Why this role</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Production‑oriented robotics work
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Mentorship + weekly demos
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Hybrid lab access
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
