import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../backend/store/config/store";
import { getIncomeRelationsRequest } from "../../backend/store/features/incomeRelations/incomeRelationsSlice";
import { Autocomplete, AutocompleteItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination, Progress, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import DynamicFaIcon from "../../components/DynamicFaIcon";
import { useNavigate } from "react-router-dom";
import { formatDateToSpanish } from "./MonthTransactions";
import { getAllContactsRequest } from "../../backend/store/features/allContacts/allContactsSlice";
import ExportExcelButton from "../../components/ExportExcelButton";
const baseUrl = import.meta.env.VITE_SITE_BASE_STORAGE_URL_BACKEND;

interface MonthIncomeRelationsProps {
    year: number;
    month: number;
}

export const MonthIncomeRelations: React.FC<MonthIncomeRelationsProps> = ({ year, month }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: incomeRelations, pagination, loading } = useSelector(
        (state: RootState) => state.income_relations
    );
    const { contacts, loading: loadingContacts } = useSelector(
        (state: RootState) => state.all_contacts
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [contactId, setContactId] = useState<number | undefined>(undefined);

    useEffect(() => {
        dispatch(
            getIncomeRelationsRequest({
                page: currentPage,
                year: year,
                month: month,
            })
        );
        dispatch(
            getAllContactsRequest({
                page: 1,
            })
        );
    }, [dispatch]);

    const refreshData = () => {
        dispatch(
            getIncomeRelationsRequest({
                page: currentPage,
                year: year,
                month: month,
                contact_id: contactId,
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
                    <div className="w-full flex flex-row justify-start items-start gap-4">
                        {
                            loadingContacts ? (
                                <div className=" w-1/6 h-8 flex flex-col justify-end">
                                    <Skeleton className="rounded-md"><div className="w-full h-10">asas</div></Skeleton>
                                </div>
                            ) : contacts?.data && (
                                <Autocomplete
                                    size="sm"
                                    variant="flat"
                                    className="w-2/12"
                                    placeholder="Contacto"
                                    selectedKey={contactId !== undefined ? contactId.toString() : "all"}
                                    onSelectionChange={(key) => {
                                        if (key === "all") {
                                            setContactId(undefined);
                                        } else if (key !== null) {
                                            setContactId(parseInt(key as string));
                                        }
                                    }}
                                >
                                    <AutocompleteItem key="all">Todos</AutocompleteItem>
                                    <>
                                        {contacts.data.map((contact) => (
                                            <AutocompleteItem key={contact.id.toString()}>
                                                {contact.alias}
                                            </AutocompleteItem>
                                        ))}
                                    </>

                                </Autocomplete>


                            )
                        }
                        {/*<Select
                            size="sm"
                            variant="flat"
                            className="w-2/12"
                            placeholder="Categoría"
                            value={categoryId}
                            onChange={(e) => setCategoryId(parseInt(e.target.value))}
                        >
                            {categories.map((category) => (
                                <SelectItem key={category.key}>{category.label}</SelectItem>
                            ))}
                        </Select>*/}
                        <Button size="sm" className="bg-black text-white" onClick={refreshData}>Actualizar Filtros</Button>
                        <Button size="sm" color="primary"><DynamicFaIcon name={"FaFileCsv"} className="text-white w-3" /></Button>
                        <ExportExcelButton data={incomeRelations ?? []} />


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
                                <TableColumn className="text-gray-600 font-bold">FECHAS</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">BANCO</TableColumn>
                                <TableColumn className="text-gray-600 font-bold">TARJETA</TableColumn>

                                <TableColumn className="text-gray-600 ">{""}</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {incomeRelations && incomeRelations.length > 0 ? (
                                    incomeRelations.map((relation) => {
                                        var t = relation.from_transaction;
                                        return (
                                            <TableRow key={t?.id} className="hover:bg-slate-100">
                                                <TableCell className="w-16 flex flex-row justify-center">
                                                    <div className="w-8 h-8 bg-slate-100 flex items-center justify-center rounded-full"><DynamicFaIcon className="w-4" name={t?.category_icon ?? ""} /></div>
                                                </TableCell>
                                                <TableCell className="w-5/12 font-medium">{t?.concept}</TableCell>
                                                <TableCell className="w-2/12">
                                                    <span className={`font-semibold ${t?.amount ?? 0 > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        ${t?.amount.toFixed(2)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="w-2/12">
                                                    <div className="w-full flex flex-col items-start justify-start">
                                                        <span>{formatDateToSpanish(t?.transaction_date ?? "") || "-"}</span>
                                                        <span className="text-xs text-gray-500">{formatDateToSpanish(t?.accounting_date ?? "") || "-"}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="w-2/12">
                                                    <div className="w-full flex flex-col items-start justify-start">
                                                        <span>{t?.card_bank_name || "-"}</span>
                                                        <span className="text-xs text-gray-500">{t?.card_type === 'CREDIT' ? 'Crédito' : 'Débito'}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="w-1/12">
                                                    <div className="flex flex-row r items-center space-x-1">
                                                        <div className={`${t?.card_network_name === 'Visa' ? 'bg-blue-800' : ''} rounded-md w-11 p-2 flex flex-row justify-center items-center`}>
                                                            <img src={`${baseUrl}${t?.card_network}`} alt="" />
                                                        </div>
                                                        <span>{`${t?.card_numbers || "-"}`}</span>
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
                                                                            transaction: t ?? null,
                                                                            contact: relation.contact ?? null,
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
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-gray-500">
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
                            total={pagination?.last_page ?? 1}
                            className={`${(pagination?.last_page ?? 1) > 1 ? '' : 'hidden'} mt-1`}
                        />
                        <div>
                            {incomeRelations?.length === 0 && (
                                <p className="text-gray-500 mt-4"></p>
                            )}
                        </div>
                    </>
                }

            </div>

        </div>
    );
}
