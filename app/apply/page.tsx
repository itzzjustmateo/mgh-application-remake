"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Page() {
  const [role, setRole] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "minigameshd-bewerbung.png";
      link.click();

      toast.success("Screenshot erstellt!", {
        description:
          "Der Screenshot wurde automatisch heruntergeladen. Bitte eröffne jetzt ein Ticket auf unserem Discord.",
      });
    } catch {
      toast.error("Fehler beim Screenshot", {
        description:
          "Bitte versuche es erneut oder mache manuell einen Screenshot.",
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card ref={cardRef} className="w-full max-w-xl shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">MinigamesHD Bewerbungen</CardTitle>
          <CardDescription>
            Bewirb dich für unser Team! Fülle das Formular ehrlich aus.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mc-name">
                Minecraft Name <span className="required">*</span>
              </Label>
              <Input id="mc-name" placeholder="zB. Benisomat" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discord">
                Discord Name <span className="required">*</span>
              </Label>
              <Input id="discord" placeholder="zB. benisomat" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">
                Alter <span className="required">*</span>
              </Label>
              <Input
                id="age"
                type="number"
                min={10}
                placeholder="zB. 16"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>
                Bewerbungsrolle <span className="required">*</span>
              </Label>
              <Select onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Bitte auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="co-owner">Co-Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="mod">Moderator</SelectItem>
                  <SelectItem value="supporter">Supporter</SelectItem>
                  <SelectItem value="builder">Builder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === "co-owner" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Echter Vorname <span className="required">*</span>
                  </Label>
                  <Input required placeholder="zB. Max" />
                </div>
                <div className="space-y-2">
                  <Label>
                    Echter Nachname <span className="required">*</span>
                  </Label>
                  <Input required placeholder="zB. Musterman" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="experience">Erfahrung</Label>
              <Textarea
                id="experience"
                placeholder="zB. Ich habe schon auf den Verschiedensten Servern geholfen..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">
                Warum möchtest du ins Team? <span className="required">*</span>
              </Label>
              <Textarea
                id="motivation"
                required
                placeholder="zB. Ich habe von dem Server auf Sozialen Netzwerken..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Zeit pro Woche</Label>
              <Input id="time" placeholder="zB. 3-4 Tage pro Woche" />
            </div>

            <Button type="submit" className="w-full mt-4">
              Bewerbung abschicken & Screenshot erstellen
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
