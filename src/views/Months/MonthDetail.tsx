import React from "react";
import Layout from "../../components/layout/Layout";
import { Divider, Tab, Tabs } from "@heroui/react";
import { useLocation } from "react-router-dom";
import { monthFullNames } from "../../types/Month";

const MonthDetail: React.FC = () => {
    const location = useLocation();
    const { year, month } = location.state || {};

    return (
        <Layout page={1}>
            <div className="flex flex-col space-y-6">
                <span className="font-semibold">{`${monthFullNames[month - 1]} ${year}`}</span>
                <Divider></Divider>
                <Tabs aria-label="Options">
                    <Tab key="balances" title="Balances mensuales">
                        <div className="w-full bg-slate-200">
                            as
                        </div>
                    </Tab>
                    <Tab key="transactions" title="Movimientos">
                        assa
                    </Tab>   
                    
                </Tabs>
            </div>
        </Layout>
    );
}

export default MonthDetail;