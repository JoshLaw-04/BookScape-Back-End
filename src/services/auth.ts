import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { User } from '../models/user';

const secret = 'Are secrets REALLY ok?';

export const hashPassword = async (plainTextPassword: string) => {
    const hash = await bcrypt.hash(plainTextPassword, 12);
    return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

export const signUserToken = async (user: User) => {
    let token = jwt.sign(
        { userId: user.userId },
        secret, { expiresIn: '1.5hr' }
    );
    console.log(token);
    return token;
}

export const verifyUser = async (req: Request) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            let decoded: any = await jwt.verify(token, secret);
            return User.findByPk(decoded.userId);
        }
        catch (err) {
            return null;
        }
    } else {
        return null;
    }
}