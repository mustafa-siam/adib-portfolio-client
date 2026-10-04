import { FilterConfig } from "@/providers/TableProvider";


// Dynamic filter configuration
export const filterConfigs: FilterConfig[] = [
  {
    key: 'role',
    label: 'Filter by Role',
    placeholder: 'Select role',
    allOptionsLabel: 'All Roles',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Moderator', value: 'moderator' },
    ],
  },
];
