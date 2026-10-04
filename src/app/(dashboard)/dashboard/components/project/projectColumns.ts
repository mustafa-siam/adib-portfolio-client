import { Column } from '@/providers/TableProvider';
import Image from 'next/image';
import React from 'react';

export const projectColumns: Column[] = [
  {
    key: 'serialNo',
    label: 'No.',
    className: 'w-16',
    sortable: false,
  },

  {
    key: 'poster',
    label: 'Project',
    render: (value: string, row: any) => {
      return React.createElement(
        'div',
        { className: 'flex items-center gap-3 min-w-0' },

        React.createElement(
          'div',
          {
            className:
              'relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-muted',
          },
          React.createElement(Image, {
            src: value || '/placeholder.png',
            alt: row.title || 'Project poster',
            fill: true,
            className: 'object-cover',
            sizes: '64px',
          })
        ),

        React.createElement(
          'div',
          { className: 'min-w-0' },

          React.createElement(
            'p',
            {
              className: 'truncate text-sm font-medium text-foreground',
              title: row.title,
            },
            row.title
          ),

          React.createElement(
            'p',
            {
              className: 'truncate text-xs text-muted-foreground',
              title: row.slug,
            },
            `/${row.slug}`
          )
        )
      );
    },
  },

  {
    key: 'category',
    label: 'Category',
    render: (value: string) => {
      return React.createElement(
        'span',
        {
          className:
            'inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        },
        value
      );
    },
  },

  {
    key: 'tags',
    label: 'Tags',
    render: (tags: string[]) => {
      if (!tags || tags.length === 0) {
        return React.createElement('span', { className: 'text-xs text-muted-foreground' }, '—');
      }

      return React.createElement(
        'div',
        { className: 'flex flex-wrap gap-1 max-w-[200px]' },
        tags.slice(0, 3).map((tag, idx) =>
          React.createElement(
            'span',
            {
              key: idx,
              className:
                'inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-normal text-secondary-foreground',
            },
            tag
          )
        ),
        tags.length > 3
          ? React.createElement(
              'span',
              { className: 'text-xs text-muted-foreground self-center' },
              `+${tags.length - 3}`
            )
          : null
      );
    },
  },

  {
    key: 'isFeatured',
    label: 'Featured',
    render: (isFeatured: boolean) => {
      return isFeatured
        ? React.createElement(
            'span',
            {
              className:
                'inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
            },
            'Featured'
          )
        : React.createElement(
            'span',
            { className: 'text-xs text-muted-foreground' },
            'Standard'
          );
    },
  },

  {
    key: 'createdAt',
    label: 'Created At',
    render: (value: string) =>
      value
        ? React.createElement(
            'span',
            { className: 'text-xs text-muted-foreground' },
            new Date(value).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          )
        : React.createElement('span', { className: 'text-xs text-muted-foreground' }, '—'),
  },
];