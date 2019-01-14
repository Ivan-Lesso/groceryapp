const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists";

const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;

describe("routes : items", () => {
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
         this.user = user;

         List.create({
           title: "Winter Games",
           items: [{
             title: "Snowball Fighting"
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

  //Member
  describe("member user performing CRUD actions for Item", () => {
    beforeEach((done) => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          userId: 1
        }
      });
      done();
    });

    describe("POST /lists/:listId/items/create", () => {

      it("should create a new item and redirect", (done) => {
         const options = {
           url: `${base}/${this.list.id}/items/create`,
           form: {
             title: "Watching snow melt",
             purchased: false,
             listId: this.list.id,
           }
         };
         request.post(options,
           (err, res, body) => {

             Item.findOne({where: {title: "Watching snow melt"}})
             .then((item) => {
               expect(item).not.toBeNull();
               expect(item.title).toBe("Watching snow melt");
               expect(item.listId).not.toBeNull();
               done();
             })
             .catch((err) => {
               console.log(err);
               done();
             });
           }
         );
       });

      it("should not create a new item that fails validations", (done) => {
       const options = {
         url: `${base}/${this.list.id}/items/create`,
         form: {
           title: "a"
         }
       };

       request.post(options,
         (err, res, body) => {

           Item.findOne({where: {title: "a"}})
           .then((item) => {
               expect(item).toBeNull();
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

    describe("POST /lists/:listId/items/:id/destroy", () => {

      it("should not delete the item with the associated ID", (done) => {

        Item.all()
        .then((items) => {
          const itemCountBeforeDelete = items.length;

          expect(itemCountBeforeDelete).toBe(1);

          request.post(`${base}/${this.list.id}/items/${this.item.id}/destroy`, (err, res, body) => {

            Item.all()
            .then((items) => {
              expect(items.length).toBe(itemCountBeforeDelete-1);
              done();
            });
          });
        });
      });
    });

    describe("POST /lists/:listId/items/:id/update", () => {

      it("should update the value of an item", (done) => {
        request.post({
          url: `${base}/${this.list.id}/items/${this.item.id}/update`,
          form: {
            title: "Snowman Building Competition",
            purchased: true
          }
        }, (err, res, body) => {
          Item.findOne({
            where: { id:1 }
          })
          .then((item) => {
            expect(item.title).toBe("Snowman Building Competition");
            done();
          });
          done();
        });
      });

    });
  });
});
