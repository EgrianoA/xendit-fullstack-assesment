const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../../app')

chai.use(chaiHttp)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNjQ5YjcyOWFlNTQ0NDE0NGM5YzliOCIsImVtYWlsIjoidGVzdGluZ3VzZXJAdGVzdC5jb20iLCJ1c2VybmFtZSI6InRlc3Rpbmd1c2VyIn0sImlhdCI6MTYwMDQ5MjY4MCwiZXhwIjoxNjAzMDg0NjgwfQ.fmGO_yQDG0nr2wLV1KTIFIbo0GmN2Ph30W3zFMrKM7k'

describe("Testing Order : View All", () => {
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .get('/api/order/view')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : Doesn't have auth", () => {
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .get('/api/order/view')
            .send()
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(400)
                expect(res.body).to.have.property('errorCode').to.equal(401)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Order : Invalid token", () => {
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .get('/api/order/view')
            .set('Authorization', 'Bearer')
            .send()
            .end((err, res) => {
                expect(err).to.be.null
                expect(res.body).to.have.property('statusCode').to.equal(400)
                expect(res.body).to.have.property('errorCode').to.equal(202)
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("Testing Order : View My Cart", () => {
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .get('/api/order/viewMyCart')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : View My Order History", () => {
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .get('/api/order/viewMyOrderHistory')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : Add to cart new", () => {
    const body = {
        products: {
            qty: 1,
            products: "5f64c8a77f78ba348443b13d"
        }
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/order/addToCart')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : Add to cart exist", () => {
    const body = {
        products: {
            qty: 1,
            products: "5f64c8a77f78ba348443b13d"
        }
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/order/addToCart')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : update cart", () => {
    const body = {
        products: {
            qty: 1,
            products: "5f64c8a77f78ba348443b13d"
        }
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/order/updateCart')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : update cart (wrong item)", () => {
    const body = {
        products: {
            qty: 1,
            products: "5f64c8a77f78ba348443b13d"
        }
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/order/updateCart')
            .set('Authorization', 'Bearer '+token)
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


describe("Testing Order : Remove from cart", () => {
    const body = {
        products: {
            products: "5f64c8a77f78ba348443b13d"
        }
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/order/removeFromCart')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : View payment by order", () => {
    const body = {
            order: "5f64c8a77f78ba348443b13d"
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/order/viewPaymentDetailByOrder')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : Submit payment", () => {
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .get('/api/order/submitToPayment')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : Confirm payment", () => {
    const body = {
        vaNumber: "1234582212341234",
        total : 0
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/order/confirmPayment')
            .set('Authorization', 'Bearer '+token)
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

describe("Testing Order : Confirm payment (wrong VA)", () => {
    const body = {
        vaNumber: "1234582212341235",
        total : 5508000
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/order/confirmPayment')
            .set('Authorization', 'Bearer '+token)
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


describe("Testing Order : Confirm payment (payment amount false)", () => {
    const body = {
        vaNumber: "1234582212341234",
        total : 55080001
    }
    it("Test should return error code 0 && statusCode 200", done => {
        chai
            .request(app)
            .post('/api/order/confirmPayment')
            .set('Authorization', 'Bearer '+token)
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
