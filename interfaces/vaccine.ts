export interface VaccineSpecimen {
    pemeriksaan: Specimen;
    vaksinasi: Vaccine;
}

export interface Specimen {
    penambahan: {
        jumlah_spesimen_pcr_tcm: number,
        jumlah_spesimen_antigen: number,
        jumlah_orang_pcr_tcm: number,
        jumlah_orang_antigen: number,
        tanggal: string,
        created: string
    };
    harian: [{
        key_as_string: string,
        key: number,
        doc_count: number,
        jumlah_spesimen_pcr_tcm: {
            "value": number
        },
        jumlah_spesimen_antigen: {
            value: number
        },
        jumlah_orang_antigen: {
            value: number
        },
        jumlah_orang_pcr_tcm: {
            value: number
        },
        jumlah_spesimen_pcr_tcm_kum: {
            value: number
        },
        jumlah_spesimen_antigen_kum: {
            value: number
        },
        jumlah_orang_pcr_tcm_kum: {
            value: number
        },
        jumlah_orang_antigen_kum: {
            value: number
        }
    }];
    total: {
        jumlah_spesimen_pcr_tcm: number,
        jumlah_spesimen_antigen: number,
        jumlah_orang_antigen: number,
        jumlah_orang_pcr_tcm: number
    };
}

export interface Vaccine {
    penambahan: {
        jumlah_vaksinasi_1: number,
        jumlah_vaksinasi_2: number,
        tanggal: string,
        created: string
    },
    harian: [
        {
            key_as_string: string,
            key: number,
            doc_count: number,
            jumlah_vaksinasi_2: {
                value: number
            },
            jumlah_vaksinasi_1: {
                value: number
            },
            jumlah_jumlah_vaksinasi_1_kum: {
                value: number
            },
            jumlah_jumlah_vaksinasi_2_kum: {
                value: number
            }
        }
    ],
    total: {
        jumlah_vaksinasi_1: number,
        jumlah_vaksinasi_2: number
    }
}
