import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Select, SelectItem } from "@heroui/react";
import { useLocation } from "react-router-dom";
import { monthFullNames } from "../../types/Month";
import MonthTransactions from "./MonthTransactions";
import { MonthIncomeRelations } from "./MonthIncomeRelations";

const pages = [
    { key: 1, label: "Movimientos" },
    { key: 2, label: "Balances" },
    { key: 3, label: "Vinculados" },
]

const MonthDetail: React.FC = () => {
    const location = useLocation();
    const { year, month } = location.state || {};
    const [page, setPage] = useState<number>(1);

    return (
        <Layout page={1}>
            <div className="flex flex-col h-full">
                <div className="w-full flex flex-row items-center mb-4 space-x-4">
                    <span className="font-semibold">{`${monthFullNames[month - 1]} ${year}`}</span>
                    <Select
                        variant="flat"
                        className="w-1/6"
                        labelPlacement="outside-left"
                        value={page.toString()} // Asegúrate de convertir a string (si `value` espera string)
                        placeholder="Movimientos"
                        onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            if (!isNaN(newValue)) { // Validación adicional
                                setPage(newValue);
                            } else {
                                setPage(1); // Si por algún motivo no es número, vuelve a 1
                            }
                        }}
                        defaultSelectedKeys={["1"]} // Fuerza que el valor inicial sea 1
                        disallowEmptySelection // Evita que se deseleccione
                    >
                        {pages.map((category) => (
                            <SelectItem key={category.key.toString()}>
                                {category.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                {page == 1 && <MonthTransactions year={year} month={month} />}
                {page == 3 && <MonthIncomeRelations year={year} month={month} />}

            </div>
        </Layout>
    );
}

export default MonthDetail;