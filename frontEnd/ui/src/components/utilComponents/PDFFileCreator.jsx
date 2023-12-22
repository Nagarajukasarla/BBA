import React from "react";
import { Page, Document, StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontSize: 20,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    text: {
        margin: 12,
        fonstSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
    customerName: {
        
    }
});

const PDFFileCreator = () => {
    return (
            <Document >
                <Page style={styles.body}>
                    <Text style={styles.header}>Hello World</Text>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Distinctio dolorum quae a atque aliquid facere
                        dignissimos blanditiis, est omnis nulla in, provident
                        voluptates vitae fuga molestias, dicta eum pariatur
                        voluptatibus!
                    </Text>
                    <Text
                        style={styles.pageNumber}
                        render={({ pageNumber, totalPages }) =>
                            `${pageNumber} / ${totalPages}`
                        }
                        fixed
                    ></Text>
                </Page>
            </Document >
    );
};

export default PDFFileCreator;
