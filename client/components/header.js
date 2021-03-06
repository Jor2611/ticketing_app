import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'SignUp', href: '/auth/signup' },
    !currentUser && { label: 'SignIn', href: '/auth/signin' },
    currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
    currentUser && { label: 'My orders', href: '/orders' },
    currentUser && { label: 'SignOut', href: '/auth/signout' },
  ]
  .filter(linkConfig => linkConfig)
  .map(({label, href},i) => {
    return (
      <li key={i} className="nav-item">
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    )
  })
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>

    </nav>
  )
}

export default Header;