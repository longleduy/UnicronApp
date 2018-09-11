import mongoose from 'mongoose';
const accountSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    profile_name: { type: String, required: false },
    password: { type: String, required: true },
    phone_number: { type: String, required: false },
    gender: { type: String, required: false },
    level: { type: String, required: false },
    active: { type: Boolean, required: true },
    avatar: { type: String },
    createTime: {type: Date, default: Date.now}

});
accountSchema.methods.validatePass =  (password) => {
    return bcrypt.compareSync(password, this.password);
}
export const accountModel = mongoose.model('account_infors', accountSchema);