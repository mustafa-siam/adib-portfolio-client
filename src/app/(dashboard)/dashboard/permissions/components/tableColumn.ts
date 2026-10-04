
import React from 'react';
import Image from 'next/image';
import { Column } from '@/providers/TableProvider';

export const columns: Column[] = [
  {
    key: 'serialNo',
    label: 'No.',
    className: 'w-16',
    sortable: false,
  },
  {
    key: 'avatar',
    label: 'User',
    render: (value: string, row: any) => {
      return React.createElement(
        'div',
        { className: 'flex items-center gap-3' },
        React.createElement(
          'div',
          {
            className: 'relative',
          },
          React.createElement(
            'div',
            {
              className:
                'h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700',
            },
            value && (value.startsWith('http') || value.startsWith('data:image'))
              ? React.createElement(Image, {
                  src: value,
                  alt: 'Avatar',
                  fill: true,
                  className: 'object-cover',
                })
              : React.createElement(
                  'div',
                  {
                    className:
                      'h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold',
                  },
                  row.name ? row.name.charAt(0).toUpperCase() : 'U'
                )
          ),
          // Online status indicator
          React.createElement('span', {
            className: `absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
              row.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
            }`,
          })
        ),
        React.createElement(
          'div',
          { className: 'flex flex-col min-w-0' },
          React.createElement(
            'span',
            {
              className: 'font-medium text-sm text-gray-900 dark:text-white truncate',
              title: row.name,
            },
            row.name
          ),
          React.createElement(
            'span',
            {
              className: 'text-xs text-gray-500 dark:text-gray-400 truncate',
              title: row.email,
            },
            row.email
          )
        )
      );
    },
  },
  {
    key: 'role',
    label: 'Role',
    render: (value: string) => {
      if (value === 'admin') {
        return React.createElement(
          'span',
          {
            className:
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
          },
          React.createElement(
            'svg',
            {
              className: 'w-3 h-3 mr-1',
              fill: 'currentColor',
              viewBox: '0 0 20 20',
            },
            React.createElement('path', {
              fillRule: 'evenodd',
              d: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
              clipRule: 'evenodd',
            })
          ),
          'Admin'
        );
      } else if (value === 'moderator') {
        return React.createElement(
          'span',
          {
            className:
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
          },
          React.createElement(
            'svg',
            {
              className: 'w-3 h-3 mr-1',
              fill: 'currentColor',
              viewBox: '0 0 20 20',
            },
            React.createElement('path', {
              fillRule: 'evenodd',
              d: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
              clipRule: 'evenodd',
            })
          ),
          'Moderator'
        );
      } else if (value === 'teacher') {
        return React.createElement(
          'span',
          {
            className:
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
          },
          React.createElement(
            'svg',
            {
              className: 'w-3 h-3 mr-1',
              fill: 'currentColor',
              viewBox: '0 0 20 20',
            },
            React.createElement('path', {
              d: 'M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z',
            })
          ),
          'Teacher'
        );
      } else if (value === 'staff') {
        return React.createElement(
          'span',
          {
            className:
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
          },
          React.createElement(
            'svg',
            {
              className: 'w-3 h-3 mr-1',
              fill: 'currentColor',
              viewBox: '0 0 20 20',
            },
            React.createElement('path', {
              fillRule: 'evenodd',
              d: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
              clipRule: 'evenodd',
            })
          ),
          'Staff'
        );
      } else {
        return React.createElement(
          'span',
          {
            className:
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
          },
          React.createElement(
            'svg',
            {
              className: 'w-3 h-3 mr-1',
              fill: 'currentColor',
              viewBox: '0 0 20 20',
            },
            React.createElement('path', {
              fillRule: 'evenodd',
              d: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
              clipRule: 'evenodd',
            })
          ),
          'User'
        );
      }
    },
  },
  {
    key: 'status',
    label: 'Status',
    render: (value: string) => {
      const isActive = value === 'active';
      return React.createElement(
        'span',
        {
          className:
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ' +
            (isActive
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'),
        },
        React.createElement('span', {
          className:
            'w-1.5 h-1.5 rounded-full mr-1.5 ' + (isActive ? 'bg-green-600' : 'bg-gray-600'),
        }),
        isActive ? 'Active' : 'Inactive'
      );
    },
  },
  {
    key: 'joined',
    label: 'Joined',
    render: (value: string) => {
      return React.createElement(
        'div',
        { className: 'flex items-center gap-2' },
        React.createElement(
          'div',
          {
            className:
              'flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800',
          },
          React.createElement(
            'svg',
            {
              className: 'w-4 h-4 text-green-600 dark:text-green-400',
              fill: 'none',
              stroke: 'currentColor',
              viewBox: '0 0 24 24',
            },
            React.createElement('path', {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 2,
              d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
            })
          )
        ),
        React.createElement(
          'div',
          { className: 'flex flex-col' },
          React.createElement(
            'span',
            { className: 'text-sm font-medium text-gray-900 dark:text-white' },
            value
          ),
          React.createElement(
            'span',
            { className: 'text-xs text-gray-500 dark:text-gray-400' },
            value
          )
        )
      );
    },
  },
  {
    key: 'edited',
    label: 'Last Edited',
    render: (value: string) => {
      return React.createElement(
        'div',
        { className: 'flex items-center gap-2' },
        React.createElement(
          'div',
          {
            className:
              'flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800',
          },
          React.createElement(
            'svg',
            {
              className: 'w-4 h-4 text-orange-600 dark:text-orange-400',
              fill: 'none',
              stroke: 'currentColor',
              viewBox: '0 0 24 24',
            },
            React.createElement('path', {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 2,
              d: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
            })
          )
        ),
        React.createElement(
          'div',
          { className: 'flex flex-col' },
          React.createElement(
            'span',
            { className: 'text-sm font-medium text-gray-900 dark:text-white' },
            value
          ),
          React.createElement(
            'span',
            { className: 'text-xs text-gray-500 dark:text-gray-400' },
            value
          )
        )
      );
    },
  },
];
