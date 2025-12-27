import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* -------------------------------------------
 * Announcement
 * ------------------------------------------- */

export type AnnouncementProps = ComponentPropsWithoutRef<typeof Badge> & {
  themed?: boolean;
};

export const Announcement = ({
  variant = "outline",
  themed = false,
  className,
  ...props
}: AnnouncementProps) => {
  return (
    <Badge
      variant={variant}
      className={cn(
        "group max-w-full gap-2 rounded-full bg-background px-3 py-0.5 font-medium shadow-sm transition-all hover:shadow-md",
        themed && "announcement-themed border-foreground/15",
        className,
      )}
      {...props}
    />
  );
};

/* -------------------------------------------
 * AnnouncementTag
 * ------------------------------------------- */

export type AnnouncementTagProps = HTMLAttributes<HTMLSpanElement>;

export const AnnouncementTag = ({
  className,
  ...props
}: AnnouncementTagProps) => {
  return (
    <span
      className={cn(
        "-ml-2.5 shrink-0 truncate rounded-full bg-foreground/5 px-2.5 py-1 text-xs",
        "group-[.announcement-themed]:bg-background/60",
        className,
      )}
      {...props}
    />
  );
};

/* -------------------------------------------
 * AnnouncementTitle
 * ------------------------------------------- */

export type AnnouncementTitleProps = HTMLAttributes<HTMLSpanElement>;

export const AnnouncementTitle = ({
  className,
  ...props
}: AnnouncementTitleProps) => {
  return (
    <span
      className={cn("flex items-center gap-1 truncate py-1", className)}
      {...props}
    />
  );
};
