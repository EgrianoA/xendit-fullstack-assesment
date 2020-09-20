const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../../app')

chai.use(chaiHttp)


describe("Testing Login: User Not Found", () => {
    const body = {
        usernameOrEmail: "usernotfound",
        password: "abc123"
    }
    it("Test should return error code 400", done => {
        chai
            .request(app)
            .post('/api/login')
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

describe("Testing Login: Password Wrong", () => {
    const body = {
        usernameOrEmail: "testinguser@test.com",
        password: "abc1234"
    }
    it("Test should return error code 400", done => {
        chai
            .request(app)
            .post('/api/login')
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

describe("Testing Login: Null body", () => {
    const body = {}
    it("Test should return error code 400", done => {
        chai
            .request(app)
            .post('/api/login')
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

describe("Testing Login: Normal Login", () => {
    const body = {
        usernameOrEmail: "testinguser@test.com",
        password: "abc123"
    }
    it("Test should return error code 0 & statuscode 200", done => {
        chai
            .request(app)
            .post('/api/login')
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

describe("Testing Signup: Empty Email", () => {
    const body = {
        username: "testinguser2",
        // email: "testinguser2@test.com",
        phoneNumber: "82212341232",
        password: "abc123"
    }
    it("Test should return error code 400", done => {
        chai
            .request(app)
            .post('/api/signup')
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

describe("Testing Signup: Empty Username", () => {
    const body = {
        // username: "testinguser2",
        email: "testinguser2@test.com",
        phoneNumber: "82212341232",
        password: "abc123"
    }
    it("Test should return error code 400 & mssg USERNAME CANNOT BE EMPTY", done => {
        chai
            .request(app)
            .post('/api/signup')
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

describe("Testing Signup: Empty Phone Number", () => {
    const body = {
        username: "testinguser2",
        email: "testinguser2@test.com",
        // phoneNumber: "82212341232",
        password: "abc123"
    }
    it("Test should return error code 400", done => {
        chai
            .request(app)
            .post('/api/signup')
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

describe("Testing Signup: Empty Password", () => {
    const body = {
        username: "testinguser2",
        email: "testinguser2@test.com",
        phoneNumber: "82212341232",
        // password: "abc123"
    }
    it("Test should return error code 400", done => {
        chai
            .request(app)
            .post('/api/signup')
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

describe("Testing Signup: Wrong phone number format", () => {
    const body = {
        username: "testinguser2",
        email: "testinguser2@test.com",
        phoneNumber: "2382212341232",
        password: "abc123"
    }
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/signup')
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


describe("Testing Signup: Email already used", () => {
    const body = {
        username: "testinguser22",
        email: "testinguser2@test.com",
        phoneNumber: "822123412324",
        password: "abc123"
    }
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/signup')
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

describe("Testing Signup: Username already used", () => {
    const body = {
        username: "testinguser2",
        email: "testinguser22@test.com",
        phoneNumber: "822123412324",
        password: "abc123"
    }
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/signup')
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

describe("Testing Signup: Phone number already used", () => {
    const body = {
        username: "testinguser2",
        email: "testinguser2@test.com",
        phoneNumber: "82212341234",
        password: "abc123"
    }
    it("Test should return error code 400 ", done => {
        chai
            .request(app)
            .post('/api/signup')
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

describe("Testing Signup: Normal signup", () => {
    const body = {
        username: "testinguser" + Math.floor(Math.random() * 1001),
        email: "testinguser" + Math.floor(Math.random() * 1001) + "@test.com",
        phoneNumber: "82212341232" + Math.floor(Math.random() * 1001),
        password: "abc123"
    }
    it("Test should return error code 0 & statuscode 200", done => {
        chai
            .request(app)
            .post('/api/login')
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

describe("Testing Signup: Normal signup (+62 format)", () => {
    const body = {
        username: "testinguser" + Math.floor(Math.random() * 1001),
        email: "testinguser" + Math.floor(Math.random() * 1001) + "@test.com",
        phoneNumber: "+6282212341232" + Math.floor(Math.random() * 1001),
        password: "abc123"
    }
    it("Test should return error code 0 & statuscode 200", done => {
        chai
            .request(app)
            .post('/api/login')
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

describe("Testing Signup: Normal signup (62 format)", () => {
    const body = {
        username: "testinguser" + Math.floor(Math.random() * 1001),
        email: "testinguser" + Math.floor(Math.random() * 1001) + "@test.com",
        phoneNumber: "6282212341232" + Math.floor(Math.random() * 1001),
        password: "abc123"
    }
    it("Test should return error code 0 & statuscode 200", done => {
        chai
            .request(app)
            .post('/api/login')
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

describe("Testing Signup: Normal signup (08 format)", () => {
    const body = {
        username: "testinguser" + Math.floor(Math.random() * 1001),
        email: "testinguser" + Math.floor(Math.random() * 1001) + "@test.com",
        phoneNumber: "082212341232" + Math.floor(Math.random() * 1001),
        password: "abc123"
    }
    it("Test should return error code 0 & statuscode 200", done => {
        chai
            .request(app)
            .post('/api/login')
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
