"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, FileText, FileDown, Building2, Calendar, Clock, CheckCircle2, MessageSquare, Printer, Share2, Download, ExternalLink, Link, Paperclip, MapPin, User2, Mail, Phone, ChevronRight, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// This screen shows a *submitted* application when opened from the Applications tab.
// Replace mocks with your API data.

const MOCK_APP = {
  id: "APP-2025-001",
  status: "Under Review" as const, // "Submitted" | "Under Review" | "Interview Scheduled" | "Offer" | "Rejected"
  submittedISO: "2025-10-28T12:03:00-06:00",
  updatedISO: "2025-10-29T09:12:00-06:00",
  job: {
    id: "aurora-robotics-lab-internship",
    title: "Software Engineering Intern — Robotics",
    company: "Aurora Robotics Lab",
    location: "Calgary, AB (Hybrid)",
    deadlineISO: "2025-11-08T23:59:00-07:00",
  },
  personal: {
    name: "Nimna Wijedasa",
    email: "nimna.wijedasa@ucalgary.ca",
    phone: "(403) 555‑1234",
    links: {
      linkedin: "linkedin.com/in/nimna",
      github: "github.com/nimna",
      portfolio: "nimna.dev",
    },
  },
  documents: {
    resume: { name: "Wijedasa_Nimna_Resume.pdf", sizeMB: 0.48 },
    transcript: { name: "Wijedasa_Nimna_Transcript.pdf", sizeMB: 1.23 },
    cover: { name: "Cover_Letter_Aurora.pdf", sizeMB: 0.21 },
    extras: [
      { name: "robotics_project_report.pdf", sizeMB: 2.1 },
      { name: "ros2_demo.zip", sizeMB: 6.7 },
    ],
  },
  answers: {
    why: "I’m excited about shipping production robotics. My experience with ROS2 nodes for vision and control aligns with Aurora’s stack. I value mentorship and weekly demos.",
    project: "Built a ROS2-based perception pipeline: camera capture → preprocessing → YOLOv8 for object detection → EKF-based tracking. Wrote nodes in Python/C++, used Docker + CI for reproducible builds.",
  },
  timeline: [
    { when: "2025-10-28T12:03:00-06:00", label: "Application submitted" },
    { when: "2025-10-29T09:12:00-06:00", label: "Status updated to Under Review" },
  ],
};

const STATUS_STYLES: Record<typeof MOCK_APP.status | "Submitted" | "Offer" | "Rejected", string> = {
  Submitted: "bg-slate-100 text-slate-800",
  "Under Review": "bg-amber-100 text-amber-800",
  "Interview Scheduled": "bg-blue-100 text-blue-800",
  Offer: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-rose-100 text-rose-800",
};

const fmtDate = (iso: string) => new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric" });
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

export default function ApplicationDetailCompleted() {
  const app = useMemo(() => MOCK_APP, []);
  const [note, setNote] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => (window.location.href = "/applications")}>
              <ArrowLeft className="h-4 w-4" /> Back to Applications
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`rounded-full ${STATUS_STYLES[app.status]}`}>{app.status}</Badge>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => window.print()}>
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="destructive" size="sm" className="gap-2" onClick={() => alert("Exported as PDF (mock)")}>
              <Download className="h-4 w-4" /> Export PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 grid gap-6 lg:grid-cols-12">
        {/* Left column: details */}
        <section className="lg:col-span-8 space-y-6">
          {/* Job summary */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-semibold">{app.job.title}</h1>
                  <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="h-4 w-4" /> {app.job.company}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {app.job.location}
                    </span>
                  </p>
                </div>
                <div className="text-right min-w-[220px]">
                  <div className="text-xs text-muted-foreground">Submitted</div>
                  <div className="font-medium">
                    {fmtDate(app.submittedISO)} · {fmtTime(app.submittedISO)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Last updated</div>
                  <div className="text-sm">{fmtDate(app.updatedISO)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Thanks for applying! Below are the files and responses you submitted. We’ll email you about next steps. You can track changes to your status on this page.</p>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="secondary" className="gap-2" onClick={() => (window.location.href = "/jobs/aurora-robotics-lab")}>
                View Job <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="destructive" className="gap-2" onClick={() => (window.location.href = "/apply/aurora-robotics-lab")}>
                Apply Again <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Documents */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Submitted documents</h2>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border">
                <div className="inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Resume
                </div>
                <div className="text-muted-foreground">
                  {app.documents.resume.name} · {app.documents.resume.sizeMB.toFixed(2)} MB
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <FileDown className="h-4 w-4" /> Download
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <ExternalLink className="h-4 w-4" /> Open
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border">
                <div className="inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Transcript
                </div>
                <div className="text-muted-foreground">
                  {app.documents.transcript.name} · {app.documents.transcript.sizeMB.toFixed(2)} MB
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <FileDown className="h-4 w-4" /> Download
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-2">
                    <ExternalLink className="h-4 w-4" /> Open
                  </Button>
                </div>
              </div>
              {app.documents.cover && (
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border">
                  <div className="inline-flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Cover letter
                  </div>
                  <div className="text-muted-foreground">
                    {app.documents.cover.name} · {app.documents.cover.sizeMB.toFixed(2)} MB
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary" className="gap-2">
                      <FileDown className="h-4 w-4" /> Download
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-2">
                      <ExternalLink className="h-4 w-4" /> Open
                    </Button>
                  </div>
                </div>
              )}
              {app.documents.extras.length > 0 && (
                <div className="p-3 rounded-xl border">
                  <div className="text-sm font-medium mb-2">Supporting materials</div>
                  <div className="grid gap-2">
                    {app.documents.extras.map((f) => (
                      <div key={f.name} className="flex items-center justify-between gap-2 text-sm">
                        <span className="inline-flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          {f.name}
                        </span>
                        <span className="text-muted-foreground">{f.sizeMB.toFixed(2)} MB</span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="secondary" className="gap-2">
                            <FileDown className="h-4 w-4" /> Download
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-2">
                            <ExternalLink className="h-4 w-4" /> Open
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Answers */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Responses</h2>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-muted-foreground">
              <div>
                <div className="text-xs font-medium text-foreground mb-1">Why Aurora?</div>
                <p className="whitespace-pre-wrap">{app.answers.why}</p>
              </div>
              <div>
                <div className="text-xs font-medium text-foreground mb-1">Robotics/AI project</div>
                <p className="whitespace-pre-wrap">{app.answers.project}</p>
              </div>
            </CardContent>
          </Card>

          {/* Notes (personal) */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Your notes</h2>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">Private notes only you can see (e.g., interview prep reminders).</div>
              <div className="flex items-center gap-2">
                <Input placeholder="Add a short note…" value={note} onChange={(e) => setNote(e.target.value)} />
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (note.trim()) {
                      alert("Saved (mock)");
                      setNote("");
                    }
                  }}>
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Right column: timeline & actions */}
        <aside className="lg:col-span-4 space-y-4">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Status timeline</h3>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {app.timeline.map((t) => (
                <div key={t.when} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="text-foreground">{t.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {fmtDate(t.when)} · {fmtTime(t.when)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Next steps</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div>We’ll email you if you move to a technical screen. Typical SLA: 1–2 weeks.</div>
              <div className="text-xs">Tip: Prep algorithms + ROS basics and collect 2 project talking points.</div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="secondary" className="w-full gap-2" onClick={() => alert("Message sent (mock)")}>
                <MessageSquare className="h-4 w-4" /> Message recruiter
              </Button>
              <Button variant="ghost" className="w-full gap-2 text-rose-600 hover:text-rose-700" onClick={() => confirm("Withdraw this application?") && alert("Application withdrawn (mock)")}>
                <XCircle className="h-4 w-4" /> Withdraw application
              </Button>
            </CardFooter>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Contact</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <User2 className="h-4 w-4" /> Recruiting Team
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> careers@aurora‑robotics.example
              </div>
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4" />{" "}
                <a className="underline" href="/jobs/aurora-robotics-lab">
                  Job posting
                </a>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">This view mirrors what you submitted. Keep an eye on your email for updates.</div>
      </footer>
    </div>
  );
}
