import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-bold text-lg">
          MiniGamesHD
        </Link>

        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/apply">Bewerben</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/discord" target="_blank" rel="noreferrer">
              Discord
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
