import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { FeaturedRepos } from "./components/FeaturedRepos";

export default function Home() {
  return (
    <main className="p-4 max-w-4xl mx-auto space-y-10">
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

      {/* Professional Summary */}
      <section className="space-y-2 border-b border-border pb-6">
        <h2 className="text-2xl font-bold text-foreground border-l-4 border-blue-600 pl-3">
          Professional Summary
        </h2>
        <p className="text-muted-foreground">
          Product Owner and Systems Engineer with deep experience in digital transformation, UX design,
          DevSecOps, and AI for secure enterprise and defense environments. Led initiatives across
          Lockheed Martin including Moonshot, Lightspeed, and innovation frameworks.
        </p>
      </section>

      {/* Skills / Certifications */}
      <section className="space-y-2 border-b border-border pb-6">
        <h3 className="text-xl font-bold text-foreground border-l-4 border-blue-600 pl-3">
          Skills & Certifications
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>🛠 Core: Systems Engineering, UX/UI, Agile, DevSecOps, Cloud</li>
          <li>📜 Certifications: AWS Solutions Architect, SAFe DevOps 6.0, AWS AI, Top-Secret Cleared</li>
          <li>🧠 Competencies: Human-centered design, cross-functional leadership, automation strategy</li>
        </ul>
      </section>

      {/* Resume Download */}
      <section className="space-y-2 border-b border-border pb-6">
        <h3 className="text-xl font-bold text-foreground border-l-4 border-blue-600 pl-3">
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
        <h2 className="text-2xl font-bold text-foreground border-l-4 border-blue-600 pl-3">
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
        <h2 className="text-2xl font-bold text-foreground border-l-4 border-blue-600 pl-3">
          Ask My Portfolio (AI)
        </h2>
        <Button asChild>
          <Link href="/ask">Chat with My Experience</Link>
        </Button>
      </section>

      {/* Featured GitHub Repos */}
      <section className="space-y-4 border-b border-border pb-6">
        <h2 className="text-2xl font-bold text-foreground border-l-4 border-blue-600 pl-3">
          Featured Work (Open Source)
        </h2>
        <p className="text-muted-foreground text-sm">
          My most starred GitHub projects.
        </p>
        <FeaturedRepos />
      </section>

      {/* Professional Accomplishments */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground border-l-4 border-blue-600 pl-3">
          Professional Accomplishments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Moonshot Sync Pipeline</h3>
              <p className="text-muted-foreground">
                Designed and led secure enterprise sync across environments, cutting update time by 80%
                and enabling high-side deployments.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Lightspeed PLM Automation</h3>
              <p className="text-muted-foreground">
                Upgraded classified infrastructure and disaster recovery capabilities across PLM toolsets
                with near-zero downtime.
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">EBA Innovation Framework</h3>
              <p className="text-muted-foreground">
                Implemented innovation lifecycle with AWS SMEs, including a new training pipeline and customer portal
                within Aero IT.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
