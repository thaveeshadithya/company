const DAYS_IN_MONTH = 31;

function getWorkingHours() {
    const val = parseFloat(document.getElementById('workingHoursInput').value);
    return isNaN(val) ? 8 : val;
}

function getLunchTime() {
    const val = parseFloat(document.getElementById('lunchTimeInput').value);
    return isNaN(val) ? 1 : val;
}

function getFixedNormalWage() {
    const val = parseFloat(document.getElementById('fixedNormalWageInput').value);
    return isNaN(val) ? 27000 : val;
}

function getOvertimeRate() {
    const val = parseFloat(document.getElementById('overtimeRateInput').value);
    return isNaN(val) ? 300 : val;
}

function getDefaultArrival() {
    const val = document.getElementById('defaultArrivalInput').value;
    return val || "09:00";
}

function getDefaultLeaving() {
    const val = document.getElementById('defaultLeavingInput').value;
    return val || "17:00";
}

function createDayColumns() {
    const thead = document.querySelector('#attendanceTable thead');
    thead.innerHTML = ''; // clear existing

    // First header row
    const headerRow1 = document.createElement('tr');
    const empNameTh = document.createElement('th');
    empNameTh.rowSpan = 2;
    empNameTh.textContent = 'Employee Name';
    headerRow1.appendChild(empNameTh);

    for (let day = 1; day <= DAYS_IN_MONTH; day++) {
        const th = document.createElement('th');
        th.colSpan = 2;
        th.textContent = `Day ${day}`;
        headerRow1.appendChild(th);
    }

    const extraHeadings = [
        'Total Working Hours',
        'Extra Hours',
        'Normal Wage (Fixed)',
        'Overtime Earnings',
        'Total Wage',
        'Deductions',
        'Balance Payable',
        'Annual Holidays Availed',
        'Holidays (Sec 7)',
        'Holidays (Sec 8)'
    ];
    extraHeadings.forEach(text => {
        const th = document.createElement('th');
        th.rowSpan = 2;
        th.textContent = text;
        headerRow1.appendChild(th);
    });

    // Second header row (arrival/leaving)
    const headerRow2 = document.createElement('tr');
    for (let day = 1; day <= DAYS_IN_MONTH; day++) {
        const thArrival = document.createElement('th');
        thArrival.textContent = 'Arrival';
        headerRow2.appendChild(thArrival);
        const thLeaving = document.createElement('th');
        thLeaving.textContent = 'Leaving';
        headerRow2.appendChild(thLeaving);
    }

    thead.appendChild(headerRow1);
    thead.appendChild(headerRow2);
}

function createTimeCell(defaultValue) {
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'time';
    input.value = defaultValue;
    input.step = 300; // 5 minutes step
    cell.appendChild(input);
    return cell;
}

function addNewEmployee() {
    const tbody = document.getElementById('tableBody');
    const row = document.createElement('tr');

    // Employee name cell
    const nameCell = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter name';
    nameCell.appendChild(nameInput);
    row.appendChild(nameCell);

    const defaultArrival = getDefaultArrival();
    const defaultLeaving = getDefaultLeaving();

    // For each day, add Arrival and Leaving time inputs with defaults
    for (let day = 1; day <= DAYS_IN_MONTH; day++) {
        row.appendChild(createTimeCell(defaultArrival));
        row.appendChild(createTimeCell(defaultLeaving));
    }

    // Payroll related cells:
    // Total working hours
    const totalCell = document.createElement('td');
    totalCell.className = 'output total-column';
    row.appendChild(totalCell);

    // Extra hours
    const extraCell = document.createElement('td');
    extraCell.className = 'output extra-column';
    row.appendChild(extraCell);

    // Normal wage (fixed)
    const normalWageCell = document.createElement('td');
    normalWageCell.className = 'output normal-wage';
    row.appendChild(normalWageCell);

    // Overtime earnings
    const overtimeCell = document.createElement('td');
    overtimeCell.className = 'output overtime-wage';
    row.appendChild(overtimeCell);

    // Total wage
    const totalWageCell = document.createElement('td');
    totalWageCell.className = 'output total-wage';
    row.appendChild(totalWageCell);

    // Deductions input
    const deductionsCell = document.createElement('td');
    const deductionInput = document.createElement('input');
    deductionInput.type = 'number';
    deductionInput.min = '0';
    deductionInput.placeholder = 'Rs.';
    deductionInput.value = '0';
    deductionsCell.appendChild(deductionInput);
    row.appendChild(deductionsCell);

    // Balance payable
    const balanceCell = document.createElement('td');
    balanceCell.className = 'output balance';
    row.appendChild(balanceCell);

    // Annual holidays availed
    const holidaysCell = document.createElement('td');
    const holidaysInput = document.createElement('input');
    holidaysInput.type = 'number';
    holidaysInput.min = '0';
    holidaysInput.value = '0';
    holidaysCell.appendChild(holidaysInput);
    row.appendChild(holidaysCell);

    // Holidays (Section 7)
    const section7Cell = document.createElement('td');
    const section7Input = document.createElement('input');
    section7Input.type = 'number';
    section7Input.min = '0';
    section7Input.value = '0';
    section7Cell.appendChild(section7Input);
    row.appendChild(section7Cell);

    // Holidays (Section 8)
    const section8Cell = document.createElement('td');
    const section8Input = document.createElement('input');
    section8Input.type = 'number';
    section8Input.min = '0';
    section8Input.value = '0';
    section8Cell.appendChild(section8Input);
    row.appendChild(section8Cell);

    tbody.appendChild(row);

    addInputListeners(row);
    calculateHours(row);
}

function addInputListeners(row) {
    // Time inputs change
    const timeInputs = row.querySelectorAll('input[type="time"]');
    timeInputs.forEach(input => {
        input.addEventListener('change', () => calculateHours(row));
    });

    // Deduction input change
    const deductionInput = row.querySelector('td input[type="number"]');
    deductionInput.addEventListener('input', () => calculateHours(row));
}

// Update all existing rows arrival/leaving when default times change
function updateAllDefaultTimes() {
    const defaultArrival = getDefaultArrival();
    const defaultLeaving = getDefaultLeaving();

    const tbody = document.getElementById('tableBody');
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
        const timeInputs = row.querySelectorAll('input[type="time"]');
        for (let day = 0; day < DAYS_IN_MONTH; day++) {
            const arrivalInput = timeInputs[day * 2];
            const leavingInput = timeInputs[day * 2 + 1];
            arrivalInput.value = defaultArrival;
            leavingInput.value = defaultLeaving;
        }
        calculateHours(row);
    });
}

function calculateHours(row) {
    const WORKING_HOURS = getWorkingHours();
    const LUNCH_TIME = getLunchTime();

    let totalMinutes = 0;
    let extraMinutes = 0;

    const inputs = row.querySelectorAll('input[type="time"]');

    for (let day = 0; day < DAYS_IN_MONTH; day++) {
        const arrivalInput = inputs[day * 2];
        const leavingInput = inputs[day * 2 + 1];

        if (arrivalInput.value && leavingInput.value) {
            let [arrivalH, arrivalM] = arrivalInput.value.split(':').map(Number);
            let [leavingH, leavingM] = leavingInput.value.split(':').map(Number);

            let arrivalTime = arrivalH * 60 + arrivalM;
            let leavingTime = leavingH * 60 + leavingM;

            if (leavingTime < arrivalTime) {
                // Handle crossing midnight
                leavingTime += 24 * 60;
            }

            let workedMinutes = leavingTime - arrivalTime;

            if (workedMinutes > LUNCH_TIME * 60) {
                workedMinutes -= LUNCH_TIME * 60;
            }

            totalMinutes += workedMinutes;

            if (workedMinutes > WORKING_HOURS * 60) {
                extraMinutes += workedMinutes - (WORKING_HOURS * 60);
            }
        }
    }

    row.querySelector('.total-column').textContent = formatTime(totalMinutes);
    row.querySelector('.extra-column').textContent = formatTime(extraMinutes);

    const fixedNormalWage = getFixedNormalWage();
    const overtimeRate = getOvertimeRate();

    // Overtime wage calculated by extra hours * overtime rate
    const overtimeWage = (extraMinutes / 60) * overtimeRate;
    const totalWage = fixedNormalWage + overtimeWage;

    row.querySelector('.normal-wage').textContent = `Rs. ${fixedNormalWage.toFixed(2)}`;
    row.querySelector('.overtime-wage').textContent = `Rs. ${overtimeWage.toFixed(2)}`;
    row.querySelector('.total-wage').textContent = `Rs. ${totalWage.toFixed(2)}`;

    const deductionInput = row.querySelector('td input[type="number"]');
    const deductions = parseFloat(deductionInput.value) || 0;
    const balance = totalWage - deductions;
    row.querySelector('.balance').textContent = `Rs. ${balance.toFixed(2)}`;
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins.toString().padStart(2, '0')}m`;
}

// --- Clean export to Excel (no colspan/rowspan issues) ---
function downloadExcel() {
    const DAYS = DAYS_IN_MONTH;
    const tbody = document.getElementById('tableBody');
    const rows = tbody.querySelectorAll('tr');

    // Prepare header row (flat)
    const headerRow = ['Employee Name'];
    for (let day = 1; day <= DAYS; day++) {
        headerRow.push(`Day ${day} Arrival`);
        headerRow.push(`Day ${day} Leaving`);
    }

    const extraHeaders = [
        'Total Working Hours',
        'Extra Hours',
        'Normal Wage (Fixed)',
        'Overtime Earnings',
        'Total Wage',
        'Deductions',
        'Balance Payable',
        'Annual Holidays Availed',
        'Holidays (Sec 7)',
        'Holidays (Sec 8)'
    ];

    headerRow.push(...extraHeaders);

    // Prepare data rows
    const dataRows = [headerRow];

    rows.forEach(row => {
        const rowData = [];
        const cells = row.cells;

        // Employee Name (text input)
        const empNameInput = cells[0].querySelector('input');
        rowData.push(empNameInput ? empNameInput.value : cells[0].innerText.trim());

        // Days Arrival/Leaving times
        for (let day = 0; day < DAYS; day++) {
            const arrivalInput = cells[1 + day * 2].querySelector('input');
            const leavingInput = cells[2 + day * 2].querySelector('input');
            rowData.push(arrivalInput ? arrivalInput.value : '');
            rowData.push(leavingInput ? leavingInput.value : '');
        }

        // Extra columns after days
        // total working hours, extra hours, normal wage, overtime earnings, total wage, deductions, balance, annual holidays, sec7 holidays, sec8 holidays

        // total working hours text
        rowData.push(cells[1 + DAYS * 2].innerText.trim());
        rowData.push(cells[2 + DAYS * 2].innerText.trim());
        rowData.push(cells[3 + DAYS * 2].innerText.trim());
        rowData.push(cells[4 + DAYS * 2].innerText.trim());
        rowData.push(cells[5 + DAYS * 2].innerText.trim());

        // deductions input value
        const deductionInput = cells[6 + DAYS * 2].querySelector('input');
        rowData.push(deductionInput ? deductionInput.value : cells[6 + DAYS * 2].innerText.trim());

        // balance payable text
        rowData.push(cells[7 + DAYS * 2].innerText.trim());

        // annual holidays availed input
        const annualHolidaysInput = cells[8 + DAYS * 2].querySelector('input');
        rowData.push(annualHolidaysInput ? annualHolidaysInput.value : cells[8 + DAYS * 2].innerText.trim());

        // holidays (Sec 7) input
        const sec7Input = cells[9 + DAYS * 2].querySelector('input');
        rowData.push(sec7Input ? sec7Input.value : cells[9 + DAYS * 2].innerText.trim());

        // holidays (Sec 8) input
        const sec8Input = cells[10 + DAYS * 2].querySelector('input');
        rowData.push(sec8Input ? sec8Input.value : cells[10 + DAYS * 2].innerText.trim());

        dataRows.push(rowData);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(dataRows);
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, 'attendance_sheet.xlsx');
}

document.addEventListener('DOMContentLoaded', () => {
    createDayColumns();
    addNewEmployee();

    document.getElementById('defaultArrivalInput').addEventListener('change', updateAllDefaultTimes);
    document.getElementById('defaultLeavingInput').addEventListener('change', updateAllDefaultTimes);

    ['workingHoursInput', 'lunchTimeInput', 'fixedNormalWageInput', 'overtimeRateInput'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            const tbody = document.getElementById('tableBody');
            tbody.querySelectorAll('tr').forEach(row => calculateHours(row));
        });
    });
});
