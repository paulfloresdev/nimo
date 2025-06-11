import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { IncomeRelations } from "../backend/store/features/incomeRelations/incomeRelationsSlice";

interface Props {
    data: IncomeRelations[];
}

const ExportExcelButton: React.FC<Props> = ({ data }) => {
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Income Relations");

        // Definir columnas y anchos
        worksheet.columns = [
            { header: "ID", key: "id", width: 12 },
            { header: "Contacto", key: "contact", width: 25 },
            { header: "Monto Relación", key: "amount", width: 15 },

            { header: "FromTrans ID", key: "from_id", width: 12 },
            { header: "Concepto", key: "from_concept", width: 30 },
            { header: "Monto", key: "from_amount", width: 12 },
            { header: "Fecha Transacción", key: "from_transaction_date", width: 18 },
            { header: "Fecha Contable", key: "from_accounting_date", width: 18 },
            { header: "Categoría Ícono", key: "from_category_icon", width: 15 },
            { header: "Banco", key: "from_card_bank_name", width: 15 },
            { header: "Números Tarjeta", key: "from_card_numbers", width: 18 },
            { header: "Tipo Tarjeta", key: "from_card_type", width: 15 },
            { header: "Red Tarjeta", key: "from_card_network_name", width: 15 },
            { header: "Fecha Actualización", key: "from_updated_at", width: 20 },
            { header: "Tipo", key: "from_type", width: 12 },

            { header: "ToTrans ID", key: "to_id", width: 12 },
            { header: "Concepto", key: "to_concept", width: 30 },
            { header: "Monto", key: "to_amount", width: 12 },
            { header: "Fecha Transacción", key: "to_transaction_date", width: 18 },
            { header: "Fecha Contable", key: "to_accounting_date", width: 18 },
            { header: "Categoría Ícono", key: "to_category_icon", width: 15 },
            { header: "Banco", key: "to_card_bank_name", width: 15 },
            { header: "Números Tarjeta", key: "to_card_numbers", width: 18 },
            { header: "Tipo Tarjeta", key: "to_card_type", width: 15 },
            { header: "Red Tarjeta", key: "to_card_network_name", width: 15 },
            { header: "Fecha Actualización", key: "to_updated_at", width: 20 },
            { header: "Tipo", key: "to_type", width: 12 },
        ];

        // Estilo encabezado
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF3B82F6" },
            };
            cell.alignment = { horizontal: "center" };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });

        // Agregar filas
        data.forEach((relation) => {
            const row = worksheet.addRow({
                id: relation.id ?? "",
                contact: relation.contact?.alias ?? "",
                amount: relation.amount ?? "",

                from_id: relation.from_transaction?.id ?? "",
                from_concept: relation.from_transaction?.concept ?? "",
                from_amount: relation.from_transaction?.amount ?? "",
                from_transaction_date: relation.from_transaction?.transaction_date ?? "",
                from_accounting_date: relation.from_transaction?.accounting_date ?? "",
                from_category_icon: relation.from_transaction?.category_icon ?? "",
                from_card_bank_name: relation.from_transaction?.card_bank_name ?? "",
                from_card_numbers: relation.from_transaction?.card_numbers ?? "",
                from_card_type: relation.from_transaction?.card_type ?? "",
                from_card_network_name: relation.from_transaction?.card_network_name ?? "",
                from_updated_at: relation.from_transaction?.updated_at ?? "",
                from_type: relation.from_transaction?.type ?? "",

                to_id: relation.to_transaction?.id ?? "",
                to_concept: relation.to_transaction?.concept ?? "",
                to_amount: relation.to_transaction?.amount ?? "",
                to_transaction_date: relation.to_transaction?.transaction_date ?? "",
                to_accounting_date: relation.to_transaction?.accounting_date ?? "",
                to_category_icon: relation.to_transaction?.category_icon ?? "",
                to_card_bank_name: relation.to_transaction?.card_bank_name ?? "",
                to_card_numbers: relation.to_transaction?.card_numbers ?? "",
                to_card_type: relation.to_transaction?.card_type ?? "",
                to_card_network_name: relation.to_transaction?.card_network_name ?? "",
                to_updated_at: relation.to_transaction?.updated_at ?? "",
                to_type: relation.to_transaction?.type ?? "",
            });

            // Aplicar formato moneda a las celdas de monto
            // Columna 2: amount
            const amountCell = row.getCell(2);
            if (typeof amountCell.value === 'number') {
                amountCell.numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
            }

            // Columna 6: from_amount
            const fromAmountCell = row.getCell(6);
            if (typeof fromAmountCell.value === 'number') {
                fromAmountCell.numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
            }

            // Columna 18: to_amount
            const toAmountCell = row.getCell(18);
            if (typeof toAmountCell.value === 'number') {
                toAmountCell.numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
            }
        });


        // Opcional: Auto fit filas (altura)
        worksheet.eachRow({ includeEmpty: false }, (row) => {
            row.height = 20;
        });

        // Generar buffer
        const buf = await workbook.xlsx.writeBuffer();

        // Descargar archivo
        const blob = new Blob([buf], { type: "application/octet-stream" });
        saveAs(blob, "IncomeRelations.xlsx");
    };

    return (
        <button onClick={exportToExcel} className="btn btn-primary">
            Exportar a Excel
        </button>
    );
};

export default ExportExcelButton;
