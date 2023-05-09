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

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'product-images',
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
      // transforming image to fit square format with 275x275 px size
      transformation: [
        {
          aspect_ratio: '1:1',
          width: 275,
          height: 275,
          // crop parameter means that the image will be resized to fill the given dimensions
          crop: 'fill',
          //gravity parameter is used to determine the focal point or the area of interest within an image when cropping, resizing, or applying certain transformations
          gravity: 'auto',
        },
      ],
      upload_preset: 'unsigned_upload',
    }
  },
})
const imageUpload = multer({ storage: imageStorage })
const avatarUpload = multer({ storage: avatarStorage })

export { avatarUpload, imageUpload }
