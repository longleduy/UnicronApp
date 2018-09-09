import mongoose from 'mongoose';
const accountSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    profile_name: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    level: { type: String, required: true },
    active: { type: Boolean, required: true },
    avatar: { type: String },
});
accountSchema.methods.validatePass =  (password) => {
    return bcrypt.compareSync(password, this.password);
}
export const accountModel = mongoose.model('account_infors', accountSchema);