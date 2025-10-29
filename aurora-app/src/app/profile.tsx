"use client";
import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { User2, Mail, Phone, Calendar, GraduationCap, MapPin, Linkedin, Github, Globe, Plus, Trash2, Upload, X, Check, Briefcase, Building2, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Simple helpers (replace with zod/react-hook-form if you wire a backend)
const YEARS = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + i);

export default function ProfileSettings() {
  // --- Basic profile state ---
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    province: "",
    country: "Canada",
    graduationYear: YEARS[0],
    degree: "BSc",
    major: "Software Engineering",
    workAuth: "Citizen/PR",
    seeking: new Set<string>(["Internship", "Co-op"]),
    workMode: new Set<string>(["Remote", "Hybrid", "On-site"]),
    roles: ["Software Engineer", "Data Analyst"],
    skills: ["Python", "React", "SQL"],
    linkedin: "",
    github: "",
    website: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);

  // --- Avatar upload ---
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatar = (file: File) => {
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const onDropAvatar: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAvatar(e.dataTransfer.files[0]);
    }
  };

  const onPickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleAvatar(f);
  };

  const toggleSet = (set: Set<string>, value: string) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  const removeTag = (arr: string[], tag: string) => arr.filter((t) => t !== tag);

  const addTag = (arr: string[], tag: string) => {
    const v = tag.trim();
    if (!v) return arr;
    if (arr.includes(v)) return arr;
    return [...arr, v];
  };

  const [roleInput, setRoleInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const saveProfile = () => {
    // stub — replace with API call
    console.log({ profile, resumeFile, transcriptFile, avatar });
    alert("Profile saved (mock). Wire this to your API.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="sticky top-0 z-30 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User2 className="h-5 w-5" />
            <span className="font-semibold">Student Profile</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setProfile({
                  ...profile,
                });
              }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={saveProfile} className="gap-2">
              <Check className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 grid gap-6 lg:grid-cols-12">
        {/* Left column */}
        <section className="lg:col-span-4 space-y-6">
          {/* Avatar */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="font-semibold">Profile Photo</div>
            </CardHeader>
            <CardContent>
              <div onDragOver={(e) => e.preventDefault()} onDrop={onDropAvatar} className="relative rounded-2xl border p-4 bg-white text-center">
                <div className="mx-auto h-28 w-28 rounded-full overflow-hidden border bg-slate-100 flex items-center justify-center">
                  {avatar ? <img src={avatar} alt="Avatar preview" className="h-full w-full object-cover" /> : <ImageIcon className="h-10 w-10 text-muted-foreground" />}
                </div>
                <p className="text-sm text-muted-foreground mt-3">Drag & drop or upload a square image (JPG/PNG)</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onPickAvatar} />
                  <Button variant="secondary" className="gap-2" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4" /> Upload
                  </Button>
                  {avatar && (
                    <Button variant="ghost" className="gap-2" onClick={() => setAvatar(null)}>
                      <Trash2 className="h-4 w-4" /> Remove
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="font-semibold">Documents</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Resume (PDF)</div>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="application/pdf" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} />
                  {resumeFile && <Badge variant="secondary">{resumeFile.name}</Badge>}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Transcript (PDF)</div>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="application/pdf" onChange={(e) => setTranscriptFile(e.target.files?.[0] ?? null)} />
                  {transcriptFile && <Badge variant="secondary">{transcriptFile.name}</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Right column */}
        <section className="lg:col-span-8 space-y-6">
          {/* Personal Info */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="font-semibold">Personal Details</div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">First name</label>
                <div className="relative">
                  <Input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} placeholder="Jane" />
                  <User2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Last name</label>
                <Input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} placeholder="Doe" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="jane.doe@ucalgary.ca" />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <div className="relative">
                  <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="(403) 555‑1234" />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">City</label>
                <div className="relative">
                  <Input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} placeholder="Calgary" />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Province/State</label>
                <Input value={profile.province} onChange={(e) => setProfile({ ...profile, province: e.target.value })} placeholder="AB" />
              </div>
              <div>
                <label className="text-sm font-medium">Country</label>
                <Input value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })} placeholder="Canada" />
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="font-semibold">Education</div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Degree</label>
                <Input value={profile.degree} onChange={(e) => setProfile({ ...profile, degree: e.target.value })} placeholder="BSc" />
              </div>
              <div>
                <label className="text-sm font-medium">Major</label>
                <Input value={profile.major} onChange={(e) => setProfile({ ...profile, major: e.target.value })} placeholder="Software Engineering" />
              </div>
              <div>
                <label className="text-sm font-medium">Graduation year</label>
                <div className="relative">
                  <Input list="gradyears" value={String(profile.graduationYear)} onChange={(e) => setProfile({ ...profile, graduationYear: Number(e.target.value) })} />
                  <datalist id="gradyears">
                    {YEARS.map((y) => (
                      <option key={y} value={y} />
                    ))}
                  </datalist>
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Work authorization</label>
                <Input value={profile.workAuth} onChange={(e) => setProfile({ ...profile, workAuth: e.target.value })} placeholder="Citizen/PR / Study Permit / Work Permit" />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="font-semibold">Preferences</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Seeking</div>
                <div className="flex flex-wrap gap-2">
                  {["Internship", "Co-op", "Full-time"].map((opt) => (
                    <button
                      key={opt}
                      className={`px-2.5 py-1 rounded-full border text-sm ${profile.seeking.has(opt) ? "bg-[#FF6961] text-black hover:bg-[#e85a54] focus-visible:ring-[#FF6961]/30" : "bg-white"}`}
                      onClick={() => setProfile({ ...profile, seeking: toggleSet(profile.seeking, opt) })}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Work mode</div>
                <div className="flex flex-wrap gap-2">
                  {["Remote", "Hybrid", "On-site"].map((opt) => (
                    <button
                      key={opt}
                      className={`px-2.5 py-1 rounded-full border text-sm ${profile.workMode.has(opt) ? "bg-[#FF6961] text-black hover:bg-[#e85a54] focus-visible:ring-[#FF6961]/30" : "bg-white"}`}
                      onClick={() => setProfile({ ...profile, workMode: toggleSet(profile.workMode, opt) })}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Roles & Skills */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="font-semibold">Roles & Skills</div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Roles */}
              <div>
                <div className="text-sm font-medium mb-2">Target roles</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.roles.map((r) => (
                    <span key={r} className="inline-flex items-center gap-1 border rounded-full px-2 py-0.5 text-sm">
                      {r}
                      <button aria-label={`remove ${r}`} onClick={() => setProfile({ ...profile, roles: removeTag(profile.roles, r) })}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={roleInput} onChange={(e) => setRoleInput(e.target.value)} placeholder="e.g., Software Engineer" />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      if (roleInput.trim()) {
                        setProfile({ ...profile, roles: addTag(profile.roles, roleInput) });
                        setRoleInput("");
                      }
                    }}
                    className="gap-2">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
              {/* Skills */}
              <div>
                <div className="text-sm font-medium mb-2">Skills</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.skills.map((s) => (
                    <Badge key={s} variant="outline" className="rounded-full">
                      <span className="mr-1">{s}</span>
                      <button aria-label={`remove ${s}`} onClick={() => setProfile({ ...profile, skills: removeTag(profile.skills, s) })}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="e.g., Python, Terraform, Tableau" />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      if (skillInput.trim()) {
                        setProfile({ ...profile, skills: addTag(profile.skills, skillInput) });
                        setSkillInput("");
                      }
                    }}
                    className="gap-2">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="font-semibold">Links</div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">LinkedIn</label>
                <div className="relative">
                  <Input value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} placeholder="linkedin.com/in/username" />
                  <Linkedin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">GitHub</label>
                <div className="relative">
                  <Input value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} placeholder="github.com/username" />
                  <Github className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Portfolio / Website</label>
                <div className="relative">
                  <Input value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} placeholder="yourdomain.dev" />
                  <Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">Keep your details up‑to‑date — employers see your preferred roles and latest resume.</div>
      </footer>
    </div>
  );
}
