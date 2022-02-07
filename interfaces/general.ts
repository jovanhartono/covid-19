import * as React from "react";

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;

export type Data = {
    icon: HeroIcon,
    iconColor: string,
    title: string,
    value: string
};

export interface DailyUpdateProperty {
    heading: string,
    updated: string,
    datas: Data[]
}

export interface CovidUpdate {
    value: {
        data: TotalSpecimen,
        update: {
            penambahan: AdditionalCase,
            harian: DailyCase[],
            total: TotalCase
        }
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

interface DailyCase {
    "key_as_string": "2020-03-02T00:00:00.000Z",
    "key": 1583107200000,
    "doc_count": 1,
    "jumlah_meninggal": {
        "value": 0
    },
    "jumlah_sembuh": {
        "value": 0
    },
    "jumlah_positif": {
        "value": 2
    },
    "jumlah_dirawat": {
        "value": 2
    },
    "jumlah_positif_kum": {
        "value": 2
    },
    "jumlah_sembuh_kum": {
        "value": 0
    },
    "jumlah_meninggal_kum": {
        "value": 0
    },
    "jumlah_dirawat_kum": {
        "value": 2
    }
}
