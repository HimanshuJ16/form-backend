import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(file: File, folder = "form-submissions") {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
          public_id: `${Date.now()}-${file.name}`,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )

      uploadStream.end(buffer)
    })
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw error
  }
}

export function getCloudinaryUrl(publicId: string, options: Record<string, any> = {}) {
  return cloudinary.url(publicId, {
    secure: true,
    ...options,
  })
}
