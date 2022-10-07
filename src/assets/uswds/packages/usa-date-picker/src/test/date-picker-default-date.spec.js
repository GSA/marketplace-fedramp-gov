const fs = require("fs");
const path = require("path");
const assert = require("assert");
const EVENTS = require("./events");
const DatePicker = require("../index");

const TEMPLATE = fs.readFileSync(
  path.join(__dirname, "/date-picker-default-date.template.html")
);

const datePickerSelector = () => document.querySelector('.usa-date-picker');
const tests = [
  { name: "document.body", selector: () => document.body },
  { name: "date picker", selector: datePickerSelector }
];

tests.forEach(({name, selector: containerSelector}) => {
  describe(`date picker component with default date initialized at ${name}`, () => {
    const { body } = document;

    let root;
    let input;
    let button;
    const getCalendarEl = (query) =>
      root.querySelector(
        `.usa-date-picker__calendar${query ? ` ${query}` : ""}`
      );

    beforeEach(() => {
      body.innerHTML = TEMPLATE;
      DatePicker.on(containerSelector());
      root = datePickerSelector();
      input = root.querySelector(".usa-date-picker__external-input");
      button = root.querySelector(".usa-date-picker__button");
    });

    afterEach(() => {
      DatePicker.off(containerSelector());
      window.onerror = null;
      body.textContent = "";
    });

    it("should display the input date when an input date is present", () => {
      input.value = "06/20/2020";

      EVENTS.click(button);

      assert.strictEqual(getCalendarEl().hidden, false, "The calendar is shown");
      assert.strictEqual(
        getCalendarEl(".usa-date-picker__calendar__date--focused").dataset.value,
        "2020-06-20",
        "focuses correct date"
      );
    });

    it("should display the default date when the input date is empty", () => {
      input.value = "";

      EVENTS.click(button);

      assert.strictEqual(getCalendarEl().hidden, false, "The calendar is shown");
      assert.strictEqual(
        getCalendarEl(".usa-date-picker__calendar__date--focused").dataset.value,
        "2020-05-22",
        "focuses correct date"
      );
    });

    it("should display the default date when the input date is invalid", () => {
      input.value = "";

      EVENTS.click(button);

      assert.strictEqual(getCalendarEl().hidden, false, "The calendar is shown");
      assert.strictEqual(
        getCalendarEl(".usa-date-picker__calendar__date--focused").dataset.value,
        "2020-05-22",
        "focuses correct date"
      );
    });
  });
});
