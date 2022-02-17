import * as React from "react";

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

export interface PieChartData {
    label: string,
    value: number,
    fill: string
}

export interface ButtonFilter {
    value: string,
    label: string,
    filter: number
}

export type Card = {
    icon: HeroIcon,
    iconColor: string,
    title: string,
    value: number
};

export interface CardSection {
    heading: string,
    updated?: string,
    datas: Card[]
}

export interface Case {
    data: TotalSpecimen,
    update: {
        penambahan: AdditionalCase,
        harian: DailyCase[],
        total: TotalCase
    }
}

interface TotalSpecimen {
    id: number,
    jumlah_odp: number,
    jumlah_pdp: number,
    total_spesimen: number,
    total_spesimen_negatif: number
}

interface TotalCase {
    jumlah_positif: number,
    jumlah_dirawat: number,
    jumlah_sembuh: number,
    jumlah_meninggal: number

}

interface AdditionalCase {
    jumlah_positif: number,
    jumlah_meninggal: number,
    jumlah_sembuh: number,
    jumlah_dirawat: number,
    tanggal: string,
    created: string
}

export interface DailyCase {
    key_as_string: string,
    key: number,
    doc_count: number,
    jumlah_meninggal: {
        value: number
    },
    jumlah_sembuh: {
        value: number
    },
    jumlah_positif: {
        value: number
    },
    jumlah_dirawat: {
        value: number
    },
    jumlah_positif_kum: {
        value: number
    },
    jumlah_sembuh_kum: {
        value: number
    },
    jumlah_meninggal_kum: {
        value: number
    },
    jumlah_dirawat_kum: {
        value: number
    }
}
