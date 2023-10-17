import { Request, Response } from "express";
import contactModel from "../Model/contactModel";
import { streamUpload } from "../Utils/streamify";
import cloudinary from "../Utils/cloudinary";

export const createNewContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { firstName, lastName, email, phoneNumber, label } = req.body;

    const newContact = await contactModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      avatar:((firstName.split("")[0].toUpperCase()).concat(lastName.split("")[0].toUpperCase())),
      label:label.toUpperCase(),
      favorite: false
    });
console.log("newContact",newContact)
    return res.status(201).json({
      message: "Contact created!",
      data: newContact,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Contact couldn't be created!",
    });
  }
};

export const findOneContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { phoneNumber } = req.body;

    const oneContact = await contactModel.findOne({ phoneNumber });

    return res.status(201).json({
      message: "Contact found!",
      data: oneContact,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Contact couldn't be found!",
    });
  }
};

export const findOneContact2 = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { contactID } = req.params;

    const oneContact = await contactModel.findById(contactID);

    return res.status(201).json({
      message: "Contact found!",
      data: oneContact,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Contact couldn't be found!",
    });
  }
};

export const findContacts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allContacts = await contactModel.find().sort({ firstName: 1 }).collation({locale:"en",caseLevel:true});

    return res.status(201).json({
      message: "Contacts found!",
      data: allContacts,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Contacts couldn't be found!",
    });
  }
};

export const findByLabel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let {label} = req.body
     label = label.toUpperCase()
    const allContactsByLabel = await contactModel.find({label}).sort({ createdAt: -1 });

    return res.status(201).json({
      message: "Contacts found!",
      data: allContactsByLabel,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Contacts couldn't be found!",
    });
  }
};

export const findByFavs = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allContactsByFavs = await contactModel.find({favorite:true}).sort({ createdAt: -1 });

    return res.status(201).json({
      message: "Contacts found!",
      data: allContactsByFavs,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Contacts couldn't be found!",
    });
  }
};

export const deleteOneContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { contactID } = req.params;

    const oneContact = await contactModel.findByIdAndDelete(contactID);

    return res.status(201).json({
      message: "Contact found and deleted!",
      data: oneContact,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Contact couldn't be deleted!",
    });
  }
};

export const updateContactInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { contactID } = req.params;
    const { firstName, lastName } = req.body;

    const oneContact = await contactModel.findByIdAndUpdate(
      contactID,
      {
        firstName,
        lastName,
      },
      { new: true }
    );

    return res.status(201).json({
      message: "Contact has been updated!",
      data: oneContact,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Contact couldn't be updated!",
    });
  }
};

export const updateContactAvatar = async (
  req: any,
  res: Response
)=> {
  try {
    const { contactID } = req.params;
    // const {avatar} = req.body
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path);

    const oneContact = await contactModel.findByIdAndUpdate(
      contactID ,
      {
        avatar: secure_url,
        avatarID: public_id,
      },
      { new: true }
    );

    console.log("this is the result: ", oneContact);
    return res.status(201).json({
      message: "Contact avatar has been updated!",
      data: oneContact,
    });
  } catch (error) {
    console.log("this is the error ", error);
    return res.status(400).json({
      message: "Contact avatar couldn't be updated!",
    });
  }
};

export const addContactToFavorites = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { contactID } = req.params;

    const favs = await contactModel.findByIdAndUpdate(
      contactID,
      { favorite: true },
      { new: true }
    );

    return res.status(201).json({
      message: "Contact has been added to favorites!",
      data: favs,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Contact couldn't be added to favorites!",
    });
  }
};
