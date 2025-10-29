// ------------ SCRIPT CALCULATOR LEGACY v1.2 ------------
// DO NOT TOUCH - WORKS (SOMETIMES)

// [English]: Variable that holds the current input displayed on the screen. Initially set to "0".
let buffer = "0"; 

// [English]: Stores the result of previous calculations. Initially set to 0.
let memoria = 0; 

// [English]: Keeps track of the last operator used (e.g., +, -, *, /).
let ultimo_operador; 

// [English]: Function that handles the input of numbers.
function handleNumber(numStr) {
    // [English]: If the current buffer is "0", replace it with the new number.
    // Otherwise, append the number to the buffer.
    if (buffer === "0") {
        buffer = numStr;
    } else {
        buffer += numStr;
    }
    updateScreen(); // [English]: Updates the display to show the current buffer value.
}

// [English]: Function that handles symbols (operators and special buttons like "=" and "C").
function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            // [English]: Clears the buffer, memory, and the last operator.
            buffer = "0";
            memoria = 0;
            ultimo_operador = null;
            break;
        case "=":
            // [English]: If an operator was used, perform the operation and reset the buffer and operator.
            if (ultimo_operador === null) {
                return; // [English]: Do nothing if no operator is set.
            }
            flushOperation(parseInt(buffer)); // [English]: Perform the operation using the current buffer value.
            ultimo_operador = null;
            buffer = "" + memoria; // [English]: Update the buffer with the result stored in memory.
            memoria = 0; // [English]: Reset memory after the operation.
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            // [English]: Calls the function to handle mathematical operations.
            handleMath(symbol);
            break;
    }
    updateScreen(); // [English]: Updates the display with the current buffer value.
}

// [English]: Function to handle mathematical operations (+, -, *, /).
function handleMath(symbol) {
    // [English]: If both buffer and memory are "0", do nothing.
    if (buffer === "0" && memoria === 0) {
        return;
    }
    let intBuffer = parseInt(buffer); // [English]: Parse the buffer value to an integer.
    if (memoria === 0) {
        memoria = intBuffer; // [English]: Set memory to the buffer value if memory is empty.
    } else {
        flushOperation(intBuffer); // [English]: Perform the operation with the current buffer value.
    }
    ultimo_operador = symbol; // [English]: Set the operator for the next calculation.
    buffer = "0"; // [English]: Reset the buffer for the next input.
}

// [English]: Function that performs the calculation based on the last operator.
function flushOperation(intBuffer) {
    // [English]: Perform the appropriate operation based on the last operator used.
    if (ultimo_operador === "+") {
        memoria += intBuffer;
    } else if (ultimo_operador === "-") {
        memoria -= intBuffer;
    } else if (ultimo_operador === "*") {
        memoria *= intBuffer;
    } else if (ultimo_operador === "/") {
        memoria /= intBuffer;
    }
}

// [English]: Function to update the screen display with the current buffer value.
function updateScreen() {
    let laPantalla = document.getElementById("display");
    laPantalla.innerText = buffer;
}

// [English]: Function to initialize the button click events.
function init() {
    console.log("Calculator initialized...");
    // [English]: Add event listener for button clicks.
    document.querySelector(".buttons").addEventListener("click", function (event) {
        buttonClick(event.target.innerText);
    });
}

// [English]: Function to handle the button clicks. If it's a symbol, it calls handleSymbol, otherwise, handleNumber.
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value); // [English]: If it's not a number, handle as a symbol (operator or special button).
    } else {
        handleNumber(value); // [English]: If it's a number, handle as a number input.
    }
}

// [English]: Call init() to initialize the calculator when the script is loaded.
init();
