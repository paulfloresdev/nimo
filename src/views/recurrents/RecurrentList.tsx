import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Select, SelectItem } from "@heroui/react";

const pages = [
    { key: 1, label: "Nuevo movimiento" },
    { key: 2, label: "Recurrentes" },
];

const RecurrentList: React.FC = () => {
    const [page, setPage] = useState<number>(1);

    return (
        <Layout page={2}>
            <div className="flex flex-col h-full">
                <div className="w-full flex flex-row items-center mb-4 space-x-4">

                    <Select
                        variant="flat"
                        className="w-1/6"
                        labelPlacement="outside-left"
                        value={page.toString()} // Asegúrate de convertir a string (si `value` espera string)
                        placeholder="Nuevo movimiento"
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

            </div>
        </Layout>
    );
}

export default RecurrentList;