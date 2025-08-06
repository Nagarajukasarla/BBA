import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { CSelect } from "../core/CSelect";
import { CSelectOption } from "@/types/core";
import CSelectHelper from "@/classes/helpers/CSelectHelper";

interface CustomerFiltersProps {
    selectedCity: CSelectOption<string> | null;
    selectedTown: CSelectOption<string> | null;
    selectedBillType: CSelectOption<string> | null;
    cityTownMap: Record<string, string[]>;
    billTypes: CSelectOption<string>[];
    onSelectedCity: (value: CSelectOption<string>) => void;
    onSelectedTown: (value: CSelectOption<string>) => void;
    onSelectedBillType: (value: CSelectOption<string>) => void;
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({
    selectedCity,
    selectedTown,
    selectedBillType,
    cityTownMap,
    billTypes,
    onSelectedCity,
    onSelectedTown,
    onSelectedBillType,
}) => {
    const [towns, setTowns] = useState<CSelectOption<string>[] | null>(null);
    const [cities, setCitites] = useState<CSelectOption<string>[] | null>(null);

    const handleCityChange = (value: CSelectOption<string>) => {
        onSelectedCity(value);
    };

    const handleTownChange = (value: CSelectOption<string>) => {
        onSelectedTown(value);
    };

    const handleBillTypeChange = (value: CSelectOption<string>) => {
        onSelectedBillType(value);
    };

    useEffect(() => {
        const cityList = Object.keys(cityTownMap);
        setCitites(CSelectHelper.getAsCSelectOptions(cityList));
    }, []);

    useEffect(() => {
        if (selectedCity) {
            const townList = cityTownMap[selectedCity.value];
            setTowns(CSelectHelper.getAsCSelectOptions(townList));
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedBillType) {
            handleBillTypeChange(selectedBillType);
        }
    }, [selectedBillType]);

    return (
        <Row style={{ gap: 18, rowGap: 18 }}>
            <CSelect
                label="City"
                value={selectedCity?.value}
                options={cities?.length ? cities : []}
                style={{ width: "100%" }}
                showSearch
                allowClear
                placeholder="Select City"
                onSelect={(_, selectedCity: CSelectOption<string>) => {
                    if (selectedCity.customValue) {
                        handleCityChange(selectedCity)
                    }
                }}
            />
            <CSelect
                label="Town"
                options={towns?.length ? towns : []}
                value={selectedTown?.value}
                style={{ width: "100%" }}
                showSearch
                allowClear
                placeholder="Select Town"
                onSelect={(_, selectedTown: CSelectOption<string>) => {
                    if (selectedTown.customValue) {
                        handleTownChange(selectedTown)
                    }
                }}
                disabled={!selectedCity}
            />
            <CSelect
                label="Bill Type"
                options={billTypes?.length ? billTypes : []}
                value={selectedBillType?.value}
                style={{ width: "100%" }}
                showSearch
                allowClear
                placeholder="Bill Type"
                onSelect={(_, selectedBillType: CSelectOption<string>) => {
                    if (selectedBillType.customValue) {
                        handleBillTypeChange(selectedBillType)
                    }
                }}
            />
        </Row>
    );
};

export default CustomerFilters;