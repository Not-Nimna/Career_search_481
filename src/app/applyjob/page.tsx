"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, User2, Mail, Phone, Globe, Github, Linkedin, Upload, FileText, FileBadge, X, ExternalLink, Check, AlertTriangle, BadgeCheck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ---- Config / Prefill ----
const PREFILL = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@ucalgary.ca",
  phone: "(403) 555-1234",
  portfolio: "johnsmith.dev",
  github: "github.com/johnsmith",
  linkedin: "linkedin.com/in/johnsmith",
};

type WorkMode = "Remote" | "Hybrid" | "On-site";

const WORK_MODES: WorkMode[] = ["Remote", "Hybrid", "On-site"];

const MAX_MB = 10;
const ACCEPT = {
  resume: ["application/pdf"],
  transcript: ["application/pdf"],
  cover: ["application/pdf"],
  extras: ["application/pdf", "application/zip"],
};

export default function AuroraSinglePageApply() {
  const [submitting, setSubmitting] = useState(false);
  const [appId, setAppId] = useState<string | null>(null);

  // Job metadata
  const job = useMemo(
    () => ({
      id: "aurora-robotics-lab-internship",
      title: "Software Engineering Intern",
      company: "Aurora Robotics Lab",
      location: "Calgary, AB (Hybrid)",
      deadline: "Nov 8",
    }),
    []
  );

  type PersonalState = {
    workMode: WorkMode | null;
  };

  // ---- Personal ----
  const [personal, setPersonal] = useState({
    firstName: PREFILL.firstName,
    lastName: PREFILL.lastName,
    email: PREFILL.email,
    phone: PREFILL.phone,
    linkedin: PREFILL.linkedin,
    github: PREFILL.github,
    portfolio: PREFILL.portfolio,
    workMode: null as WorkMode | null,
    consent: false,
  });

  // ---- Documents ----
  const [resume, setResume] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [extras, setExtras] = useState<File[]>([]);

  const resumeRef = useRef<HTMLInputElement | null>(null);
  const transcriptRef = useRef<HTMLInputElement | null>(null);
  const coverRef = useRef<HTMLInputElement | null>(null);
  const extrasRef = useRef<HTMLInputElement | null>(null);

  const tooLarge = (f: File | null) => (f ? f.size > MAX_MB * 1_000_000 : false);
  const isPdf = (f: File | null) => (f ? f.type === "application/pdf" : false);

  // ---- Questions ----
  const [answers, setAnswers] = useState({ whyAurora: "", project: "" });

  // ---- Validation ----
  const validPersonal = personal.firstName && personal.lastName && personal.email && personal.phone && personal.consent;
  const validDocs = !!resume && !!transcript && !tooLarge(resume) && !tooLarge(transcript) && isPdf(resume) && isPdf(transcript);
  const validQuestions = answers.whyAurora.trim().length >= 50 && answers.project.trim().length >= 50;
  const canSubmit = validPersonal && validDocs && validQuestions;

  const router = useRouter();

  // ---- Missing fields ----
  const missingPersonal = {
    firstName: !personal.firstName.trim(),
    lastName: !personal.lastName.trim(),
    email: !personal.email.trim(),
    phone: !personal.phone.trim(),
    consent: !personal.consent,
  };

  const missingDocs = {
    resume: !resume,
    transcript: !transcript,
  };

  const missingQuestions = {
    whyAurora: answers.whyAurora.trim().length < 50,
    project: answers.project.trim().length < 50,
  };

  // ---- Helpers ----
  const handleBackClick = () => {
    const confirmed = window.confirm("If you go back now, you will lose all progress on this application. Do you want to continue?");
    if (!confirmed) return;
    router.push("/jobdetails");
  };

  const humanFile = (f: File | null) => (f ? `${f.name} · ${(f.size / 1_000_000).toFixed(2)} MB` : "No file");

  const addExtras = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files).filter((f) => ACCEPT.extras.includes(f.type) && f.size <= MAX_MB * 1_000_000);
    const existing = new Set(extras.map((f) => `${f.name}:${f.size}`));
    const merged = [...extras];
    for (const f of list) {
      const key = `${f.name}:${f.size}`;
      if (!existing.has(key)) merged.push(f);
    }
    setExtras(merged);
  };

  const dropHandlers = (setter: (f: File) => void, accept: string[]) => ({
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const f = e.dataTransfer.files?.[0];
      if (f && accept.includes(f.type) && f.size <= MAX_MB * 1_000_000) setter(f);
    },
  });

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    // Simulated API
    await new Promise((r) => setTimeout(r, 900));
    setAppId("APP-2025-001");
    setSubmitting(false);
    // Scroll to confirmation
    document.getElementById("review")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ---- UI ----
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Sticky header */}
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
        {/* Left: content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Job summary */}
          <Card className="rounded-2xl" id="summary">
            <CardContent className="py-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="font-medium text-foreground">{job.title}</div>
              <span>·</span>
              <div>{job.company}</div>
              <span>·</span>
              <div>{job.location}</div>
              <span className="ml-auto" />
              <div className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Deadline {job.deadline}
              </div>
            </CardContent>
          </Card>

          {/* Section: Personal */}
          <motion.div id="personal" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="font-semibold">Personal information</div>
                <p className="text-sm text-muted-foreground">This pre-fills from your profile. Update if needed.</p>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    First name
                    {missingPersonal.firstName && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                  </label>
                  <div className={`relative mt-1 rounded-lg ${missingPersonal.firstName ? "ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                    <Input value={personal.firstName} onChange={(e) => setPersonal({ ...personal, firstName: e.target.value })} placeholder="Jane" className="bg-transparent" />
                    <User2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    Last name
                    {missingPersonal.lastName && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                  </label>
                  <div className={`relative mt-1 rounded-lg ${missingPersonal.lastName ? "ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                    <Input value={personal.lastName} onChange={(e) => setPersonal({ ...personal, lastName: e.target.value })} placeholder="Doe" className="bg-transparent" />
                    <User2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    Email
                    {missingPersonal.email && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                  </label>
                  <div className={`relative mt-1 rounded-lg ${missingPersonal.email ? "ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                    <Input value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} placeholder="name@university.ca" className="bg-transparent" />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    Phone number
                    {missingPersonal.phone && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                  </label>
                  <div className={`relative mt-1 rounded-lg ${missingPersonal.phone ? "ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                    <Input value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} placeholder="(123) 456-7890" className="bg-transparent" />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">GitHub</label>
                  <div className="relative mt-1 rounded-lg">
                    <Input value={personal.github} onChange={(e) => setPersonal({ ...personal, github: e.target.value })} placeholder="github.com/username" />
                    <Github className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">LinkedIn</label>
                  <div className="relative mt-1 rounded-lg">
                    <Input value={personal.linkedin} onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })} placeholder="linkedin.com/in/username" />
                    <Linkedin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Portfolio website</label>
                  <div className="relative mt-1 rounded-lg">
                    <Input value={personal.portfolio} onChange={(e) => setPersonal({ ...personal, portfolio: e.target.value })} placeholder="yourname.dev" />
                    <Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Preferred work mode</label>
                  <div className="flex gap-2 mt-1">
                    {WORK_MODES.map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`px-2.5 py-1 rounded-full border text-sm transition-colors ${personal.workMode === m ? "bg-slate-500 text-white border-slate-500" : "bg-white text-gray-700 hover:bg-slate-100"}`}
                        onClick={() =>
                          setPersonal((prev) => ({
                            ...prev,
                            workMode: m,
                          }))
                        }>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 text-sm">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" className={`h-4 w-4 ${missingPersonal.consent ? "ring-1 ring-rose-400" : ""}`} checked={personal.consent} onChange={(e) => setPersonal({ ...personal, consent: e.target.checked })} />
                    <span>
                      I consent to share my application data with Aurora Robotics Lab.
                      {missingPersonal.consent && <span className="ml-2 text-[11px] text-rose-600 font-medium">Required</span>}
                    </span>
                  </label>
                </div>
              </CardContent>
              {!validPersonal && (
                <CardFooter className="-mt-4">
                  <div className="w-full rounded-xl border-amber-300 bg-amber-50 p-3 text-sm flex gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-700" /> Please complete all personal fields and consent.
                  </div>
                </CardFooter>
              )}
            </Card>
          </motion.div>

          {/* Section: Documents */}
          <motion.div id="documents" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="font-semibold">Documents</div>
                <p className="text-sm text-muted-foreground">Required: Resume (PDF), Transcript (PDF). Optional: Cover letter + supporting materials.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Resume */}
                <section>
                  <div className="text-sm font-medium mb-2 flex items-center gap-1">
                    Resume <span className="text-rose-600">*</span>
                    {missingDocs.resume && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div
                      className={`rounded-2xl border border-dashed p-4 bg-white text-center cursor-pointer ${missingDocs.resume ? "border-rose-300 bg-rose-50/70" : ""}`}
                      {...dropHandlers((f) => setResume(f), ACCEPT.resume)}
                      onClick={() => resumeRef.current?.click()}
                      aria-label="Upload resume">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <div className="mt-2 text-sm">Drag & drop PDF or click to upload</div>
                      <div className="text-xs text-muted-foreground mt-1">Max {MAX_MB} MB</div>
                      <input ref={resumeRef} type="file" accept={ACCEPT.resume.join(",")} className="hidden" onChange={(e) => setResume(e.target.files?.[0] ?? null)} />
                    </div>
                    <div className="rounded-2xl border p-4 bg-slate-50">
                      <div className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {humanFile(resume)}
                      </div>
                      <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                        <li className={`flex items-center gap-2 ${resume ? (isPdf(resume) ? "text-emerald-700" : "text-rose-700") : ""}`}>
                          <Check className="h-3.5 w-3.5" /> Must be PDF
                        </li>
                        <li className={`flex items-center gap-2 ${resume ? (!tooLarge(resume) ? "text-emerald-700" : "text-rose-700") : ""}`}>
                          <Check className="h-3.5 w-3.5" /> ≤ {MAX_MB} MB
                        </li>
                      </ul>
                      {resume && (
                        <div className="mt-3">
                          <Button variant="ghost" size="sm" className="gap-2" onClick={() => setResume(null)}>
                            <X className="h-4 w-4" /> Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Transcript */}
                <section>
                  <div className="text-sm font-medium mb-2 flex items-center gap-1">
                    Transcript <span className="text-rose-600">*</span>
                    {missingDocs.transcript && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div
                      className={`rounded-2xl border border-dashed p-4 bg-white text-center cursor-pointer ${missingDocs.transcript ? "border-rose-300 bg-rose-50/70" : ""}`}
                      {...dropHandlers((f) => setTranscript(f), ACCEPT.transcript)}
                      onClick={() => transcriptRef.current?.click()}
                      aria-label="Upload transcript">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <div className="mt-2 text-sm">Drag & drop PDF or click to upload</div>
                      <div className="text-xs text-muted-foreground mt-1">Max {MAX_MB} MB</div>
                      <input ref={transcriptRef} type="file" accept={ACCEPT.transcript.join(",")} className="hidden" onChange={(e) => setTranscript(e.target.files?.[0] ?? null)} />
                    </div>
                    <div className="rounded-2xl border p-4 bg-slate-50">
                      <div className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {humanFile(transcript)}
                      </div>
                      <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                        <li className={`flex items-center gap-2 ${transcript ? (isPdf(transcript) ? "text-emerald-700" : "text-rose-700") : ""}`}>
                          <Check className="h-3.5 w-3.5" /> Must be PDF
                        </li>
                        <li className={`flex items-center gap-2 ${transcript ? (!tooLarge(transcript) ? "text-emerald-700" : "text-rose-700") : ""}`}>
                          <Check className="h-3.5 w-3.5" /> ≤ {MAX_MB} MB
                        </li>
                      </ul>
                      {transcript && (
                        <div className="mt-3">
                          <Button variant="ghost" size="sm" className="gap-2" onClick={() => setTranscript(null)}>
                            <X className="h-4 w-4" /> Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Cover (optional) */}
                <section>
                  <div className="text-sm font-medium mb-2">Cover letter (optional)</div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-dashed p-4 bg-white text-center cursor-pointer" {...dropHandlers((f) => setCover(f), ACCEPT.cover)} onClick={() => coverRef.current?.click()} aria-label="Upload cover letter">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <div className="mt-2 text-sm">Drag & drop PDF or click to upload</div>
                      <div className="text-xs text-muted-foreground mt-1">Max {MAX_MB} MB</div>
                      <input ref={coverRef} type="file" accept={ACCEPT.cover.join(",")} className="hidden" onChange={(e) => setCover(e.target.files?.[0] ?? null)} />
                    </div>
                    <div className="rounded-2xl border p-4 bg-slate-50">
                      <div className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {humanFile(cover)}
                      </div>
                      {cover && (
                        <div className="mt-3">
                          <Button variant="ghost" size="sm" className="gap-2" onClick={() => setCover(null)}>
                            <X className="h-4 w-4" /> Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Extras (optional) */}
                <section>
                  <div className="text-sm font-medium mb-2">Supporting materials (optional)</div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div
                      className="rounded-2xl border border-dashed p-4 bg-white text-center cursor-pointer"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        addExtras(e.dataTransfer.files);
                      }}
                      onClick={() => extrasRef.current?.click()}
                      aria-label="Upload supporting materials">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <div className="mt-2 text-sm">Drag & drop PDF/ZIP or click to upload</div>
                      <div className="text-xs text-muted-foreground mt-1">Max {MAX_MB} MB per file</div>
                      <input ref={extrasRef} type="file" multiple accept={ACCEPT.extras.join(",")} className="hidden" onChange={(e) => addExtras(e.target.files)} />
                    </div>
                    <div className="rounded-2xl border p-4 bg-slate-50">
                      {extras.length === 0 ? (
                        <div className="text-sm text-muted-foreground">No files added</div>
                      ) : (
                        <ul className="text-sm space-y-2">
                          {extras.map((f, i) => (
                            <li key={`${f.name}:${f.size}:${i}`} className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-2">
                                <FileBadge className="h-4 w-4" />
                                {f.name} · {(f.size / 1_000_000).toFixed(2)} MB
                              </span>
                              <Button variant="ghost" size="sm" onClick={() => setExtras(extras.filter((_, idx) => idx !== i))}>
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </section>
              </CardContent>
              {!validDocs && (
                <CardFooter className="-mt-4">
                  <div className="w-full rounded-xl border-amber-300 bg-amber-50 p-3 text-sm flex gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-700" /> Please upload Resume & Transcript as PDFs ≤ {MAX_MB} MB.
                  </div>
                </CardFooter>
              )}
            </Card>
          </motion.div>

          {/* Section: Questions */}
          <motion.div id="questions" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="font-semibold">Additional questions</div>
                <p className="text-sm text-muted-foreground">Minimum 50 characters each. Be specific.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    Why Aurora Robotics Lab? <span className="text-rose-600">*</span>
                    {missingQuestions.whyAurora && <span className="text-[11px] text-rose-600 font-medium">Min 50 characters</span>}
                  </label>
                  <div className={`mt-1 rounded-lg ${missingQuestions.whyAurora ? "ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                    <Textarea
                      value={answers.whyAurora}
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          whyAurora: e.target.value,
                        })
                      }
                      placeholder="Explain your motivation, relevant experience, and what you hope to learn."
                      rows={4}
                      className="bg-transparent"
                    />
                  </div>
                  <div className={`text-xs mt-1 ${answers.whyAurora.length >= 50 ? "text-slate-500" : "text-rose-600"}`}>{answers.whyAurora.length}/50</div>
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-1">
                    Describe a robotics/AI project you have built or contributed to <span className="text-rose-600">*</span>
                    {missingQuestions.project && <span className="text-[11px] text-rose-600 font-medium">Min 50 characters</span>}
                  </label>
                  <div className={`mt-1 rounded-lg ${missingQuestions.project ? "ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                    <Textarea
                      value={answers.project}
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          project: e.target.value,
                        })
                      }
                      placeholder="Include your role, stack (e.g., Python, ROS, CV), and outcomes."
                      rows={5}
                      className="bg-transparent"
                    />
                  </div>
                  <div className={`text-xs mt-1 ${answers.project.length >= 50 ? "text-slate-500" : "text-rose-600"}`}>{answers.project.length}/50</div>
                </div>
              </CardContent>
              {!validQuestions && (
                <CardFooter className="-mt-4">
                  <div className="w-full rounded-xl border-amber-300 bg-amber-50 p-3 text-sm flex gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-700" /> Please reach at least 50 characters for each answer.
                  </div>
                </CardFooter>
              )}
            </Card>
          </motion.div>

          {/* Section: Review & Submit */}
          <motion.div id="review" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="font-semibold">Review & Submit</div>
                <p className="text-sm text-muted-foreground">Double-check details before sending.</p>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <section>
                  <h3 className="font-medium mb-2">Personal</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      <strong>
                        {personal.firstName} {personal.lastName}
                      </strong>
                    </li>
                    <li>
                      {personal.email} · {personal.phone}
                    </li>
                    <li>LinkedIn: {personal.linkedin || "—"}</li>
                    <li>GitHub: {personal.github || "—"}</li>
                    <li>Portfolio: {personal.portfolio || "—"}</li>
                    <li>Work mode: {personal.workMode || "—"}</li>
                  </ul>
                </section>
                <section>
                  <h3 className="font-medium mb-2">Documents</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Resume: {humanFile(resume)}</li>
                    <li>Transcript: {humanFile(transcript)}</li>
                    <li>Cover letter: {humanFile(cover)}</li>
                    <li>{extras.length} supporting file(s)</li>
                  </ul>
                </section>
                <section className="md:col-span-2">
                  <h3 className="font-medium mb-2">Answers</h3>
                  <div className="grid gap-3">
                    <div>
                      <div className="text-xs font-medium text-foreground mb-1">Why Aurora?</div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{answers.whyAurora || "—"}</p>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-foreground mb-1">Project</div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{answers.project || "—"}</p>
                    </div>
                  </div>
                </section>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-xs text-muted-foreground">You can edit above before submitting.</div>
                <Button variant="destructive" onClick={submit} disabled={!canSubmit}>
                  <FileText className="h-4 w-4" /> {submitting ? "Submitting…" : "Submit Application"}
                </Button>
              </CardFooter>
            </Card>

            {appId && (
              <div className="mt-6">
                <Card className="rounded-2xl border-emerald-300 bg-emerald-50">
                  <CardContent className="py-6 text-center">
                    <Badge className="mb-2" variant="secondary">
                      Submission received
                    </Badge>
                    <h3 className="text-lg font-semibold">Application Submitted!</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your application ID is <span className="font-medium text-foreground">{appId}</span>. You can track your status in Applications → Active.
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <Button variant="secondary" onClick={() => (window.location.href = "/Applications")}>
                        <BadgeCheck className="h-4 w-4" /> View Status
                      </Button>
                      <Button variant="ghost" onClick={() => router.push("/jobsearch")}>
                        <ArrowRight className="h-4 w-4 rotate-180" /> Back to Jobs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right: sticky progress */}
        <aside className="lg:col-span-4">
          <div className="flex justify-end">
            <Button variant="outline" className="gap-2" onClick={handleBackClick}>
              ← Back to Company details
            </Button>
          </div>
          <Card className="rounded-2xl mt-4">
            <CardHeader className="pb-2">
              <div className="font-semibold">Progress</div>
              <p className="text-xs text-muted-foreground">Scroll or jump to sections.</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <a href="#personal" className={`flex items-center justify-between rounded-lg border px-3 py-2 ${validPersonal ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}>
                <span>Personal</span>
                {validPersonal ? <BadgeCheck className="h-4 w-4 text-emerald-600" /> : <span className="text-[11px] text-rose-600 font-medium">Missing</span>}
              </a>
              <a href="#documents" className={`flex items-center justify-between rounded-lg border px-3 py-2 ${validDocs ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}>
                <span>Documents</span>
                {validDocs ? <BadgeCheck className="h-4 w-4 text-emerald-600" /> : <span className="text-[11px] text-rose-600 font-medium">Missing</span>}
              </a>
              <a href="#questions" className={`flex items-center justify-between rounded-lg border px-3 py-2 ${validQuestions ? "bg-emerald-50 border-emerald-200" : "bg-white"}`}>
                <span>Questions</span>
                {validQuestions ? <BadgeCheck className="h-4 w-4 text-emerald-600" /> : <span className="text-[11px] text-rose-600 font-medium">Missing</span>}
              </a>
              <a href="#review" className="flex items-center justify-between rounded-lg border px-3 py-2">
                <span>Review & Submit</span>
              </a>
            </CardContent>
          </Card>
        </aside>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">Your data is used only to process this application and is shared with Aurora Robotics Lab upon submission.</div>
      </footer>
    </div>
  );
}
