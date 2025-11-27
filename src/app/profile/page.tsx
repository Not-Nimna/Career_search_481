"use client";
import React, { useRef, useState } from "react";

import { User2, Mail, Phone, Calendar, MapPin, Linkedin, Github, Globe, Plus, Trash2, Upload, X, Check, Home, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Simple helpers (replace with zod/react-hook-form if you wire a backend)
const YEARS = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + i);

export default function ProfileSettings() {
  // --- Basic profile state ---
  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "(403) 555-1234",
    city: "Calgary",
    province: "AB",
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

  // --- Edit mode ---
  const [editing, setEditing] = useState(false);

  // --- Avatar upload ---
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatar = (file: File) => {
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const onDropAvatar: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (!editing) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAvatar(e.dataTransfer.files[0]);
    }
  };

  const onPickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing) return;
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
  const router = useRouter();

  // ---- Missing / validation ----
  const missingBasic = {
    firstName: !profile.firstName.trim(),
    lastName: !profile.lastName.trim(),
    email: !profile.email.trim(),
    phone: !profile.phone.trim(),
    city: !profile.city.trim(),
    province: !profile.province.trim(),
    country: !profile.country.trim(),
  };

  const missingEducation = {
    degree: !profile.degree.trim(),
    major: !profile.major.trim(),
    graduationYear: !profile.graduationYear,
    workAuth: !profile.workAuth.trim(),
  };

  const missingPreferences = {
    seeking: profile.seeking.size === 0,
    workMode: profile.workMode.size === 0,
  };

  const missingTags = {
    roles: profile.roles.length === 0,
    skills: profile.skills.length === 0,
  };

  const hasMissingRequired = Object.values(missingBasic).some(Boolean) || Object.values(missingEducation).some(Boolean) || Object.values(missingPreferences).some(Boolean) || Object.values(missingTags).some(Boolean);

  const saveProfile = () => {
    if (hasMissingRequired) {
      alert("Please complete all required fields (highlighted in red) before saving your profile.");
      return;
    }
    // stub — replace with API call
    console.log({ profile, resumeFile, transcriptFile, avatar });
    alert("Profile saved (mock). Wire this to your API.");
    setEditing(false);
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <header className="sticky top-0 z-30 border-b bg-[#F8F7F4]/90 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/home" className="inline-flex items-center gap-2">
              <img src="/logo.png" alt="University Logo" className="h-10 w-10" />
              <span className="font-semibold">University Career Hub</span>
            </Link>
          </div>

          <Link href="/home">
            <Button variant="destructive" size="sm" className="gap-2 bg-slate-700 text-white hover:bg-slate-800 transition-all hover:-translate-y-[1px] hover:shadow-md">
              <Home className="h-4 w-4" /> Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">{/* title area if needed */}</div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setEditing(false);
                  router.push("/home");
                }}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={saveProfile} className="gap-2">
                <Check className="h-4 w-4" /> Save Changes
              </Button>
            </>
          ) : (
            <Button variant="destructive" onClick={() => setEditing(true)} className="gap-2">
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 grid gap-6 lg:grid-cols-12">
        {/* Left column */}
        <section className="lg:col-span-4 space-y-6">
          {/* Avatar */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="font-semibold">Profile Photo</div>
            </CardHeader>
            <CardContent>
              <div onDragOver={(e) => e.preventDefault()} onDrop={onDropAvatar} className={`relative rounded-2xl border p-4 bg-white text-center ${!editing ? "opacity-80" : ""}`}>
                <div className="mx-auto h-28 w-28 rounded-full overflow-hidden border bg-slate-100 flex items-center justify-center">
                  {avatar ? <img src={avatar} alt="Avatar preview" className="h-full w-full object-cover" /> : <ImageIcon className="h-10 w-10 text-muted-foreground" />}
                </div>
                <p className="text-sm text-muted-foreground mt-3">Drag & drop or upload a square image (JPG/PNG)</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onPickAvatar} disabled={!editing} />
                  {editing && (
                    <Button variant="secondary" className="gap-2" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="h-4 w-4" /> Upload
                    </Button>
                  )}
                  {avatar && editing && (
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
                  <Input type="file" accept="application/pdf" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} disabled={!editing} />
                  {resumeFile && <Badge variant="secondary">{resumeFile.name}</Badge>}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Transcript (PDF)</div>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="application/pdf" onChange={(e) => setTranscriptFile(e.target.files?.[0] ?? null)} disabled={!editing} />
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
                <label className="text-sm font-medium flex items-center gap-1">
                  First name
                  {missingBasic.firstName && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingBasic.firstName ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input value={profile.firstName} disabled={!editing} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} placeholder="Jane" className={missingBasic.firstName ? "bg-transparent" : ""} />
                  <User2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  Last name
                  {missingBasic.lastName && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingBasic.lastName ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input value={profile.lastName} disabled={!editing} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} placeholder="Doe" className={missingBasic.lastName ? "bg-transparent" : ""} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  Email
                  {missingBasic.email && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingBasic.email ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input type="email" value={profile.email} disabled={!editing} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="jane.doe@ucalgary.ca" className={missingBasic.email ? "bg-transparent" : ""} />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  Phone
                  {missingBasic.phone && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingBasic.phone ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input value={profile.phone} disabled={!editing} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="(403) 555-1234" className={missingBasic.phone ? "bg-transparent" : ""} />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  City
                  {missingBasic.city && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingBasic.city ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input value={profile.city} disabled={!editing} onChange={(e) => setProfile({ ...profile, city: e.target.value })} placeholder="Calgary" className={missingBasic.city ? "bg-transparent" : ""} />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  Province/State
                  {missingBasic.province && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingBasic.province ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input value={profile.province} disabled={!editing} onChange={(e) => setProfile({ ...profile, province: e.target.value })} placeholder="AB" className={missingBasic.province ? "bg-transparent" : ""} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  Country
                  {missingBasic.country && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingBasic.country ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input value={profile.country} disabled={!editing} onChange={(e) => setProfile({ ...profile, country: e.target.value })} placeholder="Canada" className={missingBasic.country ? "bg-transparent" : ""} />
                </div>
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
                <label className="text-sm font-medium flex items-center gap-1">
                  Degree
                  {missingEducation.degree && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingEducation.degree ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input value={profile.degree} disabled={!editing} onChange={(e) => setProfile({ ...profile, degree: e.target.value })} placeholder="BSc" className={missingEducation.degree ? "bg-transparent" : ""} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  Major
                  {missingEducation.major && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingEducation.major ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input value={profile.major} disabled={!editing} onChange={(e) => setProfile({ ...profile, major: e.target.value })} placeholder="Software Engineering" className={missingEducation.major ? "bg-transparent" : ""} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  Graduation year
                  {missingEducation.graduationYear && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingEducation.graduationYear ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input
                    list="gradyears"
                    value={String(profile.graduationYear)}
                    disabled={!editing}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        graduationYear: Number(e.target.value),
                      })
                    }
                    className={missingEducation.graduationYear ? "bg-transparent" : ""}
                  />
                  <datalist id="gradyears">
                    {YEARS.map((y) => (
                      <option key={y} value={y} />
                    ))}
                  </datalist>
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  Work authorization
                  {missingEducation.workAuth && <span className="text-[11px] text-rose-600 font-medium">Required</span>}
                </label>
                <div className={`relative ${missingEducation.workAuth ? "mt-1 rounded-lg ring-1 ring-rose-300 bg-rose-50/70" : ""}`}>
                  <Input
                    value={profile.workAuth}
                    disabled={!editing}
                    onChange={(e) => setProfile({ ...profile, workAuth: e.target.value })}
                    placeholder="Citizen/PR / Study Permit / Work Permit"
                    className={missingEducation.workAuth ? "bg-transparent" : ""}
                  />
                </div>
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
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-medium">Seeking</div>
                  {missingPreferences.seeking && <span className="text-[11px] text-rose-600 font-medium">Select at least one</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Internship", "Co-op", "Full-time"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      disabled={!editing}
                      className={`px-2.5 py-1 rounded-full border text-sm ${profile.seeking.has(opt) ? "bg-slate-700 text-white hover:bg-[#e85a54] focus-visible:ring-[#FF6961]/30" : "bg-white"}`}
                      onClick={() => {
                        if (!editing) return;
                        setProfile({
                          ...profile,
                          seeking: toggleSet(profile.seeking, opt),
                        });
                      }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-medium">Work mode</div>
                  {missingPreferences.workMode && <span className="text-[11px] text-rose-600 font-medium">Select at least one</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Remote", "Hybrid", "On-site"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      disabled={!editing}
                      className={`px-2.5 py-1 rounded-full border text-sm ${profile.workMode.has(opt) ? "bg-slate-700 text-white hover:bg-[#e85a54] focus-visible:ring-[#FF6961]/30" : "bg-white"}`}
                      onClick={() => {
                        if (!editing) return;
                        setProfile({
                          ...profile,
                          workMode: toggleSet(profile.workMode, opt),
                        });
                      }}>
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
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-sm font-medium">Target roles</div>
                  {missingTags.roles && <span className="text-[11px] text-rose-600 font-medium">Add at least one</span>}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.roles.map((r) => (
                    <span key={r} className="inline-flex items-center gap-1 border rounded-full px-2 py-0.5 text-sm">
                      {r}
                      <button
                        type="button"
                        aria-label={`remove ${r}`}
                        disabled={!editing}
                        onClick={() => {
                          if (!editing) return;
                          setProfile({
                            ...profile,
                            roles: removeTag(profile.roles, r),
                          });
                        }}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={roleInput} disabled={!editing} onChange={(e) => setRoleInput(e.target.value)} placeholder="e.g., Software Engineer" />
                  <Button
                    variant="secondary"
                    disabled={!editing}
                    onClick={() => {
                      if (!editing) return;
                      if (roleInput.trim()) {
                        setProfile({
                          ...profile,
                          roles: addTag(profile.roles, roleInput),
                        });
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
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-sm font-medium">Skills</div>
                  {missingTags.skills && <span className="text-[11px] text-rose-600 font-medium">Add at least one</span>}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.skills.map((s) => (
                    <Badge key={s} variant="outline" className="rounded-full inline-flex items-center">
                      <span className="mr-1">{s}</span>
                      <button
                        type="button"
                        aria-label={`remove ${s}`}
                        disabled={!editing}
                        onClick={() => {
                          if (!editing) return;
                          setProfile({
                            ...profile,
                            skills: removeTag(profile.skills, s),
                          });
                        }}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={skillInput} disabled={!editing} onChange={(e) => setSkillInput(e.target.value)} placeholder="e.g., Python, Terraform, Tableau" />
                  <Button
                    variant="secondary"
                    disabled={!editing}
                    onClick={() => {
                      if (!editing) return;
                      if (skillInput.trim()) {
                        setProfile({
                          ...profile,
                          skills: addTag(profile.skills, skillInput),
                        });
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
                <label className="text-sm font-medium">LinkedIn (optional)</label>
                <div className="relative">
                  <Input value={profile.linkedin} disabled={!editing} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} placeholder="linkedin.com/in/username" />
                  <Linkedin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">GitHub (optional)</label>
                <div className="relative">
                  <Input value={profile.github} disabled={!editing} onChange={(e) => setProfile({ ...profile, github: e.target.value })} placeholder="github.com/username" />
                  <Github className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Portfolio / Website (optional)</label>
                <div className="relative">
                  <Input value={profile.website} disabled={!editing} onChange={(e) => setProfile({ ...profile, website: e.target.value })} placeholder="yourdomain.dev" />
                  <Globe className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          Keep your details up-to-date — employers see your preferred roles and latest resume. This information is used exclusively to process your applications and improve job matching. Your data is not stored for resale or external distribution,
          and it is only shared with an employer when you submit an application.
        </div>
      </footer>
    </div>
  );
}
