// src/app/jobsearch/page.tsx
import React, { Suspense } from "react";
import JobSearchClientPage from "./JobSearchClient";

export default function JobSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
          <p className="text-sm text-slate-400">Loading job search experience...</p>
        </div>
      }>
      <JobSearchClientPage />
    </Suspense>
  );
}
