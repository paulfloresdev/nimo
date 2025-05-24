import React from "react";
import Layout from "../../components/layout/Layout";

const TransactionEdit: React.FC = () => {
    return (
        <Layout page={1}>
            <div className="flex flex-col h-full">
                <span className="font-semibold">Editar movimiento</span>
            </div>
        </Layout>
    );
}

export default TransactionEdit;