"use client";
import Product from "@/components/Products/Product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { QueryResult } from "@upstash/vector";
import axios from "axios";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

import type { Product as TProduct } from "@/db";
import ProductSkeleton from "@/components/Products/ProductSkeletin";

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

const SUBCATEGORIES = [
  { name: "T-shirts", selected: true, href: "#" },
  { name: "Hoodies", selected: false, href: "#" },
  { name: "Sweaters", selected: false, href: "#" },
  { name: "Accessories", selected: false, href: "#" },
] as const;

export default function Home() {
  const [filter, setFilter] = useState({
    sort: "none",
  });

  const handleClick = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post<QueryResult<TProduct>[]>(
        "http://localhost:3000/api/products",
        {
          filter: {
            sort: filter.sort,
          },
        }
      );

      return data;
    },
  });

  console.log("products ui", products);
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
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="hidden lg:block">
            <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
              {SUBCATEGORIES.map((category) => (
                <li key={category.name}>
                  <button
                    disabled={!category.selected}
                    className="disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products
              ? products?.map((product) => (
                  <Product product={product?.metadata!} />
                ))
              : new Array(12)
                  .fill(null)
                  .map((_, i) => <ProductSkeleton key={i} />)}
          </ul>
        </div>
      </section>
    </main>
  );
}
