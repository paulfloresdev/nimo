import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../backend/store/config/store";
import { getMonthTransactionsRequest } from "../../backend/store/features/monthTransactions/monthTransactionsSlice";
import { Button, Input, Pagination, Select, SelectItem, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { getAllCardsRequest } from "../../backend/store/features/allCards/allCardsSlice";
const baseUrl = import.meta.env.VITE_SITE_BASE_STORAGE_URL_BACKEND;

interface MonthTransactionsProps {
    year: number;
    month: number;
}

export const formatDateToSpanish = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    });
};

export const categories = [
    {key: undefined, label: "Todas"},
    {key: 1, label: "Hogar"},
    {key: 2, label: "Transporte"},
    {key: 3, label: "Alimentación"},
    {key: 4, label: "Trabajo y educación"},
    {key: 5, label: "Ropa y cuidado personal"},
    {key: 6, label: "Salud"},
    {key: 7, label: "Entretenimiento y ocio"},
    {key: 8, label: "Regalos y donaciones"},
    {key: 9, label: "Ahorro e inversión"},
    {key: 10, label: "Deudas y obligaciones"},
    {key: 11, label: "Mascotas"},
    {key: 12, label: "Otros"},
]

export const types = [
    {key: undefined, label: "Todos"},
    {key: 1, label: "Ingreso"},
    {key: 2, label: "Gasto"},
    {key: 3, label: "Pago de TDC"},
]

export const cardTypes = [
    {key: undefined, label: "Todos"},
    {key: 1, label: "Débito"},
    {key: 2, label: "Crédito"},
]

export const orderByOptions = [
    {key: 1, label: "Contabilidad Más antigua"},
    {key: 2, label: "Contabilidad Más reciente"},
    {key: 3, label: "Transacción Más antigua"},
    {key: 4, label: "Transacción Más reciente"},
    {key: 5, label: "Creación más antigua"},
    {key: 6, label: "Creación más reciente"},
]

const MonthTransactions: React.FC<MonthTransactionsProps> = ({ year, month }) => {
    const dispatch = useDispatch();
    const { transactions, loading, error } = useSelector(
        (state: RootState) => state.month_transactions
    );
    const { cards, loading: loadingCards, error: errorCards } = useSelector((state: RootState) => state.all_cards);
    
    const [concept, setConcept] = useState<string|undefined>(undefined);
    const [amount, setAmount] = useState<string|undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number|undefined>(undefined);
    const [transactionTypeId, setTransactionTypeId] = useState<number|undefined>(undefined);
    const [cardType, setCardType] = useState<number|undefined>(undefined);
    const [cardId, setCardId] = useState<number|undefined>(undefined);
    const [orderBy, setOrderBy] = useState<number>(1);

    useEffect(() => {
        dispatch(
            getMonthTransactionsRequest({
                year: year,
                month: month,
                data: {
                    order_by: orderBy,
                    per_page: 10,
                    page: 1,
                    amount: undefined
                },
            }),
        );
        dispatch(getAllCardsRequest());
    }, [dispatch]);

    const refreshData = () => {
        dispatch(
            getMonthTransactionsRequest({
                year: year,
                month: month,
                data: {
                    concept: concept === "" ? undefined : concept,
                    order_by: 2,
                    per_page: 20,
                    page: 1,
                },
            })
        );
    }

    const classNames = React.useMemo(
        () => ({
        wrapper: ["", "max-w-full"],
        th: ["bg-transparent", "text-gray-500", "border-b", "border-divider", "font-semibold"],
        td: [
            // changing the rows border radius
            // first
            "group-data-[first=true]/tr:first:before:rounded-none",
            "group-data-[first=true]/tr:last:before:rounded-none",
            // middle
            "group-data-[middle=true]/tr:before:rounded-none",
            // last
            "group-data-[last=true]/tr:first:before:rounded-none",
            "group-data-[last=true]/tr:last:before:rounded-none",
        ],
        }),
        [],
    );

    return (
        <div className="h-full">
            {/* DESKTOP */}
            <div className="hidden lg:block w-full h-full bg-white p-6 rounded-xl border-solid border-1">
                <div className="w-full flex flex-col justify-center items-center gap-4 mb-8">
                    <div className="w-full h-16 flex flex-row justify-between items-start gap-4">
                        <Input
                            variant="bordered"
                            className="w-4/12"
                            label="Concepto"
                            placeholder="Pago de nómina"
                            type="text"
                            labelPlacement="outside"
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                        />
                        <Input
                            variant="bordered"
                            className="w-2/12"
                            label="Monto"
                            placeholder="$999.99"
                            type="number"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            labelPlacement="outside"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <Select 
                        variant="flat"
                        className="w-2/12"
                        label="Categoria"
                        labelPlacement="outside"
                        value={categoryId}
                        onChange={(e) => setCategoryId(parseInt(e.target.value))}
                        >
                        {categories.map((category) => (
                                <SelectItem key={category.key}>{category.label}</SelectItem>
                        ))}
                        </Select>
                        <Select 
                        variant="flat"
                        className="w-2/12"
                        label="Tipo de movimiento"
                        labelPlacement="outside"
                        value={transactionTypeId}
                        onChange={(e) => setTransactionTypeId(parseInt(e.target.value))}
                        >
                        {types.map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
                        ))}
                        </Select>
                        <Select 
                        variant="flat"
                        className="w-1/12"
                        label="Tipo tarjeta"
                        labelPlacement="outside"
                        value={cardType}
                        onChange={(e) => {
                            setCardType(parseInt(e.target.value));
                            setCardId(undefined);
                        }}
                        >
                        {cardTypes.map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
                        ))}
                        </Select>
                        {(!loadingCards && cards?.debit.length !== undefined && cards?.debit.length > 0) ? (
                            <Select 
                            variant="flat"
                            className="w-2/12"
                            label="Tarjeta"
                            labelPlacement="outside"
                            value={cardId}
                            onChange={(e) => setCardId(parseInt(e.target.value))}
                            >
                            {
                                cardType === 1 ? (
                                    cards!.debit.map((card) => (
                                    <SelectItem key={card.id}>
                                        {`${card.bank.name} - ${card.numbers}`}
                                    </SelectItem>
                                    ))
                                ) : cardType === 2 ? (
                                    cards!.credit.map((card) => (
                                    <SelectItem key={card.id}>
                                        {`${card.bank.name} - ${card.numbers}`}
                                    </SelectItem>
                                    ))
                                ) : (
                                    cards!.debit.map((card) => (
                                    <SelectItem key={card.id}>
                                        {`${card.bank.name} - ${card.numbers}`}
                                    </SelectItem>
                                    )),
                                    cards!.credit.map((card) => (
                                    <SelectItem key={card.id}>
                                        {`${card.bank.name} - ${card.numbers}`}
                                    </SelectItem>
                                    ))
                                )
                            }
                            </Select>
                            ) : 
                            <div className=" w-1/6 h-16 flex flex-col justify-end">
                                <Skeleton className="rounded-md"><div className="w-full h-10">asas</div></Skeleton>
                            </div>
                        }
                        
                    </div>
                    <div className="w-full h-full flex flex-row items-end justify-start gap-4">
                        <Select 
                        variant="flat"
                        className="w-2/12"
                        label="Ordenar"
                        labelPlacement="outside"
                        value={orderBy}
                        onChange={(e) => {
                            setOrderBy(parseInt(e.target.value))
                        } }>
                        {orderByOptions.map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
                        ))}
                        </Select>
                        <Button className="bg-black text-white">Actualizar Filtros</Button>
                        <Button color="primary"><DynamicFaIcon name={"FaFileCsv"} className="text-white"/></Button>
                        <div>
                            {loading ? 
                                <div>

                                </div> : 
                                <div>
                                    
                                </div>
                            }
                        </div>
                    </div>
                </div>
                
                {
                    loading ? (
                        <div className="flex flex-col items-center justify-center">
                            Cargando...
                        </div>
                    ) : <>
                        <Table 
                        isCompact
                        removeWrapper
                        aria-label="Transacciones mensuales"
                        topContentPlacement="outside"
                        bottomContentPlacement="outside"
                        classNames={classNames}
                        >
                            <TableHeader className="bg-transparent">
                                <TableColumn className="text-gray-600 font-bold">CATEGORIA</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">CONCEPTO</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">MONTO</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">FECHA DE MOVIMIENTO</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">CUENTA DE BANCO</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">TARJETA</TableColumn>
                                <TableColumn className="text-gray-600 font-bold text-center">ACCIONES</TableColumn>
                            </TableHeader>
                            <TableBody>
                            {transactions?.data && transactions.data.length > 0 ? (
                                transactions.data.map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell className="w-1/12">
                                        <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-full"><DynamicFaIcon name={t.category_icon}/></div>
                                    </TableCell>
                                    <TableCell className="w-4/12">{t.concept}</TableCell>
                                    <TableCell className="font-semibold w-2/12">${t.amount.toFixed(2)}</TableCell>
                                    <TableCell className="w-2/12">{formatDateToSpanish(t.transaction_date) || "-"}</TableCell>
                                    <TableCell className="w-2/12">
                                        <div className="w-full flex flex-row r items-center space-x-1">
                                            <span>{t.card_bank_name || "-"}</span>
                                            <div className="bg-slate-200 p-1 rounded-md">
                                                <span>{t.card_type === 'CREDIT' ? 'Crédito' : 'Débito'}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-1/12">
                                        <div className="flex flex-row r items-center space-x-1">
                                            <div className={`${t.card_network_name === 'Visa' ? 'bg-blue-800' : ''} rounded-md w-11 p-2 flex flex-row justify-center items-center`}>
                                                <img src={`${baseUrl}${t.card_network}`} alt="" />
                                            </div>
                                            <span>{`${t.card_numbers || "-"}`}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell >
                                        <Button variant="light">
                                            <DynamicFaIcon name="FaEllipsisV"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                <TableCell colSpan={7} className="text-center text-gray-500">
                                    No hay transacciones en este mes.
                                </TableCell>
                                </TableRow>
                            )}
                            </TableBody>

                        </Table>
                        <div>
                            {transactions?.data?.length === 0 && (
                            <p className="text-gray-500 mt-4"></p>
                        )}
                        </div>
                    </>
                }
                
            </div>
            
        </div>
    );
};

export default MonthTransactions;
