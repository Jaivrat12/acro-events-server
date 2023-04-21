const { uploadImages } = require('./cloudinary');

const uploadEventImages = async (images, folder) => {

    if (!(images instanceof Array)) {
        images = [images];
    }

    return (
        await uploadImages(images, folder)
    ).map((image) => ({
        _id: image.public_id,
        url: image.secure_url,
    }));
};

module.exports = {
    uploadEventImages,
};