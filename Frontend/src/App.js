import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Subject from './components/pages/subjects';
import Book from './components/pages/books';
import Publication from './components/pages/publication';
import School from './components/pages/schools';
import Contact from './components/pages/contact';
import About from './components/pages/about';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home';
import httpService from './services/http.service';
import { useState } from 'react';
import { useEffect } from 'react';
import Store from './components/pages/store';

function App() {
  const [publishers, setPublishers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [books, setBooks] = useState([])

  async function getPublisher() {
    const response = await httpService.get('/company/getallcompany')
    setPublishers(response.data)
  }

  async function getSubjects() {
    const response = await httpService.get('/subject/getallsubject')
    setSubjects(response.data)
  }

  async function getBooks() {
    const response = await httpService.get('/books/getallbook')
    setBooks(response.data)
  }

  useEffect(() => {
    getPublisher();
    getSubjects();
    getBooks();
  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/schools' element={<School />} />
          <Route path='/books' element={<Book
            subjects={subjects.map((ele)=> ele.SubjectCode)}
            publishers={publishers.map((ele)=> ele.CompanyCode)}
            books={books}
            getBooks={getBooks}
          />} />
          <Route path='/store' element={<Store
            subjects={subjects.map((ele)=> ele.SubjectCode)}
            publishers={publishers.map((ele)=> ele.CompanyCode)}
            books={books}
            getBooks={getBooks}
          />} />
          <Route path='/publications' element={<Publication
            publishers={publishers}
            getPublisher={getPublisher}
          />} />
          <Route path='/subjects' element={<Subject
            subjects={subjects}
            getSubjects={getSubjects}
          />} />
          <Route path='/' exact element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
