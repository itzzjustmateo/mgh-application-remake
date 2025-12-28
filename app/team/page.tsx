import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TEAM = [
  {
    name: "Benisomat",
    role: "Owner",
    avatar:
      "https://cdn.discordapp.com/avatars/1078395011382640651/b2328e67cc4ba6a8d1e1a6b39697d219.webp?size=128",
    fallback: "B",
  },
  {
    name: "Crones Gott",
    role: "Co-Owner",
    avatar:
      "https://cdn.discordapp.com/avatars/1342495634586075146/71fb91c1d1c5c294c83e0944a31612bb.webp?size=128",
    fallback: "CG",
  },
  {
    name: "Fischkopf",
    role: "Co-Owner",
    avatar:
      "https://cdn.discordapp.com/avatars/1198314027126894785/2a94f1f0bedc5ecee1461f7b3d6d0212.webp?size=128",
    fallback: "FK",
  },
  {
    name: "alvqrr",
    role: "Co-Owner",
    avatar:
      "https://cdn.discordapp.com/avatars/1008413436763443330/fc555bc2ace69f98d1fb19c2d788deea.webp?size=128",
    fallback: "A",
  },
  {
    name: "Uschebtii",
    role: "Co-Owner",
    avatar:
      "https://cdn.discordapp.com/avatars/1335246935413624934/6c5996770c985bcd6e5b68131ff2ba04.webp?size=128",
    fallback: "U",
  },
  {
    name: "FLEIPLEI",
    role: "Co-Owner",
    avatar:
      "https://cdn.discordapp.com/avatars/1111350763982172311/03b216f883f92f6e752383800a1eb541.webp?size=128",
    fallback: "FP",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen flex justify-center p-6">
      <div className="w-full max-w-5xl space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Wer steckt eigentlich hinter MiniGamesHD?
          </p>
        </header>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <Card key={member.name} className="text-center">
              <CardHeader className="space-y-3">
                <Avatar className="mx-auto h-16 w-16">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.fallback}</AvatarFallback>
                </Avatar>

                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
