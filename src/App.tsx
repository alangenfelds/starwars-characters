import React from "react";
import CharacterList from "./components/CharacterList/CharacterList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <CharacterList />
      <Footer />
    </div>
  );
};

export default App;
