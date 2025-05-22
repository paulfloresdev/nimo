import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Card, Divider, Pagination, Select, SelectItem, Skeleton } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../backend/store/config/store";
import { getYearsWithRequest } from "../../backend/store/features/yearsWith/yearsWithSlice";
import { getMonthsWithRequest } from "../../backend/store/features/monthsWith/monthsWithSlice";
import { monthNames } from "../../types/Month";
import { useNavigate } from "react-router-dom";

const MonthList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { years, loading: loadingYears } = useSelector((state: RootState) => state.years_with);
    const { data: months, totalPages, page, loading: loadingMonths } = useSelector((state: RootState) => state.months_with);
    const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number | undefined>(page ?? 1);

    useEffect(() => {
        dispatch(getYearsWithRequest());
        dispatch(getMonthsWithRequest({year: undefined, page:undefined}))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getMonthsWithRequest({ year: selectedYear, page: currentPage }));
    }, [selectedYear, currentPage]);
    


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
                                value={selectedYear}
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
                            <div>
                                <div className="w-full grid gap-x-4 gap-y-4 grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 mb-6">
                                {[...Array(12)].map((_, index) => (
                                    <Skeleton key={index} className="rounded-md h-24 w-full" />
                                ))}
                                </div>
                                <Skeleton className="rounded-md w-32">
                                    <div className="h-10">as</div>
                                </Skeleton> 
                            </div>
                            
                            

                        ) : (
                            <div>
                                <div className="grid gap-x-4 gap-y-4 grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 mb-6">
                                {
                                    months.map((m) => (
                                        <div
                                        onClick={() => {
                                            navigate('/dashboard/month', { state: { year: m.year, month: m.month } });
                                        }}
                                        >
                                            <Card
                                            key={`${m.year}-${m.month}`}
                                            className="rounded-md flex flex-col justify-center items-center gap-y-4 p-4 cursor-pointer hover:border-gray-400 border-solid border-1"
                                            isHoverable={true}
                                            >
                                            <span className="font-semibold">{monthNames[m.month - 1]}</span>
                                            <span className="text-sm">{m.year}</span>
                                            </Card>
                                        </div>
                                        

                                    ))
                                }
                                {
                                    months.length === 0 && (
                                        <span className="text-gray-500">No hay transacciones en este año</span>
                                    )
                                }    
                                </div>
                                <Pagination
                                isCompact
                                showControls
                                page={currentPage}
                                onChange={(page) => {
                                    setCurrentPage(page);
                                }}
                                total={totalPages}
                                className={totalPages > 1 ? '' : 'hidden'}
                                />
                            </div>
                        )
                    }
                </div>
                
                
            </div>
        </Layout>
    );
};

export default MonthList;
