const cloudinary = require('cloudinary').v2;

const uploadImages = async (images, folder) => {

    return await Promise.all(images.map(async (image) => {

        const result = await cloudinary.uploader.upload(
            image.tempFilePath,
            { folder }
        );
        return result;
    }));
};

const deleteImages = async (imageIds) => {
    return await cloudinary.api.delete_resources(imageIds);
};

const deleteImageFolder = async (folder) => {
    await cloudinary.api.delete_resources_by_prefix(folder);
    cloudinary.api.delete_folder(folder);
};

module.exports = {
    uploadImages,
    deleteImages,
    deleteImageFolder,
};