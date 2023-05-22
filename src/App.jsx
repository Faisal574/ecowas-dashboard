// react-router-dom Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components Import
import Layout from "./components/layout/Layout";
import Nav from "./components/layout/Nav";
import CreateSankey from "./pages/CreateSankey";
import SavedSankey from "./pages/SavedSankey";
import MembersSankey from "./pages/MembersSankey";

function App() {
  return (
    <Router>
      <Nav />

      <Routes>
        {/* Create Sankey */}
        <Route
          path="/:country"
          element={
            <Layout>
              <CreateSankey />
            </Layout>
          }
        />
        {/* Saved Sankey */}
        <Route
          path="/saved-sankeys"
          element={
            <Layout>
              <SavedSankey />
            </Layout>
          }
        />
        {/* Members Sankey */}
        <Route
          path="/members-sankeys"
          element={
            <Layout>
              <MembersSankey />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
