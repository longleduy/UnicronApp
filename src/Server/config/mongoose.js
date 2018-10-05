import mongoose from 'mongoose';
import chalk from 'chalk'
export const connectMongooseDB = async () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.connect('mongodb://localhost/UnicronDB', { useNewUrlParser: true });
}


