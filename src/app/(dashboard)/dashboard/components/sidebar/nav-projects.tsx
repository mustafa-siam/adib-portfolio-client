'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { MoreHorizontal, type LucideIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

interface ProjectSubItem {
  title: string;
  icon: LucideIcon;
  theme?: string;
  url?: string;
}

interface ProjectItem {
  name: string;
  url: string;
  icon: LucideIcon;
  items: ProjectSubItem[];
}

interface NavProjectsProps {
  projects: ProjectItem[];
}

export function NavProjects({ projects }: NavProjectsProps) {
  const { isMobile } = useSidebar();
  const { setTheme } = useTheme();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const mainItems = item.items.slice(0, -1);
          const lastItem = item.items[item.items.length - 1];

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton className="cursor-pointer">
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  }
                />
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                >
                  {mainItems.map((info) =>
                    info.url ? (
                      <DropdownMenuItem
                        key={info.title}
                        render={<Link href={info.url} />}
                        onClick={() => setTheme(info.theme || 'default')}
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <info.icon className="text-muted-foreground" />
                        <span>{info.title}</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        key={info.title}
                        onClick={() => setTheme(info.theme || 'default')}
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <info.icon className="text-muted-foreground" />
                        <span>{info.title}</span>
                      </DropdownMenuItem>
                    )
                  )}

                  {lastItem && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                        <lastItem.icon className="text-muted-foreground" />
                        <span>{lastItem.title}</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}