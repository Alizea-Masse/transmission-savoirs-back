const request = require("supertest");
const app = require("./app");

let token;
let AdId;
let randomUserToken;
let randomUserId;

beforeAll((done) => {
  request(app)
    .post("/api/login")
    .send({
      email: "alizeamasse@gmail.com",
      password: "test",
    })
    .end((err, response) => {
      token = response.body.tokens.accessToken; // save the token!
      done();
    });
});

describe("POST /api/register", function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .post("/api/register")
      .send(
        `email=aliz@gmail.com&password=test&pseudo=NewPseudoAliz&birthdate=1900-01-01`
      )
      .set("Accept", "application/json")
      .end(function (err, res) {
        randomUserId = res.body.newUser.id;
        randomUserToken = res.body.newTokens.accessToken;
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        if (err) return done(err);
        return done();
      });
  });
});

describe(`DELETE /api/user/${randomUserId}`, function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .delete(`/api/user/${randomUserId}`)
      .set("Authorization", `Bearer ${randomUserToken}`)
      .end(function (err, res) {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        if (err) return done(err);
        return done();
      });
  });
});

describe("POST /api/login", function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .post("/api/login")
      .send({
        email: "alizeamasse@gmail.com",
        password: "test",
      })
      .set("Authorization", `Bearer ${token}`)
      .end(function (err, res) {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        if (err) return done(err);
        return done();
      });
  });
});
describe("POST /api/users/create-annonces", function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .post("/api/users/create-annonces")
      .send(
        "title=Annonce testtest42&postal_code=31000&image=piano-g21108bd16_1280.jpg&description=Test5 de création d'une annonce avec une image de pianoo&user_id=14&condition_id=2&type_id=2&category_id=1"
      )
      .set("Authorization", `Bearer ${token}`)
      .end(function (err, res) {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        AdId = res.body.id;
        if (err) return done(err);
        return done();
      });
  });
});

describe(`PATCH /api/annonces/${AdId}`, function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .patch(`/api/annonces/${AdId}`)
      .send(
        "title=Annonce test1&postal_code=31000&image=piano-g21108bd16_1280.jpg&description=Test de modification de l'annonce avec id 33&user_id=14&condition_id=2&type_id=2&category_id=1"
      )
      .set("Authorization", `Bearer ${token}`)
      .end(function (err, res) {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        if (err) return done(err);
        return done();
      });
  });
});

describe(`DELETE /api/annonces/${AdId}`, function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .delete(`/api/annonces/${AdId}`)
      .set("Authorization", `Bearer ${token}`)
      .end(function (err, res) {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        if (err) return done(err);
        return done();
      });
  });
});

describe("GET /api/categories", function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .get("/api/categories")
      .set("Accept", "application/json")
      .end(function (err, res) {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        if (err) return done(err);
        return done();
      });
  });
});

describe("GET /api/user/1", function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .get("/api/user/1")
      .set("Accept", "application/json")
      .end(function (err, res) {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        if (err) return done(err);
        return done();
      });
  });
});

describe("GET /api/annonces/1", function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .get("/api/annonces/1")
      .set("Accept", "application/json")
      .end(function (err, res) {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/resetpassword', function() {
  it('responds with json and status 200', function(done) {
    request(app)
      .post('/api/resetpassword')
      .send('email=alizeamasse@gmail.com')
      .set('Accept', 'application/json')
      .end(function(err, res) {
      expect(res.type).toBe('application/json')
      expect(res.statusCode).toBe(200);
      if (err) return done(err);
      return done();
    });
  });
});

describe("PATCH /api/newpassword", function () {
  it("responds with json and status 200", function (done) {
    request(app)
      .patch("/api/newpassword")
      .send("newpassword=testpassword&password=test")
      .set("Authorization", `Bearer ${token}`)
      .end(function (err, res) {
        expect(res.type).toBe("application/json");
        expect(res.statusCode).toBe(200);
        if (err) return done(err);
        return done();
      });
  });
});

describe("DELETE /api/annonces/27", function () {
  it("responds with 401 unauthorized", function (done) {
    request(app)
      .delete("/api/annonces/27")
      .set("Authorization", `Bearer mauvaisToken`)
      .end(function (err, res) {
        expect(res.statusCode).toBe(401);
        if (err) return done(err);
        return done();
      });
  });
});
