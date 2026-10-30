/**
 * Utility to upload files (images & videos) directly to Cloudinary via Next.js API route
 */
export async function uploadToCloudinary(file: File): Promise<{
  url: string
  resourceType: 'image' | 'video' | string
  duration?: number
  width?: number
  height?: number
}> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}))
    throw new Error(errorJson.error || 'Cloudinary upload failed')
  }

  const data = await response.json()
  return {
    url: data.url,
    resourceType: data.resourceType,
    duration: data.duration,
    width: data.width,
    height: data.height,
  }
}
