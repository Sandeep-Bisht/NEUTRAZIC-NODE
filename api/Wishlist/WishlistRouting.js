const WishlistController = require("./WishlistController");
const router = require("express").Router();
const checkauth= require('../../Midileware/checkauth')
router.post("/add_to_wishlist",WishlistController.create);
router.post("/wishlist_by_id",WishlistController.find_by_id)
router.put("/update_wishlist_by_id",WishlistController.find_and_update)
router.delete("/delete_wishlist_by_id",WishlistController.find_and_delete)
module.exports = router;
