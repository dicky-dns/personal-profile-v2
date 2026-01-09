"use client";

import { useEffect, useState } from "react";

const WAKATIME_API_URL =
  "https://wakatime.com/api/v1/users/current/all_time_since_today";

type WakatimeTotals = {
  totalHours: string;
  totalMinutes: string;
};

type WakatimeState = {
  data: WakatimeTotals | null;
  error: string | null;
  isLoading: boolean;
  isReady: boolean;
};

const toDateString = (date: Date) => date.toISOString().slice(0, 10);

export function useGetWakatimeData(): WakatimeState {
  const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY;
  const isReady = Boolean(apiKey);

  const [state, setState] = useState<WakatimeState>({
    data: null,
    error: null,
    isLoading: isReady,
    isReady,
  });

  useEffect(() => {
    if (!isReady) {
      setState({
        data: null,
        error: "Wakatime API key not configured.",
        isLoading: false,
        isReady,
      });
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      try {
        const url = new URL(WAKATIME_API_URL);
        url.searchParams.set("api_key", apiKey || "");

        const res = await fetch(url.toString());
        const json = await res.json();

        if (!res.ok) {
          throw new Error(`Gagal ambil data: ${res.status}`);
        }

        const totalSeconds = Number(json?.data?.total_seconds ?? 0);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        if (!cancelled) {
          setState({
            data: {
              totalHours: String(hours),
              totalMinutes: String(minutes),
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
  }, [apiKey, isReady]);

  return state;
}
