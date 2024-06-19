import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ServiceListPage from './components/ServiceListPage';
import ServiceDetailPage from './components/ServiceDetailPage';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<ServiceListPage />} />
                    <Route path="/:id/details" element={<ServiceDetailPage />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
