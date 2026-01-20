import $ from "jquery";
import lodash from "lodash";
import "./body.css";

const $button = $("<button>Click here to get started</button>");
$("body").append($button);
$("body").append('<p id="count"></p>');

let count = 0;
const updateCounter = () => {
  count++;
  $("#count").text(`${count} clicks on the button`);
};

$button.on("click", lodash.debounce(updateCounter, 500));
