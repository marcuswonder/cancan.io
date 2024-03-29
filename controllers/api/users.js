const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')

module.exports = {
    create,
    login,
    checkToken,
    index,
}

async function create(req, res) {
    const userEmail = req.body.email

    const existingUser = await User.findOne({ email: userEmail })

    if (existingUser) {
        return res.status(400).json('Email is already associated with an existing user')
    }
    
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.json(token)
        
    } catch(err) {
        res.status(400).json(err)
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json( createJWT(user) );
    } catch(err) {
        console.log(err)
        res.status(400).json('Bad Credentials');
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

async function index(req, res) {
    try {
      let users = []
      if (req.user) {
        users = await User.find({})
      }
      res.json(users)
    } catch (err) {
      console.error(err)
      res.status(500).send('Error retrieving users')
    }
}


/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}
