import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { FeaturedRepos } from "./components/FeaturedRepos";

export default function Home() {
  return (
    <main className="px-6 md:px-12 xl:px-24 2xl:px-48 py-8 space-y-12">
      {/* Name + Avatar */}
      <section className="space-y-4 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <img
            src="/avatar.png"
            alt="Michael Murphy"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h1 className="text-4xl font-bold text-foreground">Michael Murphy</h1>
            <p className="text-muted-foreground text-sm">
              Product Owner · Systems Engineer · Builder
            </p>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-2 border-b border-border pb-6">
        <h2 className="text-2xl font-bold border-l-4 border-blue-600 pl-3 text-foreground">
          Professional Summary
        </h2>
        <p className="text-muted-foreground break-words line-clamp-4">
          Product Owner and Systems Engineer with deep experience in digital transformation,
          UX design, DevSecOps, and AI-driven innovation across secure enterprise and defense environments.
        </p>
      </section>

      {/* Skills */}
      <section className="space-y-2 border-b border-border pb-6">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 text-foreground">
          Skills & Certifications
        </h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 break-words">
          <li>🛠 Core: Systems Engineering, UX/UI, Agile, DevSecOps, Cloud</li>
          <li>📜 Certifications: AWS Solutions Architect, SAFe DevOps 6.0, AWS AI, Top-Secret Cleared</li>
          <li>🧠 Competencies: Human-centered design, automation strategy, cross-functional leadership</li>
        </ul>
      </section>

      {/* Resume */}
      <section className="space-y-2 border-b border-border pb-6">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 text-foreground">
          Download Resume
        </h3>
        <Button asChild variant="secondary">
          <a href="/Michael_Murphy_Resume.pdf" download>
            Download PDF
          </a>
        </Button>
      </section>

      {/* Socials */}
      <section className="space-y-2 border-b border-border pb-6">
        <h2 className="text-2xl font-bold border-l-4 border-blue-600 pl-3 text-foreground">
          Socials
        </h2>
        <div className="flex gap-4 text-sm">
          <a
            href="https://www.linkedin.com/in/michael-murphy-a05272153"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href="https://github.com/michaelpmurphy14"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="mailto:mpmurphy2014@gmail.com"
            className="flex items-center gap-1 hover:underline"
          >
            <Mail className="w-4 h-4" /> Contact me
          </a>
        </div>
      </section>

      {/* Ask AI */}
      <section className="space-y-2 border-b border-border pb-6">
        <h2 className="text-2xl font-bold border-l-4 border-blue-600 pl-3 text-foreground">
          Ask My Portfolio (AI)
        </h2>
        <Button asChild>
          <Link href="/ask">Chat with My Experience</Link>
        </Button>
      </section>

      {/* Featured GitHub Repos - horizontal scroll */}
      <section className="space-y-4 border-b border-border pb-6">
        <h2 className="text-2xl font-bold border-l-4 border-blue-600 pl-3 text-foreground">
          Featured Work (Open Source)
        </h2>
        <p className="text-muted-foreground text-sm">
          My most starred GitHub projects.
        </p>
        <FeaturedRepos />
      </section>

      {/* Professional Accomplishments - horizontal scroll */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold border-l-4 border-blue-600 pl-3 text-foreground">
          Professional Accomplishments
        </h2>
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide -mx-2 px-2">
          {[
            {
              title: "Moonshot Sync Pipeline",
              desc: "Designed and led secure enterprise sync across environments, cutting update time by 80% and enabling high-side deployments.",
            },
            {
              title: "Lightspeed PLM Automation",
              desc: "Upgraded classified infrastructure and disaster recovery capabilities across PLM toolsets with near-zero downtime.",
            },
            {
              title: "EBA Innovation Framework",
              desc: "Implemented innovation lifecycle with AWS SMEs, including a new training pipeline and customer portal within Aero IT.",
            },
          ].map((proj) => (
            <div
              key={proj.title}
              className="min-w-[320px] max-w-sm inline-block align-top mx-2 overflow-hidden"
            >
              <Card className="h-full bg-background border border-border shadow-sm hover:shadow-md transition-shadow rounded-md">
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{proj.title}</h3>
                  <p className="text-muted-foreground text-sm break-words line-clamp-4">
                    {proj.desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
