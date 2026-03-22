import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      
      <div className="flex items-center gap-3">
        <img src="/levelup-academy/public/logolevelup.jpeg" alt="logo" className="w-10 h-10" />
        <h1 className="font-bold text-lg text-gray-800">
          Level Up Academy
        </h1>
      </div>

      <div className="flex gap-6 text-gray-600">
        <Link href="/dashboard" className="hover:text-red-500">
          Dashboard
        </Link>
        <Link href="/materials" className="hover:text-red-500">
          Materi
        </Link>
      </div>

    </div>
  )
}