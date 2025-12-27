"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SERVER_IP = "minigameshd.minecraft.to";

export function ServerIP() {
  const copyIp = async () => {
    await navigator.clipboard.writeText(SERVER_IP);
    toast.success("Server-IP kopiert!", {
      description: SERVER_IP,
    });
  };

  return (
    <div className="flex items-center gap-3">
      <code className="px-3 py-1 rounded-md border">{SERVER_IP}</code>
      <Button size="sm" onClick={copyIp}>
        Kopieren
      </Button>
    </div>
  );
}
