export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-7xl px-6 py-6 text-sm flex justify-between">
        <span>
          © 2024 - {new Date().getFullYear()} MiniGamesHD. Alle Rechte
          vorbehalten.
        </span>
        <span>Minecraft Minigame Server</span>
      </div>
    </footer>
  );
}
