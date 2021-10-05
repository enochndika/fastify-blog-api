import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function cloudinaryUpload(file: string) {
  try {
    const data = await cloudinary?.v2.uploader.upload(file, {
      folder: 'Issou',
    });
    return {
      url: data?.secure_url,
      public_id: data?.public_id,
    };
  } catch (e) {
    throw e;
  }
}

export default cloudinaryUpload;
