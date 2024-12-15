import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CandidateList from "./components/CandidateList";
import Header from "./components/Header/Header.component";
import BackToTop from './components/BackToTop/BackToTop';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Layout component pour les pages avec header
const WithHeaderLayout = ({ children }) => (
  <>
    <Header />
    <div className="main-content">
      <div className="container">
        {children}
      </div>
    </div>
    <BackToTop />
  </>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <HomePage />
              <BackToTop />
            </>
          } />
          <Route path="/all-candidates" element={
            <WithHeaderLayout>
              <CandidateList />
            </WithHeaderLayout>
          } />
          <Route path="/category/:categoryId" element={
            <WithHeaderLayout>
              <CategoryPage />
            </WithHeaderLayout>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
