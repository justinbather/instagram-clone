import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const createSecretToken = (id) => {
    return jwt.sign({id}, 'dksiwmc34m5h9rm53hdswxfki8736225', {
        expiresIn: 3 * 24 * 60 * 60,
    });
};

export default createSecretToken;
