import {Case} from "./general";
import {VaccineSpecimen} from "./vaccine";

export interface PieChartProps {
    title: string,
    data: PieChartData[]
}

export interface ProvinceProps {
    provinceData: ProvinceData[]
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

export interface ProvinceData {
    provinsi: string;
    kasus: number;
    dirawat: number;
    sembuh: number;
    meninggal: number;
    last_date: string;
    jenis_kelamin: JenisKelamin;
    kelompok_umur: KelompokUmur;
    penambahan: Penambahan;
    lokasi: Lokasi;
}

export interface JenisKelamin {
    'laki-laki': number;
    perempuan: number;
}

export interface KelompokUmur {
    '0-5': number;
    '6-18': number;
    '19-30': number;
    '31-45': number;
    '46-59': number;
    '≥ 60': number;
}

export interface Penambahan {
    positif: number;
    sembuh: number;
    meninggal: number;
}

export interface Lokasi {
    lon: number;
    lat: number;
}
