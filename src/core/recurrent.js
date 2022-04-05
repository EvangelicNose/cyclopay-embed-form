const Recurrent = {}

Recurrent.frequencies = {
    DAY: "DAY",
    MONTH: "MONTH",
    YEAR: "YEAR"
}

const frequenciesConfig = {
    DAY: {
        label_per_freq: "dia"
    },
    MONTH: {
        label_per_freq: "mês"
    },
    YEAR: {
        label_per_freq: "ano"
    }
}

Recurrent.for = key => frequenciesConfig[key]

export default Recurrent