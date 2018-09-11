import "regenerator-runtime/runtime";
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'
const should = chai.should()
chai.use(chaiHttp)

//Todo test Account SignUp
describe('Account Controller', () => {
    beforeEach(done => {
        done()
    })
    //Todo: Test upload avatar
    describe('Account SignUp', () => {
        it('it should res = 200',async () => {
            let res = await chai.request(app).post('/account/sign-up').send({
                first_name: 'Duy',
                last_name: 'Long',
                pass_word: 'longkhanh',
                email: 'longldseatechit@gmail.com'
            })
            res.should.have.status(200);
        })
    })
})

// //Todo test Check email address
// describe('Check email address Controller', () => {
//     beforeEach(done => {
//         done()
//     })
//     describe('Check email address', () => {
//         it('it should res = 203 if email ="longldseatechit@gmail.com"',async () => {
//             let res = await chai.request(app).get('/account/check-email-address').query({
//                 email: 'longldseatechit@gmail.com'
//             })
//             res.should.have.status(203);
//         })
//     })
// })