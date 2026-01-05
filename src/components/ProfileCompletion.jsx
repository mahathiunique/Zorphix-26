import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { FaUser, FaPhone, FaUniversity, FaBriefcase } from 'react-icons/fa'

const ProfileCompletion = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    college: '',
    department: '',
    year: '1'
  })

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate('/register')
      else {
        setUser(u)
        setForm((prev) => ({ ...prev, name: u.displayName || '' }))
      }
      setLoading(false)
    })
    return () => unsub()
  }, [navigate])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const isFormValid = Object.values(form).every(Boolean)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user || !isFormValid) return

    setSaving(true)
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      ...form,
      profileCompleted: true,
      createdAt: new Date()
    })

    navigate('/')
  }

  if (loading) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#0d0d0d] border border-[#e33e33]/40 rounded-2xl p-10 space-y-7
                   shadow-[0_0_40px_rgba(227,62,51,0.15)]
                   animate-[fadeIn_0.6s_ease-out]"
      >
        {/* USER HEADER */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user?.photoURL}
            alt="profile"
            className="w-14 h-14 rounded-full border-2 border-[#e33e33]
                       hover:scale-105 transition-transform duration-300"
          />
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide">
              {user?.displayName}
            </h2>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>

        <h3 className="text-[#e33e33] uppercase tracking-widest text-sm">
          Complete Your Profile
        </h3>

        {/* INPUT FIELD TEMPLATE */}
        {[
          { label: 'Name', name: 'name', icon: <FaUser /> },
          { label: 'Phone Number', name: 'phone', icon: <FaPhone />, type: 'tel' },
          { label: 'College', name: 'college', icon: <FaUniversity /> },
          { label: 'Department', name: 'department', icon: <FaBriefcase /> }
        ].map((field) => (
          <div key={field.name}>
            <label className="text-xs text-[#e33e33] uppercase">
              {field.label}
            </label>
            <div className="flex items-center border-b border-gray-700
                            focus-within:border-[#e33e33]
                            transition-colors duration-300">
              <span className="text-gray-500 mr-2">{field.icon}</span>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full bg-transparent py-2 outline-none
                           focus:text-white transition-all"
              />
            </div>
          </div>
        ))}

        {/* YEAR */}
        <div>
          <label className="text-xs text-[#e33e33] uppercase">Year</label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 py-2 mt-1
                       focus:border-[#e33e33] transition-colors"
          >
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={!isFormValid || saving}
          className={`w-full mt-6 py-3 font-bold uppercase tracking-widest rounded
            transition-all duration-300
            ${
              isFormValid
                ? 'bg-gradient-to-r from-[#e33e33] to-[#97b85d] hover:scale-[1.02]'
                : 'bg-gray-700 cursor-not-allowed'
            }`}
        >
          {saving ? 'Saving Profile...' : 'Complete Profile'}
        </button>
      </form>

      {/* ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default ProfileCompletion
