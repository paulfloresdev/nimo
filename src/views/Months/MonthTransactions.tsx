import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../backend/store/config/store";
import { getMonthTransactionsRequest } from "../../backend/store/features/monthTransactions/monthTransactionsSlice";
import { Autocomplete, AutocompleteItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Progress, Select, SelectItem, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { getAllCardsRequest } from "../../backend/store/features/allCards/allCardsSlice";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_SITE_BASE_STORAGE_URL_BACKEND;

interface MonthTransactionsProps {
    year: number;
    month: number;
}

export const formatDateToSpanish = (dateString: string) => {
    const date = new Date(dateString);


    const esDate = date.toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const parts = esDate.split(" de ");

    return `${parts[0]} ${parts[1].slice(0, 3)} ${parts[2]}`;
};

export const categories = [
    { key: undefined, label: "Todas" },
    { key: 1, label: "Hogar" },
    { key: 2, label: "Transporte" },
    { key: 3, label: "Alimentación" },
    { key: 4, label: "Trabajo y educación" },
    { key: 5, label: "Ropa y cuidado personal" },
    { key: 6, label: "Salud" },
    { key: 7, label: "Entretenimiento y ocio" },
    { key: 8, label: "Regalos y donaciones" },
    { key: 9, label: "Ahorro e inversión" },
    { key: 10, label: "Deudas y obligaciones" },
    { key: 11, label: "Mascotas" },
    { key: 12, label: "Otros" },
]

export const types = [
    { key: undefined, label: "Todos" },
    { key: 1, label: "Ingreso" },
    { key: 2, label: "Gasto" },
    { key: 3, label: "Pago de TDC" },
]

const cardTypes = [
    { key: undefined, label: "Todos" },
    { key: 1, label: "Débito" },
    { key: 2, label: "Crédito" },
]

export const orderByOptions = [
    { key: 1, label: "Contabilidad Más antigua" },
    { key: 2, label: "Contabilidad Más reciente" },
    { key: 3, label: "Transacción Más antigua" },
    { key: 4, label: "Transacción Más reciente" },
    { key: 5, label: "Creación más antigua" },
    { key: 6, label: "Creación más reciente" },
]

const MonthTransactions: React.FC<MonthTransactionsProps> = ({ year, month }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { transactions, loading } = useSelector(
        (state: RootState) => state.month_transactions
    );
    const { cards, loading: loadingCards } = useSelector((state: RootState) => state.all_cards);

    const [concept, setConcept] = useState<string | undefined>(undefined);
    const [amount, setAmount] = useState<string | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [transactionTypeId, setTransactionTypeId] = useState<number | undefined>(undefined);
    const [cardType, setCardType] = useState<number | undefined>(undefined);
    const [cardId, setCardId] = useState<number | undefined>(undefined);
    const [orderBy, setOrderBy] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        dispatch(
            getMonthTransactionsRequest({
                year: year,
                month: month,
                data: {
                    order_by: orderBy,
                    per_page: 10,
                    page: 1,
                },
            }),
        );
        dispatch(getAllCardsRequest());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getMonthTransactionsRequest({
                year: year,
                month: month,
                data: {
                    concept: concept === "" ? undefined : concept,
                    amount: amount === "" ? undefined : amount,
                    category_id: categoryId === undefined ? undefined : categoryId,
                    type_id: transactionTypeId === undefined ? undefined : transactionTypeId,
                    card_id: cardId === undefined ? undefined : cardId,
                    order_by: orderBy,
                    per_page: 10,
                    page: currentPage,
                },
            })
        );
    }, [currentPage]);

    const refreshData = () => {
        dispatch(
            getMonthTransactionsRequest({
                year: year,
                month: month,
                data: {
                    concept: concept === "" ? undefined : concept,
                    amount: amount === "" ? undefined : amount,
                    category_id: categoryId === undefined ? undefined : categoryId,
                    type_id: transactionTypeId === undefined ? undefined : transactionTypeId,
                    card_id: cardId === undefined ? undefined : cardId,
                    order_by: orderBy,
                    per_page: 10,
                    page: currentPage,
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
                <div className="w-full flex flex-col justify-center items-center mb-8 gap-4">
                    <div className="w-full flex flex-row justify-between items-start gap-4">
                        <Input
                            size="sm"
                            variant="bordered"
                            className="w-6/12"
                            placeholder="Buscar por concepto"
                            type="text"
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                        />
                        <Input
                            size="sm"
                            variant="bordered"
                            className="w-2/12"
                            placeholder="$999.99"
                            type="number"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <Autocomplete
                            size="sm"
                            variant="flat"
                            className="w-2/12"
                            placeholder="Categoría"
                            selectedKey={categoryId?.toString()}
                            onSelectionChange={(key) => {
                                if (key !== null) {
                                    setCategoryId(parseInt(key as string));
                                }
                            }}
                        >
                            {categories.map((category) => (
                                <AutocompleteItem key={category.key}>
                                    {category.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>

                        <Select
                            size="sm"
                            variant="flat"
                            className="w-2/12"
                            placeholder="Movimiento"
                            value={transactionTypeId}
                            onChange={(e) => setTransactionTypeId(parseInt(e.target.value))}
                        >
                            {types.map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="w-full h-full flex flex-row items-end justify-start gap-4">
                        <Select
                            size="sm"
                            variant="flat"
                            className="w-2/12"
                            placeholder="Tipo de tarjeta"
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
                                size="sm"
                                variant="flat"
                                className="w-2/12 "
                                placeholder="Tarjeta"
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
                            <div className=" w-1/6 h-8 flex flex-col justify-end">
                                <Skeleton className="rounded-md"><div className="w-full h-10">asas</div></Skeleton>
                            </div>
                        }
                        <Select
                            size="sm"
                            variant="flat"
                            className="w-3/12"
                            placeholder="Ordenar por"
                            value={orderBy}
                            onChange={(e) => {
                                setOrderBy(parseInt(e.target.value))
                            }}>
                            {orderByOptions.map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
                            ))}
                        </Select>
                        <Button size="sm" className="bg-black text-white" onClick={refreshData}>Actualizar Filtros</Button>
                        <Button size="sm" color="primary"><DynamicFaIcon name={"FaFileCsv"} className="text-white w-3" /></Button>

                    </div>
                </div>

                {
                    loading ? (
                        <div className="flex flex-col items-center justify-center">
                            <Progress isIndeterminate aria-label="Loading..." className="max-w-md" size="md" />
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
                                <TableColumn className="text-gray-600 font-bold text-center">{""}</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">CONCEPTO</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">MONTO</TableColumn>
                                <TableColumn className="text-gray-600 font-bold text-center">VINCULOS</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">FECHAS</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">BANCO</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">TARJETA</TableColumn>

                                <TableColumn className="text-gray-600 ">{""}</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {transactions?.data && transactions.data.length > 0 ? (
                                    transactions.data.map((t) => (
                                        <TableRow key={t.id} className="hover:bg-slate-100">
                                            <TableCell className="w-8">
                                                <div className="w-8 h-8 bg-slate-100 flex items-center justify-center rounded-full"><DynamicFaIcon className="w-4" name={t.category_icon} /></div>
                                            </TableCell>
                                            <TableCell className="w-4/12 font-medium">{t.concept}</TableCell>
                                            <TableCell className="w-2/12 flex flex-col">
                                                <span className={`font-semibold ${t.amount > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    ${t.amount.toFixed(2)}
                                                </span>
                                                <span className="text-xs text-gray-500">{t.type === 'INCOME' ? '(Ingreso)' : t.type === 'EXPENSE' ? '(Gasto)' : '(Pago)'}</span>
                                            </TableCell>
                                            <TableCell className="w-1/12 text-center">{t.income_relation_count == 0 ? "-" : t.income_relation_count}</TableCell>
                                            <TableCell className="w-2/12">
                                                <div className="w-full flex flex-col items-start justify-start">
                                                    <span>{formatDateToSpanish(t.transaction_date) || "-"}</span>
                                                    <span className="text-xs text-gray-500">{formatDateToSpanish(t.accounting_date) || "-"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="w-2/12">
                                                <div className="w-full flex flex-col items-start justify-start">
                                                    <span>{t.card_bank_name || "-"}</span>
                                                    <span className="text-xs text-gray-500">{t.card_type === 'CREDIT' ? 'Crédito' : 'Débito'}</span>
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

                                            <TableCell className="w-8">
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button variant="light">
                                                            <DynamicFaIcon name="FaEllipsisV" />
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu>
                                                        <DropdownItem key={"details"}
                                                            onClick={() => {
                                                                navigate("/dashboard/month/transaction", {
                                                                    state: {
                                                                        transaction: t,
                                                                    }
                                                                });
                                                            }}
                                                        >Detalles</DropdownItem>
                                                        <DropdownItem key={"edit"}>Editar</DropdownItem>
                                                        <DropdownItem key={"delete"} className="text-danger" color="danger">Eliminar</DropdownItem>

                                                    </DropdownMenu>
                                                </Dropdown>

                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center text-gray-500">
                                            No hay transacciones en este mes.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                        <Pagination
                            showControls
                            size="sm"
                            page={currentPage}
                            onChange={(page) => {
                                setCurrentPage(page);
                            }}
                            total={transactions?.last_page ?? 1}
                            className={`${(transactions?.last_page ?? 1) > 1 ? '' : 'hidden'} mt-1`}
                        />
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
