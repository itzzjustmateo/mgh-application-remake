"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DISCORD_INVITE = "https://discord.gg/6caJZdrZJf";
const COUNTDOWN_START = 3;

export default function DiscordPage() {
  const [seconds, setSeconds] = useState(COUNTDOWN_START);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      window.location.replace(DISCORD_INVITE);
    }, COUNTDOWN_START * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-6">
        {/* Spinner */}
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-muted-foreground" />

        <h1 className="text-3xl font-bold">Weiterleitung zu Discord</h1>

        <p className="text-muted-foreground">
          Du wirst in <strong>{Math.max(seconds, 0)}</strong> Sekunden
          weitergeleitet…
        </p>

        <Button
          size="lg"
          className="w-full"
          onClick={() => router.push(DISCORD_INVITE)}
          rel="noopener noreferrer"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Jetzt öffnen
        </Button>

        <p className="text-xs text-muted-foreground break-all">
          {DISCORD_INVITE}
        </p>
      </div>
    </main>
  );
}
