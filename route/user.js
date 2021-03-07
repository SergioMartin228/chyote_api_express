const { ObjectID } = require("bson");

module.exports = function (app, db) {
    app.get('/user/:name', (req, res) => {
        const name = req.params.name;
        const details = { name: name };
        db.collection('user').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.get('/users', (req, res) => {
        db.collection('user').find({}).toArray((err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.post('/user', (req, res) => {
        const user = { name: req.body.name, password: req.body.password};
        db.collection('user').findOne({name:user.name}, (err, item)=>{
            if (!item){
                db.collection('user').insert(user, (err, result) => {
                    if (err) {
                        res.send({ 'error': 'An error has occurred' });
                    } else {
                        res.send(result.ops[0]);
                    }
                });
            }
            else{
                res.send({'error': 'Fuck you!'})
            }
        });
        
    });
    app.delete('/user/:name', (req, res) => {
        const name = req.params.name;
        const details = { name };
        db.collection('user').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Note ' + name + ' deleted!');
          } 
        });
      });
};