import { InvoiceData, ProductData } from "@/types/component";
import { CSelectOption } from "@/types/core";
import { Product } from "@/types/model";
import { makeAutoObservable } from "mobx";

/**
 *  Need to migrate to Redux using reduxtool kit
 */
class NewInvoiceStore {
    invoiceData: InvoiceData = {
        customer: null,
        paymentMode: "",
        items: [],
    };

    productData: ProductData | null = null;
    customersAsOptions: Array<{
        value: string;
        label: string;
        customValue: any;
    }> = [];
    productsAsOptions: CSelectOption<Product>[] = [];
    similarProducts: Product[] = [];
    modalVisible: boolean = false;
    isCustomersLoading: boolean = false;
    isProductsLoading: boolean = false;
    invalidProductFieldError: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setInvoiceData(data: InvoiceData) {
        this.invoiceData = data;
    }

    setProductData(data: ProductData | null) {
        this.productData = data;
    }

    setCustomersAsOptions(
        options: Array<{ value: string; label: string; customValue: any }>
    ) {
        this.customersAsOptions = options;
    }

    setProductsAsOptions(options: CSelectOption<Product>[]) {
        this.productsAsOptions = options;
    }

    setSimilarProducts(products: Product[]) {
        this.similarProducts = products;
    }

    setModalVisible(visible: boolean) {
        this.modalVisible = visible;
    }

    setIsCustomersLoading(loading: boolean) {
        this.isCustomersLoading = loading;
    }

    setIsProductsLoading(loading: boolean) {
        this.isProductsLoading = loading;
    }

    setInvalidProductFieldError(errors: string[]) {
        this.invalidProductFieldError = errors;
    }

    addInvalidProductFieldError(error: string) {
        this.invalidProductFieldError.push(error);
    }

    clearInvalidProductFieldError() {
        this.invalidProductFieldError = [];
    }

    reset() {
        this.invoiceData = {
            customer: null,
            paymentMode: "",
            items: [],
        };
        this.productData = null;
        this.similarProducts = [];
        this.modalVisible = false;
        this.isCustomersLoading = false;
        this.isProductsLoading = false;
    }
}

export const newInvoiceStore = new NewInvoiceStore();