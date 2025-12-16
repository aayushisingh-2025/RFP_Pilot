import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AssessmentView from './components/AssessmentView';
import DraftView from './components/DraftView';
import QuestionsView from './components/QuestionsView';

function App() {
  return (
    <Router>
      {/* Global App Container */}
      <div className="min-h-screen text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Dashboard with Nested Routes */}
          <Route path="/dashboard/:id" element={<DashboardPage />}>
            <Route index element={<AssessmentView />} />
            <Route path="draft" element={<DraftView />} />
            <Route path="questions" element={<QuestionsView />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
