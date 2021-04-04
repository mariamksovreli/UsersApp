const router = require('express').Router();
let User = require('./models/user');

const errorHandler = function(err, res) {
    res.status(400).json('Error: ' + err);
}

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => errorHandler(err, res));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthDate = req.body.birthDate;
    const email = req.body.email;

    const newUser = new User({username, firstName, lastName, birthDate, email});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => errorHandler(err, res));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => errorHandler(err, res));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => errorHandler(err, res));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.birthDate = req.body.birthDate;
            user.email = req.body.email;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => errorHandler(err, res));
        })
        .catch(err => errorHandler(err, res));
});

module.exports = router;