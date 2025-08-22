# Employee Attendance Sheet Web App

This repository provides a web-based application for managing employee attendance, payroll, and holidays for a company. It is built using HTML, CSS, and JavaScript, and runs entirely in the browser—no backend required.

## Features

- **Dynamic Attendance Table**: Add employees and record daily arrival/leaving times for each day of the month.
- **Payroll Automation**: Automatically calculates total working hours, extra (overtime) hours, normal wage, overtime earnings, total wage, deductions, and final balance payable.
- **Holiday Tracking**: Fields for annual holidays, Section 7 holidays, and Section 8 holidays per employee.
- **Settings Panel**: Customize working hours per day, lunch breaks, normal monthly wage, overtime hourly rate, and default arrival/leaving times.
- **Excel Export**: Download the attendance sheet as an Excel file for record-keeping or further analysis.
- **Responsive Design**: Styles optimized for desktop and mobile screens.

## How It Works

1. **Add Employees**: Click "Add New Employee" to insert a new row for an employee.
2. **Fill Details**: For each employee, enter daily arrival and leaving times. The table will automatically compute payroll totals.
3. **Customize Settings**: Adjust general settings (working hours, lunch break, wages, etc.) in the sidebar.
4. **Export Data**: Use "Download Excel" to export the entire table to an `.xlsx` file.

## Tech Stack

- **HTML**: Structure of the app (`index.html`)
- **CSS**: Styling and responsive design (`style.css`)
- **JavaScript**: Main logic for table generation, calculations, and Excel export (`script.js`)
- **SheetJS**: Used for exporting data to Excel format

## File Overview

- `index.html`: Main web page, includes controls, settings, and the attendance table.
- `style.css`: Styles for layout, table, controls, and responsive design.
- `script.js`: JavaScript for dynamic table creation, calculations, and exporting to Excel.

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in your browser.
3. Start adding employees and recording attendance!

## Example Table Columns

- Employee Name
- Arrival/Leaving times for each day
- Total Working Hours
- Extra Hours (Overtime)
- Normal Wage (Fixed)
- Overtime Earnings
- Total Wage
- Deductions
- Balance Payable
- Annual Holidays Availed
- Holidays (Sec 7)
- Holidays (Sec 8)

## Customization

You can modify the default wage rates, working hours, lunch break, and daily timings in the settings panel. The entire app logic is in `script.js`, making it easy to extend calculations or add new features.

## License

[MIT](LICENSE)

## Author

[thaveeshadithya](https://github.com/thaveeshadithya)

---

Feel free to open issues or pull requests for improvements!