const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log("New note ADDED")
    } else {
        console.log("The title already exists!")
    }

    

}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {
        return []
    }
    
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.red('your notes:'))
    console.log(notes)
}
const readNote = (title) => {
    const notes = loadNotes()
    const found = false
    const findNote = notes.forEach((note) => {
        if (note.title === title) {
            console.log(chalk.red(note.body))
            found = true
        }
    })
    
    if (!found) {
        console.log("Error!")
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgRed.black("Note removed!!!"))
        saveNotes(notesToKeep)
        
    } else {
        console.log(chalk.blue("There is no title to be removed"))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}