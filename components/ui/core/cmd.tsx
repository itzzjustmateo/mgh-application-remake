"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { toast } from "sonner";

type CommandAction = () => void;

interface CommandEntry {
  label: string;
  action: CommandAction;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.ctrlKey || e.metaKey;
      if (isCmd && (e.key === "k" || e.key === "j")) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate =
    (path: string): CommandAction =>
    () => {
      router.push(path);
      setOpen(false);
    };

  const navigationCommands: CommandEntry[] = [
    { label: "Home", action: navigate("/") },
    { label: "Team", action: navigate("/team") },
    { label: "Regeln", action: navigate("/rules") },
    { label: "Bewerben", action: navigate("/apply") },
    { label: "Status", action: navigate("/status") },
    { label: "FAQ", action: navigate("/faq") },
  ];

  const actionCommands: CommandEntry[] = [
    {
      label: "Server-IP kopieren",
      action: async () => {
        await navigator.clipboard.writeText("minigameshd.minecraft.to");
        toast.success("Server-IP kopiert");
        setOpen(false);
      },
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Befehl oder Seite suchen…" />
      <CommandList>
        <CommandEmpty>Keine Ergebnisse.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigationCommands.map((cmd) => (
            <CommandItem key={cmd.label} onSelect={cmd.action}>
              {cmd.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Aktionen">
          {actionCommands.map((cmd) => (
            <CommandItem key={cmd.label} onSelect={cmd.action}>
              {cmd.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
