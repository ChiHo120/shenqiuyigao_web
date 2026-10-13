import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Search, Filter, Check, XCircle } from 'lucide-react'

interface ColumnConfig {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
  width?: string
}

interface AdminCrudProps {
  title: string
  columns: ColumnConfig[]
  items: any[]
  loading?: boolean
  searchFields?: string[]
  statusField?: string
  statusOptions?: { value: string; label: string; color: string }[]
  onEdit?: (row: any) => void
  onDelete?: (id: number) => void
  onToggleStatus?: (id: number, currentStatus: boolean) => void
  onAdd?: () => void
  renderDetail?: (row: any) => React.ReactNode
  renderForm?: (data: any, onSave: (data: any) => void, onCancel: () => void) => React.ReactNode
  selectedItem?: any
  isEditing?: boolean
  isCreating?: boolean
  error?: string
  successMessage?: string
}

export default function AdminCrud({
  title,
  columns,
  items,
  loading = false,
  searchFields = [],
  statusField,
  statusOptions = [],
  onEdit,
  onDelete,
  onToggleStatus,
  onAdd,
  renderDetail,
  renderForm,
  selectedItem,
  isEditing,
  isCreating,
  error = '',
  successMessage = '',
}: AdminCrudProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredItems = items.filter(item => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return searchFields.some(field => {
      const value = item[field]
      return value && String(value).toLowerCase().includes(term)
    })
  })

  const getStatusBadge = (status: string | boolean) => {
    if (typeof status === 'boolean') {
      return (
        <span className={`text-xs px-2 py-1 rounded-full ${status ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
          {status ? '已发布' : '草稿'}
        </span>
      )
    }
    
    const option = statusOptions.find(opt => opt.value === status)
    if (option) {
      return (
        <span className={`text-xs px-2 py-1 rounded-full ${option.color}`}>
          {option.label}
        </span>
      )
    }
    
    return <span className="text-xs text-gray-500">{status}</span>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
            {onAdd && (
              <button
                onClick={onAdd}
                className="flex items-center space-x-2 px-4 py-2 bg-school-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>添加</span>
              </button>
            )}
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-500 mb-4">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center space-x-2 text-green-500 mb-4">
              <Check className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-school-red focus:outline-none"
              />
            </div>
            {statusOptions.length > 0 && (
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:border-school-red focus:outline-none appearance-none bg-white"
                >
                  <option value="all">全部状态</option>
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-school-red">加载中...</div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无数据</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  {columns.map(col => (
                    <th key={col.key} className="pb-3" style={{ width: col.width }}>
                      {col.label}
                    </th>
                  ))}
                  <th className="pb-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                    {columns.map(col => (
                      <td key={col.key} className="py-3 text-sm">
                        {col.render ? col.render(item[col.key], item) : (
                          col.key === statusField ? getStatusBadge(item[col.key]) : item[col.key]
                        )}
                      </td>
                    ))}
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        {renderDetail && (
                          <button
                            onClick={() => renderDetail(item)}
                            className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                            title="查看详情"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1 text-gray-500 hover:bg-gray-50 rounded transition-colors"
                            title="编辑"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {statusField === 'is_published' && onToggleStatus && (
                          <button
                            onClick={() => onToggleStatus(item.id, item.is_published)}
                            className={`p-1 rounded transition-colors ${item.is_published ? 'text-green-500 hover:bg-green-50' : 'text-yellow-500 hover:bg-yellow-50'}`}
                            title={item.is_published ? '设为草稿' : '发布'}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="lg:col-span-1">
        {(isEditing || isCreating) && renderForm && selectedItem && (
          <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800">
                {isEditing ? '编辑' : '添加'}
              </h4>
            </div>
            {renderForm(selectedItem, () => {}, () => {})}
          </div>
        )}
      </div>
    </div>
  )
}
