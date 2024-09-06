"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const SORT_OPTIONS = [
    { name: "None", value: "none" },

    {
      name: "price low to high",
      value: "price-asc",
    },
    {
      name: "price high to low",
      value: "price-desc",
    },
  ] as const;

  const [filter, setFilter] = useState({
    sort: "none",
  });

  console.log(filter);

  const handleClick = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  return (
    <main className="mx-auto max-w7xl px-4 sm:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Get the Best
        </h1>

        <div className="flex  items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center font-medium text-gray-700 hover:text-gray-900 text-sm">
              sort
              <ChevronDown className="-mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleClick(option.value)}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-2 text-sm",
                    option.value === filter.sort
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* add a filter option for mobile */}
          <button className="m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
