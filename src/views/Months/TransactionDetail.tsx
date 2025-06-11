import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useLocation } from "react-router-dom";
import { Transaction } from "../../backend/store/features/monthTransactions/monthTransactionsSlice";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { formatDateToSpanish } from "./MonthTransactions";
import { Card, Divider } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../backend/store/config/store";
import { getIncomeRelationsRequest } from "../../backend/store/features/incomeRelations/incomeRelationsSlice";
import { div, span } from "framer-motion/client";
const baseUrl = import.meta.env.VITE_SITE_BASE_STORAGE_URL_BACKEND;

interface TransactionDetailProps {
    title: string;
    data?: string | number;
    children?: React.ReactNode;
}

export const DetailItem: React.FC<TransactionDetailProps> = ({ title, data, children }) => {
    return (
        <div className="w-full flex flex-row justify-between text-base">
            <span>{title}:</span>
            {children ? children : <span className="font-medium">{data}</span>}
        </div>
    );
}

const TransactionDetail: React.FC = () => {
    const dispatch = useDispatch();
    const { data: incomeRelations, loading } = useSelector(
        (state: RootState) => state.income_relations
    );
    const location = useLocation();
    const { transaction, contact } = location.state as { transaction: Transaction, contact?: { id: number, alias: string } };
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch(
            getIncomeRelationsRequest({
                from_id: transaction.type === 'INCOME' ? transaction.id : undefined,
                to_id: transaction.type === 'EXPENSE' ? transaction.id : undefined,
                page: currentPage,
            })
        );
    }, [dispatch]);

    return (
        <Layout page={1}>
            <div className="flex flex-col w-full h-full space-y-4">
                <div className="w-full h-full flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 lg:justify-center">
                    <Card className={`w-full ${transaction.income_relation_count > 0 ? 'lg:w-5/12' : 'lg:w-12/12'} p-6 flex flex-col items-center space-y-6`}>
                        <span className="font-semibold">Detalle de movimiento</span>
                        <span className="text-sm">{formatDateToSpanish(transaction?.transaction_date ?? "")}</span>
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex flex-col items-center justify-center">
                            <DynamicFaIcon className="w-16" name={transaction.category_icon} />
                        </div>
                        <span className="font-medium">{transaction.concept}</span>
                        <span className={`font-semibold text-lg ${transaction.amount > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>${transaction.amount.toFixed(2)}</span>
                        <div className="bg-slate-100 p-2 rounded-md">
                            {contact ? (
                                <span className="font-medium text-slate-500">{contact.alias}</span>
                            ) : (
                                <span className="font-medium text-slate-500">{transaction.type == 'INCOME' ? 'Ingreso' : transaction.type == 'EXPENSE' ? 'Gasto' : 'Pago de tarjeta'}</span>
                            )
                            }
                        </div>
                        <div className={`w-full grid grid-cols-1 ${transaction.income_relation_count > 0 ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-x-6 gap-y-3`}>
                            <DetailItem title="Fecha de movimiento" data={formatDateToSpanish(transaction.transaction_date)} />
                            <DetailItem title="Fecha de contabilidad" data={formatDateToSpanish(transaction.accounting_date)} />
                            <DetailItem title="Cuenta de banco" data={transaction.card_bank_name ?? ''} />
                            <DetailItem title="Tipo de cuenta" data={transaction.card_type == 'DEBIT' ? 'Débito' : 'Crédito'} />
                            <DetailItem title="Tarjeta">
                                <div className="flex flex-row r items-center space-x-1">
                                    <div className={`${transaction.card_network_name === 'Visa' ? 'bg-blue-800' : ''} rounded-md w-11 p-2 flex flex-row justify-center items-center`}>
                                        <img src={`${baseUrl}${transaction.card_network}`} alt="" />
                                    </div>
                                    <span>{`${transaction.card_numbers || "-"}`}</span>
                                </div>
                            </DetailItem>
                            <DetailItem title="Actualizado" data={formatDateToSpanish(transaction?.updated_at ?? "")} />
                            <DetailItem title="Notas" />
                            <span className="text-sm text-slate-500">{transaction.notes ?? 'Sin notas.'}</span>
                        </div>
                    </Card>
                    <Divider className="hidden lg:block" orientation="vertical"></Divider>
                    <Divider className="block lg:hidden"></Divider>
                    <div className={`w-full ${transaction.income_relation_count > 0 ? 'lg:w-7/12' : 'lg:w-12/12'} flex flex-col items-center space-y-6`}>
                        <span className="font-semibold ">{transaction.type == 'INCOME' ? 'Gasto vinculado' : `Ingresos vinculados (${transaction.income_relation_count})`}</span>
                        {
                            loading ? (
                                <div className="w-full text-center">
                                    <span>Cargando...</span>
                                </div>
                            ) : (
                                <div className="w-full">
                                    {
                                        incomeRelations && incomeRelations.length > 0 ? (
                                            <div className="w-full flex flex-col space-y-4">
                                                {incomeRelations.map((relation) => {
                                                    const isIncome = transaction.type === "INCOME";
                                                    const relatedTransaction = isIncome ? relation.to_transaction : relation.from_transaction;

                                                    return (
                                                        <Card key={relation.id} className="w-full p-4 flex flex-row items-start space-x-3">
                                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex flex-col items-center justify-center">
                                                                <DynamicFaIcon className="w-16" name={relatedTransaction?.category_icon ?? ""} />
                                                            </div>
                                                            <div className="w-full flex flex-col space-y-3">
                                                                <div className="w-full flex flex-row justify-between">
                                                                    <div className="flex flex-row items-center space-x-2">
                                                                        {transaction.type !== 'INCOME' && (
                                                                            <div className="bg-slate-100 px-2 py-1 rounded-md">
                                                                                <span className="font-medium text-slate-500">
                                                                                    {relation.contact?.alias || 'Sin alias'}
                                                                                </span>
                                                                            </div>
                                                                        )}

                                                                        <span className="font-medium">
                                                                            {relatedTransaction?.concept}
                                                                        </span>
                                                                    </div>
                                                                    <span className={`font-semibold text-lg ${relatedTransaction!.amount > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                                        ${relatedTransaction?.amount.toFixed(2)}
                                                                    </span>
                                                                </div>
                                                                <div className="w-full flex flex-row justify-between">
                                                                    <div className="flex flex-row r items-center space-x-1">
                                                                        <div className={`${relatedTransaction?.card_network_name === 'Visa' ? 'bg-blue-800' : ''} rounded-md w-11 p-2 flex flex-row justify-center items-center`}>
                                                                            <img src={`${baseUrl}${relatedTransaction?.card_network}`} alt="" />
                                                                        </div>
                                                                        <span>{`${relatedTransaction?.card_numbers || "-"}`}</span>
                                                                    </div>
                                                                    <div className="flex flex-row items-center space-x-2">
                                                                        <span className="font-medium">
                                                                            {relatedTransaction?.card_bank_name || 'Sin banco'}
                                                                        </span>
                                                                        <div className="bg-slate-100 px-2 py-1 rounded-md">
                                                                            <span className="font-medium text-slate-500">
                                                                                {relatedTransaction?.card_type === 'DEBIT' ? 'Débito' : 'Crédito'}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full flex flex-row justify-between">
                                                                    <span className="text-sm text-slate-500">{formatDateToSpanish(relatedTransaction?.transaction_date ?? "")}</span>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    );
                                                })}

                                            </div>
                                        ) : (
                                            <div className="w-full text-center">
                                                <span>No hay relaciones de ingresos.</span>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>



                {/* 
                
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
    */}
            </div >
        </Layout >
    );
}

export default TransactionDetail;