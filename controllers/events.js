const Event = require('../models/Event');
const { uploadEventImages } = require('../utils');
const { deleteImageFolder, deleteImages } = require('../utils/cloudinary');

const getEvents = async (req, res) => {

    // const filters = req.query;

    try {
        const events = await Event.find();
        res.status(200).json({ success: true, events });
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
};

const getEventById = async (req, res) => {

    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.status(200).json({ success: true, event });
        } else {
            res.status(404).json({ success: false, error: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

const createEvent = async (req, res) => {

    try {

        const event = await Event.create(req.body);

        if (req.files?.images) {

            event.images = await uploadEventImages(
                req.files.images,
                `acro-events/${ event._id }/`
            );
            await event.save();
        }

        res.status(201).json({ success: true, event });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

const updateEvent = async (req, res) => {

    try {

        const event = await Event.findById(req.params.id);
        if (event) {

            req.body.images = JSON.parse(req.body.images);

            const imageIds = new Set(req.body.images.map((image) => image._id));
            const deletedImageIds = event.images
                .map((image) => image._id)
                .filter((imageId) => !imageIds.has(imageId));

            if (deletedImageIds.length > 0) {
                deleteImages(deletedImageIds).catch(console.log);
            }

            if (req.files?.newImages) {

                const eventImages = await uploadEventImages(
                    req.files.newImages,
                    `acro-events/${ event._id }/`
                );
                req.body.images.push(...eventImages);
            }

            event.set(req.body);
            await event.save();

            res.status(200).json({ success: true, event });
        } else {
            res.status(404).json({ success: false, error: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};

const deleteEvent = async (req, res) => {

    try {

        const event = await Event.findByIdAndDelete(req.params.id);
        if (event) {

            res.status(200).json({ success: true, event });

            if (event.images.length > 0) {
                deleteImageFolder(`acro-events/${ event._id }/`)
                    .catch(console.log);
            }
        } else {
            res.status(404).json({ success: false, error: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};