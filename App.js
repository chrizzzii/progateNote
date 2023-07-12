import React, { useState } from 'react'
import Home from './src/screens/home'
import AddNote from './src/screens/addNote'
import EditNote from './src/screens/editNote'

// Tambahkan function "addNote" sebagai prop
const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  setSelectedNoteId,
  selectedNoteId,
  addNote,
  editNote,
  deleteNote
}) => {

  switch (currentPage) {
    case 'home':
      return <Home noteList={noteList} setCurrentPage={setCurrentPage} setSelectedNoteId={setSelectedNoteId} deleteNote={deleteNote} />
    case 'add':
      // Berikan function "addNote" ke component "AddNote"
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />
    case 'edit': 
      return <EditNote noteList={noteList} setCurrentPage={setCurrentPage} selectedNoteId={selectedNoteId} editNote={editNote}/>
    case 'delete':
      return <DeleteNote setCurrentPage={setCurrentPage}/>
    default:
      return <Home />
  }
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: 'Note pertama',
      desc:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
  ])

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1
    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc: desc,
      },
    ]);
  };

  const editNote = (updatedNote) => {
    const updatedNoteList = noteList.map((note) => {
      if (note.id === updatedNote.id) {
        return {
          ...note,
          title: updatedNote.title,
          desc: updatedNote.desc,
        };
      }
      return note;
    });
    setNoteList(updatedNoteList);
  };

  const deleteNote = (noteId) => {
    const updatedNoteList = noteList.filter((note) => note.id !== noteId);
    setNoteList(updatedNoteList);
  };
  

  return (
    <CurrentPageWidget
      currentPage={currentPage}
      noteList={noteList}
      setCurrentPage={setCurrentPage}
      selectedNoteId={selectedNoteId}
      setSelectedNoteId={setSelectedNoteId}
      // Berikan function addNote sebagai prop
      addNote={addNote}
      editNote={editNote} 
      deleteNote={deleteNote}
      //deleteNote={deleteNote}
    />
  );
};

export default App;