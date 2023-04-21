const { Router } = require('express');
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/events');
const { isAuth } = require('../middlewares/auth');

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', /* isAuth, */ createEvent);
router.put('/:id', /* isAuth, */ updateEvent);
router.delete('/:id', /* isAuth, */ deleteEvent);

module.exports = router;