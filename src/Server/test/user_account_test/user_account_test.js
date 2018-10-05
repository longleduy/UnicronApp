import "regenerator-runtime/runtime";
import chai from 'chai'
import chaiHttp from 'chai-http'
import {HOST,SERVER_PORT,GRAPHQL_ENDPOINT} from '../../config/Contants/uri_contans'
const should = chai.should()
chai.use(chaiHttp)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
export const userAccountTest = (action = 'run') => {
    let formData = `{
        first_name: "Long",
        last_name: "Duy",
        email: "longldseatechit@gmail.com",
        password: "longkhanh",
        phone_number: "01663219295",
    }`
    return describe('Account SignUp', () => {
        it('email not exists', async () => {
            console.log(formData.email);
            const res = await chai.request(`${HOST}:${SERVER_PORT}`).post(`/${GRAPHQL_ENDPOINT}`).send({
                query: `{ checkEmail(email:"longldseatechit@gmail.com") { status } }`
            })
            res.body.data.checkEmail.should.to.be.an('object');
            res.body.data.checkEmail.should.have.property('status');
            res.body.data.checkEmail.status.should.not.be.ok;
        })
        it('sign up success', async () => {
            try {
                const res = await chai.request(`${HOST}:${SERVER_PORT}`).post(`/${GRAPHQL_ENDPOINT}`).send({'query' :  
                `mutation{ addNewUserAccount(formData:${formData}) { first_name,last_name,email,profile_name,password,phone_number,gender,level,active } }` })
                res.body.data.addNewUserAccount.should.to.be.an('object');
                res.body.data.addNewUserAccount.should.have.property('first_name');
            } catch (error) {
                throw error
            }

        })
        it('verify email success', async () => {
            try {
                const res = await chai.request(`${HOST}:${SERVER_PORT}`).post(`/${GRAPHQL_ENDPOINT}`).send( {query: `{ verifyEmailAddress(secretKey:"bG9uZ2xkc2VhdGVjaGl0QGdtYWlsLmNvbQ") { status } }`})
                res.body.data.verifyEmailAddress.should.to.be.an('object');
                res.body.data.verifyEmailAddress.should.have.property('status');
                res.body.data.verifyEmailAddress.status.should.be.equal('Active');
            } catch (error) {
                throw error
            }
        })
        it('sign in success', async () => {
            const signInData = `{
                email: "longldseatechit@gmail.com",
                password: "longkhanh"
            }`
            try {
                const res = await chai.request(`${HOST}:${SERVER_PORT}`).post(`/${GRAPHQL_ENDPOINT}`).send({'query':`mutation{signIn(formData:${signInData}){profile_name,level,...on SignInInfo{jwt}}}`})
                res.body.data.signIn.should.to.be.an('object');
                res.body.data.signIn.should.have.property('jwt');
                res.body.data.signIn.should.have.property('profile_name');
                res.body.data.signIn.should.have.property('level');
                res.body.data.signIn.jwt.should.not.be.equal(null);
                res.body.data.signIn.profile_name.should.not.be.equal(null);
                res.body.data.signIn.level.should.not.be.equal(null);
            } catch (error) {
                throw error
            }
        })
    })
}
