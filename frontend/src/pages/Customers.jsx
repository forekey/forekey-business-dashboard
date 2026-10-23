import { useCallback, useEffect, useState } from 'react'
import CustomerForm, { customerToForm } from '../components/CustomerForm'
import CustomerTable, { CUSTOMERS_PAGE_SIZE } from '../components/CustomerTable'
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
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortKey, setSortKey] = useState('company')
  const [sortDir, setSortDir] = useState('desc')
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
      const data = await fetchCustomers({
        page,
        per_page: CUSTOMERS_PAGE_SIZE,
        sort: sortKey,
        direction: sortDir,
        search: search.trim() || undefined,
      })
      const lastPage = Math.max(1, data.last_page ?? 1)
      if (page > lastPage) {
        setPage(lastPage)
        return
      }
      setCustomers(data.data ?? [])
      setTotalPages(lastPage)
    } catch (err) {
      setCustomers([])
      setTotalPages(1)
      setError(getErrorMessage(err, 'Could not load customers.'))
    } finally {
      setLoading(false)
    }
  }, [page, sortKey, sortDir, search])

  useEffect(() => {
    load()
  }, [load])

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

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

  const hasSearch = search.trim().length > 0

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
          onChange={handleSearchChange}
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
          customers={customers}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyTitle={hasSearch ? 'No matching customers' : 'No customers yet'}
          emptyText={
            hasSearch
              ? 'Try a different search term or clear the search box.'
              : 'Add your first customer to see them listed here.'
          }
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
