"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users2, Search, GraduationCap, Briefcase, MapPin, Clock, Calendar, Mail, ExternalLink, Linkedin, MessageSquare, Globe, ChevronRight, Star, Filter, PhoneCall, Video } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// --- Mock Data ---
export type Person = {
  id: string;
  name: string;
  headline: string; // e.g., "SWE @ Shopify"
  classYear: string;
  degree: string;
  location: string;
  skills: string[];
  willingTo: string[]; // [Mentor, Coffee chat, Resume review]
  links?: { linkedin?: string; website?: string; email?: string };
};

const PEOPLE: Person[] = [
  {
    id: "p1",
    name: "Aisha Patel",
    headline: "SWE @ Shopify",
    classYear: "'23",
    degree: "BSc SE",
    location: "Toronto, ON",
    skills: ["React", "TypeScript", "Next.js"],
    willingTo: ["Mentor", "Coffee chat"],
    links: { linkedin: "#", website: "#", email: "aisha@example.com" },
  },
  {
    id: "p2",
    name: "Daniel Kim",
    headline: "Data Scientist @ RBC",
    classYear: "'21",
    degree: "BSc CS",
    location: "Calgary, AB",
    skills: ["Python", "Pandas", "ML"],
    willingTo: ["Resume review", "Coffee chat"],
    links: { linkedin: "#", email: "daniel@example.com" },
  },
  {
    id: "p3",
    name: "Maya Singh",
    headline: "PM @ Microsoft",
    classYear: "'20",
    degree: "BSc ENSF",
    location: "Vancouver, BC",
    skills: ["Product", "Roadmaps", "Interviews"],
    willingTo: ["Mentor"],
    links: { linkedin: "#", website: "#" },
  },
  {
    id: "p4",
    name: "Omar Hassan",
    headline: "DevOps @ AWS",
    classYear: "'19",
    degree: "BSc SE",
    location: "Remote – Canada",
    skills: ["AWS", "Terraform", "CI/CD"],
    willingTo: ["Mentor", "Resume review"],
    links: { linkedin: "#" },
  },
];

export type Event = {
  id: string;
  title: string;
  host: string;
  location: string;
  when: string; // "Nov 12, 3:00–4:00 PM MT"
  tags: string[];
  rsvpUrl?: string;
};

const EVENTS: Event[] = [
  {
    id: "e1",
    title: "Alumni Coffee Chats — Software",
    host: "Career Centre",
    location: "Student Union Hall",
    when: "Nov 8, 1:00–3:00 PM MT",
    tags: ["Networking", "SWE"],
    rsvpUrl: "#",
  },
  {
    id: "e2",
    title: "Resume Clinic with RBC Data Science",
    host: "RBC",
    location: "Room ENG 210",
    when: "Nov 10, 11:00–1:00 PM MT",
    tags: ["Resume", "Data"],
    rsvpUrl: "#",
  },
  {
    id: "e3",
    title: "Women in Tech Panel",
    host: "WIT Club",
    location: "MacHall A",
    when: "Nov 14, 5:30–7:00 PM MT",
    tags: ["Panel", "Community"],
    rsvpUrl: "#",
  },
];

// --- Utility ---
const unique = <T,>(arr: T[]) => Array.from(new Set(arr));

// Simple Fisher–Yates shuffle
const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// --- Components ---
function PeopleListItem({ p, selected, onSelect }: { p: Person; selected: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className={`w-full text-left rounded-xl border p-3 hover:bg-slate-50 transition ${selected ? "bg-slate-50 border-slate-300" : "bg-white"}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-medium leading-tight">{p.name}</div>
          <div className="text-sm text-muted-foreground">{p.headline}</div>
        </div>
        <Badge variant="secondary">{p.classYear}</Badge>
      </div>
      <div className="mt-2 text-xs text-muted-foreground flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1">
          <GraduationCap className="h-3.5 w-3.5" /> {p.degree}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {p.location}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {p.skills.slice(0, 3).map((s) => (
          <Badge key={s} variant="outline" className="rounded-full">
            {s}
          </Badge>
        ))}
      </div>
    </button>
  );
}

function PersonDetail({ p }: { p: Person }) {
  return (
    <Card className="rounded-2xl h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold leading-tight">{p.name}</h2>
            <p className="text-sm text-muted-foreground">
              {p.headline} · {p.degree} {p.classYear}
            </p>
            <p className="text-sm text-muted-foreground">
              <MapPin className="inline h-4 w-4 mr-1" />
              {p.location}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="gap-2">
              <MessageSquare className="h-4 w-4" /> Message
            </Button>
            <Button className="gap-2" variant="destructive">
              Request Chat <PhoneCall className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.skills.map((s) => (
            <Badge key={s} className="rounded-full" variant="outline">
              {s}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <section>
          <h3 className="font-medium">Willing to help with</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.willingTo.map((w) => (
              <Badge key={w} variant="secondary" className="rounded-full">
                {w}
              </Badge>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-medium">Links</h3>
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            {p.links?.linkedin && (
              <a href={p.links.linkedin} className="inline-flex items-center gap-1 underline">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            )}
            {p.links?.website && (
              <a href={p.links.website} className="inline-flex items-center gap-1 underline">
                <Globe className="h-4 w-4" /> Website
              </a>
            )}
            {p.links?.email && (
              <a href={`mailto:${p.links.email}`} className="inline-flex items-center gap-1 underline">
                <Mail className="h-4 w-4" /> Email
              </a>
            )}
          </div>
        </section>
        <section>
          <h3 className="font-medium">Suggested intro</h3>
          <p className="text-sm text-muted-foreground mt-1">
            “Hi {p.name.split(" ")[0]}, I’m a current student interested in {p.skills[0]}. Would you be open to a 15-minute chat about your path into {p.headline.split("@")[0].trim()}? I can work around your schedule.”
          </p>
        </section>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="text-xs text-muted-foreground">Be respectful. Alumni volunteer their time.</div>
        <Button variant="ghost" className="gap-2">
          Book via Calendly <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function EventCard({ e }: { e: Event }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{e.title}</h3>
            <p className="text-sm text-muted-foreground">Hosted by {e.host}</p>
          </div>
          <Badge variant="secondary">Upcoming</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {e.when}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {e.location}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {e.tags.map((t) => (
            <Badge key={t} variant="outline" className="rounded-full">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="gap-2 w-full" variant="destructive">
          RSVP <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function NetworkingPage() {
  const [query, setQuery] = useState("");
  const [onlyMentors, setOnlyMentors] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(PEOPLE[0]?.id ?? null);
  const [recommendations, setRecommendations] = useState<Person[]>(() => shuffle(PEOPLE).slice(0, 3));

  const facets = useMemo(() => {
    const skills = unique(PEOPLE.flatMap((p) => p.skills)).sort();
    const locations = unique(PEOPLE.map((p) => p.location));
    const years = unique(PEOPLE.map((p) => p.classYear));
    return { skills, locations, years };
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return PEOPLE.filter((p) => {
      const baseName = p.name.toLowerCase();
      const base = [p.name, p.headline, p.degree, p.location, p.skills.join(" "), p.willingTo.join(" ")].join(" ").toLowerCase();
      const passMentor = !onlyMentors || p.willingTo.includes("Mentor");

      // prioritize search by name, but still let other fields match
      const matches = q.length === 0 || baseName.includes(q) || base.includes(q);

      return matches && passMentor;
    });
  }, [query, onlyMentors]);

  const selected = useMemo(() => filtered.find((x) => x.id === selectedId) ?? filtered[0] ?? null, [filtered, selectedId]);

  const refreshRecommendations = () => {
    setRecommendations(shuffle(PEOPLE).slice(0, 3));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Top bar */}
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

      {/* Search + toggles */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="relative w-full max-w-md">
            <Input placeholder="Search people by name…" className="h-10 pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant={onlyMentors ? "destructive" : "outline"} size="sm" className="gap-2" onClick={() => setOnlyMentors((v) => !v)}>
              <Users2 className="h-4 w-4" />
              Mentors only
            </Button>
          </div>
          <Link href="/home" className="ml-auto">
            <Button variant="outline" className="gap-2">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Layout */}
      <main className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left column: people directory */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <Card className="rounded-2xl h-[calc(100vh-200px)] overflow-hidden">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">
                  {filtered.length} connection{filtered.length !== 1 ? "s" : ""}
                </h2>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0 overflow-y-auto h-full space-y-3">
              {filtered.map((p) => (
                <PeopleListItem key={p.id} p={p} selected={selected?.id === p.id} onSelect={() => setSelectedId(p.id)} />
              ))}
              {filtered.length === 0 && <div className="text-sm text-muted-foreground p-6 text-center">No matches. Try a different name.</div>}
            </CardContent>
          </Card>
        </aside>

        {/* Right column: selected person + recommendations + events */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-4">
          {selected ? (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <PersonDetail p={selected} />
            </motion.div>
          ) : (
            <Card className="rounded-2xl">
              <CardContent className="py-12 text-center text-muted-foreground">Choose a person to view details.</CardContent>
            </Card>
          )}

          {/* Random recommendations */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Discover new people</h3>
              <button type="button" onClick={refreshRecommendations} className="text-xs inline-flex items-center gap-1 text-primary hover:underline">
                Shuffle <Filter className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recommendations.map((p) => (
                <PeopleListItem
                  key={p.id}
                  p={p}
                  selected={selected?.id === p.id}
                  onSelect={() => {
                    setSelectedId(p.id);
                    // Scroll up to the detail card on small screens
                    if (typeof window !== "undefined" && window.innerWidth < 1024) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                />
              ))}
            </div>
          </section>

          {/* Events rail */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Upcoming events</h3>
              <a className="text-xs text-primary inline-flex items-center gap-1" href="#">
                See all <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EVENTS.map((e) => (
                <EventCard key={e.id} e={e} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground">Tip: Be specific in your outreach — mention a shared class, club, or interest.</div>
      </footer>
    </div>
  );
}
