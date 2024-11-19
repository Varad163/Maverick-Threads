"use client";

import { ChevronsUpDown, Check } from "lucide-react";
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

import { useState } from "react";
import { Category } from "@/sanity.types";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");
interface CategorySelectorProps {
    categories: Category[];
    onSelectCategory: (categorySlug: string) => void; // New prop for handling selection
}

export function CategorySelectorComponent({
    categories,
    onSelectCategory,
}: CategorySelectorProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const safeCategories = Array.isArray(categories) ? categories : [];

    const handleSelect = (slug: string) => {
        const newValue = slug === value ? "" : slug; // Toggle selection
        setValue(newValue);
        onSelectCategory(newValue); // Notify parent component
        setOpen(false);
    };

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
                        ? categories.find((category) => category.slug === value)?.title
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
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.slug}
                                    onSelect={() => handleSelect(category.slug)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category.slug ? "opacity-100" : "opacity-0"
                                        )}
                                    />
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
