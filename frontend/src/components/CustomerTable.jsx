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

export default function CustomerTable({ customers, onEdit, onDelete }) {
  if (!customers.length) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">No customers yet</p>
        <p className="empty-state__text">
          Add your first customer to see them listed here.
        </p>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Status</th>
            <th>Created</th>
            <th className="data-table__actions-col">Actions</th>
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
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => onEdit(customer)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm btn--danger"
                  onClick={() => onDelete(customer)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
