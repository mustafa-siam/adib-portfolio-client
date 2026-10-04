'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import logo from '@/asset/logo.png';

interface Team {
  name: string;
  logo?: React.ElementType;
  plan: string;
}

interface TeamSwitcherProps {
  teams: Team[];
}

export function TeamSwitcher({ teams }: TeamSwitcherProps) {
  const activeTeam = teams[0];

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          asChild
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 cursor-pointer gap-3 transition-colors"
        >
          <Link href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white transition-transform">
              <Image src={logo} alt="Logo" width={24} height={24} className="object-contain" />
            </div>
            <div className="grid flex-1 text-left leading-tight min-w-0">
              <span className="truncate font-semibold text-[15px] text-slate-900 dark:text-slate-100">
                {activeTeam.name}
              </span>
              <span className="truncate text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {activeTeam.plan}
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}