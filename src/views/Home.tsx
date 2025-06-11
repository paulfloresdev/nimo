import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Autocomplete, AutocompleteItem, Input, Radio, RadioGroup, Select, SelectItem, Skeleton, Textarea } from "@heroui/react";
import { categories, types } from "./Months/MonthTransactions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../backend/store/config/store";
import { getAllCardsRequest } from "../backend/store/features/allCards/allCardsSlice";

const cardTypes = [
    { key: 1, label: "Débito" },
    { key: 2, label: "Crédito" },
]

const Home: React.FC = () => {
    const [transactionTypeId, setTransactionTypeId] = useState<number | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [cardType, setCardType] = useState<number>(1);
    const [concept, setConcept] = useState<string>("");

    const dispatch = useDispatch();
    const { cards, loading: loadingCards } = useSelector((state: RootState) => state.all_cards);
    const [cardId, setCardId] = useState<number | undefined>(undefined);

    useEffect(() => {
        dispatch(getAllCardsRequest());
    }, [dispatch]);

    return (
        <Layout page={0}>
            <div className="w-full h-full flex flex-col space-y-4">
                <span className="font-semibold">Registrar movimiento</span>
                <form className="w-full h-full bg-white p-6 rounded-xl border-solid border-1 flex flex-col space-y-6">
                    <span>Información general</span>
                    <div className="w-full flex flex-col lg:flex-row space-y-6 space-x-0 lg:space-y-0 lg:space-x-6">
                        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row space-y-6 space-x-0 lg:space-y-0 lg:space-x-6">
                            <Select
                                required
                                size="sm"
                                variant="flat"
                                className="w-full lg:w-1/2"
                                label="Tipo de movimiento"
                                labelPlacement="outside"
                                value={transactionTypeId}
                                onChange={(e) => setTransactionTypeId(parseInt(e.target.value))}
                            >
                                {types.map((type) => (
                                    <SelectItem key={type.key}>{type.label}</SelectItem>
                                ))}
                            </Select>
                            <Autocomplete
                                required
                                size="sm"
                                variant="flat"
                                className="w-full lg:w-1/2"
                                label="Categoría"
                                labelPlacement="outside"
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
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row space-x-0 space-y-6 lg:space-x-6 lg:space-y-0">
                            <RadioGroup
                                label="Tipo de tarjeta"
                                orientation="horizontal"
                                value={cardType.toString()}
                                onChange={(e) => {
                                    const parsed = parseInt(e.target.value);
                                    setCardType(parsed);
                                    setCardId(undefined);
                                }}
                                className="w-full lg:w-1/3"
                            >
                                <div className="flex w-full justify-start lg:justify-between space-x-6 lg:space-x-0">
                                    {cardTypes.map((type) => (
                                        <Radio key={type.key} value={type.key.toString()}>
                                            {type.label}
                                        </Radio>
                                    ))}
                                </div>
                            </RadioGroup>
                            <div className="w-full lg:w-2/3">
                                {
                                    (!loadingCards && cards?.debit.length !== undefined && cards?.debit.length > 0) ? (
                                        <Select
                                            required
                                            size="sm"
                                            variant="flat"
                                            className="w-full"
                                            label="Tarjeta"
                                            labelPlacement="outside"
                                            value={cardId}
                                            onChange={(e) => setCardId(parseInt(e.target.value))}
                                        >
                                            {
                                                cardType === 1 ? (
                                                    cards!.debit.map((card) => (
                                                        <SelectItem key={card.id}>
                                                            {`${card.bank.name} - ${card.numbers} (${card.network.name})`}
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
                                    ) : (
                                        <div className="w-full h-14 lg:h-full flex flex-col justify-end">
                                            <Skeleton className="rounded-md"><div className="w-full h-8">asas</div></Skeleton>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                    <span className="pt-4">Detalles de la transacción</span>
                    <div className="w-full flex flex-col lg:flex-row items-end space-x-0 lg:space-x-6">
                        <Input
                            required
                            size="sm"
                            variant="bordered"
                            className="w-full lg:w-6/12 mb-6 lg:mb-0"
                            label="Concepto"
                            labelPlacement="outside"
                            type="text"
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                        />
                        <Input
                            required
                            size="sm"
                            variant="bordered"
                            className="w-full lg:w-2/12"
                            label="Monto"
                            labelPlacement="outside"
                            type="number"
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                        />
                        <div className="w-full lg:w-4/12 flex flex-col space-y-4 mt-6 lg:mt-0">
                            <div className="flex flex-row space-x-4 w-full">
                                <Input
                                    required
                                    size="sm"
                                    variant="bordered"
                                    className="w-1/2 min-w-0"
                                    label="Fecha transacción"
                                    labelPlacement="outside"
                                    type="date"
                                    value={concept}
                                    onChange={(e) => setConcept(e.target.value)}
                                />
                                <Input
                                    required
                                    size="sm"
                                    variant="bordered"
                                    className={`w-1/2 min-w-0 ${cardType === 1 ? "text-gray-400" : ""}`}
                                    label="Fecha contabilidad"
                                    labelPlacement="outside"
                                    type="date"
                                    disabled={cardType === 1}
                                    value={concept}
                                    onChange={(e) => setConcept(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <Textarea
                        size="sm"
                        variant="bordered"
                        className="w-full"
                        label="Concepto"
                        labelPlacement="outside"
                        type="text"
                        value={concept}
                        onChange={(e) => setConcept(e.target.value)}
                    />
                </form >
            </div >
        </Layout >
    );
};

export default Home;
