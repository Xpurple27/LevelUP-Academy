'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Materials() {
  const [materials, setMaterials] = useState([])
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      // 1. Ambil user
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      // 2. Ambil role user
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      setRole(profile.role)

      // 3. Ambil semua materi
      const { data: materialsData } = await supabase
        .from('materials')
        .select('*')

      setMaterials(materialsData)
    }

    fetchData()
  }, [])

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Daftar Materi</h1>

      {materials.map((item) => {
        const isLocked =
          item.is_premium && role !== 'premium'

        return (
          <div
  key={item.id}
  className="bg-white border border-gray-200 p-5 my-3 rounded-xl shadow-sm hover:shadow-md transition"
>
  <h2 className="font-semibold text-lg text-gray-800">
    <a href={`/materials/${item.id}`}>
      {item.title}
    </a>
  </h2>

  {isLocked ? (
    <p className="text-red-500 mt-2">
      🔒 Premium
    </p>
  ) : (
    <p className="mt-2 text-gray-600">
      {item.content}
    </p>
  )}
</div>
        )
      })}
    </div>
  )
}