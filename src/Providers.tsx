//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {HeroUIProvider} from "@heroui/react";
import store from './backend/store/config/store'; 
import { Provider } from 'react-redux';

interface ProviderProps {
    children: React.ReactNode;
}

//const queryClient = new QueryClient();

const Providers: React.FC<ProviderProps> = ({ children }) => (
    <Provider store={store}>
        <BrowserRouter>
            <HeroUIProvider>{children}</HeroUIProvider>
        </BrowserRouter>
    </Provider>
    
    
    /*<QueryClientProvider client={queryClient}>
        
    </QueryClientProvider>*/
);

export default Providers;