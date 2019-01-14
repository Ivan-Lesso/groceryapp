const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;

describe("Item", () => {

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

      it("should create an item object with a title", (done) => {

        Item.create({
          title: "Pros of Cryosleep during the long journey",
          listId: this.list.id,
          purchased: false
        })
        .then((item) => {

          expect(item.title).toBe("Pros of Cryosleep during the long journey");
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

      it("should not create an item with missing title and missing listId", (done) => {
        Item.create({
          title: null,
          listId: null,
          purchased: false
        })
        .then((item) => {

         // the code in this block will not be evaluated since the validation error
         // will skip it. Instead, we'll catch the error in the catch block below
         // and set the expectations there

          done();

        })
        .catch((err) => {

          expect(err.message).toContain("Item.title cannot be null");
          expect(err.message).toContain("Item.listId cannot be null");
          done();

        })
      });

    });
  describe("#update()", () => {

      it("should update an item object with a new title and mark it as purchased", (done) => {

        Item.create({
          title: "Pros of Cryosleep during the long journey",
          listId: this.list.id,
          purchased: false
        })
        .then((item) => {
          item.update({
            title: "New Title",
            listId: this.list.id,
            purchased: true
          }).then((updatedItem) => {

            expect(updatedItem.title).toBe("New Title");
            expect(updatedItem.purchased).toBe(true);
            done();
          })
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  describe("#destroy()", () => {

      it("should update an item object with a new title and mark it as purchased", (done) => {

        Item.create({
          title: "Pros of Cryosleep during the long journey",
          listId: this.list.id,
          purchased: false
        })
        .then((item) => {
          item.destroy().then((response) => {
            Item.findById(item.id).then((newItem) => {
              expect(newItem).toBe(null);
              done();
            })
          })
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
  });
});
