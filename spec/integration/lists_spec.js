const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists/";

const sequelize = require('../../src/db/models/index').sequelize;
const List = require("../../src/db/models").List;

describe("routes : lists", () => {

  beforeEach((done) => { // before each context
    this.list;   // define variables and bind to context
    sequelize.sync({ force: true }).then(() => {  // clear database
      List.create({
        title: "JS Frameworks",
      })
      .then((res) => {
        this.list = res;  // store resulting list in context
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });
  // context of a non-user
  describe("non-user performing CRUD actions for List", () => {

    beforeEach((done) => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          userId: 0
        }
      });
      done();
    });

    describe("GET /lists", () => {
      it("should respond with all lists", (done) => {
        request.get(base, (err, res, body) => {
          expect(body).toContain("Sign in");
          done();
        });
      });

    });

    describe("GET /lists/new", () => {

      it("should render a view with a new list form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(body).toContain("Sign in");
          done();
        });
      });

    });

    describe("POST /lists/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs"
        }
      };

      it("should create a new list and redirect", (done) => {
        request.post(options,
          (err, res, body) => {
            List.findOne({where: {title: "blink-182 songs"}})
            .then((list) => {
              expect(list).toBeNull();
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

    describe("GET /lists/:id", () => {

      it("should render a view with the selected list", (done) => {
        request.get(`${base}${this.list.id}`, (err, res, body) => {
          expect(body).toContain("Sign in");
          done();
        });
      });

    });

    describe("POST /lists/:id/destroy", () => {

      it("should delete the list with the associated ID", (done) => {
        List.all()
        .then((lists) => {
          const listCountBeforeDelete = lists.length;

          expect(listCountBeforeDelete).toBe(1);

          request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
            List.all()
            .then((lists) => {
              expect(err).toBeNull();
              expect(lists.length).toBe(listCountBeforeDelete);
              done();
            })

          });
        })

      });

    });

    describe("GET /lists/:id/edit", () => {

      it("should render a view with an edit list form", (done) => {
        request.get(`${base}${this.list.id}/edit`, (err, res, body) => {
          expect(body).toContain("Sign in");
          done();
        });
      });

    });

    describe("POST /lists/:id/update", () => {

      it("should update the list with the given values", (done) => {
        request.post({
          url: `${base}${this.list.id}/update`,
          form: {
            title: "JavaScript Frameworks"
          }
        }, (err, res, body) => {
          expect(err).toBeNull();
          List.findOne({
            where: {id:1}
          })
          .then((list) => {
            expect(list.title).toBe("JS Frameworks");
            done();
          });
        });
      });

    });

  });
  // context of user
  describe("user performing CRUD actions for List", () => {

    beforeEach((done) => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          userId: 1
        }
      });
      done();
    });

    describe("GET /lists", () => {
      it("should respond with all lists", (done) => {
        request.get(base, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Lists");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("GET /lists/new", () => {

      it("should render a view with a new list form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New List");
          done();
        });
      });

    });

    describe("POST /lists/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs"
        }
      };

      it("should create a new list and redirect", (done) => {
        request.post(options,
          (err, res, body) => {
            List.findOne({where: {title: "blink-182 songs"}})
            .then((list) => {
              expect(list.title).toBe("blink-182 songs");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

    describe("GET /lists/:id", () => {

      it("should render a view with the selected list", (done) => {
        request.get(`${base}${this.list.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("POST /lists/:id/destroy", () => {


      it("should delete the list with the associated ID", (done) => {
        List.all()
        .then((lists) => {
          const listCountBeforeDelete = lists.length;

          expect(listCountBeforeDelete).toBe(1);

          request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
            List.all()
            .then((lists) => {
              expect(err).toBeNull();
              expect(lists.length).toBe(listCountBeforeDelete - 1);
              done();
            })

          });
        })

      });

    });

    describe("GET /lists/:id/edit", () => {

      it("should render a view with an edit list form", (done) => {
        request.get(`${base}${this.list.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit List");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("POST /lists/:id/update", () => {

      it("should update the list with the given values", (done) => {
        request.post({
          url: `${base}${this.list.id}/update`,
          form: {
            title: "JavaScript Frameworks"
          }
        }, (err, res, body) => {
          expect(err).toBeNull();
          List.findOne({
            where: {id:1}
          })
          .then((list) => {
            expect(list.title).toBe("JavaScript Frameworks");
            done();
          });
        });
      });

    });

  });

});
