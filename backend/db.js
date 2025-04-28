require('dotenv').config();
const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    title: String,
    text: String,
    color: Number
});

const Note = mongoose.model('Note', noteSchema,'notes collection');

class DBController{
    
    static db = null;
    DBController()
    {
    }
    
    async connect()
    {
        try{
            this.db = await mongoose.connect(process.env.DATABASE_URL);
            // await this.db.connect();
            return true;
        }
        catch(e){
            return false;
        }
    }

    async getAllNotes()
    {
        let listNote = [];
        try{
            var docs = await Note.find();
            docs.forEach((note)=> listNote.push({objId: note._id, title: note.title,text: note.text,color: note.color}));
            
            return listNote;
        }
        catch(e){
            return [];
        }
    }

    async insertNote(title, text, color)
    {
        try{
            await Note.create({_id: null, title: title, text: text, color: color});            
        }
        catch(e){
            throw e;
        }
    }

    async deleteNote(title, text, color)
    {
        try{
            await Note.findByIdAndDelete(id);           
        }
        catch(e){
            throw e;
        }
    }

    async updateNote(id, title, text)
    {
        try{
            await Note.updateOne({_id: id}, {title: title, text: text},{
                new: false
              });           
        }
        catch(e){
            throw e;
        }
    }
}

module.exports = {DBController}