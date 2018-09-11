import mongoose from 'mongoose';
import chalk from 'chalk'
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/UnicronDB',{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('err',()=>{
    console.log('Failed to conect');
});
db.once('open',()=>{
    if (process.env.NODE_ENV != 'test') {
        console.log(chalk.green('MongoDB')+' connecting '+ chalk.green('✓'));
    }
});
export default db;

