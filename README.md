# 🎓 UCalgary Career Search Portal

*A modern, student-focused job discovery and application tracking platform built with Next.js.*

## 🚀 Overview

The **Career Search Portal** is a redesigned and fully interactive job-search experience for University of Calgary students.
It centralizes job browsing, application submission, deadline tracking, networking, and career resources into one clean, intuitive interface.

This project was built using **Next.js 14 (App Router)**, **TypeScript**, **TailwindCSS**, and **Shadcn/UI**.

---

## 🛠️ Tech Stack

* **Next.js 14 – App Router**
* **React 18**
* **TypeScript**
* **TailwindCSS**
* **Shadcn/UI components**
* **Lucide Icons**
* **Framer Motion** (animations)
* **Google Identity Services (optional)**

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

## ▶️ Running the Development Server

Start the dev server:

```bash
npm run dev
```

Then open:

👉 **[http://localhost:3000](http://localhost:3000)**

Any changes made inside `/app` will hot-reload automatically.

---

## 🔐 Environment Variables (Optional)

If using Google login or any authentication layer:

Create a `.env.local` file:

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
app/
 ├── layout.tsx           # Root layout
 ├── page.tsx             # Landing page
 ├── dashboard/           # Student dashboard
 ├── applications/        # Application tracker
 ├── deadlines/           # Deadlines viewer
 ├── networking/          # Networking hub
components/
 ├── ui/                  # Shadcn components
providers/
 ├── AuthProvider.tsx
 └── QueryProvider.tsx
public/
styles/
└── globals.css
```

---

## ✨ Features

### 🔍 Job Discovery

* Browse internships, co-ops, and entry-level roles
* Filter by location, type, remote status
* Personalized recommendations

### Application Tracking

* Track application status (Submitted → Under Review → Interview → Decision)
* Upload supporting documents
* View detailed progress timeline

### Deadline Management

* Centralized calendar of upcoming job deadlines
* “Deadlines At a Glance” widget

### Student Profile

* Personal info
* Skills
* Education
* Uploaded documents (Resume, Transcript)

### Networking Hub

* View mentors, student reps, and connections
* Send messages / start chats

### Career Resources

* Resume templates, interview prep, workshops
* Save resources for later access

---

## Running the Production Build

Create a production build:

```bash
npm run build
npm run start
```



## 📄 License

MIT License © 2024
