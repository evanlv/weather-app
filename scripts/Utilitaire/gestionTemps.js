const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let today = new Date();

let options = { weekday: "long" };
let actualDay = today.toLocaleDateString("en-EN", options);
actualDay = actualDay.charAt(0).toUpperCase() + actualDay.slice(1);
console.log(actualDay);

let orderedDay = week
  .slice(week.indexOf(actualDay))
  .concat(week.slice(0, week.indexOf(actualDay)));

console.log(orderedDay);
