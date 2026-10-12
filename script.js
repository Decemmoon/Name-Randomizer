console.log("Hello World!");

const addBtn = document.getElementById("add-btn");
const removeBtn = document.getElementById("remove-btn");
const clearBtn = document.getElementById("clear-btn");
const editGroupAmmBtn = document.getElementById("edit-group-amm");
const spinBtn = document.getElementById("spin-btn");
const copyBtn = document.getElementById("copy-btn");

const shownList = document.getElementById("shown-list");
const groupAmmText = document.getElementById("split-into-p");
const results = document.getElementById("group-container");

const tada = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_2564010374.mp3");

let names = ["Dave", "Sophia", "James", "Isaac", "Tommy", "Scarlet"];
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
    // Clear
    shownList.innerHTML = "";

    // Insert items of names, to the shown list
    for (let i = 0; i < names.length; i++) {
        const li = document.createElement("li");
        li.textContent = names[i];
        shownList.appendChild(li);
    }

    groupAmmText.textContent = "Dibagi menjadi: " + groupAmm + " kelompok."

};

function spinWheel() {
    // Append groups
    for (let i = 1; i <= groupAmm; i++) {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("group")

        const titleholder = document.createElement("div");
        
        const title = document.createElement("h3");
        title.textContent = `Group ${i}`;

        const button = document.createElement("button");
        button.textContent = "Ubah nama"
        button.addEventListener("click", () => {
            const h3 = button.previousElementSibling;
            input = prompt("Ubah nama kelompok")
            if (input) {
                h3.textContent = input;
            }
        })

        const ol = document.createElement("ol");

        titleholder.appendChild(title);
        titleholder.appendChild(button);
        groupDiv.appendChild(titleholder);
        groupDiv.appendChild(ol);
        results.appendChild(groupDiv);
    }

    const resArray = Array.from(results.querySelectorAll(".group ol"));

    const shuffledNames = shuffle([...names]);
    
    // Seperate shuffled names into each group
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
        output += `*${ol.previousElementSibling.querySelector("h3").textContent}*\n`;

        const lis = Array.from(ol.querySelectorAll("li"));
        lis.forEach((li, j) => {
            output += `${j+1}. ${li.textContent}\n`
        })

        output += `\n`;
    })

    return output;
}

updateShownList()

addBtn.addEventListener("click", () => {
    const input = prompt("Nama yang ingin ditambahkan?");

    if (input) {names[names.length] = input;};

    updateShownList();
})

removeBtn.addEventListener("click", () => {
    const input = prompt("List nomor berapa yang ingin dihapus?");

    if (input) {
        if (isNaN(input)) {
            alert("Tolong berikan angka");
            return;
        };

        if (input < 1 || input > names.length) {
            alert("Tolong berikan angka yang ada dalam list");
            return;
        };        
    } else {return;}

    names.splice(input-1, 1);
    updateShownList();
})

clearBtn.addEventListener("click", () => {
    names = [];
    updateShownList();
});

editGroupAmmBtn.addEventListener("click", () => {
    let input = prompt("Berapa kelompok?");

    if (isNaN(input)) {
        alert("Tolong berikan angka");
        return;
    };

    input = Math.floor(input);

    if (input < 1) {
        alert("Tolong berikan angka lebih dari 0");
        return;
    };

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
    alert("Berhasil disalin!");
})
