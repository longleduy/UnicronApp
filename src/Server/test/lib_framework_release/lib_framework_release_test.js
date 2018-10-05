import "regenerator-runtime/runtime";
import chai from 'chai'
import chaiHttp from 'chai-http'
import {HOST,SERVER_PORT,GRAPHQL_ENDPOINT} from '../../config/Contants/uri_contans'
const should = chai.should()
chai.use(chaiHttp)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
export const getListLibFrame = (action = 'run') => {
    
    return describe('GetListLibFrame', () => {
        it('getList success', async () => {
            try {
                const res = await chai.request(`${HOST}:${SERVER_PORT}`).post(`/${GRAPHQL_ENDPOINT}`).send({query:`{getListLibFrame{img,name,role,date,li1}}`})
                res.body.data.getListLibFrame.should.to.be.an('array');
                res.body.data.getListLibFrame.should.have.lengthOf(8);
            } catch (error) {
                throw error
            }
        })
    })
}
