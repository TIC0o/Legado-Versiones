// CALCULADORA v3 - REFACTORIZADA PROFESIONAL
let buffer = "0";
let memoria = 0;
let ultimo_operador = null;
let historial = [];

// [Español]: Define el máximo de elementos que el historial puede almacenar.
// [English]: Defines the maximum number of history items allowed.
const MAX_HISTORY_ITEMS = 5;

// ==================== UTILIDADES ====================

// [Español]: Actualiza el contenido mostrado en pantalla.
// [English]: Updates the calculator display content.
function updateDisplay() {
    document.getElementById("display").innerText = buffer;
}

// [Español]: Reinicia completamente la calculadora.
// [English]: Completely resets the calculator.
function resetCalculator() {
    buffer = "0";
    memoria = 0;
    ultimo_operador = null;
    updateDisplay();
}

// [Español]: Establece un nuevo resultado y actualiza el estado.
// [English]: Sets a new result and updates calculator state.
function setResult(result) {
    buffer = String(result);
    memoria = 0;
    ultimo_operador = null;
    updateDisplay();
}

// [Español]: Determina si el buffer está vacío o en cero.
// [English]: Determines if the buffer is empty or zero.
function isBufferEmpty() {
    return buffer === "0" || buffer === "";
}

// ==================== ESTRUCTURAS DE ESTRATEGIA ====================

// [Español]: Estrategias matemáticas básicas (Strategy Pattern).
// [English]: Basic math strategies (Strategy Pattern).
const OPERATIONS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
};

// [Español]: Estrategias científicas.
// [English]: Scientific strategies.
const SCI_OPERATIONS = {
    sin: (x) => Math.sin(x),
    cos: (x) => Math.cos(x),
    tan: (x) => Math.tan(x)
};

// ==================== FUNCIONES PRINCIPALES ====================

// [Español]: Maneja la inserción de números en pantalla.
// [English]: Handles numeric input in the display.
function handleNumber(numStr) {
    buffer = isBufferEmpty() ? numStr : buffer + numStr;
    updateDisplay();
}

// [Español]: Ejecuta operaciones aritméticas.
// [English]: Executes arithmetic operations.
function executeOperation(intBuffer) {
    if (OPERATIONS[ultimo_operador]) {
        memoria = OPERATIONS[ultimo_operador](memoria, intBuffer);
    }
}

// [Español]: Registra operaciones en el historial.
// [English]: Logs operations into history.
function logHistory(entry) {
    historial.push(entry);
    if (historial.length > MAX_HISTORY_ITEMS) historial.shift();
    console.log(historial);
}

// [Español]: Maneja las operaciones científicas (sin, cos, tan).
// [English]: Handles scientific operations (sin, cos, tan).
function executeScientific(symbol) {
    if (isBufferEmpty()) return;
    const value = parseFloat(buffer);
    const result = SCI_OPERATIONS[symbol]?.(value);
    buffer = String(result);
    logHistory(`${symbol}(${value}) = ${result}`);
    updateDisplay();
}

// [Español]: Procesa el cálculo final (=).
// [English]: Processes the final calculation (=).
function processEqual() {
    if (!ultimo_operador) return;
    const currentValue = parseInt(buffer);
    executeOperation(currentValue);
    logHistory(`${memoria} ${ultimo_operador} ${currentValue} = ${memoria}`);
    setResult(memoria);
}

// [Español]: Configura el siguiente operador.
// [English]: Sets the next operator.
function setOperator(symbol) {
    if (!isBufferEmpty()) {
        const intBuffer = parseInt(buffer);
        if (memoria === 0) memoria = intBuffer;
        else executeOperation(intBuffer);
    }
    ultimo_operador = symbol;
    buffer = "0";
    updateDisplay();
}

// ==================== DESPACHADOR DE COMANDOS ====================

// [Español]: Mapa de comandos para limpiar el código y evitar switch.
// [English]: Command map to clean code and avoid switch statements.
const COMMANDS = {
    "C": resetCalculator,
    "=": processEqual,
    "+": () => setOperator("+"),
    "-": () => setOperator("-"),
    "*": () => setOperator("*"),
    "/": () => setOperator("/"),
    "sin": () => executeScientific("sin"),
    "cos": () => executeScientific("cos"),
    "tan": () => executeScientific("tan")
};

// ==================== INTERACCIÓN ====================

// [Español]: Maneja los clics de botones según su tipo (número o símbolo).
// [English]: Handles button clicks depending on type (number or symbol).
function handleInput(value) {
    if (COMMANDS[value]) {
        COMMANDS[value](); // Ejecuta el comando según el símbolo.
    } else if (!isNaN(parseInt(value))) {
        handleNumber(value); // Si es número.
    }
}

// [Español]: Inicializa los eventos de la calculadora.
// [English]: Initializes calculator events.
function init() {
    document.querySelector(".buttons").addEventListener("click", (event) => {
        handleInput(event.target.innerText.trim());
    });
    updateDisplay();
}

// [Español]: Punto de inicio del programa.
// [English]: Entry point of the program.
init();
