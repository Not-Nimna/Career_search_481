"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Calendar, BookOpen, ClipboardList, Rocket, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-32 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_#ff6961,_transparent_60%)] opacity-60 blur-3xl" />
        <div className="absolute -top-64 left-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_#a855f7,_transparent_60%)] opacity-40 blur-3xl" />
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,_#22d3ee,_transparent_60%)] opacity-40 blur-3xl" />
      </div>

      {/* Top nav */}
      <header className="relative z-20 border-b border-white/5 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6961] text-xs font-bold tracking-[0.12em]">UC</div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Career Canvas</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">UCalgary Students</span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-xs text-zinc-300 md:flex">
            <Link href="/jobSearch" className="hover:text-white">
              Job search
            </Link>
            <Link href="/deadlines" className="hover:text-white">
              Deadlines
            </Link>
            <Link href="/resources" className="hover:text-white">
              Resources
            </Link>
            <Link href="/applications" className="hover:text-white">
              Applications
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-white/20 bg-transparent text-xs text-zinc-100 hover:bg-white/10">
              Log in
            </Button>
            <Button asChild size="sm" className="bg-[#ff6961] text-xs font-semibold text-black hover:bg-[#ff4b43]">
              <Link href="/jobSearch">Open career search</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-20 mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 pb-24 text-center">
        {/* Floating canvas frame */}
        <motion.div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-zinc-300" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ff6961] text-[10px] font-bold text-black">●</span>
          Built for UCalgary internship, co-op, and new-grad recruiting.
        </motion.div>

        <motion.h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}>
          Your career search
          <span className="block text-[#ff6961]">is the canvas.</span>
        </motion.h1>

        <motion.p className="mt-5 max-w-2xl text-sm text-zinc-300 md:text-base" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}>
          Design your recruiting season from end-to-end. Search curated roles, track deadlines, organize applications, and keep all your UCalgary career resources in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}>
          <Button asChild size="lg" className="gap-2 rounded-full bg-[#ff6961] px-6 text-sm font-semibold text-black shadow-[0_0_40px_rgba(248,113,113,0.5)] hover:bg-[#ff4b43]">
            <Link href="/jobSearch">
              <Rocket className="h-4 w-4" />
              Start searching roles
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 rounded-full border-white/25 bg-transparent px-6 text-sm text-zinc-100 hover:bg-white/10">
            <Link href="/deadlines">
              <Calendar className="h-4 w-4" />
              See this week’s deadlines
            </Link>
          </Button>
        </motion.div>

        {/* Small sub-footnote under hero */}
        <motion.div className="mt-4 text-[11px] text-zinc-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.7 }}>
          Designed as a companion to Elevate / official job boards — this is your personal control centre.
        </motion.div>

        {/* Floating cards / logos */}
        <div className="pointer-events-none relative mt-16 h-64 w-full max-w-5xl">
          {/* Job card */}
          <motion.div className="absolute left-4 top-2 w-64" initial={{ y: 20, opacity: 0, rotate: -6 }} animate={{ y: 0, opacity: 1, rotate: -6 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <Card className="border-white/10 bg-white/5 text-left text-xs text-zinc-100 backdrop-blur">
              <CardContent className="space-y-2 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">Match found</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-[2px] text-[10px] text-emerald-300">SWE · Co-op</span>
                </div>
                <div className="text-sm font-semibold">Software Engineering Intern</div>
                <div className="text-[11px] text-zinc-400">Aurora Robotics Lab · Calgary · Hybrid</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Deadlines card */}
          <motion.div className="absolute right-6 top-10 w-56" initial={{ y: 20, opacity: 0, rotate: 7 }} animate={{ y: 0, opacity: 1, rotate: 7 }} transition={{ duration: 0.7, delay: 0.3 }}>
            <Card className="border-white/10 bg-black/60 text-left text-xs text-zinc-100 backdrop-blur">
              <CardContent className="space-y-2 p-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] text-zinc-300">
                    <Calendar className="h-3 w-3" /> This week
                  </span>
                  <span className="text-[11px] text-amber-300">2 deadlines</span>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="space-y-1 text-[11px] text-zinc-300">
                  <div>RBC · Data Science – Nov 12</div>
                  <div>Women in Tech Panel – Nov 14</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resources pill */}
          <motion.div className="absolute left-1/2 top-40 w-52 -translate-x-1/2" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }}>
            <Card className="border-white/10 bg-white/5 text-xs text-zinc-100 backdrop-blur">
              <CardContent className="flex items-center gap-3 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20">
                  <BookOpen className="h-4 w-4 text-sky-300" />
                </div>
                <div>
                  <div className="font-medium">ATS-proof resume lab</div>
                  <div className="text-[11px] text-zinc-400">Today · 2:00–3:30 PM · ENG 214</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom badges */}
          <motion.div className="absolute bottom-0 left-6 flex items-center gap-2 text-[11px] text-zinc-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}>
            <div className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-[3px]">
              <GraduationCap className="h-3 w-3" />
              UCalgary Engineering / CS
            </div>
          </motion.div>

          <motion.div className="absolute bottom-0 right-6 flex items-center gap-2 text-[11px] text-zinc-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.7 }}>
            <div className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-[3px]">
              <Briefcase className="h-3 w-3" />
              Internships · Co-ops · New-grad
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
