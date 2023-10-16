"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContactToFavorites = exports.updateContactInfo = exports.deleteOneContact = exports.findByFavs = exports.findByLabel = exports.findContacts = exports.findOneContact2 = exports.findOneContact = exports.createNewContact = void 0;
const contactModel_1 = __importDefault(require("../Model/contactModel"));
const cloudinary_1 = __importDefault(require("../Utils/cloudinary"));
const createNewContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phoneNumber, label } = req.body;
        const newContact = yield contactModel_1.default.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            avatar: (firstName.split("")[0].toUpperCase()).concat(lastName.split("")[0].toUpperCase()),
            label: label.toUpperCase(),
            favorite: false
        });
        console.log("newContact", newContact);
        return res.status(201).json({
            message: "Contact created!",
            data: newContact,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Contact couldn't be created!",
        });
    }
});
exports.createNewContact = createNewContact;
const findOneContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber } = req.body;
        const oneContact = yield contactModel_1.default.findOne({ phoneNumber });
        return res.status(201).json({
            message: "Contact found!",
            data: oneContact,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Contact couldn't be found!",
        });
    }
});
exports.findOneContact = findOneContact;
const findOneContact2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactID } = req.params;
        const oneContact = yield contactModel_1.default.findById(contactID);
        return res.status(201).json({
            message: "Contact found!",
            data: oneContact,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Contact couldn't be found!",
        });
    }
});
exports.findOneContact2 = findOneContact2;
const findContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContacts = yield contactModel_1.default.find().sort({ firstName: 1 }).collation({ locale: "en", caseLevel: true });
        return res.status(201).json({
            message: "Contacts found!",
            data: allContacts,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Contacts couldn't be found!",
        });
    }
});
exports.findContacts = findContacts;
const findByLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { label } = req.body;
        label = label.toUpperCase();
        const allContactsByLabel = yield contactModel_1.default.find({ label }).sort({ createdAt: -1 });
        return res.status(201).json({
            message: "Contacts found!",
            data: allContactsByLabel,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Contacts couldn't be found!",
        });
    }
});
exports.findByLabel = findByLabel;
const findByFavs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContactsByFavs = yield contactModel_1.default.find({ favorite: true }).sort({ createdAt: -1 });
        return res.status(201).json({
            message: "Contacts found!",
            data: allContactsByFavs,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Contacts couldn't be found!",
        });
    }
});
exports.findByFavs = findByFavs;
const deleteOneContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactID } = req.params;
        const oneContact = yield contactModel_1.default.findByIdAndDelete(contactID);
        return res.status(201).json({
            message: "Contact found and deleted!",
            data: oneContact,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Contact couldn't be deleted!",
        });
    }
});
exports.deleteOneContact = deleteOneContact;
const updateContactInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactID } = req.params;
        const { firstName, lastName, avatar } = req.body;
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload(req.file.path);
        const oneContact = yield contactModel_1.default.findByIdAndUpdate(contactID, {
            firstName,
            lastName,
            avatar: secure_url,
            avatarID: public_id
        }, { new: true });
        return res.status(201).json({
            message: "Contact has been updated!",
            data: oneContact,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Contact couldn't be updated!",
        });
    }
});
exports.updateContactInfo = updateContactInfo;
// export const updateContactAvatar = async (
//   req: any,
//   res: Response
// )=> {
//   try {
//     const { contactID } = req.params;
//     // const {avatar} = req.body
//     const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path);
//     const oneContact = await contactModel.findByIdAndUpdate(
//       contactID ,
//       {
//         avatar: secure_url,
//         avatarID: public_id,
//       },
//       { new: true }
//     );
//     console.log("this is the result: ", oneContact);
//     return res.status(201).json({
//       message: "Contact avatar has been updated!",
//       data: oneContact,
//     });
//   } catch (error:any) {
//     console.log("this is the error ", error.message);
//     return res.status(400).json({
//       message: "Contact avatar couldn't be updated!",
//       error
//     });
//   }
// };
const addContactToFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contactID } = req.params;
        const favs = yield contactModel_1.default.findByIdAndUpdate(contactID, { favorite: true }, { new: true });
        return res.status(201).json({
            message: "Contact has been added to favorites!",
            data: favs,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Contact couldn't be added to favorites!",
        });
    }
});
exports.addContactToFavorites = addContactToFavorites;
