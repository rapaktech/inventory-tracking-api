const express = require('express');
const { inventoryController } = require('../../controllers');

const router = express.Router();

router.route('/add').post(inventoryController.add);
router.route('/').get(inventoryController.getAll);
router.route('/get').get(inventoryController.getOne);
router.route('/update').put(inventoryController.update);
router.route('/delete').delete(inventoryController.delete);
router.route('/undelete').patch(inventoryController.undelete);