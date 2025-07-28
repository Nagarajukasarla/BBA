import { Row } from "antd";
import React, { useState } from "react";
import { CSelect } from "../core/CSelect";
import { CSelectOption } from "@/types/core";

interface CustomerFiltersProps {
    cities: CSelectOption<string>[];
    towns: CSelectOption<string>[];
    billTypes: CSelectOption<string>[];
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({ cities, towns, billTypes }) => {

    const [selectedCity, setSelectedCity] = useState<CSelectOption<string> | null>(null);
    const [selectedTown, setSelectedTown] = useState<CSelectOption<string> | null>(null);
    const [selectedBillType, setSelectedBillType] = useState<CSelectOption<string> | null>(null);

    const handleCityChange = (value: CSelectOption<string>) => {
        setSelectedCity(value);
    };

    const handleTownChange = (value: CSelectOption<string>) => {
        setSelectedTown(value);
    };

    const handleBillTypeChange = (value: CSelectOption<string>) => {
        setSelectedBillType(value);
    };

    return (
        <Row style={{ gap: 18, rowGap: 18 }}>
            <CSelect
                label="City"
                value={selectedCity?.label}
                options={cities}
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
                options={towns}
                value={selectedTown?.label}
                style={{ width: "100%" }}
                showSearch
                allowClear
                placeholder="Select Town"
                onSelect={(_, selectedTown: CSelectOption<string>) => {
                    if (selectedTown.customValue) {
                        handleTownChange(selectedTown)
                    }
                }}
            />
            <CSelect
                label="Bill Type"
                options={billTypes}
                value={selectedBillType?.label}
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