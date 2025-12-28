import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServerIP } from "@/components/ui/core/server-ip";
import { ServerStatus } from "@/components/ui/core/server-status";

export default function StatusPage() {
  return (
    <main className="min-h-screen flex justify-center p-6">
      <div className="w-full max-w-3xl space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Serverstatus</h1>
          <p className="text-muted-foreground">
            Aktueller Status von MiniGamesHD
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Minecraft Server</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            <ServerIP />
            <ServerStatus />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
