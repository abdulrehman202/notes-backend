require('dotenv').config();
const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    user: String,
    title: String,
    text: String,
    color: Number
});

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    email: String,
    password: String,
});

const Note = mongoose.model('Note', noteSchema, 'notes collection');
const User = mongoose.model('User', userSchema, 'users');

class DBController {

    static db = null;
    DBController() {
    }

    async connect() {
        try {
            this.db = await mongoose.connect(process.env.DATABASE_URL);
            // await this.db.connect();
            return true;
        }
        catch (e) {
            return false;
        }
    }

    async getAllNotes(user) {
        let listNote = [];
        try {
            var docs = await Note.find({ user: user }).exec();

            docs.forEach((note) => listNote.push({ objId: note._doc._id, title: note._doc.title, text: note._doc.text, color: note._doc.color }));

            return listNote;
        }
        catch (e) {
            return [];
        }
    }

    async insertNote(title, text, color, user) {
        try {
            await Note.create({ _id: null, user: user, title: title, text: text, color: color, user:user });
        }
        catch (e) {
            throw e;
        }
    }

    async registerUser(email, password) { 
        try {
            var docs = await User.findOne({email:email});
            if (docs!=null) {
                return false;
            }

            else {
                await User.create({ _id: null, email: email, password: password });
                return true;
            }
            
        }
        catch (e) {
            throw e;
        }
    }

    async authenticateUser(email, password) {
        try {
            var docs = await User.findOne({email:email});
            if (docs==null) {
                return false;
            }

            else {
                return docs.password == password & docs.email == email;
            }
        }
        catch (e) {
            throw e;
        }
    }

    async deleteNote(id) {
        try {
            await Note.findByIdAndDelete(id);
        }
        catch (e) {
            throw e;
        }
    }

    async updateNote(id, title, text) {
        try {
            await Note.updateOne({ _id: id }, { title: title, text: text }, {
                new: false
            });
        }
        catch (e) {
            throw e;
        }
    }
}

module.exports = { DBController }