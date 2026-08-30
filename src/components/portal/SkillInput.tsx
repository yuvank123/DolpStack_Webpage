import React, { useState, KeyboardEvent } from "react";
import { X, Plus, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface SkillInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  error?: string;
  maxSkills?: number;
}

const COMMON_SUGGESTIONS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "Next.js",
  "Git",
  "Docker",
  "REST APIs",
  "GraphQL",
];

export function SkillInput({ skills, onChange, error, maxSkills = 15 }: SkillInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addSkill = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setInputValue("");
      return;
    }
    if (skills.length >= maxSkills) return;
    onChange([...skills, trimmed]);
    setInputValue("");
  };

  const removeSkill = (indexToRemove: number) => {
    onChange(skills.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === "Backspace" && !inputValue && skills.length > 0) {
      removeSkill(skills.length - 1);
    }
  };

  const remainingSuggestions = COMMON_SUGGESTIONS.filter(
    (sug) => !skills.some((s) => s.toLowerCase() === sug.toLowerCase()),
  ).slice(0, 6);

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-input bg-background/50 p-2.5 backdrop-blur-xs focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 transition-all">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 transition-colors"
          >
            <span>{skill}</span>
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-primary/70 hover:text-primary transition-colors focus:outline-none"
              aria-label={`Remove ${skill}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) addSkill(inputValue);
          }}
          placeholder={
            skills.length === 0
              ? "Type a skill and press Enter (e.g. React, Python)..."
              : "Add more..."
          }
          className="flex-1 min-w-[140px] bg-transparent text-sm placeholder:text-muted-foreground outline-none px-1 py-0.5"
        />

        {inputValue.trim() && (
          <button
            type="button"
            onClick={() => addSkill(inputValue)}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary px-2 py-1 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <Plus className="h-3 w-3" /> Add
          </button>
        )}
      </div>

      {/* Suggested Quick Add Chips */}
      {remainingSuggestions.length > 0 && skills.length < maxSkills && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1 font-medium text-muted-foreground/80">
            <Sparkles className="h-3 w-3 text-blue-500" /> Suggestions:
          </span>
          {remainingSuggestions.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => addSkill(sug)}
              className="rounded-md border border-border/70 bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              + {sug}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}
