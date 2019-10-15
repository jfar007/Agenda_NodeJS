const Router = require('express').Router();
const Users = require('./model.js');
const Events = require('./modelEvents.js');
const ObjectID = require('mongodb').ObjectID;
// const mongoose = require ('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

//Obtener todos los usuarios B
Router.get('/all', function(req, res) {
   let uid = req.query.user;
 
   Events.find({user_id: uid}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
		console.log(docs)
        res.json(docs)
	
    });
})


// Agregar a un evento B
Router.post('/new', function(req, res) {
	var alld = false;
	if(req.body.end == ''){
		alld = true;
	}
    let evento = new Events({
        user_id: req.body.user,
        title: req.body.title,
		start: req.body.start,
        end: req.body.end,
		all_day: alld
    });
    evento.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})

// Eliminar un evento por su id B
Router.post('/delete/:id', function(req, res) {
    let uid = req.body._id;
	
		console.log(uid)
    Events.remove({_id: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro eliminado")
    })
})


// Actualizar un evento por su id B
Router.post('/update/:id', async(req, res) => {
console.log(req.body);
const { title, start, end } = req.body

const newEvent = { title, start, end }
await Events.findByIdAndUpdate(req.params.id, newEvent)
res.json({ status: 'Tarea actualizada' })

})



// Login usuario B
Router.post('/login', function(req, res) {

    let nombre = req.body.user;
	let contra = req.body.pass;
	console.log('n ' + nombre + ' p ' + contra);
	Users.findOne({usuario: nombre, contrasena: contra})
	.then(function(doc) {
        if(!doc){
			res.json({access: 'Invalid'});
		}else{
			res.json({_id: doc._id, access: 'Valid'});
		}
            

  });
})

module.exports = Router


