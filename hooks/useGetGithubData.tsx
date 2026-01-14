"use client";

import { useEffect, useState } from "react";
import { format, subMonths } from "date-fns";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const QUERY = `
  query GithubProfile($username: String!) {
    user(login: $username) {
      login
      avatarUrl
      location
      followers {
        totalCount
      }
      following {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const REPOS_QUERY = `
  query GithubRepos($username: String!, $cursor: String) {
    user(login: $username) {
      repositories(first: 100, after: $cursor, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

type GithubResponse = {
  user: {
    login: string;
    avatarUrl: string;
    location?: string | null;
    followers: { totalCount: number };
    following: { totalCount: number };
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{
          contributionDays: Array<{
            date: string | null;
            contributionCount: number;
          }>;
        }>;
      };
    };
  } | null;
  publicRepos?: number;
  totalStars?: number;
  topLanguages?: string[];
  months?: string[];
};

type GithubState = {
  data: GithubResponse | null;
  error: string | null;
  isLoading: boolean;
  isReady: boolean;
};

export function useGetGithubData(): GithubState {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const token = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
  const isReady = Boolean(username && token);

  const [state, setState] = useState<GithubState>({
    data: null,
    error: null,
    isLoading: isReady,
    isReady,
  });

  useEffect(() => {
    if (!isReady) {
      setState({
        data: null,
        error: "GitHub username/token not configured.",
        isLoading: false,
        isReady,
      });
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      try {
        const res = await fetch(GITHUB_GRAPHQL_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: QUERY,
            variables: { username },
          }),
        });

        const json = await res.json();

        if (!res.ok || json.errors) {
          const message =
            json?.errors?.[0]?.message ||
            json?.message ||
            "Failed to fetch GitHub data";
          throw new Error(message);
        }

        const languageCounts: Record<string, number> = {};

        const fetchRepos = async (
          cursor: string | null,
          totals: { publicRepos: number; totalStars: number }
        ): Promise<{ publicRepos: number; totalStars: number }> => {
          if (cancelled) return totals;

          const repoRes = await fetch(GITHUB_GRAPHQL_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              query: REPOS_QUERY,
              variables: { username, cursor },
            }),
          });

          const repoJson = await repoRes.json();

          if (!repoRes.ok || repoJson.errors) {
            const message =
              repoJson?.errors?.[0]?.message ||
              repoJson?.message ||
              "Failed to fetch GitHub repositories";
            throw new Error(message);
          }

          const repos = repoJson?.data?.user?.repositories;
          const publicRepos = repos?.totalCount ?? totals.publicRepos;
          const nodes = repos?.nodes ?? [];
          let totalStars = totals.totalStars;
          for (const repo of nodes) {
            totalStars += Number(repo?.stargazerCount ?? 0);
            const language = repo?.primaryLanguage?.name;
            if (language) {
              languageCounts[language] = (languageCounts[language] ?? 0) + 1;
            }
          }

          if (repos?.pageInfo?.hasNextPage) {
            return fetchRepos(repos?.pageInfo?.endCursor ?? null, {
              publicRepos,
              totalStars,
            });
          }

          return { publicRepos, totalStars };
        };

        const { publicRepos, totalStars } = await fetchRepos(null, {
          publicRepos: 0,
          totalStars: 0,
        });
        const topLanguages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([name]) => name);
        const months = Array.from({ length: 13 }, (_, index) =>
          format(subMonths(new Date(), 12 - index), "MMM")
        );

        if (!cancelled) {
          setState({
            data: {
              ...(json.data as GithubResponse),
              publicRepos,
              totalStars,
              topLanguages,
              months,
            },
            error: null,
            isLoading: false,
            isReady,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            data: null,
            error: err instanceof Error ? err.message : "Unknown error",
            isLoading: false,
            isReady,
          });
        }
      }
    };

    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    fetchData();

    return () => {
      cancelled = true;
    };
  }, [isReady, token, username]);

  return state;
}
