import { useMemo, useState, memo } from "react";
import { Plus } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { adminFieldClass } from "./AdminFormField";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface CategoryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CUSTOM_VALUE = "__custom__";

export const CategoryCombobox = memo(function CategoryCombobox({
  value,
  onChange,
  className,
}: CategoryComboboxProps) {
  const { categories, loading, addCategory } = useCategories();
  const [customMode, setCustomMode] = useState(false);
  const [customName, setCustomName] = useState("");
  const [saving, setSaving] = useState(false);

  const categoryNames = useMemo(() => categories.map((c) => c.name), [categories]);

  const selectValue = useMemo(() => {
    if (!value) return "";
    if (categoryNames.includes(value)) return value;
    return CUSTOM_VALUE;
  }, [value, categoryNames]);

  const handleSelect = (selected: string) => {
    if (selected === CUSTOM_VALUE) {
      setCustomMode(true);
      setCustomName(value && !categoryNames.includes(value) ? value : "");
      return;
    }
    setCustomMode(false);
    onChange(selected);
  };

  const handleApplyCustom = async () => {
    const trimmed = customName.trim();
    if (!trimmed) return;

    setSaving(true);
    try {
      if (!categoryNames.some((n) => n.toLowerCase() === trimmed.toLowerCase())) {
        await addCategory(trimmed);
      }
      onChange(trimmed);
      setCustomMode(false);
      setCustomName("");
    } catch {
      onChange(trimmed);
      setCustomMode(false);
    } finally {
      setSaving(false);
    }
  };

  if (customMode) {
    return (
      <div className={`flex gap-2 ${className ?? ""}`}>
        <Input
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Type new category…"
          className={adminFieldClass}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void handleApplyCustom();
            }
          }}
        />
        <Button
          type="button"
          onClick={() => void handleApplyCustom()}
          disabled={saving || !customName.trim()}
          className="shrink-0 bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]"
        >
          {saving ? "…" : "Add"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setCustomMode(false)}
          className="shrink-0 border-white/10 text-gray-300"
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Select value={selectValue || undefined} onValueChange={handleSelect} disabled={loading}>
      <SelectTrigger className={`${adminFieldClass} ${className ?? ""}`}>
        <SelectValue placeholder={loading ? "Loading…" : "Select category…"} />
      </SelectTrigger>
      <SelectContent className="z-[200] bg-gray-900 border-white/10">
        {categoryNames.map((name) => (
          <SelectItem key={name} value={name} className="text-white">
            {name}
          </SelectItem>
        ))}
        <SelectItem value={CUSTOM_VALUE} className="text-[#edcca5]">
          <span className="flex items-center gap-2">
            <Plus className="w-3.5 h-3.5" />
            Add new category…
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
});
