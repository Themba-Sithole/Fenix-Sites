import { useState } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useCategories } from "../../hooks/useCategories";

interface CategoryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CategoryCombobox({ value, onChange, className }: CategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { categories, addCategory } = useCategories();

  const handleSelect = (name: string) => {
    onChange(name);
    setOpen(false);
  };

  const handleCreate = async () => {
    const trimmed = search.trim();
    if (!trimmed) return;
    try {
      const cat = await addCategory(trimmed);
      onChange(cat.name);
      setOpen(false);
      setSearch("");
    } catch {
      onChange(trimmed);
      setOpen(false);
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const showCreate =
    search.trim() &&
    !categories.some((c) => c.name.toLowerCase() === search.trim().toLowerCase());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white font-normal",
            !value && "text-gray-500",
            className
          )}
        >
          {value || "Select category…"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-gray-900 border-white/10">
        <Command className="bg-transparent" shouldFilter={false}>
          <CommandInput
            placeholder="Search or type new…"
            value={search}
            onValueChange={setSearch}
            className="text-white"
          />
          <CommandList>
            <CommandEmpty>
              {showCreate ? (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-[#edcca5] hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                  Create &quot;{search.trim()}&quot;
                </button>
              ) : (
                <span className="text-gray-500 text-sm">No categories found.</span>
              )}
            </CommandEmpty>
            <CommandGroup>
              {filtered.map((cat) => (
                <CommandItem
                  key={cat.id}
                  value={cat.name}
                  onSelect={() => handleSelect(cat.name)}
                  className="text-white"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === cat.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {cat.name}
                </CommandItem>
              ))}
              {showCreate && filtered.length > 0 && (
                <CommandItem onSelect={handleCreate} className="text-[#edcca5]">
                  <Plus className="mr-2 h-4 w-4" />
                  Create &quot;{search.trim()}&quot;
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
