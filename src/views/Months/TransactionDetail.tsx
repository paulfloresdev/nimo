import React from "react";
import Layout from "../../components/layout/Layout";
import { useLocation } from "react-router-dom";
import { Transaction } from "../../backend/store/features/monthTransactions/monthTransactionsSlice";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { formatDateToSpanish } from "./MonthTransactions";

interface TransactionDetailProps {
    title: string;
    data?: string | number;
    children?: React.ReactNode;
}

export const DetailItem: React.FC<TransactionDetailProps> = ({ title, data, children }) => {
    return (
        <div className="w-full flex flex-row justify-between">
            <span className="font-semibold">{title}:</span>
            {children ? children : <span>{data}</span>}
        </div>
    );
}

const TransactionDetail: React.FC = () => {
    const location = useLocation();
    const { transaction } = location.state as { transaction: Transaction };

    return (
        <Layout page={1}>
            <div className="flex flex-col h-full space-y-4">
                <span className="font-semibold">Detalle de movimiento</span>
                <div className="w-full flex flex-col justify-center items-center space-y-4">
                    <span className="text-sm">{formatDateToSpanish(transaction.transaction_date)}</span>
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex flex-col items-center justify-center">
                        <DynamicFaIcon className="w-16" name={transaction.category_icon} />
                    </div>
                    <span className="font-semibold">{transaction.concept}</span>
                    <span className="font-semibold text-lg">${transaction.amount.toFixed(2)}</span>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 ">
                    <DetailItem title="Fecha de movimiento" data={formatDateToSpanish(transaction.transaction_date)} />
                    <DetailItem title="Fecha de contabilidad" data={formatDateToSpanish(transaction.accounting_date)} />
                    <DetailItem title="">a</DetailItem>
                    <DetailItem title="" data={transaction.id} />
                    <DetailItem title="" data={transaction.id} />
                    <DetailItem title="" data={transaction.id} />
                    <DetailItem title="" data={transaction.id} />
                    <DetailItem title="" data={transaction.id} />
                </div>
            </div>
        </Layout>
    );
}

export default TransactionDetail;