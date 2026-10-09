console.log("Hello World!");

const addBtn = document.getElementById("add-btn");
const removeBtn = document.getElementById("remove-btn");
const clearBtn = document.getElementById("clear-btn");
const editGroupAmmBtn = document.getElementById("edit-group-amm");
const spinBtn = document.getElementById("spin-btn");
const copyBtn = document.getElementById("copy-btn");

const shownList = document.getElementById("shown-list");
const groupAmmountText = document.getElementById("split-into-p");
const results = document.getElementById("group-container");

const tada = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_2564010374.mp3");

let names = ["Dave", "Asparagus", "Lebron James", "Ronaldo", "Greg", "Regular Dude"];
let groupAmm = 2;

let spinCooldown = 0;


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function updateShownList() {
    shownList.innerHTML = "";

    for (let i = 0; i < names.length; i++) {
        const li = document.createElement("li");
        li.textContent = names[i];
        shownList.appendChild(li);
    }

    groupAmmountText.textContent = "Splits into: " + groupAmm + " groups."

};

function spinWheel() {
    for (let i = 1; i <= groupAmm; i++) {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("group")

        const title = document.createElement("h3");
        title.textContent = "GROUP " + i;

        const ol = document.createElement("ol");

        groupDiv.appendChild(title);
        groupDiv.appendChild(ol);
        results.appendChild(groupDiv);
    }
    console.log("HEY");

    const resArray = Array.from(results.querySelectorAll(".group ol"));
    console.log(resArray);

    const shuffledNames = shuffle(names);

    for (let i = 0; i < shuffledNames.length; i++) {
        const li = document.createElement("li");
        li.textContent = shuffledNames[i];
        resArray[i % resArray.length].appendChild(li);
    }
};

function copyResults() {
    let output = ``;
    const ols = Array.from(results.querySelectorAll(".group ol"));

    ols.forEach((ol, i) => {
        output += `*Group ${i+1}*\n`
        const lis = Array.from(ol.querySelectorAll("li"));
        lis.forEach((li, i) => {
            output += `${i+1}. ${li.textContent}\n`
        })

        output += `\n`;
    })

    return output;
}

updateShownList()

addBtn.addEventListener("click", () => {
    const input = prompt("Enter the name you want to add");
    names[names.length] = input;
    updateShownList();
})

removeBtn.addEventListener("click", () => {
    const input = prompt("Enter the number of the item you want to remove");

    if (isNaN(input)) {
        console.log("Please enter a number");
        return;
    };

    if (input < 1 || input > names.length) {
        console.log("Please be inside the range of the array");
        return;
    };

    names.splice(input-1, 1);
    updateShownList();
})

clearBtn.addEventListener("click", () => {
    names = [];
    updateShownList();
});

editGroupAmmBtn.addEventListener("click", () => {
    let input = prompt("How many groups?");

    if (isNaN(input)) {
        console.log("Please enter a number");
        return;
    }

    input = Math.floor(input);

    if (input < 1) {
        console.log("Only positive please");
        return;
    }

    groupAmm = input;

    updateShownList();
})

spinBtn.addEventListener("click", () => {
    if (spinCooldown == 0) {
        results.innerHTML = "";
        tada.currentTime = 0;
        tada.play();
        spinCooldown = 1;
        const cooldown1 = setTimeout(() => {spinWheel();}, 2000);
        const cooldown2 = setTimeout(() => {spinCooldown = 0;}, 3000);
    }
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(copyResults());
    alert("Successfully copied to clipboard!");
})
