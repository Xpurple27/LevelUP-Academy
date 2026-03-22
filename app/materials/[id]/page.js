'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { useParams } from 'next/navigation'

export default function DetailMaterial() {
  const { id } = useParams()

  const [material, setMaterial] = useState(null)
  const [role, setRole] = useState('')
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      // ambil user
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      // ambil role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      setRole(profile.role)

      // ambil materi
      const { data: materialData } = await supabase
        .from('materials')
        .select('*')
        .eq('id', id)
        .single()

      setMaterial(materialData)

      // cek progress
      const { data: progressData } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('material_id', id)
        .single()

      if (progressData) {
        setCompleted(progressData.is_completed)
      }
    }

    fetchData()
  }, [id])

  const handleComplete = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    await supabase.from('progress').upsert({
      user_id: user.id,
      material_id: id,
      is_completed: true
    })

    setCompleted(true)
  }

  if (!material) return <p>Loading...</p>

  const isLocked =
    material.is_premium && role !== 'premium'

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">
        {material.title}
      </h1>

      {isLocked ? (
        <p className="text-red-500">
          🔒 Materi Premium Terkunci
        </p>
      ) : (
        <>
          <p className="my-4">{material.content}</p>

          {completed ? (
            <p className="text-green-600">
              ✅ Sudah diselesaikan
            </p>
          ) : (
            <button
              onClick={handleComplete}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Tandai Selesai
            </button>
          )}
        </>
      )}
    </div>
  )
}