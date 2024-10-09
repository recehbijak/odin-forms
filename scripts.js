const paddockSuites = document.querySelectorAll("input[name=suite-options]");
const teamsRadio = document.querySelectorAll("input[name=suite-choice]");
const clubSelect = document.querySelector("#club-suites");
const dayPass = document.querySelectorAll("input[name=day-pass]");
const orderInvoice = document.querySelector("#order-invoice");
const orderQty = document.querySelector("#order-quantity");
const orderSum = document.querySelector("#order-sum");
const orderNoSum = document.querySelector("#order-no-sum");

let invoiceValue = [0, ];
let invoiceTotal;
let selectedQty = "";
let selectedSuite = "";
let selectedDay = "";
let selectedValue = {
    suite: ["Placeholder",
            "Red Bull Racing Lounge",
            "Ritz-Carlton Silver Arrows Lounge",
            "Scuderia Ferrari Lounge",
            "Aramco Aston Martin F1 Team Suite",
            "Mclaren Hilton Suite",
            "BWT Alpine F1 Team Lounge",
            "Moneygram HAAS F1 Team Lounge",
            "Williams Racing Lounge",
            "Kick Sauber F1 Team Lounge",
            "Placeholder",
            "Emirates Lounge",
            "Marriot Bonvoy Suite",
            "Garuda Air Lounge",
            "Turn 1 View Lounge",
            "Sky View Suite",
    ],
    price: [0000, 
            3999,
            4999,
            4999,
            2999,
            5499,
            2499,
            1499,
            2999,
            1999,
            0000,
            1499,
            899,
            0001,
            0002,
            0003,
            0004,
            0005,
            0006,
    ] 
}
let dayValue = {
    day: [ "",
        "Friday",
        "Saturday",
        "Sunday",
        "Three-day"
    ],
    price: [0, 0, 300, 500, 2000]
    
}

paddockSuites.forEach(radio => {
    radio.addEventListener("change", event => {
        if (event.target.value === "team") {
            teamsRadio.forEach(team => {
                team.disabled = false;
                clubSelect.disabled = true;
            })
        } else if (event.target.value === "paddock") {
            teamsRadio.forEach(team => {
                team.disabled = true;
            })
            clubSelect.disabled = false;
        }
    })
})

teamsRadio.forEach(tSuite => {
    tSuite.addEventListener("change", event => {
        invoiceValue.splice(0, 1, selectedValue.price[event.target.value]);
        selectedSuite = selectedValue.suite[event.target.value];
        console.log(invoiceValue);
        updateOrderInvoice()
    })
})

clubSelect.addEventListener("change", event => {
    invoiceValue.splice(0, 1, selectedValue.price[clubSelect.value]);
    selectedSuite = selectedValue.suite[clubSelect.value];
    console.log(invoiceValue);
    updateOrderInvoice()
}
)

dayPass.forEach(day => {
    day.addEventListener("change", event => {
        invoiceValue.splice(1, 1, dayValue.price[event.target.value]);
        selectedDay = dayValue.day[event.target.value];
        invoiceTotal = invoiceReduce(invoiceValue);
        orderSum.innerText = invoiceTotal;
        console.log(invoiceValue);
        updateOrderInvoice();
        updateOrderValue();
    })
})


orderQty.addEventListener("change", event => {
    selectedQty = parseInt(orderQty.value);
    invoiceTotal = invoiceReduce(invoiceValue) * selectedQty;
    orderSum.innerText = invoiceTotal;
    console.log(invoiceTotal);
    console.log(selectedQty);
    updateOrderInvoice();
}    
)

function invoiceReduce(arr) {
    return arr.reduce((acc, curVal) => acc + curVal);
}

function updateOrderInvoice() {
    orderInvoice.innerHTML = `<b> ${selectedSuite} ${selectedDay} Pass </b>`;
}

function updateOrderValue() {
    orderNoSum.innerText = invoiceReduce(invoiceValue);
}
