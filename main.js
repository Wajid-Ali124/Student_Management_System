#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    name;
    id;
    courses;
    balance;
    constructor(name, id, courses, balance) {
        this.name = name;
        this.id = id;
        this.courses = courses;
        this.balance = balance;
    }
    viewBalance() {
        console.log(`Current Balance of "${this.name}" is: ${this.balance}`);
    }
    showStatus() {
        console.log(`Name: ${this.name}\nID: ${this.id}\nCourses Enrolled: ${this.courses}\nBalance: ${this.balance}`);
    }
}
let unique_5_digit_id = 10000;
console.log("Student Management System");
let data = await inquirer.prompt([
    {
        name: "studentName",
        message: "Enter your Name: ",
        type: "input",
    },
    {
        name: "balance",
        type: "number",
        message: "Enter your Balance",
    },
    {
        name: "courses",
        message: "Select Courses you want to enroll",
        type: "list",
        choices: ["Typescript", "NextJs", "GenAI", "Python", "No More"],
    },
]);
//To Add Mutiplr Unique Courses
let enrollCourses = [];
if (data.courses !== "No More") {
    enrollCourses.push(data.courses);
    while (enrollCourses.indexOf("No More") == -1) {
        let course = await inquirer.prompt({
            name: "course",
            message: "Select Courses you want to enroll",
            type: "list",
            choices: ["Typescript", "NextJs", "GenAI", "Python", "No More"],
        });
        if (enrollCourses.indexOf(course.course) !== -1) {
            console.log("You Can't Select Same Course Twice!");
            continue;
        }
        enrollCourses.push(course.course);
    }
    enrollCourses.pop();
}
//Generate Unique Id for Every Student
let uniqueID = unique_5_digit_id;
unique_5_digit_id++;
let singleStundent = new Student(data.studentName, uniqueID, enrollCourses, data.balance);
let choices = await inquirer.prompt({
    name: "options",
    type: "list",
    choices: ["View Balance", "Pay Tution Fees", "Show Status"],
});
// Pay Tution Fee
if (choices.options === "Pay Tution Fees") {
    let tutionFee = 0;
    if (singleStundent.courses.length !== 0) {
        tutionFee = singleStundent.courses.length * 200;
        if (tutionFee > singleStundent.balance) {
            console.log("You have insufficient balance, Please Recharge");
        }
        else {
            singleStundent.balance -= tutionFee;
            console.log("Congratulations your fee is paid!, Your remaining Balance is ", singleStundent.balance);
        }
    }
    else {
        console.log("No Fee to be Paid");
    }
}
else if (choices.options === "View Balance") {
    singleStundent.viewBalance();
}
else if (choices.options === "Show Status") {
    singleStundent.showStatus();
}
