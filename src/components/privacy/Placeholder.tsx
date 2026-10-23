interface PlaceholderProps {
  value: string;
  label?: string;
}

/**
 * Renders unresolved business detail placeholders preserved from the source legal PDF.
 * Styled cleanly to match DolpStack's badge and code aesthetic.
 */
export function Placeholder({ value, label }: PlaceholderProps) {
  return (
    <span
      className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-primary/15"
      title={label ? `Business placeholder: ${label}` : "Pending business confirmation"}
    >
      {value}
    </span>
  );
}
