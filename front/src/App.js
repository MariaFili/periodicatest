import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Main from "./components/main"





function App() {
  return (
    <Router>
      <div className="container">
<br/>
<Route path = "/" exact component={Main}/>
</div>
    </Router>
  );
}

export default App;
