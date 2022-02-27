import {Case} from "./general";
import {VaccineSpecimen} from "./vaccine";

export interface PieChartProps {
    title: string,
    data: PieChartData[]
}

export interface ProvinceProps {
    provinceData: ProvinceData[]
}

export interface ProvinceData {
    provinsi: string;
    kasus: number;
    dirawat: number;
    sembuh: number;
    meninggal: number;
}

export interface PieChartData {
    label: string,
    value: number,
    fill: string
}

export interface IndexProps {
    cases: Case;
    vaccine: VaccineSpecimen;
}

export interface DetailsProps {
    cases: Case;
    vaccine: VaccineSpecimen;
}

export interface LineChartProps {
    title: string,
    data: { date: number, value: number, secondValue?: number }[],
}
