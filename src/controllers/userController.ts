import { RequestHandler } from "express";
import { User } from "../models/user";
import { hashPassword, comparePasswords, 
    signUserToken, 
    verifyUser} from "../services/auth";

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;
    if (newUser.username 
        && newUser.password 
        && newUser.firstName
        && newUser.lastName
        && newUser.email) {
        let hashedPassword = await hashPassword(newUser.password);
         newUser.password = hashedPassword;
         let created = await User.create(newUser);
         res.status(200).json({
            username: created.username,
            userId: created.userId
         });
    } else {
        res.status(400).send('Username, email and password required')
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: User | null = await User.findOne({
        where: { username: req.body.username }
    });

    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            let userId = existingUser.userId
            let firstName = existingUser.firstName
            res.status(200).json({ token, userId, firstName });
        } else {
            res.status(401).json('Invalid password or username');
        }
    } else {
        res.status(401).json('Invalid password or username');
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let userId = req.params.userId;
    let userFound = await User.findByPk(userId);

    if (userFound) {
        res.status(200).json(userFound)
    } else {
        res.status(404).json({});
    }
}
