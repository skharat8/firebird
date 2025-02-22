import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

type UploadApiResponseUrl = string | string[] | undefined;

function isMulterFileArray(x: unknown): x is Express.Multer.File[] {
  return (
    // @ts-expect-error Figure out how to fix this later
    Array.isArray(x) && (x as Express.Multer.File[])[0].mimetype !== undefined
  );
}

async function deleteFile(imageUrl: string | undefined) {
  if (imageUrl) {
    // Example URL: https://res.cloudinary.com/image/upload/{imageId}.png
    const lastUrlSegment = imageUrl.split("/").pop();
    const imageId = lastUrlSegment?.split(".")[0];
    await cloudinary.uploader.destroy(imageId!);
  }
}

async function uploadFile(
  fileBuffer: Buffer,
  oldImageUrl?: string,
  options = {}
): Promise<UploadApiResponse> {
  if (oldImageUrl) {
    // Remove older image stored in the cloud to save storage space
    await deleteFile(oldImageUrl);
  }

  // Upload new image
  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (err, result) => {
        if (err ?? !result) {
          reject(err);
        } else {
          resolve(result);
        }
      })
      .end(fileBuffer);
  });
}

async function uploadFiles(
  files: Express.Multer.File[],
  oldImageUrls: string | string[],
  options = {}
): Promise<UploadApiResponseUrl> {
  const uploadPromises = files.map(async (file, index) => {
    // Remove older image stored in the cloud to save storage space
    const oldImageUrl = Array.isArray(oldImageUrls)
      ? oldImageUrls[index]
      : oldImageUrls;

    return uploadFile(file.buffer, oldImageUrl, options);
  });

  const responses = await Promise.all(uploadPromises);
  return responses.map(response => response.secure_url);
}

export type { UploadApiResponseUrl };
export { isMulterFileArray, deleteFile, uploadFile, uploadFiles };
