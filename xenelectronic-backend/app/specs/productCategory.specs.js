const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../../app')

chai.use(chaiHttp)


describe("Testing Product Category: View All", () => {
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .get('/api/productCategory/view')
            .send()
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(200)
                expect(res.body).to.have.property('errorCode').to.equal(0)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Product Category: False create", () => {
    const body = {}
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/productCategory/create')
            .send(body)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(400)
                expect(res.body).to.have.property('errorCode').to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Product Category: create", () => {
    const body = {
        name: "productName"+Math.floor(Math.random() * 1001)
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/productCategory/create')
            .send(body)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(200)
                expect(res.body).to.have.property('errorCode').to.equal(0)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Product Category: False update", () => {
    const body = {
        id: '5f66b475305e4f49b42a5a3e',
        name: ""
    }
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/productCategory/update')
            .send(body)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(400)
                expect(res.body).to.have.property('errorCode').to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Product Category: update", () => {
    const body = {
        id: '5f66b475305e4f49b42a5a3e',
        name: "abc"
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/productCategory/update')
            .send(body)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(200)
                expect(res.body).to.have.property('errorCode').to.equal(0)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Product Category: False remove", () => {
    const body = {}
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/productCategory/delete')
            .send()
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(400)
                expect(res.body).to.have.property('errorCode').to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Product Category: remove", () => {
    const body = {
        id: '5f66b475305e4f49b42a5a3e',
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/productCategory/delete')
            .send(body)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(200)
                expect(res.body).to.have.property('errorCode').to.equal(0)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Product Category: False reactivate", () => {
    const body = {}
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/productCategory/reactivate')
            .send()
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(400)
                expect(res.body).to.have.property('errorCode').to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Product Category: reactivate", () => {
    const body = {
        id: '5f66b475305e4f49b42a5a3e',
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/productCategory/reactivate')
            .send(body)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(200)
                expect(res.body).to.have.property('errorCode').to.equal(0)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

