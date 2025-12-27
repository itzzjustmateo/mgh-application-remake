"use client";

import { useEffect, useState } from "react";

type ServerResponse = {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
};

export function ServerStatus() {
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchStatus = async () => {
      try {
        const hosts = ["minigameshd.minecraft.to", "minigameshd.de"];

        for (const host of hosts) {
          const res = await fetch(`https://api.mcsrvstat.us/2/${host}`, {
            cache: "no-store",
          });

          if (!res.ok) continue;

          const data: ServerResponse = await res.json();

          if (data.online) {
            if (cancelled) return;
            setIsOnline(true);
            setOnlinePlayers(data.players?.online ?? 0);
            return;
          }
        }

        if (!cancelled) {
          setIsOnline(false);
          setOnlinePlayers(null);
        }
      } catch {
        if (!cancelled) {
          setIsOnline(false);
          setOnlinePlayers(null);
        }
      }
    };

    fetchStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isOnline === null) {
    return <div className="text-sm">Serverstatus wird geladen…</div>;
  }

  if (!isOnline) {
    return <div className="text-sm">🔴 Server offline</div>;
  }

  return <div className="text-sm">🟢 {onlinePlayers} Spieler online</div>;
}
