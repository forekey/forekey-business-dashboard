import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/customers', label: 'Customers' },
]

export default function Sidebar({ id, isOpen, onClose }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <aside
      id={id}
      className={`sidebar${isOpen ? ' sidebar--open' : ''}`}
      aria-hidden={isMobile && !isOpen ? true : undefined}
    >
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">F</span>
        <div>
          <div className="sidebar__title">Forekey</div>
          <div className="sidebar__subtitle">Business Dashboard</div>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Main">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
            onClick={onClose}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <span className="sidebar__avatar" aria-hidden="true">FS</span>
          <div>
            <div className="sidebar__user-name">Frankie Sullivan</div>
            <div className="sidebar__user-handle">@frankie</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
