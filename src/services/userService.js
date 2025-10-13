import User from "../models/User.js"

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'webiydw3itb34o8f732c38n7rnc43t6vnc4oxri2';

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        // Validate user
        const user = await User.findOne({ email });

        if(!user) throw new Error('Invalid user or passsword!');

        // Validate password
        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid) throw new Error('Invalid user or password!');
        
        // Create token
        const payload = {
            id: user.id,
            email: user.email,

        };

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});

        return token;
    }
};