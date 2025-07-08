import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { FeaturedRepos } from "./components/FeaturedRepos";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll scroll-snap-y snap-mandatory">
      {/* Card 1: Name + Socials + Ask AI */}
      <Card className="min-h-screen snap-start bg-background">
        <CardContent className="h-full flex flex-col justify-center items-center text-center space-y-6 px-6">
          <img
            src="/avatar.png"
            alt="Michael Murphy"
            className="w-24 h-24 rounded-full border"
          />
          <div>
            <h1 className="text-4xl font-bold text-foreground">Michael Murphy</h1>
            <p className="text-muted-foreground text-sm">
              Product Owner · Systems Engineer · Builder
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/michael-murphy-a05272153"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/michaelpmurphy14"
              target="_blank"
              className="hover:underline"
            >
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:mpmurphy2014@gmail.com" className="hover:underline">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" /> Ask My Portfolio (AI)
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Chat with an AI trained on my résumé and project data to explore my experience.
            </p>
            <Button asChild>
              <Link href="/ask">Launch AI Chat</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Summary + Skills + Resume */}
      <Card className="min-h-screen snap-start bg-muted">
        <CardContent className="h-full flex flex-col justify-center space-y-8 px-6 max-w-3xl mx-auto">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Professional Summary</h2>
            <p className="text-muted-foreground text-lg break-words line-clamp-5">
              Systems Engineer and Product Owner with a track record of delivering secure, enterprise-scale
              platforms across Lockheed Martin. Led efforts on Moonshot, Lightspeed, and cloud-based innovation
              frameworks. Skilled in human-centered design, DevSecOps, and AI-enabled transformation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Skills & Certifications</h2>
            <ul className="list-disc list-inside text-muted-foreground text-lg space-y-2 break-words">
              <li>🛠 Systems Engineering, UX/UI, Agile, DevSecOps, Cloud</li>
              <li>📜 AWS Solutions Architect, SAFe DevOps 6.0, AWS AI</li>
              <li>🧠 HCD, prototyping, cross-functional team leadership</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Download Résumé</h2>
            <Button asChild variant="secondary">
              <a href="/Michael_Murphy_Resume.pdf" download>
                Download PDF
              </a>
            </Button>
          </section>
        </CardContent>
      </Card>

      {/* Card 3: GitHub Projects */}
      <Card className="min-h-screen snap-start bg-secondary">
        <CardContent className="h-full flex flex-col justify-center space-y-6 px-6">
          <h2 className="text-2xl font-bold text-foreground text-center">Featured GitHub Projects</h2>
          <FeaturedRepos />
        </CardContent>
      </Card>

      {/* Card 4: Professional Projects */}
      <Card className="min-h-screen snap-start bg-muted">
        <CardContent className="h-full flex flex-col justify-center space-y-6 px-6">
          <h2 className="text-2xl font-bold text-foreground text-center">Professional Accomplishments</h2>
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide -mx-2 px-2">
            {[
              {
                title: "Moonshot Sync Pipeline",
                desc: "Secure sync for air-gapped networks; reduced update time 80%.",
              },
              {
                title: "Lightspeed PLM Automation",
                desc: "Infrastructure automation + DR for PLM with minimal downtime.",
              },
              {
                title: "EBA Innovation Framework",
                desc: "Customer innovation lifecycle + portal built with AWS support.",
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
        </CardContent>
      </Card>
    </main>
  );
}
