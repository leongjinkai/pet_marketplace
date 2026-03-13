import { cn } from "@/lib/utils";

interface InlineErrorProps {
  message: string;
  className?: string;
}

export function InlineError({ message, className }: InlineErrorProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive",
        className
      )}
    >
      {message}
    </div>
  );
}
