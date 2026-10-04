'use client';

import { CornerUpRight, type LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

interface SubMenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface MenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: SubMenuItem[];
}

interface NavMainProps {
  label: string;
  items: MenuItem[];
}

export function NavMain({ label, items }: NavMainProps) {
  const path = usePathname();
  const { theme } = useTheme();

  const isParentActive = (item: MenuItem) => {
    const exactMatchUrls = ['/dashboard'];

    if (exactMatchUrls.includes(item.url)) {
      return exactMatchUrls.includes(path);
    }

    if (path === item.url || path.startsWith(`${item.url}/`)) return true;

    if (item.items) {
      return item.items.some((sub) => path === sub.url || path.startsWith(`${sub.url}/`));
    }

    return false;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>

      <SidebarMenu className="space-y-0.5">
        {items.map((item) => {
          const active = isParentActive(item);

          if (!item.items || item.items.length === 0) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`cursor-pointer transition-all duration-200 ${
                    active
                      ? theme === 'dark'
                        ? 'bg-primary-500/20 text-[#93B4E0] border-l-2 border-[#4e73a6]'
                        : 'bg-[#ebeff5df] text-primary-500 border-l-2 border-primary-700'
                      : ''
                  }`}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              defaultOpen={active}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left transition-all duration-200 ${
                    active
                      ? theme === 'dark'
                        ? 'bg-blue-900/30 text-blue-200'
                        : 'bg-blue-50 text-blue-700'
                      : ''
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <CornerUpRight
                    className={`ml-auto transition-transform ${
                      active ? 'rotate-90' : 'rotate-0'
                    }`}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isSubActive =
                        path === subItem.url || path.startsWith(`${subItem.url}/`);

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={`flex items-center gap-1 transition-all duration-200 rounded-sm ${
                              isSubActive
                                ? theme === 'dark'
                                  ? 'bg-blue-900/50 text-blue-200 border-l-2 border-blue-400 pl-1'
                                  : 'bg-blue-100 text-blue-700 border-l-2 border-blue-500 pl-1'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                          >
                            <Link
                              href={subItem.url}
                              className="flex items-center gap-1 w-full px-2 py-1"
                            >
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}