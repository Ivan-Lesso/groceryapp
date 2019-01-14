const Item = require("./models").Item;
const List = require("./models").List;

module.exports = {
  addItem(newItem, callback){
    return Item.create(newItem)
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteItem(req, callback){
    return Item.findById(req.params.id)
    .then((item) => {
      item.destroy()
      .then((res) => {
        callback(null, item);
      }).catch((err) => {
        callback(err);
      });
    });
  },
  updateItem(req, updatedItem, callback){
    return Item.findById(req.params.id)
    .then((item) => {
      if(!item){
        return callback("Item not found");
      }
      item.update(updatedItem, {
        fields: Object.keys(updatedItem)
      })
      .then(() => {
        callback(null, item);
      })
      .catch((err) => {
        callback(err);
      });

    });
  },
  getItems(listId, callback){
    return Item.findAll({where: {listId: listId}, order: [['id', 'ASC']]})
    .then((items) => {
      callback(null, items);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getItem(id, callback){
    return Item.findById(id)
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
