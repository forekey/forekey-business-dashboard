import { useCallback, useEffect, useState } from 'react'
import CustomerForm, { customerToForm } from '../components/CustomerForm'
import CustomerTable from '../components/CustomerTable'
import Modal from '../components/Modal'
import {
  createCustomer,
  deleteCustomer,
  fetchCustomers,
  getErrorMessage,
  getValidationErrors,
  updateCustomer,
} from '../services/api'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(customerToForm())
  const [fieldErrors, setFieldErrors] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchCustomers()
      setCustomers(data)
    } catch (err) {
      setCustomers([])
      setError(getErrorMessage(err, 'Could not load customers.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const openCreate = () => {
    setEditing(null)
    setForm(customerToForm())
    setFieldErrors(null)
    setFormError('')
    setModalOpen(true)
  }

  const openEdit = (customer) => {
    setEditing(customer)
    setForm(customerToForm(customer))
    setFieldErrors(null)
    setFormError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    if (saving) return
    setModalOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFieldErrors(null)
    setFormError('')
    try {
      if (editing) {
        await updateCustomer(editing.id, form)
      } else {
        await createCustomer(form)
      }
      setModalOpen(false)
      await load()
    } catch (err) {
      setFieldErrors(getValidationErrors(err))
      setFormError(getErrorMessage(err, 'Could not save customer.'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (customer) => {
    const ok = window.confirm(
      `Delete ${customer.name}? This action cannot be undone.`,
    )
    if (!ok) return
    try {
      await deleteCustomer(customer.id)
      await load()
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete customer.'))
    }
  }

  const q = search.trim().toLowerCase()
  const filtered = q
    ? customers.filter((c) =>
        [c.name, c.email, c.company]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(q)),
      )
    : customers

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Customers</h1>
          <p className="page-header__subtitle">Manage your customer records</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openCreate}>
          + Add customer
        </button>
      </header>

      <div className="toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search name, email, or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search customers"
        />
      </div>

      {loading ? <p className="status-message">Loading customers…</p> : null}
      {error ? (
        <div className="alert alert--error" role="alert">
          {error}
        </div>
      ) : null}

      {!loading && !error ? (
        <CustomerTable
          customers={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      ) : null}

      {modalOpen ? (
        <Modal
          title={editing ? 'Edit customer' : 'Add customer'}
          onClose={closeModal}
        >
          {formError ? (
            <div className="alert alert--error" role="alert">{formError}</div>
          ) : null}
          <CustomerForm
            form={form}
            fieldErrors={fieldErrors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            submitLabel={editing ? 'Save changes' : 'Create customer'}
            loading={saving}
          />
        </Modal>
      ) : null}
    </div>
  )
}
