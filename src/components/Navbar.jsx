import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import zorphixLogo from '../assets/zorphix-logo.png'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsub()
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' }
  ]

  const stockTickerItems = [
    { symbol: 'CSBS', value: '+24.5%', up: true },
    { symbol: 'TECH', value: '+12.8%', up: true },
    { symbol: 'INNO', value: '+8.4%', up: true },
    { symbol: 'CODE', value: '-2.1%', up: false },
    { symbol: 'DATA', value: '+15.3%', up: true },
    { symbol: 'ALGO', value: '+32.7%', up: true },
    { symbol: 'NETW', value: '-0.5%', up: false },
    { symbol: 'SYMP', value: '+100%', up: true },
    { symbol: 'FUTR', value: '+45.2%', up: true },
    { symbol: 'AI', value: '+67.9%', up: true }
  ]

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/register')
  }

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              src={zorphixLogo}
              alt="Zorphix Logo"
              className="w-8 h-8 drop-shadow-[0_0_10px_rgba(227,62,51,0.5)]"
            />
            <span className="text-white font-bold text-xl tracking-wider">
              ZORPHIX
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-300 hover:text-white font-mono uppercase text-sm tracking-wider relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#e33e33] to-[#97b85d] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* ✅ PROFILE (only after login) */}
            {user && (
              <Link
                to="/profile"
                className="text-gray-300 hover:text-white font-mono uppercase text-sm tracking-wider relative group"
              >
                Profile
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#e33e33] to-[#97b85d] group-hover:w-full transition-all duration-300" />
              </Link>
            )}

            {!user ? (
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-[#e33e33] to-[#97b85d] text-white font-mono uppercase text-sm font-bold rounded-lg"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-6 py-2 border border-[#e33e33] text-[#e33e33] font-mono uppercase text-sm font-bold rounded-lg hover:bg-[#e33e33] hover:text-black transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white p-2"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[105]"
          onClick={toggleSidebar}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black z-[110] transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={toggleSidebar}
              className="block text-gray-300 uppercase font-mono"
            >
              {link.name}
            </Link>
          ))}

          {/* ✅ PROFILE (mobile) */}
          {user && (
            <Link
              to="/profile"
              onClick={toggleSidebar}
              className="block text-gray-300 uppercase font-mono"
            >
              Profile
            </Link>
          )}

          {!user ? (
            <Link
              to="/register"
              onClick={toggleSidebar}
              className="block mt-4 px-4 py-3 bg-gradient-to-r from-[#e33e33] to-[#97b85d] text-white text-center rounded"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout()
                toggleSidebar()
              }}
              className="block mt-4 w-full px-4 py-3 border border-[#e33e33] text-[#e33e33] rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* ================= TICKER ================= */}
      <div className="fixed top-16 w-full bg-black/80 z-50 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap text-xs font-mono">
          {stockTickerItems.map((item, i) => (
            <span key={i} className="mx-4">
              <span className="text-gray-400">{item.symbol}</span>
              <span className={item.up ? 'text-[#97b85d]' : 'text-[#e33e33]'}>
                {' '}
                {item.value}
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
