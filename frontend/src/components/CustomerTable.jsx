export const CUSTOMERS_PAGE_SIZE = 7

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'company', label: 'Company' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Created' },
]

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function initials(name, company) {
  const source = company || name || '?'
  const parts = source.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return source.slice(0, 2).toUpperCase()
}

function IconTrash() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconPencil() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m16.5 5.5-2-2a2.1 2.1 0 0 0-3 0L6 9l-1 4 4-1 5.5-5.5a2.1 2.1 0 0 0 0-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7l2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SortableHeader({ label, columnKey, sortKey, sortDir, onSort }) {
  const isActive = sortKey === columnKey
  return (
    <th scope="col">
      <button
        type="button"
        className={`data-table__sort${isActive ? ' data-table__sort--active' : ''}`}
        onClick={() => onSort(columnKey)}
        aria-sort={
          isActive
            ? sortDir === 'asc'
              ? 'ascending'
              : 'descending'
            : 'none'
        }
      >
        <span>{label}</span>
        {isActive ? (
          <span className="data-table__sort-icon" aria-hidden="true">
            {sortDir === 'asc' ? '↑' : '↓'}
          </span>
        ) : null}
      </button>
    </th>
  )
}

export default function CustomerTable({
  customers,
  sortKey,
  sortDir,
  onSort,
  page,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  emptyTitle = 'No customers yet',
  emptyText = 'Add your first customer to see them listed here.',
}) {
  const safePage = Math.min(page, totalPages)

  const handleSort = (key) => {
    onSort(key)
  }

  if (!customers.length) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">{emptyTitle}</p>
        <p className="empty-state__text">{emptyText}</p>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <SortableHeader
                key={col.key}
                label={col.label}
                columnKey={col.key}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
              />
            ))}
            <th scope="col" className="data-table__actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className="cell-user">
                  <span className="cell-user__avatar" aria-hidden="true">
                    {initials(customer.name, customer.company)}
                  </span>
                  <span>{customer.name}</span>
                </div>
              </td>
              <td>{customer.email}</td>
              <td>{customer.phone || '—'}</td>
              <td>{customer.company || '—'}</td>
              <td>
                <span
                  className={`badge badge--${customer.status === 'active' ? 'success' : 'muted'}`}
                >
                  {customer.status}
                </span>
              </td>
              <td>{formatDate(customer.created_at)}</td>
              <td className="data-table__actions">
                <div className="data-table__actions-inner">
                  <button
                    type="button"
                    className="btn btn--icon"
                    onClick={() => onDelete(customer)}
                    aria-label={`Delete ${customer.name}`}
                  >
                    <IconTrash />
                  </button>
                  <button
                    type="button"
                    className="btn btn--icon"
                    onClick={() => onEdit(customer)}
                    aria-label={`Edit ${customer.name}`}
                  >
                    <IconPencil />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="table-pagination">
        <button
          type="button"
          className="btn btn--secondary btn--sm"
          onClick={() => onPageChange(Math.max(1, safePage - 1))}
          disabled={safePage <= 1}
        >
          Previous
        </button>
        <span className="table-pagination__label">
          Page {safePage} of {totalPages}
        </span>
        <button
          type="button"
          className="btn btn--secondary btn--sm"
          onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
          disabled={safePage >= totalPages}
        >
          Next
        </button>
      </footer>
    </div>
  )
}
