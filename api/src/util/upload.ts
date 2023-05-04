import multer from 'multer'
import cloudinary from '../config/cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'customers-avatars',
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
      // transforming image to fit circle avatar formart with 150x150 px size
      transformation: [
        {
          aspect_ratio: '1:1',
          width: 150,
          height: 150,
          crop: 'fill',
          gravity: 'face',
          radius: 'max',
        },
      ],
      upload_preset: 'unsigned_upload',
    }
  },
})

const avatarUpload = multer({ storage: avatarStorage })

export { avatarUpload }
