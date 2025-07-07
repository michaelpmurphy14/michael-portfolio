"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Github } from "lucide-react";

export function FeaturedRepos() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/michaelpmurphy14/starred")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((repo: any) => !repo.fork && !repo.private)
          .slice(0, 4);
        setRepos(filtered);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {repos.map((repo) => (
        <Card
          key={repo.id}
          className="bg-background border border-border shadow-sm hover:shadow-md transition-shadow rounded-md"
        >
          <CardContent className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{repo.name}</h3>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              {repo.description || "No description provided."}
            </p>
            <p className="text-xs text-gray-400">
              ★ {repo.stargazers_count} · Updated{" "}
              {new Date(repo.updated_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
