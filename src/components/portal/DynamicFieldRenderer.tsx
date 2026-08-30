import React from "react";
import { OpportunityField } from "@/lib/types/portal";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface DynamicFieldRendererProps {
  field: OpportunityField;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

export function DynamicFieldRenderer({ field, value, onChange, error }: DynamicFieldRendererProps) {
  const { label, type, required, options = [], field_key } = field;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={`field_${field_key}`} className="flex items-center gap-1 text-sm font-medium">
        <span>{label}</span>
        {required && <span className="text-destructive">*</span>}
      </Label>

      {/* Field Type Switcher */}
      {type === "text" && (
        <Input
          id={`field_${field_key}`}
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="bg-background/50 backdrop-blur-xs"
        />
      )}

      {type === "textarea" && (
        <Textarea
          id={`field_${field_key}`}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          rows={3}
          className="bg-background/50 backdrop-blur-xs resize-y"
        />
      )}

      {type === "number" && (
        <Input
          id={`field_${field_key}`}
          type="number"
          value={value !== undefined && value !== null ? String(value) : ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : "")}
          placeholder="0"
          className="bg-background/50 backdrop-blur-xs"
        />
      )}

      {type === "url" && (
        <Input
          id={`field_${field_key}`}
          type="url"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://"
          className="bg-background/50 backdrop-blur-xs"
        />
      )}

      {type === "date" && (
        <Input
          id={`field_${field_key}`}
          type="date"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className="bg-background/50 backdrop-blur-xs"
        />
      )}

      {type === "select" && (
        <Select
          value={typeof value === "string" ? value : ""}
          onValueChange={(val) => onChange(val)}
        >
          <SelectTrigger id={`field_${field_key}`} className="bg-background/50 backdrop-blur-xs">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {options &&
              options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}

      {type === "multi-select" && (
        <div className="flex flex-wrap gap-2 pt-1">
          {options &&
            options.map((opt) => {
              const currentSelected = Array.isArray(value) ? (value as string[]) : [];
              const isChecked = currentSelected.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    if (isChecked) {
                      onChange(currentSelected.filter((item) => item !== opt));
                    } else {
                      onChange([...currentSelected, opt]);
                    }
                  }}
                  className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    isChecked
                      ? "border-primary bg-primary/15 text-primary ring-1 ring-primary/40 shadow-xs"
                      : "border-border/80 bg-background/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
        </div>
      )}

      {type === "checkbox" && (
        <div className="flex items-center space-x-2 pt-1.5">
          <Checkbox
            id={`field_${field_key}`}
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(Boolean(checked))}
          />
          <Label
            htmlFor={`field_${field_key}`}
            className="text-sm font-normal text-muted-foreground cursor-pointer"
          >
            I confirm this requirement
          </Label>
        </div>
      )}

      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}
