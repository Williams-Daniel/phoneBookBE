import express, { Router } from "express"
import { addContactToFavorites, createNewContact, deleteOneContact, findByFavs, findByLabel, findContacts, findOneContact, findOneContact2, updateContactInfo } from "../Controller/contactsController"
import upload from "../Utils/multer"

const router:Router = express.Router()

router.route("/create-contact").post(createNewContact)
router.route("/find-contact").get(findOneContact)
router.route("/find-contact-by-label").get(findByLabel)
router.route("/find-contact-by-favs").get(findByFavs)
router.route("/:contactID/find-contact").get(findOneContact2)
router.route("/find-contacts").get(findContacts)
router.route("/:contactID/delete-contact").delete(deleteOneContact)
router.route("/:contactID/update-contact-info").patch(upload,updateContactInfo)
// router.route("/:contactID/update-contact-avatar").patch(upload,updateContactAvatar)
router.route("/:contactID/add-contact-to-favs").patch(addContactToFavorites)

export default router