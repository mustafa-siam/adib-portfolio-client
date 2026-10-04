'use client';

import * as React from 'react';
import {
  Home,
  Users,
  PlusSquare,
  List,
  NotebookPen,
  FolderKanban,
} from 'lucide-react';

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { TeamSwitcher } from './team-switcher';
import { NavMain } from './nav-main';

const data = {
  teams: [
    {
      name: 'Adib Studio',
      plan: 'Admin Dashboard',
      url: '/',
    },
  ],

  navGroups: [
    {
      label: 'Gangrel',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: Home,
          isActive: true,
        },
      ],
    },

    {
      label: 'Content',
      items: [
        {
          title: 'Projects',
          url: '/dashboard/projects',
          icon: FolderKanban,
          isActive: false,
          items: [
            {
              title: 'Add Project',
              url: '/dashboard/projects/add',
              icon: PlusSquare,
            },
            {
              title: 'Manage Projects',
              url: '/dashboard/projects/manage',
              icon: List,
            },
          ],
        },

        {
          title: 'Users',
          url: '/dashboard/users',
          icon: Users,
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="w-64 min-w-[16rem] border-r z-20 border-slate-100 dark:border-slate-900 rounded-tr-4xl"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}