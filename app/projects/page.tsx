import { Card, CardContent } from "@/components/ui/card";
import { Github } from "lucide-react";

// Fetch your STARRED GitHub repos
async function getStarredRepos() {
  const res = await fetch("https://api.github.com/users/michaelpmurphy14/starred", {
    next: { revalidate: 3600 },
    headers: {
      Accept: "application/vnd.github+json",
      // Uncomment below and set GITHUB_TOKEN in .env.local if rate-limited
      // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.error("GitHub API error", res.status);
    return [];
  }

  const repos = await res.json();
  return repos.sort(
    (a: any, b: any) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}

export default async function ProjectsPage() {
  const starredRepos = await getStarredRepos();

  return (
    <main className="p-4 max-w-4xl mx-auto space-y-10">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          A mix of public technical favorites and select professional work.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">💻 Starred GitHub Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {starredRepos.map((repo: any) => (
            <Card key={repo.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{repo.full_name}</h3>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 text-gray-500 hover:text-black" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  {repo.description || "No description provided."}
                </p>
                <p className="text-xs text-gray-400">
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🏢 Professional Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Moonshot Sync Pipeline</h3>
              <p>
                Designed and delivered multi-environment sync across secure networks; enabled air-gapped deployments and reduced update time by 80%.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Lightspeed PLM Automation</h3>
              <p>
                Led automation and disaster recovery for PLM tools, cutting RTO/RPO dramatically and supporting business continuity in classified environments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">EBA Innovation Framework</h3>
              <p>
                Built a hybrid innovation lifecycle with AWS SMEs, including a customer portal and onboarding pipeline for enterprise experimentation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">DevSecOps Education Pipeline</h3>
              <p>
                Delivered company-wide training series and interactive labs to upskill developers across SAFe teams using secure DevOps principles.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
