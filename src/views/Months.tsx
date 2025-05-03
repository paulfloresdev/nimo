import React from "react";
import Layout from "../components/layout/Layout";
import { Tab, Tabs } from "@heroui/react";

const Months: React.FC = () => {
    return (
        <Layout page={1}>
            <div className="w-">
                <span className="font-semibold">Presupuestos mensuales</span>
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

export default Months;
