import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { LogoutButton } from "@/components/auth/LogoutButton";

type TopBarProps = {
  userEmail: string;
};

export function TopBar({ userEmail }: TopBarProps) {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

        {/* LEFT: Logo */}
       <Link href="/dashboard" className="flex items-center">
         <Image
           src="/images/logo.jpg"
           alt="Garage Logo"
           width={140}
           height={40}
           priority
           className="h-9 w-auto object-contain"
         />
       </Link>

        {/* CENTER NAV (desktop only) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-red-600 transition"
          >
            Dashboard
          </Link>
        </nav>

        {/* RIGHT: User Menu */}
        <div className="flex items-center gap-3">

          {/* email hidden on very small screens */}
          <span className="hidden sm:block text-xs text-muted-foreground">
            {userEmail}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Menu
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <LogoutButton />
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  );
}