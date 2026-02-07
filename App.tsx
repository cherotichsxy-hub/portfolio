
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Creator from './pages/Creator';
import Producer from './pages/Producer';
import SideProjects from './pages/SideProjects';
import YearReview from './pages/YearReview';

const PageWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

const App: React.FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/creator" element={<PageWrapper><Creator /></PageWrapper>} />
          <Route path="/producer" element={<PageWrapper><Producer /></PageWrapper>} />
          <Route path="/explorer" element={<PageWrapper><SideProjects /></PageWrapper>} />
          <Route path="/review" element={<PageWrapper><YearReview /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
