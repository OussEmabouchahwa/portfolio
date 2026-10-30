import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dgbw7vqfo',
  api_key: process.env.CLOUDINARY_API_KEY || '566929444877999',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'b3i5sQV06GrKky3eBoP79ZIS-YI',
  secure: true,
})

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const isVideo = file.type.startsWith('video/')
    const resourceType = isVideo ? 'video' : 'auto'

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio',
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(buffer)
    })

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      resourceType: uploadResult.resource_type,
      duration: uploadResult.duration,
      width: uploadResult.width,
      height: uploadResult.height,
    })
  } catch (error: any) {
    console.error('Cloudinary upload error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to upload file to Cloudinary' },
      { status: 500 }
    )
  }
}
