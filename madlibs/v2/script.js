(function () {

    "use strict";

    console.log("reading JS");

    const button = document.querySelector(".generate-button");
    const clearButton = document.querySelector("#clear-button");
    const robotWord = document.querySelector("#robot-word");
    const panels = document.querySelectorAll(".panel");

    const nameInput = document.querySelector("#name");
    const locationInput = document.querySelector("#location");
    const verbInput = document.querySelector("#verb");
    const foodInput = document.querySelector("#food");
    const moodInput = document.querySelector("#mood");
    const objectInput = document.querySelector("#object");
    const numberInput = document.querySelector("#number");
    const soundInput = document.querySelector("#sound");

    const fields = [
        nameInput,
        locationInput,
        verbInput,
        foodInput,
        moodInput,
        objectInput,
        numberInput,
        soundInput
    ];

    const fieldLabels = [
        "name",
        "location",
        "action",
        "food",
        "mood",
        "object",
        "number",
        "sound"
    ];

    let storyMode = false;
    let storyTimer;

    function resizeField(field) {
        if (field.value.trim() === "") {
            field.style.width = "38px";
        } else if (field.value.length > 18) {
            field.style.width = "16ch";
        } else {
            field.style.width = field.value.length + "ch";
        }
    }

    function updatePlaceholder(field) {
        if (field.tagName === "SELECT") {
            if (field.value === "") {
                field.classList.add("placeholder");
            } else {
                field.classList.remove("placeholder");
            }
        }
    }

    function makeRobotResult() {
        const food = foodInput.value.toLowerCase();
        const mood = moodInput.value.toLowerCase();
        const verb = verbInput.value.toLowerCase();
        const sound = soundInput.value.toLowerCase();
        const object = objectInput.value.toLowerCase();

        let result = "confusing";

        if (food.includes("coffee") || mood.includes("false confidence")) {
            result = "overcaffeinated";
        } else if (mood.includes("panic") || mood.includes("deadline")) {
            result = "dramatic";
        } else if (verb.includes("squirrel") || mood.includes("confusion")) {
            result = "mysterious";
        } else if (sound.includes("scream") || sound.includes("clang")) {
            result = "chaotic";
        } else if (food.includes("boba") || verb.includes("boba")) {
            result = "boba-powered";
        } else if (object.includes("cone") || object.includes("receipt")) {
            result = "suspicious";
        }

        robotWord.textContent = result;
        robotWord.classList.add("filled");
    }

    function checkMissingFields() {
        const missing = [];

        for (let i = 0; i < fields.length; i++) {
            if (fields[i].value.trim() === "") {
                missing.push(fieldLabels[i]);
                fields[i].classList.add("error");
            } else {
                fields[i].classList.remove("error");
            }
        }

        return missing;
    }

    function startStory() {
        let currentPanel = 0;

        storyMode = true;
        document.body.classList.add("story-mode");
        button.value = "Back to Input";

        for (let i = 0; i < panels.length; i++) {
            panels[i].classList.remove("active");
        }

        panels[currentPanel].classList.add("active");

        storyTimer = setInterval(function () {
            panels[currentPanel].classList.remove("active");
            currentPanel++;

            if (currentPanel < panels.length) {
                panels[currentPanel].classList.add("active");
            } else {
                clearInterval(storyTimer);
                panels[panels.length - 1].classList.add("active");
            }
        }, 3000);
    }

    function backToInput() {
        storyMode = false;
        clearInterval(storyTimer);

        document.body.classList.remove("story-mode");
        button.value = "Generate Log";

        for (let i = 0; i < panels.length; i++) {
            panels[i].classList.remove("active");
        }
    }

    function clearAll() {
        if (storyMode) {
            return;
        }

        for (let i = 0; i < fields.length; i++) {
            fields[i].value = "";
            fields[i].classList.remove("error");
            resizeField(fields[i]);
            updatePlaceholder(fields[i]);
        }

        robotWord.textContent = "";
        robotWord.classList.remove("filled");
    }

    for (let i = 0; i < fields.length; i++) {
        resizeField(fields[i]);
        updatePlaceholder(fields[i]);

        fields[i].addEventListener("input", function () {
            resizeField(fields[i]);
            fields[i].classList.remove("error");
        });

        fields[i].addEventListener("change", function () {
            resizeField(fields[i]);
            updatePlaceholder(fields[i]);
            fields[i].classList.remove("error");

            robotWord.textContent = "";
            robotWord.classList.remove("filled");
        });

        fields[i].addEventListener("focus", function () {
            if (fields[i].tagName === "INPUT") {
                fields[i].select();
            }
        });
    }

    robotWord.addEventListener("click", function () {
        alert("This part cannot be typed manually. The robot generates it after reading your story choices.");
    });

    button.addEventListener("click", function (event) {
        event.preventDefault();

        if (storyMode) {
            backToInput();
            return;
        }

        const missing = checkMissingFields();

        if (missing.length > 0) {
            alert("Error: Please fill out: " + missing.join(", ") + ".");
            return;
        }

        makeRobotResult();
        startStory();
    });

    clearButton.addEventListener("click", function () {
        clearAll();
    });

})();