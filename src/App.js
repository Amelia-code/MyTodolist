import React, { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const notesPerPage = 5;

  const handleAddNote = () => {
    if (title) {  // 제목이 있는지 확인
      const newNote = {
        title,
        content: content || '', // 내용이 없으면 빈 문자열로 저장
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식으로 변환
        id: notes.length + 1
      };
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
    }
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>메모제목</h1>
      <div className="form">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddNote}>메모추가</button>
      </div>
      <div className="notes">
        {currentNotes.map((note, index) => (
          <div key={note.id} className="note">
            <h2>{index + 1}. {note.title}</h2>
            <p>{note.date}</p>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
