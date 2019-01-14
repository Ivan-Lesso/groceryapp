const itemQueries = require("../db/queries.items.js");

module.exports = {
  create(req, res, next) {
    let newItem= {
      title: req.body.title,
      purchased: req.body.purchased,
      listId: req.params.listId
    };
    itemQueries.addItem(newItem, (err, item) => {
      if(err){
        res.status(500).send(err);
      } else {
        res.status(200).send(item);
      }
    });
  },
  getAllItems(req, res, next)  {
    itemQueries.getItems(parseInt(req.params.listId), (err, items) => {
      if(err || items == null){
        res.status(404);
      } else {
        res.status(200).send(items);
      }
    });
  },
  destroy(req, res, next){
    itemQueries.deleteItem(req, (err, deletedRecordsCount) => {
      if(err){
        res.status(500).send(err);
      } else {
        res.status(200).send(deletedRecordsCount);
      }
    });
  },
  update(req, res, next){
     itemQueries.updateItem(req, req.body, (err, item) => {
       if(err || item == null){
         res.status(404);
       } else {
         res.status(200).send(item);
       }
     });
   }
}
