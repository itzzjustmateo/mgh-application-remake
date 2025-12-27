"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/shadcn-io/announcement";
import { ServerIP } from "@/components/ui/server-ip";
import { ServerStatus } from "@/components/ui/server-status";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-5xl shadow-2xl">
        <CardHeader className="text-center space-y-6">
          {/* Announcement */}
          <div className="flex justify-center">
            <Announcement asChild themed>
              <Link href="/apply">
                <AnnouncementTag>Latest update</AnnouncementTag>
                <AnnouncementTitle>Application added →</AnnouncementTitle>
              </Link>
            </Announcement>
          </div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              MiniGamesHD
            </h1>

            <p className="max-w-2xl mx-auto text-lg">
              Ein moderner Minecraft Minigame-Server mit Fokus auf Qualität,
              Fairness und Community.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg">
              <Link href="/apply">Jetzt bewerben</Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <a href="/discord" target="_blank" rel="noreferrer">
                Discord beitreten
              </a>
            </Button>
          </motion.div>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-3 pt-6">
          <ServerIP />
          <ServerStatus />
        </CardContent>
      </Card>
    </main>
  );
}
