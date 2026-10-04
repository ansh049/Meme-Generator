
import './App.css';
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './pages/Home';
import EditPage from './pages/Edit';
function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Meme Generator home">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>meme<span className="brand-accent">lab</span></span>
        </a>
        <span className="header-tagline">Good memes. Great moods.</span>
      </header>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/edit" element={<EditPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
