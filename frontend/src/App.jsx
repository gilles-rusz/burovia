import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './capes/capes.css';
import Layout from './capes/Layout';
import Accueil from './capes/pages/Accueil';
import Comprendre from './capes/pages/Comprendre';
import Episode from './capes/pages/Episode';
import Journal from './capes/pages/Journal';
import ParlonsEn from './capes/pages/ParlonsEn';
import Soutenir from './capes/pages/Soutenir';
import Mentions from './capes/pages/Mentions';
import Introuvable from './capes/pages/Introuvable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="comprendre" element={<Comprendre />} />
          <Route path="comprendre/:slug" element={<Episode />} />
          <Route path="journal" element={<Journal />} />
          <Route path="parlons-en" element={<ParlonsEn />} />
          <Route path="soutenir" element={<Soutenir />} />
          <Route path="mentions-legales" element={<Mentions />} />
          <Route path="*" element={<Introuvable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
