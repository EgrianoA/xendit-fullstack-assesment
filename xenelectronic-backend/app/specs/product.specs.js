const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../../app')

chai.use(chaiHttp)


describe("Testing Product : View All", () => {
    const body = {
        category : []
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/product/view')
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

describe("Testing Product : View All With filter", () => {
    const body = {
        category : ['5f64c6291bf6cf0b509036a5']
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/product/view')
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

describe("Testing Product : False create (no name)", () => {
    const body = {
        category: "5f64c6291bf6cf0b509036a5",
        image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-6881450/samsung_samsung_air_purifier_ax60r5080wd_full03_q2cpm8rc.jpg?output-format=webp",
        desc: "Samsung AX60R5080WD Air Purifier merupakkan pembersih udara yang cocok digunakan di kamar anak atau ruang tamu. Air Purifier ini membersihkan udara melalui 3 tahap, yaitu: menyaring debu, menyerap bau tidak sedap, dan menghilangkan bakteri dan partikel debu ultrakecil. Dengan filter PM2.5, air purifier Samsung ini bisa menghilangkan hingga 99.97% partikel debu kecil dan bakteri di udara. Selain itu, ada juga sensor debu dengan 4 lampu indikator untuk memudahkan Anda mengetahui sebersih apa kondisi udara di ruangan. Berikut ini semua kelebihan penjernih udara Samsung AX60R Air Purifier.",
        price: 3300000
    }
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/product/create')
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

describe("Testing Product : False create (no category)", () => {
    const body = {
        name: "Samsung AX60R5080WD Air Purifier TEST"+Math.floor(Math.random() * 1001),
        image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-6881450/samsung_samsung_air_purifier_ax60r5080wd_full03_q2cpm8rc.jpg?output-format=webp",
        desc: "Samsung AX60R5080WD Air Purifier merupakkan pembersih udara yang cocok digunakan di kamar anak atau ruang tamu. Air Purifier ini membersihkan udara melalui 3 tahap, yaitu: menyaring debu, menyerap bau tidak sedap, dan menghilangkan bakteri dan partikel debu ultrakecil. Dengan filter PM2.5, air purifier Samsung ini bisa menghilangkan hingga 99.97% partikel debu kecil dan bakteri di udara. Selain itu, ada juga sensor debu dengan 4 lampu indikator untuk memudahkan Anda mengetahui sebersih apa kondisi udara di ruangan. Berikut ini semua kelebihan penjernih udara Samsung AX60R Air Purifier.",
        price: 3300000
    }
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/product/create')
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

describe("Testing Product : create", () => {
    const body = {
        name: "PRODUCT TEST"+Math.floor(Math.random() * 1001),
        category: "5f64c6291bf6cf0b509036a5",
        image: "",
        desc: "",
        price: 0
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/product/create')
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

describe("Testing Product : False update", () => {
    const req = {
        body: {
            id: undefined
        }  
    }
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/product/update')
            .send(req)
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(400)
                expect(res.body).to.have.property('errorCode').to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Product : update", () => {
    const body = {
        id: '5f66b475305e4f49b42a5a3e',
        name: "abc"
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/product/update')
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

describe("Testing Product : False remove", () => {
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/product/delete')
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

describe("Testing Product : remove", () => {
    const body = {
        id:"5f66b475305e4f49b42a5a3e"
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/product/delete')
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

describe("Testing Product : False reactivate", () => {
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/product/reactivate')
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

describe("Testing Product : reactivate", () => {
    const body = {
        id:"5f66b475305e4f49b42a5a3e"
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/product/reactivate')
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

