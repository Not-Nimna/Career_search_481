"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeft, FileText, FileDown, Building2, Calendar, Clock, CheckCircle2, MessageSquare, Printer, Share2, Download, ExternalLink, Link as LinkIcon, Paperclip, MapPin, User2, Mail, ChevronRight, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// --- Types ---
type ApplicationStatus = "Submitted" | "Under Review" | "Interview_Scheduled" | "Offer" | "Rejected";

type Application = {
  id: string;
  status: ApplicationStatus;
  submittedISO: string;
  updatedISO: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    deadlineISO: string;
  };
  personal: {
    name: string;
    email: string;
    phone: string;
    links: {
      linkedin: string;
      github: string;
      portfolio: string;
    };
  };
  documents: {
    resume: { name: string; sizeMB: number };
    transcript: { name: string; sizeMB: number };
    cover?: { name: string; sizeMB: number };
    extras: { name: string; sizeMB: number }[];
  };
  answers: {
    why: string;
    project: string;
  };
  timeline: { when: string; label: string }[];
};

// --- Status styles ---
const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Submitted: "bg-slate-100 text-slate-800",
  "Under Review": "bg-amber-100 text-amber-800",
  Interview_Scheduled: "bg-blue-100 text-blue-800",
  Offer: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-rose-100 text-rose-800",
};

// --- Mock data for Pixel & Pine ---
const MOCK_APP: Application = {
  id: "APP-2025-003",
  status: "Offer",
  submittedISO: "2025-10-20T11:05:00-07:00",
  updatedISO: "2025-10-27T16:45:00-07:00",
  job: {
    id: "pixel-and-pine-product-design-intern",
    title: "Product Design Intern",
    company: "Pixel & Pine",
    location: "Vancouver, BC (On-site)",
    // Deadline Nov 10
    deadlineISO: "2025-11-10T23:59:00-07:00",
  },
  personal: {
    name: "John Doe",
    email: "John.Doe@ucalgary.ca",
    phone: "(403) 555-1234",
    links: {
      linkedin: "linkedin.com/in/John",
      github: "github.com/John",
      portfolio: "John.design",
    },
  },
  documents: {
    resume: { name: "Doe_John_Design_Resume.pdf", sizeMB: 0.52 },
    transcript: { name: "Doe_John_Transcript.pdf", sizeMB: 1.1 },
    cover: { name: "Cover_Letter_Pixel_Pine.pdf", sizeMB: 0.24 },
    extras: [
      { name: "mobile_banking_case_study.pdf", sizeMB: 3.2 },
      { name: "usability_test_notes.pdf", sizeMB: 1.5 },
    ],
  },
  answers: {
    why: "Pixel & Pine’s focus on playful yet polished mobile experiences really matches the kind of products I want to design. I’m especially excited about learning from your design leads, iterating quickly on prototypes, and seeing my work tested in real sessions with users.",
    project:
      "Redesigned a habit tracking app as a student project: mapped user journeys, created wireframes, then built high-fidelity Figma prototypes with interactive flows. Ran 5 moderated usability tests over Zoom, synthesized findings into themes, and iterated on navigation, microcopy, and empty states. Documented decisions in a short case study and presented it to peers.",
  },
  timeline: [
    {
      when: "2025-10-20T11:05:00-07:00",
      label: "Application submitted",
    },
    {
      when: "2025-10-24T10:15:00-07:00",
      label: "Portfolio review completed",
    },
    {
      when: "2025-10-27T16:45:00-07:00",
      label: "Offer received",
    },
  ],
};

// --- Utils ---
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

// --- Component ---
export default function PixelPineApplicationDetail() {
  const app = useMemo(() => MOCK_APP, []);
  const [note, setNote] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Top bar (same as Aurora / University Career Hub) */}
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

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-12">
        {/* Top row: back + actions (matches layout: back far left, actions far right) */}
        <div className="mb-2 flex items-center justify-between lg:col-span-12">
          <div className="flex items-start gap-2">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link href="/Applications">
                <ArrowLeft className="h-4 w-4" /> Back to Applications
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={`rounded-full ${STATUS_STYLES[app.status]}`}>{app.status === "Interview_Scheduled" ? "Interview Scheduled" : app.status}</Badge>
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

        {/* Left column: details */}
        <section className="space-y-6 lg:col-span-8">
          {/* Job summary */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-semibold">{app.job.title}</h1>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="h-4 w-4" /> {app.job.company}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {app.job.location}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">Work with design leads to prototype mobile experiences and run usability tests.</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline">Internship</Badge>
                    <Badge variant="outline">Figma</Badge>
                    <Badge variant="outline">Prototyping</Badge>
                    <Badge variant="outline">UX</Badge>
                  </div>
                </div>
                <div className="min-w-[220px] text-right">
                  <div className="text-xs text-muted-foreground">Submitted</div>
                  <div className="font-medium">
                    {fmtDate(app.submittedISO)} · {fmtTime(app.submittedISO)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">Application deadline</div>
                  <div className="text-sm">{fmtDate(app.job.deadlineISO)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Thanks for applying! Below are the files and responses you submitted. We’ll email you about next steps. You can track changes to your status on this page.</p>
              <p>This role focuses on producing high-fidelity prototypes, running moderated usability tests, and iterating quickly based on feedback from design leads and users.</p>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="secondary" className="gap-2" onClick={() => (window.location.href = "/jobs/pixel-and-pine-product-design-intern")}>
                View Job <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="destructive" className="gap-2" onClick={() => (window.location.href = "/apply/pixel-and-pine-product-design-intern")}>
                Apply Again <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Documents */}
          <Card className="rounded-2xl">
            <CardHeader>
              <h2 className="text-lg font-semibold">Submitted documents</h2>
            </CardHeader>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="grid gap-3 text-sm">
              {/* Resume */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3">
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

              {/* Transcript */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3">
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

              {/* Cover letter */}
              {app.documents.cover && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3">
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

              {/* Extras */}
              {app.documents.extras.length > 0 && (
                <div className="rounded-xl border p-3">
                  <div className="mb-2 text-sm font-medium">Supporting materials</div>
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
                <div className="mb-1 text-xs font-medium text-foreground">Why Pixel & Pine?</div>
                <p className="whitespace-pre-wrap">{app.answers.why}</p>
              </div>
              <div>
                <div className="mb-1 text-xs font-medium text-foreground">Design / UX project</div>
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
              <div className="mb-2 text-sm text-muted-foreground">Private notes only you can see (e.g., usability test ideas, questions to ask design leads).</div>
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
        <aside className="space-y-4 lg:col-span-4">
          {/* Timeline */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Status timeline</h3>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {app.timeline.map((t) => (
                <div key={t.when} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
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

          {/* Next steps */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Next steps</h3>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div>If you haven’t already, expect follow-ups about portfolio review and a live design/whiteboard session. Offers usually follow within a week of final interviews.</div>
              <div className="text-xs">Tip: Be ready to walk through a case study, show your Figma files, and talk through how you run usability tests and iterate on feedback.</div>
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

          {/* Contact */}
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Contact</h3>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User2 className="h-4 w-4" /> Design Recruiting Team
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> design-careers@pixelpine.example
              </div>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                <a className="underline" href="/jobs/pixel-and-pine-product-design-intern">
                  Job posting
                </a>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">This view mirrors what you submitted for the Product Design Intern role at Pixel & Pine. Keep an eye on your email for updates.</div>
      </footer>
    </div>
  );
}
