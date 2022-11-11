// Here we define a JavaScript class named EnglishCalendar.
import "./importables/dateMethodsMore.js";       //for module use ./

class EnglishCalendar {
  constructor(given_year, given_month) {
    // JavaScript 'classes' can have only a single constructor.
    // Therefore we must inspect how many parameters were given.

    if (given_year === undefined) {
      // The constructor was called without any parameters.
      // We'll be using the current year and month.

      let current_date = new Date();

      this.year = current_date.getFullYear();
      this.month = current_date.getMonth() + 1;
    } else if (given_month === undefined) {
      console.log("\n Bad parameters for EnglishCalendar constructor.");
    } else {
      // the objects was created like = new EnglishCalendar( 2016, 2 ) ;

      this.year = given_year;
      this.month = given_month;
    }

    let english_names_of_months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let english_week_description = [
      "Wk",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];

    this.names_of_months = english_names_of_months;
    this.week_description = english_week_description;
  }

  // Next we specify some methods for the class EnglishCalendar.

  get_year() {
    return this.year;
  }

  get_month() {
    return this.month;
  }

  increment_month() {
    this.month++;

    if (this.month > 12) {
      this.month = 1;
      this.year++;
    }
  }

  decrement_month() {
    this.month--;

    if (this.month < 1) {
      this.month = 12;
      this.year--;
    }
  }

  increment_year() {
    this.year++;
  }

  decrement_year() {
    this.year--;
  }

  to_table_element() {
    let a_day_in_this_month = new Date(this.year, this.month - 1, 1);

    // Days of week are indexed from 0 to 6. The first day of week is Monday.

    let day_of_week_index = 0;

    let day_of_week_of_first_day = a_day_in_this_month.index_for_day_of_week();

    let table_element =
      "<table id=calendar_as_table><caption>" +
      this.names_of_months[this.month - 1] +
      "  " +
      this.year +
      "</caption><tr>";

    for (let string_index in this.week_description) {
      table_element +=
        "<th scopr='col'>" + this.week_description[string_index] + "</th>";
    }

    table_element += "</tr><tr>";

    table_element +=
      "<td id=week_number>" +
      a_day_in_this_month.get_week_number() +
      "</td>";

    // The first week of a month is often an incomplete week,
    // i.e., the first part of week belongs to the previous
    // month. In place of the days that belong to the previous
    // month we put cells with a space character.

    while (day_of_week_index != day_of_week_of_first_day) {
      table_element += "<td id=day_of_previous_month>&nbsp;</td>";
      day_of_week_index++;
    }

    let current_computer_date = new Date();

    while (this.month == a_day_in_this_month.getMonth() + 1) {
      if (day_of_week_index >= 7) {
        table_element +=
          "</tr><tr><td id=week_number>" +
          a_day_in_this_month.get_week_number() +
          "</td>";

        day_of_week_index = 0;
      }

      let day_to_calendar = a_day_in_this_month.getDate();

      if (
        this.year == current_computer_date.getFullYear() &&
        this.month == current_computer_date.getMonth() + 1 &&
        day_to_calendar == current_computer_date.getDate()
      ) {
        table_element +=
          '<td id=current_day onclick="calendar_day_clicked( this )">' +
          day_to_calendar +
          "</td>";
      } else {
        table_element +=
          '<td onclick="calendar_day_clicked( this )">' +
          day_to_calendar +
          "</td>";
      }

      a_day_in_this_month.plus_one_day();

      day_of_week_index++;
    }

    // Let's put some empty cells to the last row so that also that
    // row is a complete 'week'.

    while (day_of_week_index < 7) {
      table_element += "<td id=day_of_next_month>&nbsp;</td>";
      day_of_week_index++;
    }

    table_element += "</tr></table>";

    return table_element;
  }
} // END OF EnglishCalendar DECLARATIONS

// The EnglishCalendar object that we create here will show the current
// month, according to the computer time settings.

let calendar_to_show = new EnglishCalendar();
const show_next_btn = document.querySelector("#show-next");
const show_prev_btn = document.querySelector("#show-prev");
const minus_one_year_btn = document.querySelector("#minus_one_year");
const plus_one_year_btn = document.querySelector("#plus_one_year");
const change_language_btn = document.querySelector("#change-language");

show_prev_btn.addEventListener("click", show_previous_month_calendar);
show_next_btn.addEventListener("click", show_next_month_calendar);

minus_one_year_btn.addEventListener("click", minus_one_year);
plus_one_year_btn.addEventListener("click", plus_one_year);

let calendar_language = "English";
change_language_btn.addEventListener("click", () => {
  // change the language and need to make a new table

  if (calendar_language === "English") {
    calendar_language = "Spanish";
    calendar_to_show = new SpanishCalendar();
  } else if (calendar_language === "Spanish") {
    calendar_language = "German";
    calendar_to_show = new GermanCalendar();
  } else {
    calendar_language = "English";
    calendar_to_show = new EnglishCalendar();
  }

  // render the new table
  render_calendar();
});

function render_calendar() {
  let calendar_as_table = calendar_to_show.to_table_element();
  let div_for_calendar = document.getElementById("calendar_div_id");
  div_for_calendar.innerHTML = calendar_as_table;
}

function minus_one_year() {
  calendar_to_show.decrement_year();
  render_calendar();
}

function plus_one_year() {
  calendar_to_show.increment_year();
  render_calendar();
}

function show_previous_month_calendar() {
  calendar_to_show.decrement_month();

  render_calendar();
}

function show_next_month_calendar() {
  calendar_to_show.increment_month();

  render_calendar();
}

function initialize_page() {
  let calendar_as_table = calendar_to_show.to_table_element();

  let div_for_calendar = document.getElementById("calendar_div_id");

  div_for_calendar.innerHTML = calendar_as_table;
}

//  The method that creates the <table> element for the calendar automatically
//  sets onclick="calendar_day_clicked( this )" for every day.
//  In this version, this function does not do anything special, but you
//  can see below how to find out what day was clicked.

window.calendar_day_clicked = function (td_element) {
  console.log("\n " + td_element.innerHTML);
};

document.body.onload = initialize_page;

// Below you'll find two subclasses of class EnglishCalendar.
// You can use them when you do the exercises with this page.

// You have to copy these classes after the class EnglishCalendar.

// Next we specify a subclass named SpanishCalendar

class SpanishCalendar extends EnglishCalendar {
  constructor(given_year, given_month) {
    // calling the superclass constructor
    super(given_year, given_month);

    var spanish_names_of_months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    var spanish_week_description = [
      "Sem",
      "Lun",
      "Mar",
      "Mie",
      "Jue",
      "Vie",
      "Sab",
      "Dom",
    ];

    this.names_of_months = spanish_names_of_months;
    this.week_description = spanish_week_description;
  }
} // END OF SpanishCalendar DECLARATION

// Next we specify a subclass named GermanCalendar

class GermanCalendar extends EnglishCalendar {
  constructor(given_year, given_month) {
    // calling the superclass constructor
    super(given_year, given_month);

    var german_names_of_months = [
      "Januar",
      "Februar",
      "Marz",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];

    var german_week_description = [
      "Whe",
      "Mon",
      "Die",
      "Mit",
      "Don",
      "Fre",
      "Sam",
      "Son",
    ];

    this.names_of_months = german_names_of_months;
    this.week_description = german_week_description;
  }
} // END OF GermanCalendar DECLARATION
