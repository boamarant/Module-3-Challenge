// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

const employeesArray = [];

// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects

  // Declaring variables to be used later in the function to define the user-inputted objects

  let keepAdding = true; // Sets parameter for while loop to begin
  let first;
  let last;
  let annual;

  while(keepAdding){
    
    first = prompt("Please enter the employee's first name:");

    if(first === null){ // Breaks the loop if the user clicks cancel
        break;
    }

    last = prompt("Please enter the employee's last name:");

    if(last === null){ // Breaks the loop if the user clicks cancel
        break;
      }
    
  let validInt = false;

    while(!validInt){ // Checks if a valid number is used for the salary
      annual = prompt("Please enter the employee's annual salary:");

      if(isNaN(parseFloat(annual))){ // isNan means "is not a number" and here it is ensuring a valid number is entered for the salary
        alert("Invalid input. Please try again, and enter a number.");
      }
      else{
        validInt = true;
      }
    }

    annual = parseFloat(annual); // Converts the annual value from a string to a number

    const person = { // Stores user inputs as an object
      firstName: first,
      lastName: last,
      salary: annual, 
    };

    employeesArray.push(person); // Adds the created objects to the array

    keepAdding = window.confirm("Add another employee?"); // Allows the user to continue adding employees if they wish
  }
  return employeesArray;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary 
  const salaries = employeesArray.map((employee) => parseFloat(employee.salary)); // Creates an array for reference in the following code, and ensures the salary inputs are being logged as numbers
  const sum = salaries.reduce((total, salary) => total + salary, 0); // Adds together the salary values
  average = sum / employeesArray.length; // Divides the sum by the length of the array to find the average

  const averageUSD = average.toLocaleString("en-US", { // Converts the average to USD 
    style: "currency",
    currency: "USD"
  });

  console.log(`The average salary of our ${employeesArray.length} employee(s) is ${averageUSD}`);
  return average;
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
  const index = Math.floor(Math.random() * employeesArray.length); // Chooses a random number based on the length of the array
  const ranEmployee = employeesArray[index]; // Applies the former random number to choose objects from the array
  console.log(`Congratulations to ${ranEmployee.firstName} ${ranEmployee.lastName}, our raffle winner!`);
}



/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
