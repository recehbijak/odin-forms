const paddockSuites = document.querySelectorAll("input[name=suite-options]");
const teamsRadio = document.querySelectorAll("input[name=suite-choice]");
const clubSelect = document.querySelector("#club-suites");
const dayPass = document.querySelectorAll("input[name=day-pass]");
const orderInvoice = document.querySelector("#order-invoice");
const orderQty = document.querySelector("#order-quantity");
const orderSum = document.querySelector("#order-sum")

let invoiceValue = [0, ];
let invoiceTotal;
let selectedQty = "";
let selectedSuite = "";
let selectedDay = "";
let selectedValue = {
    suite: ["Placeholder",
            "Red Bull Racing",
            "Ritz-Carlton Silver Arrows Lounge",
            "Scuderia Ferrari",
            "Aramco Aston Martin F1 Team",
            "Mclaren F1 Team",
            "BWT Alpine F1 Team",
            "Moneygram HAAS F1 Team",
            "Williams Racing",
            "Kick Sauber F1 Team",
            "Placeholder",
            "Sky Suite",
            "Krisflyer",
            "Placeholder 1",
            "Placeholder 2",
            "Placeholder 3",
            "Placeholder 4",
            "Placeholder 5",
            "Placeholder 6",
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
        updateOrderInvoice()
    })
})

orderQty.addEventListener("change", event => {
    selectedQty = parseInt(orderQty.value);
    invoiceTotal = invoiceReduce(invoiceValue) * selectedQty;
    orderSum.innerText = invoiceTotal;
    console.log(invoiceTotal);
    console.log(selectedQty);
    updateOrderInvoice()
}    
)

function invoiceReduce(arr) {
    return arr.reduce((acc, curVal) => acc + curVal);
}

function updateOrderInvoice() {
    orderInvoice.innerText = selectedSuite + " " + selectedDay + " " + "Pass";
    
}
