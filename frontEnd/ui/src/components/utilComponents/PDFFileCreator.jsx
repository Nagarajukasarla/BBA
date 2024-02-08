import React, { useState } from "react";
import {
    Page,
    Document,
    StyleSheet,
    Text,
    View,
    Svg,
    Line,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import InterExtraLight from "../../utils/fonts/Inter-ExtraLight.ttf";
import InterLight from "../../utils/fonts/Inter-Light.ttf";
import InterBlack from "../../utils/fonts/Inter-Black.ttf";
import InterRegular from "../../utils/fonts/Inter-Regular.ttf";
import InterMedium from "../../utils/fonts/Inter-Medium.ttf";
import InterSemiBold from "../../utils/fonts/Inter-SemiBold.ttf";
import InterBold from "../../utils/fonts/Inter-Bold.ttf";
import LexendExaBlack from "../../utils/fonts/LexendExa-Black.ttf";
import LexendExaBold from "../../utils/fonts/LexendExa-Bold.ttf";
import LexendExaExtraBold from "../../utils/fonts/LexendExa-ExtraBold.ttf";
import LexendExaExtraLight from "../../utils/fonts/LexendExa-ExtraLight.ttf";
import LexendExaLight from "../../utils/fonts/LexendExa-Light.ttf";
import LexendExaMedium from "../../utils/fonts/LexendExa-Medium.ttf";
import LexendExaRegular from "../../utils/fonts/LexendExa-Regular.ttf";
import LexendExaSemiBold from "../../utils/fonts/LexendExa-SemiBold.ttf";
import {
    generateFormattedDateString,
    getDayMonthYearFormat,
} from "../../services/utils/dateFormater";

Font.register({
    family: "InterBlack",
    src: InterBlack,
});

Font.register({
    family: "InterRegular",
    src: InterRegular,
});

Font.register({
    family: "InterMedium",
    src: InterMedium,
});

Font.register({
    family: "InterSemiBold",
    src: InterSemiBold,
});

Font.register({
    family: "InterBold",
    src: InterBold,
});

Font.register({
    family: "InterExtraLight",
    src: InterExtraLight,
});

Font.register({
    family: "InterLight",
    src: InterLight,
});

Font.register({
    family: "LexendExaBlack",
    src: LexendExaBlack,
});

Font.register({
    family: "LexendExaBold",
    src: LexendExaBold,
});

Font.register({
    family: "LexendExaExtraBold",
    src: LexendExaExtraBold,
});

Font.register({
    family: "LexendExaExtraLight",
    src: LexendExaExtraLight,
});

Font.register({
    family: "LexendExaLight",
    src: LexendExaLight,
});

Font.register({
    family: "LexendExaMedium",
    src: LexendExaMedium,
});

Font.register({
    family: "LexendExaRegular",
    src: LexendExaRegular,
});

Font.register({
    family: "LexendExaSemiBold",
    src: LexendExaSemiBold,
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 15,
        fontSize: 20,
    },

    defaultText: {
        fontFamily: "InterLight",
        fontSize: 10,
    },
    defalutBoldedText: {
        fontFamily: "InterSemiBold",
        fontSize: 10,
    },

    // Header
    headerView: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 10,
    },
    shopName: {
        fontFamily: "LexendExaLight",
        fontSize: 12,
    },
    addressText: {
        fontFamily: "InterRegular",
        fontSize: 9.5,
    },

    // Subheader
    subHeaders: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftSubHeader: {
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    rightSubHeader: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    inLineChildrenSubHeader: {
        flexDirection: "row",
    },
    gstinTextStyles: {
        marginLeft: 10,
        fontFamily: "InterLight",
        fontSize: 10,
    },

    // Table
    tableWarpper: {
        flexDirection: "column",
        marginTop: 10,
    },
    tableHeadersRow: {
        flexDirection: "row",
    },
    tableHeaderHSN: {
        marginRight: 18,
        fontFamily: "InterMedium",
        fontSize: 10,
    },
    tableHeaderManufacturer: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 34,
    },
    tableHeaderBatchNumber: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 12,
    },
    tableHeaderName: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 78,
    },
    tableHeaderPackSize: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 12,
    },
    tableHeaderQuantity: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 7,
    },
    tableHeaderFree: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 12,
    },
    tableHeaderExpiryDate: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 10,
    },
    tableHeaderGST: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 6,
    },
    tableHeaderRate: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 18,
    },
    tableHeaderMRP: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 15,
    },
    tableHeaderDiscount: {
        fontFamily: "InterMedium",
        fontSize: 10,
        marginRight: 5,
    },
    tableHeaderAmount: {
        fontFamily: "InterMedium",
        fontSize: 10,
    },
    tableDataWrapper: {
        paddingTop: 10,
        flexDirection: "row",
    },
    tableData: {
        fontFamily: "InterLight",
        fontSize: 8,
        width: 30,
        textAlign: "left",
        border: "1px solid black",
    },
    tableDataHSN: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 39,
    },
    tableDataManufacturer: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 56,
    },
    tableDataBatchNumber: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 46,
    },
    tableDataName: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 107,
    },
    tableDataPackSize: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 39,
    },
    tableDataQuantity: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 37,
    },
    tableDataFree: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 33,
    },
    tableDataExpiryDate: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 30,
    },
    tableDataGST: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "center",
        width: 26,
    },
    tableDataRate: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 44,
    },
    tableDataMRP: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
        width: 40,
    },
    tableDataDiscount: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "center",
        width: 22,
    },
    tableDataAmount: {
        fontFamily: "InterLight",
        fontSize: 8,
        textAlign: "left",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 20,
        left: -20,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

export const PDFFileCreator = ({ products, customer, invoiceNumber }) => {

    console.log(`Local objects: ${products} --- ${customer} --- ${invoiceNumber}`);

    console.log(`input customer: ${JSON.stringify(products)}`);
    const getCustomerAddress = () => {
        return `${customer?.addressDto?.street ?? ""}, ${
            customer?.addressDto?.city ?? ""
        }, ${customer?.addressDto?.state ?? ""} - ${
            customer?.addressDto?.zipcode ?? ""}`;
    };

    return (
        <Document>
            <Page style={styles.body} wrap={true}>
                <View style={styles.headerView}>
                    <Text style={styles.defaultText}>INVOICE</Text>
                    <Text style={styles.shopName}>
                        SRI VENKATESHWARA PHARAMA DISTRIBUTOR
                    </Text>
                    <Text style={styles.addressText}>
                        3-4-39/3, Vevekanada colony, Kamareddy - 503111,
                        Telangana
                    </Text>
                </View>
                <View style={styles.subHeaders}>
                    <View style={styles.leftSubHeader}>
                        <Text style={styles.defaultText}>
                            GSTIN 220A98670095HYZB
                        </Text>
                        <Text style={styles.defaultText}>
                            D.L No. 21-B-TG 18-02-2016 18563.18564{" "}
                        </Text>
                    </View>
                    <View style={styles.rightSubHeader}>
                        <Text style={styles.defaultText}>
                            srivenkateshwara@gmail.com
                        </Text>
                        <Text style={styles.defaultText}>+91 9756842691</Text>
                    </View>
                </View>
                <Svg width={1000} height={13}>
                    <Line
                        x1="0"
                        x2="565"
                        y1="7"
                        y2="7"
                        strokeWidth={1}
                        stroke="rgb(255,0,0)"
                    />
                </Svg>
                <View style={styles.subHeaders}>
                    <View style={styles.leftSubHeader}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.defaultText}>
                                To: {customer?.name ?? ""}{" "}
                            </Text>
                            <Text style={styles.defalutBoldedText}>
                                {`(${customer?.customerNumber ?? ""})`}
                            </Text>
                        </View>
                        <Text style={styles.defaultText}>
                            {`Address: ${getCustomerAddress()}`}
                        </Text>
                        <View style={styles.inLineChildrenSubHeader}>
                            <Text style={styles.defaultText}>
                                D.L No. 21-B-TG 18-02-2016 18563.18564
                            </Text>
                            <Text style={styles.gstinTextStyles}>
                                GSTIN. 220A98670095HYZB
                            </Text>
                        </View>
                    </View>
                    <View style={styles.rightSubHeader}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.defaultText}>Type : </Text>
                            <Text style={styles.defalutBoldedText}>CREDIT</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.defaultText}>Invoice : </Text>
                            <Text style={styles.defalutBoldedText}>
                                {`${invoiceNumber}`}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.defaultText}>Date : </Text>
                            <Text style={styles.defalutBoldedText}>
                                {getDayMonthYearFormat()}
                            </Text>
                        </View>
                    </View>
                </View>
                <Svg width={1000} height={13}>
                    <Line
                        x1="0"
                        x2="565"
                        y1="10"
                        y2="10"
                        strokeDasharray="2, 2"
                        strokeWidth={1}
                        stroke="rgb(255,0,0)"
                    />
                </Svg>
                <View style={styles.tableWarpper}>
                    <View style={styles.tableHeadersRow}>
                        <Text style={styles.tableHeaderHSN}>HSN</Text>
                        <Text style={styles.tableHeaderManufacturer}>MFG</Text>
                        <Text style={styles.tableHeaderBatchNumber}>BATCH</Text>
                        <Text style={styles.tableHeaderName}>NAME</Text>
                        <Text style={styles.tableHeaderPackSize}>PACK</Text>
                        <Text style={styles.tableHeaderQuantity}>QUAN</Text>
                        <Text style={styles.tableHeaderFree}>FREE</Text>
                        <Text style={styles.tableHeaderExpiryDate}>EXP</Text>
                        <Text style={styles.tableHeaderGST}>GST</Text>
                        <Text style={styles.tableHeaderRate}>RATE</Text>
                        <Text style={styles.tableHeaderMRP}>MRP</Text>
                        <Text style={styles.tableHeaderDiscount}>DISC</Text>
                        <Text style={styles.tableHeaderAmount}>AMOUNT</Text>
                    </View>
                    <InoviceItem items={products} />
                </View>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                    fixed
                ></Text>
            </Page>
        </Document>
    );
};

const InoviceItem = ({items}) => {
    return (
        <>
            {items !== undefined &&
                items !== null &&
                items.length > 0 &&
                items.map((item) => {
                    return (
                        <>
                            <View style={styles.tableDataWrapper}>
                                <Text style={styles.tableDataHSN}>
                                    {"651952"}
                                </Text>
                                <Text style={styles.tableDataManufacturer}>
                                    {item.company}
                                </Text>
                                <Text style={styles.tableDataBatchNumber}>
                                    {item.batchNumber}
                                </Text>
                                <Text style={styles.tableDataName}>
                                    {item.name}
                                </Text>
                                <Text style={styles.tableDataPackSize}>
                                    {item.packingType}
                                </Text>
                                <Text style={styles.tableDataQuantity}>
                                    {item.quantity}
                                </Text>
                                <Text style={styles.tableDataFree}>
                                    {item.quantity}
                                </Text>
                                <Text style={styles.tableDataExpiryDate}>
                                    {item.expiryDate}
                                </Text>
                                <Text style={styles.tableDataGST}>
                                    {item.sGst}
                                </Text>
                                <Text style={styles.tableDataRate}>
                                    {item.rate}
                                </Text>
                                <Text style={styles.tableDataMRP}>
                                    {item.mrp}
                                </Text>
                                <Text style={styles.tableDataDiscount}>
                                    {item.discount}
                                </Text>
                                <Text style={styles.tableDataAmount}>
                                    {item.price}
                                </Text>
                            </View>
                        </>
                    );
                })}
        </>
    );
};

export default PDFFileCreator;
