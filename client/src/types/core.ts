export interface CSelectOption<T> {
    value: string;
    label: string;
    customValue: T | null;
}