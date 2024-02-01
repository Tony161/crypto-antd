import React from 'react';
import {CryptoContextProvider} from './context/crypto-context.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import './App.scss';

export default function App() {
    return (
        <CryptoContextProvider>
            <AppLayout />
        </CryptoContextProvider>
    );
}
