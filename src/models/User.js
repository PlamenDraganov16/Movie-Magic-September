import { Schema, model, Types} from 'mongoose';

import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Hash password
userSchema.pre('save', async function () {
    // Generate salt
    // const salt = await bcrypt.genSalt(12);

    this.password = await bcrypt.hash(this.password, 12);
});

const User = model('User', userSchema);

export default User;