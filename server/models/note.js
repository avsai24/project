const con = require("./db_connect");

//creating table for note
async function createTable() {
    let sql=`CREATE TABLE IF NOT EXISTS notes (
        noteID INT NOT NULL AUTO_INCREMENT,
        feedback VARCHAR(1000) NOT NULL,
        userID INT NOT NULL,
        CONSTRAINT  notePK PRIMARY KEY (noteID),
        CONSTRAINT note_FK FOREIGN KEY (userID) REFERENCES users(userID)

    ); `
    await con.query(sql);
  }
  createTable();
  
//crud operations

//create a feedback
async function createNote(note){

  //let create =await getNote(note);
    const sql =`INSERT INTO notes(feedback, userID)
    VALUES ("${note.feedback}", ${note.userID});`
 
    await con.query(sql);
  
}

//grabbing all notes in database
async function getAllNotes() {
    const sql = `SELECT * FROM notes;`;
    let notes = await con.query(sql);
    console.log(notes)
}

//updating feedback
async function editNote(note){
    let sql = `UPDATE notes
     SET feedback = "${note.feedback}"
     WHERE noteID = ${note.noteID}
     `;

     await con.query(sql);
     let updatedNote = await getNote(note);
     return updatedNote[0];
}

// deleting feedback
async function deleteNote(note){
    let sql = `DELETE FROM notes
     WHERE noteID = ${note.noteID}
     `
     await con.query(sql);
}

//useful function
async function getNote(note) {
    let sql;
    if(note.userID) {
      sql = `
        SELECT * FROM notes
         WHERE userID = ${note.userID};
      `;
    }
    else{
      sql = `select * from notes where noteID = ${note.noteID}`;
    }
    return await con.query(sql);  
  }

module.exports = {createNote, getNote, editNote, deleteNote, getAllNotes}