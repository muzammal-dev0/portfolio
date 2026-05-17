import { useMemo, useState } from 'react'
import { PROFILE_IMAGE_CANDIDATES } from '../constants/profileImage'

/**
 * Renders public/images/profile.{jpg|jpeg|png|webp} (any supported extension/casing).
 */
const ProfileImage = ({
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
}) => {
  const candidates = useMemo(() => PROFILE_IMAGE_CANDIDATES, [])
  const [index, setIndex] = useState(0)

  const handleError = () => {
    setIndex((current) => (current < candidates.length - 1 ? current + 1 : current))
  }

  return (
    <img
      src={candidates[index]}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      onError={handleError}
    />
  )
}

export default ProfileImage
