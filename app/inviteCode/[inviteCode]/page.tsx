// app/inviteCode/[inviteCode]/page.tsx
'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function JoinRoomPage() {
  const { inviteCode } = useParams()  // Using useParams to get the inviteCode
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleJoin = async () => {
    if (!inviteCode || !nickname) {
      setError('Nickname and invite code are required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/invite/${inviteCode}`, {
        method: 'POST',
        body: JSON.stringify({ nickname }),
        headers: { 'Content-Type': 'application/json' }
      })

      // Log the raw response body before attempting to parse it
      const responseText = await res.text() // Use .text() instead of .json() for debugging
      console.log('Raw response:', responseText)

      // Check if the response is OK (status code 200-299)
      if (!res.ok) {
        const errorMessage = responseText || 'Something went wrong'
        setError(errorMessage)
        return
      }

      // If the response is OK, parse the response as JSON
      const data = responseText ? JSON.parse(responseText) : null

      // Do something with the data (e.g., navigate to the room)
      if (data) {
        router.push(`/rooms/${inviteCode}`)
      } else {
        setError('No data received from the server')
      }
    } catch (err) {
      console.error('Error during fetch:', err) // Log the error for debugging
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Join Room</h1>
      <input
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleJoin} disabled={loading || !nickname}>
        {loading ? 'Joining...' : 'Join Room'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
