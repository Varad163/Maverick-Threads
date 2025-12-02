"use client";

import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Category } from "@/sanity.types";
import { useState } from "react";

interface CategorySelectorProps {
  categories: {
    data: Category[];
  };
}

export default function CategorySelectorComponent({
  categories,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // Find current category by slug
  const selectedCategory = categories.data.find(
    (cat) => cat.slug?.current === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCategory ? selectedCategory.title : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>

            <CommandGroup heading="Categories">
              {categories.data.map((category) => (
                <CommandItem
                  key={category._id}                              // ✔ UNIQUE KEY
                  value={category.slug?.current ?? ""}            // ✔ VALID VALUE
                  onSelect={(selected) => {
                    setValue(selected === value ? "" : selected);
                    setOpen(false);
                  }}
                >
                  {category.title}
                </CommandItem>
              ))}
            </CommandGroup>

          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
