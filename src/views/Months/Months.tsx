import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getMonthsWith, getYearsWith } from "../../api/transactionsService";
import { Card, Divider, Select, SelectItem, Skeleton } from "@heroui/react";
import { monthNames, MonthYear } from "../../types/Month";

const Months: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
    const [years, setYears] = useState<number[]>([]);
    const [months, setMonths] = useState<MonthYear[]>([]);
    const [page, setPage] = useState<string | undefined>(undefined);
    const [loadingYears, setLoadingYears] = useState(true);
    const [loadingMonths, setLoadingMonths] = useState(false);

    useEffect(() => {
        getYearsWith()
        .then((res) => {
            setYears(res.data.data);
        })
        .catch((err) => {
            console.error('Error al obtener usuario:', err);
        })
        .finally(() => {
            setLoadingYears(false);
        });
    }, []);

    useEffect(() => {
        setLoadingMonths(true);
        getMonthsWith(selectedYear, page)
        .then((res) => {
            setMonths(res.data.data.data);
        })
        .catch((err) => {
            console.error('Error al obtener meses:', err);
        })
        .finally(() => {
            setLoadingMonths(false);
        });
    }, [selectedYear]);

    return (
        <Layout page={1}>
            <div className="flex flex-col space-y-6">
                <span className="font-semibold">Presupuestos mensuales</span>
                <Divider></Divider>
                <div >
                    {
                        loadingYears ? (
                            <div className="w-48 h-12">
                                <Skeleton className="rounded-md">
                                    <div className="h-10">as</div>
                                </Skeleton> 
                            </div>  
                        ) : ( 
                            <div className="w-48">
                                <Select
                                key={'inside'}
                                className="max-w-xs"
                                label="Año:"
                                labelPlacement={'outside-left'}
                                placeholder="Todos"
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                >
                                {years.map((year) => (
                                    <SelectItem key={year}>{year.toString()}</SelectItem>
                                ))}
                                </Select>
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        loadingMonths ? (
                            <Skeleton className="h-10 w-32 rounded-md" />
                        ) : (
                            <div>
                                <div className="grid gap-x-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                    {months.map((m) => (
                                        <Card key={m.month+m.year} className="rounded-md flex flex-col justify-center items-center gap-y-4 p-4" isHoverable={true}>
                                            <span className="font-semibold">{monthNames[m.month - 1]}</span>
                                            <span className="text-sm">{m.year}</span>
                                        </Card>
                                    ))}
                                    {months.length === 0 && (
                                        <span className="text-gray-500">No hay transacciones en este año</span>
                                    )}
                                </div>
                                
                            </div>
                        )
                    }
                </div>
                
            </div>
        </Layout>
    );
};

export default Months;
