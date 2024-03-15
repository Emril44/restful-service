const User = require('../models/user');
const nodemailer = require('nodemailer');
const options = { new: true, runValidators: true };

exports.getAllUsers = async (req, res) => {
    try {
        let query = {};

        if(req.query.email) {
            query.email = { $regex: req.query.email, $options: 'i'};
        }

        if(req.query.firstName) {
            query.firstName = { $regex: req.query.firstName, $options: 'i'};
        }

        if(req.query.lastName) {
            query.lastName = { $regex: req.query.lastName, $options: 'i'};
        }

        if(req.query.parentName) {
            query.parentName = { $regex: req.query.parentName, $options: 'i'};
        }

        if (req.query.ageRange) {
            const ageRanges = {
                '18-25': { $gte: 18, $lte: 25 },
                '26-35': { $gte: 26, $lte: 35 },
                '36-51': { $gte: 36, $lte: 51 },
                '52+': { $gte: 52 }
            };
        
            query.age = ageRanges[req.query.ageRange];
        }

        const users = await User.find(query);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendEmail = async (req, res) => {
    try {
        // fetch all users
        const users = await User.find();

        // create transporter
        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: 'mkhvc2078@outlook.com',
                pass: '-p@ss_w0rd=20_78'
            }
        });

        // iterate over users and send email to each
        users.forEach(async (user) => {
            // create message
            const mailOptions = {
                from: 'mkhvc2078@outlook.com',
                to: user.email,
                subject: 'eef',
                text: 'writing on the wall'
            };

            // send email
            await transporter.sendMail(mailOptions);

            await new Promise(resolve => setTimeout(resolve, 1000));
        });

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails: ', error);
        res.status(500).json({ error: 'Internal server error' });
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