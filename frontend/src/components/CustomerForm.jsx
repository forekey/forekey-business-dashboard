const emptyForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'active',
}

export function customerToForm(customer) {
  if (!customer) return { ...emptyForm }
  return {
    name: customer.name ?? '',
    email: customer.email ?? '',
    phone: customer.phone ?? '',
    company: customer.company ?? '',
    status: customer.status ?? 'active',
  }
}

export default function CustomerForm({
  form,
  fieldErrors,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
  loading,
}) {
  const err = (field) => fieldErrors?.[field]?.[0]

  return (
    <form className="customer-form" onSubmit={onSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="customer-name">Name</label>
        <input
          id="customer-name"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          autoComplete="name"
        />
        {err('name') ? <p className="form-error">{err('name')}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="customer-email">Email</label>
        <input
          id="customer-email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          autoComplete="email"
        />
        {err('email') ? <p className="form-error">{err('email')}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="customer-phone">Phone</label>
        <input
          id="customer-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          autoComplete="tel"
        />
        {err('phone') ? <p className="form-error">{err('phone')}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="customer-company">Company</label>
        <input
          id="customer-company"
          name="company"
          value={form.company}
          onChange={onChange}
          autoComplete="organization"
        />
        {err('company') ? <p className="form-error">{err('company')}</p> : null}
      </div>

      <div className="form-field">
        <label htmlFor="customer-status">Status</label>
        <select
          id="customer-status"
          name="status"
          value={form.status}
          onChange={onChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {err('status') ? <p className="form-error">{err('status')}</p> : null}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
