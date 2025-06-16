import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import PDFFileCreator from "./PDFFileCreator";
import "./style.css";

export const PDFDownloadButton = (
    invoiceData,
    customer,
    invoiceNumber,
    message
) => {
    return (
        <PDFDownloadLink
            document={
                <PDFFileCreator
                    invoiceData={invoiceData}
                    customer={customer}
                    invoiceNumber={invoiceNumber}
                />
            }
            fileName={`${invoiceNumber}`}
        >
            {({ loading }) => loading ? <button>Loading..</button> : <button>Download</button> }
        </PDFDownloadLink>
    );
};

export default PDFDownloadButton;
