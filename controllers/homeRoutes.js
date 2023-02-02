const router = require('express').Router();
const { Car, User, Comment } = require('../models');
const withAuth = require('../helpers/auth');
var carid = 1;

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const carData = await Car.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],//pulled in name  from user
        },
      ],
    });

    // Serialize data so the template can read it
    const cars = carData.map((car) => car.get({ plain: true }));

    console.log(cars);



    console.log("HERE LOOK UP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // Pass serialized data and session flag into template
    res.render('homepage', {
      cars,
      session_username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/car/:id', async (req, res) => {
  try {
    const carData = await Car.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'message', 'date_created', 'carid', 'userid', 'user_name'],
        },

      ],

    });

    const car = carData.get({ plain: true });
    console.log(car);

    carid = car.id;

    console.log(" HERE ABOVE!!!!!!!!:: " + car.model);
    res.render('car', {
      ...car,
      logged_in: req.session.logged_in,
      session_username: req.session.username,

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//if card payment went through, redirect to success page
router.get('/success', async (req, res) => {
  try {
    res.render('success', {
      ...car,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);

  }
});

//create comments route

router.get('/comment/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Car,
          attributes: ['id', 'model', 'year', 'make', 'price', 'description', 'image'],
        },
      ],
    });

    const comment = commentData.get({ plain: true });

    console.log(id);
    res.render('comment', {
      ...comment,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
// get carlist
router.get('/carlist', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const carData = await Car.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],//pulled in name  from user
        },
      ],
    });
    // Serialize data so the template can read it
    const cars = carData.map((car) => car.get({ plain: true }));
    console.log(cars);
    // Pass serialized data and session flag into template
    res.render('carlist', {
      cars,
      //session_username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//

router.get('/search/:search', async (req, res) => {
  try {
    // Get all projects and JOIN with user data

    console.log("router.get/search from homeRoutes.js");
    //console.log(carData);
    console.log(req.params.search);
    //const carData = await Car.findOne({ where: { id: req.params.search } });
    //console.log(carData.dataValues);
    console.log(req.params.search);
    console.log("Hello homeRoutes worked!!");
    //console.log(carData.model);
    ///////
    console.log(req.params.search);
    const carData = await Car.findAll({
      where: { model: req.params.search },
      include: [
        {
          model: User,
          attributes: ['name'],//pulled in name  from user
        },
      ],
    });

    // Serialize data so the template can read it
    const cars = carData.map((car) => car.get({ plain: true }));

    console.log(carData);

    ///////
    // Serialize data so the template can read it
    //const cars = carData.map((car) => car.get({ plain: true }));
    //const car = carData.get({ plain: true });
    console.log("cars below!!!!");
    console.log(cars);

    // Pass serialized data and session flag into template
    res.render('search', {
      cars,
      logged_in: req.session.logged_in,
      //session_username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
