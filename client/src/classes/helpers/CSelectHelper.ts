import { CSelectOption } from "@/types/core";

class CSelectHelper {
    static getAsCSelectOptions<T>(
        options: T[],
        formatter?: (item: T) => string,
        addAllOption: boolean = false,
    ): CSelectOption<T>[] {
        const result: CSelectOption<T>[] = options.map(item => ({
            value: String(item),
            label: formatter ? formatter(item) : String(item),
            customValue: item,
        }));

        if (addAllOption) {
            result.unshift({
                value: "All",
                label: "--All--",
                customValue: null,
            });
        }
        return result;
    }
}

export default CSelectHelper;
