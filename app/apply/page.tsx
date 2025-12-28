"use client";

import { useRef, useCallback, useMemo, useEffect } from "react";
import html2canvas from "html2canvas";
import Link from "next/link";
import { toast } from "sonner";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Checkbox } from "@/components/ui/checkbox";

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const ROLES = [
  { value: "co-owner", label: "Co-Owner", minAge: 18 },
  { value: "admin", label: "Admin", minAge: 15 },
  { value: "developer", label: "Developer", minAge: 15 },
  { value: "mod", label: "Moderator", minAge: 13 },
  { value: "supporter", label: "Supporter", minAge: 13 },
  { value: "builder", label: "Builder", minAge: 13 },
] as const;

const EXPERIENCE_OPTIONS = [
  "Support",
  "Moderation",
  "Events",
  "Development",
  "Building",
] as const;

/* -------------------------------------------------------------------------- */
/* Zod Schema                                                                 */
/* -------------------------------------------------------------------------- */

const formSchema = z
  .object({
    mcName: z.string().min(2),
    discord: z.string().min(2),
    age: z.number().min(10),
    role: z.enum(ROLES.map((r) => r.value) as [string, ...string[]]),

    motivationWhy: z.string().min(10),
    motivationContribution: z.string().min(10),

    experienceTags: z.array(z.string()).optional(),
    experienceText: z.string().optional(),

    honesty: z.string().min(5),
    time: z.string().min(1),

    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const role = ROLES.find((r) => r.value === data.role);

    if (role && data.age < role.minAge) {
      ctx.addIssue({
        path: ["age"],
        message: `Für ${role.label} musst du mindestens ${role.minAge} Jahre alt sein.`,
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.role === "co-owner" && (!data.firstName || !data.lastName)) {
      ctx.addIssue({
        path: ["firstName"],
        message: "Vor- und Nachname sind für Co-Owner erforderlich",
        code: z.ZodIssueCode.custom,
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function ApplyPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experienceTags: [],
    },
  });

  const experienceTags = watch("experienceTags");

  /* ---------------- Progress ---------------- */

  const progress = useMemo(() => {
    const required = [
      "mcName",
      "discord",
      "age",
      "role",
      "motivationWhy",
      "motivationContribution",
      "honesty",
      "time",
    ] as const;

    const values = watch();
    const filled = required.filter((k) => !!values[k]).length;

    return Math.round((filled / required.length) * 100);
  }, [watch]);

  /* ---------------- Scroll to first error ---------------- */

  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      document
        .querySelector(`[name="${firstError}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors]);

  /* ---------------- Submit (html2canvas fix) ---------------- */

  const onSubmit = useCallback(async () => {
    if (!cardRef.current) return;

    cardRef.current.classList.add("screenshot-safe");

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      link.href = image;
      link.download = "minigameshd-bewerbung.png";
      link.click();

      toast.success("Screenshot erstellt!");
    } catch {
      toast.error("Screenshot fehlgeschlagen");
    } finally {
      cardRef.current.classList.remove("screenshot-safe");
    }
  }, []);

  /* ---------------------------------------------------------------------- */

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card ref={cardRef} className="w-full max-w-xl shadow-2xl">
        <CardHeader>
          <CardTitle>MinigamesHD Bewerbung</CardTitle>
          <CardDescription>{progress}% abgeschlossen</CardDescription>
          <div className="h-2 bg-muted rounded">
            <div
              className="h-2 bg-primary rounded transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field
              label="Minecraft Name"
              required
              error={errors.mcName?.message}
            >
              <Input {...register("mcName")} />
            </Field>

            <Field
              label="Discord Name"
              required
              error={errors.discord?.message}
            >
              <Input {...register("discord")} />
            </Field>

            <Field label="Alter" required error={errors.age?.message}>
              <Input
                type="number"
                {...register("age", { valueAsNumber: true })}
              />
            </Field>

            <Field
              label="Bewerbungsrolle"
              required
              error={errors.role?.message}
            >
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          <span className="text-muted-foreground">
                            Bitte auswählen
                          </span>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field
              label="Warum unser Server?"
              required
              error={errors.motivationWhy?.message}
            >
              <Textarea {...register("motivationWhy")} />
            </Field>

            <Field
              label="Was kannst du konkret beitragen?"
              required
              error={errors.motivationContribution?.message}
            >
              <Textarea {...register("motivationContribution")} />
            </Field>

            {/* EXPERIENCE */}
            <Field label="Erfahrung">
              <Controller
                name="experienceTags"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-3">
                    {EXPERIENCE_OPTIONS.map((opt) => {
                      const checked = field.value?.includes(opt);

                      return (
                        <label
                          key={opt}
                          className="flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(v) => {
                              if (v) {
                                field.onChange([...(field.value ?? []), opt]);
                              } else {
                                field.onChange(
                                  field.value?.filter((x) => x !== opt),
                                );
                              }
                            }}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              />

              {experienceTags && experienceTags.length > 0 && (
                <Textarea
                  {...register("experienceText")}
                  placeholder="Optional: Details zu deiner Erfahrung"
                  className="mt-2"
                />
              )}
            </Field>

            <Field
              label="Was fällt dir im Team schwer?"
              required
              error={errors.honesty?.message}
            >
              <Textarea {...register("honesty")} />
            </Field>

            <Field label="Zeit pro Woche" required error={errors.time?.message}>
              <Input {...register("time")} />
            </Field>

            <Button type="submit" className="w-full">
              Screenshot erstellen
            </Button>

            <Button asChild variant="link" className="w-full">
              <Link href="/discord" target="_blank">
                Zum Discord
              </Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Helper                                                                      */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
