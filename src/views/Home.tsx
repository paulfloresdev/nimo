import React from "react";
import Layout from "../components/layout/Layout";
import { Card, CardBody, Tab, Tabs } from "@heroui/react";

const Home: React.FC = () => {
    return (
        <Layout page={0}>
            <div>
                <span className="font-semibold">Mis tarjetas</span>
            </div>
            <Tabs aria-label="Options">
                <Tab key="photos" title="Movimientos">
                    assa
                </Tab>
                <Tab key="accounts" title="Cuentas de banco">
                    assa
                </Tab>   
                
            </Tabs>
        </Layout>
    );
};

export default Home;
