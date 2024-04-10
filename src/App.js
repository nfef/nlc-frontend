import CandidateList from "./components/CandidateList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/Header/Header.component";


function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
      <div className="candidat-list">
      <CandidateList />
      </div>
    </div>
    </div>
  );
}

export default App;
