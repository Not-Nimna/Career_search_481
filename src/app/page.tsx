"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Calendar, BookOpen, Rocket, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-32 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_#ff6961,_transparent_60%)] opacity-25 blur-3xl" />
        <div className="absolute -top-40 left-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_#a855f7,_transparent_60%)] opacity-20 blur-3xl" />
        <div className="absolute -top-10 right-0 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,_#22d3ee,_transparent_60%)] opacity-20 blur-3xl" />
      </div>

      {/* Top nav – matches other pages */}
      <header className="relative z-20 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="University Logo" className="h-10 w-10 rounded" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">University Career Hub</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">UCalgary Students</span>
            </div>
          </div>

          {/* <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <Link href="/jobsearch" className="hover:text-slate-900">
              Job search
            </Link>
            <Link href="/deadlines" className="hover:text-slate-900">
              Deadlines
            </Link>
            <Link href="/resources" className="hover:text-slate-900">
              Resources
            </Link>
            <Link href="/applications" className="hover:text-slate-900">
              Applications
            </Link>
          </nav> */}

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="destructive" size="sm">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-4 pt-14 pb-20 text-center">
        {/* Small pill */}
        <motion.div
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] text-slate-600 shadow-sm"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ff6961] text-[10px] font-bold text-black">●</span>
          Built for UCalgary internship, co-op, and new-grad recruiting.
        </motion.div>

        <motion.h1
          className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}>
          Your career search
          <span className="block text-[#ff6961]">is the canvas.</span>
        </motion.h1>

        <motion.p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          Design your recruiting season from end-to-end. Search curated roles, track deadlines, organize applications, and keep all your UCalgary career resources in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}>
          <Button asChild size="lg" className="gap-2 rounded-full bg-[#ff6961] px-6 text-sm font-semibold text-black shadow-md hover:bg-[#ff4b43]">
            <Link href="/login">
              <Rocket className="h-4 w-4" />
              Start searching roles
            </Link>
          </Button>
          {/* <Button asChild size="lg" variant="outline" className="gap-2 rounded-full border-slate-200 bg-white px-6 text-sm text-slate-800 hover:bg-slate-50">
            <Link href="/deadlines">
              <Calendar className="h-4 w-4" />
              See this week’s deadlines
            </Link>
          </Button> */}
        </motion.div>

        <motion.div className="mt-3 text-[11px] text-slate-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}>
          Designed as a companion to Elevate / official job boards — this is your personal control centre.
        </motion.div>

        {/* Floating cards – now in light theme */}
        <div className="pointer-events-none relative mt-14 h-64 w-full max-w-5xl">
          {/* Job card */}
          <motion.div className="absolute left-4 top-2 w-64" initial={{ y: 20, opacity: 0, rotate: -4 }} animate={{ y: 0, opacity: 1, rotate: -4 }} transition={{ duration: 0.6, delay: 0.25 }}>
            <Card className="border-slate-200 bg-white text-left text-xs text-slate-800 shadow-sm">
              <CardContent className="space-y-2 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Match found</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-[2px] text-[10px] text-emerald-700">SWE · Co-op</span>
                </div>
                <div className="text-sm font-semibold text-slate-900">Software Engineering Intern</div>
                <div className="text-[11px] text-slate-500">Aurora Robotics Lab · Calgary · Hybrid</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Deadlines card */}
          <motion.div className="absolute right-6 top-10 w-56" initial={{ y: 20, opacity: 0, rotate: 4 }} animate={{ y: 0, opacity: 1, rotate: 4 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Card className="border-slate-200 bg-slate-900 text-left text-xs text-slate-100 shadow-sm">
              <CardContent className="space-y-2 p-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-100">
                    <Calendar className="h-3 w-3" /> This week
                  </span>
                  <span className="text-[11px] text-amber-300">2 deadlines</span>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
                <div className="space-y-1 text-[11px] text-slate-100">
                  <div>RBC · Data Science – Nov 12</div>
                  <div>Women in Tech Panel – Nov 14</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resources pill */}
          <motion.div className="absolute left-1/2 top-40 w-52 -translate-x-1/2" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}>
            <Card className="border-slate-200 bg-white text-xs text-slate-800 shadow-sm">
              <CardContent className="flex items-center gap-3 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
                  <BookOpen className="h-4 w-4 text-sky-600" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">ATS-proof resume lab</div>
                  <div className="text-[11px] text-slate-500">Today · 2:00–3:30 PM · ENG 214</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom badges */}
          <motion.div className="absolute bottom-0 left-6 flex items-center gap-2 text-[11px] text-slate-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <div className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-[3px] border border-slate-200">
              <GraduationCap className="h-3 w-3 text-slate-700" />
              UCalgary Engineering / CS
            </div>
          </motion.div>

          <motion.div className="absolute bottom-0 right-6 flex items-center gap-2 text-[11px] text-slate-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.5 }}>
            <div className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-[3px] border border-slate-200">
              <Briefcase className="h-3 w-3 text-slate-700" />
              Internships · Co-ops · New-grad
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
