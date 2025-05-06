import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getMonthsWith } from "../../api/transactionsService";
import { Divider, Select, SelectItem, Skeleton } from "@heroui/react";
import { GetMonthsWithResponse } from "../../types/Month";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../backend/store/config/store";
import { getYearsWithRequest } from "../../backend/store/features/yearsWith/yearsWithSlice";

const MonthList: React.FC = () => {
    const dispatch = useDispatch();
    const { years, loading: loadingYears, error: errorYears } = useSelector((state: RootState) => state.years_with);
    const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);

    const [monthsWithData, setMonthsWithData] = useState<GetMonthsWithResponse | undefined>(undefined);
    const [page, setPage] = useState<string | undefined>(undefined);
    const [loadingMonths, setLoadingMonths] = useState(false);

    useEffect(() => {
            dispatch(getYearsWithRequest());
        }, [dispatch]);

    useEffect(() => {
        setLoadingMonths(true);
        getMonthsWith(selectedYear, page)
        .then((res) => {
            setMonthsWithData(res.data);
            console.log(monthsWithData);
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
                                {years === null ? null : years.map((year) => (
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
                            <div className="w-full grid gap-x-4 gap-y-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {[...Array(12)].map((_, index) => (
                                <Skeleton key={index} className="rounded-md h-24 w-full" />
                            ))}
                            </div>

                        ) : (
                            <div>
                                <div className="grid gap-x-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                    <span>{`${monthsWithData?.data}`}</span>
                                {
                                    /*
                                        {months.map((m) => (
                                            <Card key={m.month+m.year} className="rounded-md flex flex-col justify-center items-center gap-y-4 p-4" isHoverable={true}>
                                                <span className="font-semibold">{monthNames[m.month - 1]}</span>
                                                <span className="text-sm">{m.year}</span>
                                            </Card>
                                        ))}
                                        {months.length === 0 && (
                                            <span className="text-gray-500">No hay transacciones en este año</span>
                                        )}
                                    */
                                }
                                    
                                </div>
                                
                            </div>
                        )
                    }
                </div>
                
            </div>
        </Layout>
    );
};

export default MonthList;
