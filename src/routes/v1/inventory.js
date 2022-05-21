const express = require('express');
const { inventoryController } = require('../../controllers');

const router = express.Router();

router.route('/add').post(inventoryController.addOne);
router.route('/').get(inventoryController.getAll);
router.route('/get/:SKU').get(inventoryController.getOne);
router.route('/update/:SKU').put(inventoryController.updateOne);
router.route('/delete/:SKU').delete(inventoryController.deleteOne);
router.route('/undelete/:SKU').patch(inventoryController.undeleteOne);
router.route('/deleted').get(inventoryController.getAllDeleted);

module.exports = router;
