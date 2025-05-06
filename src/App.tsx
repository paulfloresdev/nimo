import React from "react";
import Providers from "./Providers.tsx";
import AppRoutes from "./routes";


const App: React.FC = () => {
    return (
        <Providers>
            <div className="bg-white dark:bg-neutral-950 w-full h-full font-montserrat">
                <AppRoutes />
            </div>
        </Providers>
    );
}

export default App;