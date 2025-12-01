"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Calendar, Clock, ChevronRight, ExternalLink, CheckCircle2, Bookmark, BookmarkCheck, Cpu, Activity, Database, Code, Bot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JobDetailMapleVision() {
  const [saved, setSaved] = useState(false);

  const job = useMemo(
    () => ({
      id: "maple-vision-ml-intern",
      title: "Machine Learning Intern — Computer Vision",
      company: "Maple Vision AI",
      location: "Toronto, ON (Remote)",
      workplace: "Remote",
      commitment: "Internship (Summer 2026)",
      deadlineISO: "2025-11-20T23:59:00-07:00",
      posted: "5d ago",
      duration: "4–8 months",
      stipend: "$30–$38/hour (depending on experience)",
      teams: ["Applied ML", "Platform", "Data"],
      tags: ["PyTorch", "CV", "MLOps"],
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
                Join Maple Vision AI’s applied ML team to contribute to production computer vision models and the pipelines that power them. You&apos;ll help improve training workflows, run experiments, and support deployment of models used in real
                products.
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
                <li>Contribute to computer vision models used in production systems.</li>
                <li>Help improve training and evaluation workflows across experiments.</li>
                <li>Collaborate with ML engineers and data engineers on pipelines.</li>
                <li>Participate in model reviews and share experiment findings.</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2">
                <li>Work in an environment that blends research and product delivery.</li>
                <li>Gain experience with modern MLOps tooling and practices.</li>
                <li>Learn how models are shipped reliably into production.</li>
                <li>Support continuous improvement of data and labeling workflows.</li>
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
                <li>Train and evaluate CNN models in PyTorch on internal datasets.</li>
                <li>Run experiments, log metrics, and compare model variants.</li>
                <li>Help maintain data pipelines and model deployment scripts.</li>
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
                  <li>Coursework or projects in machine learning or deep learning.</li>
                  <li>Experience with PyTorch or TensorFlow.</li>
                  <li>Comfort working in Python and with Jupyter/Colab environments.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Nice to have</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Experience with computer vision datasets and augmentations.</li>
                  <li>Familiarity with experiment tracking tools (e.g., Weights & Biases).</li>
                  <li>Exposure to basic MLOps practices (CI for models, packaging, etc.).</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Questions</h2>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Questions?{" "}
              <a href="mailto:careers@university.example" className="underline">
                careers@university.example
              </a>
            </CardContent>
          </Card>

          {/* EEO */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Equal opportunity</h2>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Maple Vision AI is an equal opportunity employer. We welcome applicants from all backgrounds and provide reasonable accommodations throughout the hiring process.</CardContent>
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

          {/* ML stack you’ll touch */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">ML stack you’ll touch</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <Badge variant="outline" className="justify-start gap-1">
                <Cpu className="h-4 w-4" /> PyTorch
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Bot className="h-4 w-4" /> CV Models
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Activity className="h-4 w-4" /> Experiments
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Database className="h-4 w-4" /> Datasets
              </Badge>
              <Badge variant="outline" className="justify-start gap-1">
                <Code className="h-4 w-4" /> MLOps Scripts
              </Badge>
            </CardContent>
          </Card>

          {/* Company */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Company</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="font-medium text-foreground">Maple Vision AI</div>
              <p>Maple Vision AI builds computer vision systems that power real-world applications, from analytics to automation. Teams span applied ML, platform, and data engineering.</p>
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
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Real-world computer vision experience
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Exposure to modern MLOps practices
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Strong portfolio material for ML roles
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
