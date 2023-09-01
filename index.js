/* Your Code Here */

function createEmployeeRecord(employeeArray) {
  const [firstName, familyName, title, payRatePerHour] = employeeArray;
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payRatePerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(employeesArrays) {
  return employeesArrays.map(createEmployeeRecord);
}
function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date,
  });
  return this;
}
function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date,
  });
  return this;
}
function hoursWorkedOnDate(date) {
  const timeInCheck = this.timeInEvents.find(event => event.date === date);
  const timeOutCheck = this.timeOutEvents.find(event => event.date === date);

  if (timeInCheck && timeOutCheck) {
    const timeIn = timeInCheck.hour;
    const timeOut = timeOutCheck.hour;

    const hoursWorked = (timeOut - timeIn) / 100;

    return hoursWorked;
  }

  return 0;
}
function wagesEarnedOnDate(date) {
  const payOwed = hoursWorkedOnDate.call(this, date) * this.payPerHour;
  return payOwed;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(
    employeeRecord => employeeRecord.firstName === firstName
  );
}
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employeeRecord) => {
    return totalPayroll + allWagesFor.call(employeeRecord);
  }, 0);
}
