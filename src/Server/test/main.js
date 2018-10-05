import "regenerator-runtime/runtime";
import chai from 'chai'
import chaiHttp from 'chai-http'
import {userAccountTest} from './user_account_test/user_account_test'
import {test} from '../controllers/posts/posts_controller'
const should = chai.should()
chai.use(chaiHttp)

describe('Main', () => {
    beforeEach(done => {
        done()
    })
    //userAccountTest();
    //getListLibFrame();
    return describe('Test', () => {
        it('test', async () => {
            try {
               await test();
            } catch (error) {
                throw error
            }
        })
    })
})
