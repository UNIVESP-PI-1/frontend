import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

const DataTable = ({ columns, data, loading, itemsPerPage = 3 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calc Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-b-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-primary text-gray-50 text-xs uppercase font-semibold tracking-wider">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={columns.length} className="px-6 py-6 bg-gray-50/50"></td>
                </tr>
              ))
            ) : currentData.length > 0 ? (
              currentData.map((item, rowIdx) => (
                <tr key={item.id || rowIdx} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : ''}`}>
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-20 text-center text-gray-400">
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER PAGINATION */}
      {!loading && data.length > itemsPerPage && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">
            Mostrando <span className="text-gray-900">{startIndex + 1}</span> a <span className="text-gray-900">{Math.min(endIndex, data.length)}</span> de <span className="text-gray-900">{data.length}</span> registros
          </span>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="px-2 py-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <ChevronLeft size={18} />
            </Button>
            
            <div className="flex items-center px-4 text-sm font-semibold text-gray-700">
              Página {currentPage} de {totalPages}
            </div>

            <Button
              variant="outline"
              className="px-2 py-1"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
