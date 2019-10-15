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

// Obtener un usuario por su id
Router.get('/', function(req, res) {
    let nombre = req.query.nombre
    Users.findOne({usuario: nombre}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(doc)
    })
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

// Inactivar un usuario por su id
Router.post('/inactive/:id', function(req, res) {

})

// Actualizar un evento por su id B
Router.post('/update/:id', function(req, res) {
	
	
	// let uid = req.body._id;
    // let fstart = req.body.start;
	// let fend = req.body.end;
	// var newObjectId = new ObjectID.createFromHexString(uid);
	// console.log(ObjectId.fromString(uid) + ' ' + fstart +' ' +fend);
	// ObjectId.toHexString()
	// res.json(Evento)
	// console.log(newObjectId + ' - ' + fstart);
    try{
		const {title,start, end} = req.body
		console.log('req.body._id '+ req.body._id + ' Title ' + title + ' start ' + start + ' end ' + end);
		const Evento = {title, start, end}

	Events.findByIdAndUpdate(req.body._id, Evento);
	
		// Events.updateOne({_id: newObjectId.toHexString()},{$set: {start: fstart}})
			res.json({msg : "OK"});
	}catch(e){
		console.log("Error actualizando registro " + e);
		res.json({error: "Error actualizando registro " + e});
	}
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


