"use client";

import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { useRouter } from "next/navigation";

interface CategorySelectorProps {
  categories: {
    data: Category[];
  };

}


export default function CategorySelectorComponent({ categories }: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  console.log(categories);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.data.find((category) => category.title === value)?.title
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.data?.map((category) => (
                <CommandItem
                  key={category.value} // Ensure category.value is unique
                  value={category.value} // Use category.value consistently
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue); // Toggle selection
                    setOpen(false);
                  }}
                >
                  {category.title} {/* Display the title */}
                </CommandItem>
              ))}

            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
