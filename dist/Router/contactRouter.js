"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactsController_1 = require("../Controller/contactsController");
const multer_1 = __importDefault(require("../Utils/multer"));
const router = express_1.default.Router();
router.route("/create-contact").post(contactsController_1.createNewContact);
router.route("/find-contact").get(contactsController_1.findOneContact);
router.route("/find-contact-by-label").get(contactsController_1.findByLabel);
router.route("/find-contact-by-favs").get(contactsController_1.findByFavs);
router.route("/:contactID/find-contact").get(contactsController_1.findOneContact2);
router.route("/find-contacts").get(contactsController_1.findContacts);
router.route("/:contactID/delete-contact").delete(contactsController_1.deleteOneContact);
router.route("/:contactID/update-contact-info").patch(multer_1.default, contactsController_1.updateContactInfo);
// router.route("/:contactID/update-contact-avatar").patch(upload,updateContactAvatar)
router.route("/:contactID/add-contact-to-favs").patch(contactsController_1.addContactToFavorites);
exports.default = router;
