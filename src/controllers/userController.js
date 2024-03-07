const User = require('../models/user');
const options = { new: true, runValidators: true };

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createUser = async (req, res) => {
    try {
        // fetch user data from request body
        const { firstName, lastName, parentName, email, age, city } = req.body;

        // use create() to make new user document
        const user = await User.create({
            firstName, lastName, parentName, email, age, city
        });

        // return user created
        res.status(200).json(user);
    } catch (error) {
        // code 500 if error occurs during creation
        console.error('Error creating: ', error);
        res.status(500).json([{ error: 'Internal server error' }]);
    }
};

exports.getUserById = async (req, res) => {
    try {
        // find user by ID
        const user = await User.findById(req.params.id);
        
        // 404 if user doesn't exist
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // return user found vy ID
        res.json(user);
    } catch (error) {
        // code 500 if error occurs during search
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        // find user by ID and update it with req.body, then ensure new doc is returned via new: true
        const user = await User.findByIdAndUpdate(req.params.id, req.body, options);

        // 404 if user doesn't exist
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // return updated user
        res.json(user);
    } catch (error) {
        // code 500 if error occurs during update
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        // find user by ID and delete ot
        const user = await User.findByIdAndDelete(req.params.id);
        
        // 404 if user isn't found
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // success message if delete went through
        res.status(200).json({ log: 'User successfully deleted' });
    } catch (error) {
        // code 500 if error occurs during deletion
        res.status(500).json({ error: 'Internal server error' });
    }
};