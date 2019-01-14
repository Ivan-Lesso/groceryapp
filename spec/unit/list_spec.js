const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;

describe("List", () => {

  beforeEach((done) => {
    this.list;
    this.item;
    this.user;

    sequelize.sync({force: true}).then((res) => {

      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user

        List.create({
          title: "Expeditions to Alpha Centauri",

          items: [{
            title: "My first visit to Proxima Centauri b",
            userId: this.user.id
          }]
        }, {

          include: {
            model: Item,
            as: "items"
          }
        })
        .then((list) => {
          this.list = list;
          this.item = list.items[0];
          done();
        })
      })
    });
  });

  describe("#create()", () => {

      it("should create a list object with a title", (done) => {

        List.create({
          title: "Pros of Cryosleep during the long journey",
        })
        .then((list) => {

          expect(list.title).toBe("Pros of Cryosleep during the long journey");
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

      it("should not create a list with missing title", (done) => {
        List.create({
          title: null
        })
        .then((list) => {

         // the code in this block will not be evaluated since the validation error
         // will skip it. Instead, we'll catch the error in the catch block below
         // and set the expectations there

          done();

        })
        .catch((err) => {

          expect(err.message).toContain("List.title cannot be null");
          done();

        })
      });

    });

  describe("#getItems()", () => {

    it("should return the associated items for the list in scope", (done) => {
      Item.create({
        title: "Test test",
        purchased: false,
        listId: this.list.id
      })
      .then((newItem) => {
        this.list.getItems()
        .then((associatedItems) => {
          associatedItems.forEach((item)=>{
            expect(associatedItems.listId).toBe(this.list.id);
            expect(associatedItems.title).toBe("Test test");
          });
          done();
        });
        done();
      });

    });
  });
});
