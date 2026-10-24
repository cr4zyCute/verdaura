import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  searchPlaceholder?: string;
  filterColumnId?: string;
  filterOptions?: { label: string; value: string }[];
  actions?: React.ReactNode;
}

export function DataTable<TData>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  filterColumnId,
  filterOptions,
  actions,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter data if category/status filter is selected
  const filteredData = React.useMemo(() => {
    if (!filterColumnId || selectedFilter === 'all') return data;
    return data.filter((item: any) => String(item[filterColumnId]) === selectedFilter);
  }, [data, filterColumnId, selectedFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden flex flex-col">
      {/* Table Toolbar */}
      <div className="p-4 sm:p-5 border-b border-sand-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FCFAF7]">
        <div className="flex flex-1 items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-sand-300 text-charcoal placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
            />
          </div>

          {/* Optional Filter Dropdown */}
          {filterColumnId && filterOptions && (
            <div className="relative flex items-center">
              <Filter className="w-3.5 h-3.5 text-charcoal-500 absolute left-3 pointer-events-none" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="pl-8 pr-6 py-2 rounded-xl text-xs bg-white border border-sand-300 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest appearance-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto min-h-[320px]">
        <table className="w-full text-left text-xs">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-sand-200 bg-[#FAF7F2]/80">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className={`px-4 sm:px-6 py-3 font-semibold text-forest-950 uppercase tracking-wider text-[11px] select-none ${
                        canSort ? 'cursor-pointer hover:bg-sand-100/60' : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1.5">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span className="text-charcoal-400">
                            {isSorted === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-forest" />
                            ) : isSorted === 'desc' ? (
                              <ChevronDown className="w-3.5 h-3.5 text-forest" />
                            ) : (
                              <ChevronsUpDown className="w-3.5 h-3.5" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-sand-200/60">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-sand-50/70 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 sm:px-6 py-3.5 text-charcoal-800">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-charcoal-500 font-serif text-sm"
                >
                  No matching botanical records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-sand-200 bg-[#FCFAF7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-600">
        <div>
          Showing{' '}
          <span className="font-semibold text-forest-900">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
              (table.getRowModel().rows.length > 0 ? 1 : 0)}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-forest-900">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              filteredData.length
            )}
          </span>{' '}
          of <span className="font-semibold text-forest-900">{filteredData.length}</span> entries
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 rounded-lg border border-sand-300 text-charcoal hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs px-2 font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount() || 1}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1.5 rounded-lg border border-sand-300 text-charcoal hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
