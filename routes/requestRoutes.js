const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { authenticate, checkAdmin } = require('../middlewares/auth');

router.post('/', authenticate, requestController.createRequest);
router.get('/', authenticate, requestController.getRequests);
router.put('/:id', authenticate, checkAdmin, requestController.updateRequest);
router.delete('/:id', authenticate, checkAdmin, requestController.deleteRequest);

module.exports = router;
