"use client";

import { cn } from "@/utils";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <header className={cn("w-full border-b border-neutral-2", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-xl font-bold text-neutral-primary">FE App</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
