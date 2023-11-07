const companySelect = document.querySelector("#company");
const rocketSelect = document.querySelector("#rocket");

const taskButton = document.querySelector("#create-task-btn");

const spacexObject = {
    'SpaceX': [
        ["Falcon9", 10, 22800],
        ["Super Heavy", 70, 80000],
        ["Starship", 100, 100000]
    ],
    'NASA': [
        ["Saturn V", 3, 140000],
        ["Atlas V", 6, 20520],
        ["Delta IV", 15, 14220],
        ["SLS", 20, 95000],
        ["Orion", 4, 65, 500]
    ],
    'Blue Origin': [
        ["New Shepard", 6, 4000],
        ["New Glenn", 50, 45000],
        ["Blue Moon", 6, 6500]
    ]
};

const companyPriceForNight = {
    'SpaceX': 1969,
    'NASA': 5612,
    'Blue Origin': 2013
};

const rocketSpeed = {
    'Falcon9': 27000,
    'Super Heavy': 33000,
    'Starship': 37000,
    'Saturn V': 39900,
    'Atlas V': 29000,
    'Delta IV': 28370,
    'SLS': 39000,
    'Orion': 39000,
    'New Shepard': 3675,
    'New Glenn': 8500,
    'Blue Moon': 2456,
}

const distanceBetweenPlanet = {
    'Mercury': 91700000,
    'Venus': 38000000,
    'Mars': 54600000,
    'Jupiter': 628743036,
    'Saturn': 1275027739,
    'Uranus': 2720655243,
    'Neptune': 4351366840
};

function populateRocketOptions() {
    rocketSelect.innerHTML = '';

    const selectedCompany = companySelect.value;

    const companyRockets = spacexObject[selectedCompany];

    companyRockets.forEach(([rocketName, _]) => {
        const option = document.createElement("option");
        option.value = rocketName;
        option.textContent = rocketName;
        rocketSelect.appendChild(option);
    });
}

companySelect.addEventListener("change", populateRocketOptions);

let selectedRocket;
rocketSelect.addEventListener("change", () => {
    selectedRocket = rocketSelect.value;

    validatePassengerCount();
});

// Passengers
const passengers = document.querySelector("#passengers");
const passengersNumber = document.querySelector("#passengers-number");
const errorMessages = document.createElement("span");

let correctPassengerAmount = true;

passengers.addEventListener("input", () => {
    passengersNumber.appendChild(errorMessages);
    validatePassengerCount();
    checkValidation();
});

let outputCompany = document.querySelector(".output-company");

function validatePassengerCount() {
    const selectedCompany = companySelect.value;
    const maxCapacity = spacexObject[selectedCompany].find(([rocketName, _]) => rocketName === selectedRocket)[1];
    const passengerCount = parseInt(passengers.value);

    if (passengerCount > maxCapacity) {
        errorMessages.textContent = `The max capacity is ${maxCapacity}`;
        errorMessages.style.color = "red";
        passengers.style.borderColor = "red";

        correctPassengerAmount = false;
    } else {
        errorMessages.textContent = "";
        passengers.style.borderColor = "";

       correctPassengerAmount = true;
    }
}

const cargo = document.querySelector("#cargo");
const cargoNumber = document.querySelector("#cargo-number");
const cargoErrorMessages = document.createElement("span");
const description = document.querySelector("#description");

let correctCargoAmount = true;

cargo.addEventListener("input", () => {
    cargoNumber.appendChild(cargoErrorMessages);
    validateCargoCount();
    checkValidation();
});

function validateCargoCount() {
    const selectedCompany = companySelect.value;
    const maxCargoCapacity = spacexObject[selectedCompany].find(([rocketName, _]) => rocketName === selectedRocket)[2];
    const cargoCount = parseInt(cargo.value);

    if (cargoCount > maxCargoCapacity) {
        cargoErrorMessages.textContent = `The max cargo capacity is ${maxCargoCapacity} kg.`;
        cargo.style.borderColor = "red";
        cargoErrorMessages.style.color = "red";

       correctCargoAmount = false;
    } else {
        cargoErrorMessages.textContent = "";
        cargo.style.borderColor = "";

       correctCargoAmount = true;
    }
}

function checkValidation() {
    if (correctPassengerAmount && correctCargoAmount) {
        taskButton.disabled = false;
    } else {
        taskButton.disabled = true;
    }
}

function calculateTripDuration() {
    const selectedPlanet = document.querySelector("#to").value;
    const rocketSpeedKmph = rocketSpeed[selectedRocket]; // Speed in kilometers per hour
    const distanceToPlanet = distanceBetweenPlanet[selectedPlanet]; // Distance in million kilometers

    const timeInHours = distanceToPlanet / rocketSpeedKmph;

    const timeInDays = timeInHours / 24;

    return Math.floor(timeInDays); 
}

function calculateTripPrize() {
    const selectCompany = document.querySelector("#company").value;
    const companyPrice = companyPriceForNight[selectCompany];
    const days = calculateTripDuration();

    const totalPrice = days * companyPrice;

    return totalPrice;
}

taskButton.addEventListener("click", () => {

    const passengersValue = passengers.value;
    const cargoValue = cargo.value;

    if (passengersValue === "" || cargoValue === "") {
        return
    }

    const companyElement = document.createElement("li");
    companyElement.textContent = `Company: ${companySelect.value}`;

    const rocketElement = document.createElement("li");
    rocketElement.textContent = `Rocket: ${rocketSelect.value}`;

    const passengersElement = document.createElement("li");
    passengersElement.textContent = `Passengers: ${passengers.value}`;

    const cargoElement = document.createElement("li");
    cargoElement.textContent = `Cargo: ${cargo.value} kg.`;

    const descriptionElement = document.createElement("li");
    descriptionElement.textContent = `Description: ${description.value}`;

    const tripDuration = calculateTripDuration();
    const durationElement = document.createElement("li");
    durationElement.textContent = `Trip Duration: ${tripDuration} days`;

    const priceDuration = calculateTripPrize();
    const priceElement = document.createElement("li");
    priceElement.textContent = `Price: ${priceDuration} $`; 

    const li = document.createElement("ul");

    li.appendChild(companyElement);
    li.appendChild(rocketElement);
    li.appendChild(passengersElement);
    li.appendChild(cargoElement);
    li.appendChild(descriptionElement);
    li.appendChild(durationElement);
    li.appendChild(priceElement);

    const saveButton = document.createElement("input");
    saveButton.setAttribute("type", "button");
    saveButton.setAttribute("id", "save-task-btn");
    saveButton.setAttribute("value", "Save Task");

    const editButton = document.createElement("input");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("id", "edit-task-btn");
    editButton.setAttribute("value", "Edit Task");

    const deleteButton = document.createElement("input");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("id", "delete-task-btn");
    deleteButton.setAttribute("value", "Delete Task");

    const divElement = document.createElement("div");
    divElement.className = "form-control-1";

    divElement.appendChild(saveButton);
    divElement.appendChild(editButton);
    divElement.appendChild(deleteButton);

    const output = document.querySelector(".output");

    output.appendChild(li);
    output.appendChild(divElement);

    passengers.value = "";
    cargo.value = "";

    saveButton.addEventListener("click", () => {
        output.removeChild(li);
        output.removeChild(divElement);

        const message = document.createElement("p");
        message.textContent = "Everything was save correctly !";

        output.appendChild(message);
    })

    editButton.addEventListener("click", () => {
        passengers.value = passengersValue;
        cargo.value = cargoValue;


        output.removeChild(li);
        output.removeChild(divElement);
    })

    deleteButton.addEventListener("click", () => {
        output.removeChild(li);
        output.removeChild(divElement);
    })
})