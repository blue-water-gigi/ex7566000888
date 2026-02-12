import { initConditionalFields } from "./uiControls.js";
import { initModal } from "./modal.js";
import { getFormData } from "./formData.js";
import { validateAllErrors, showErrors, clearErrors } from "./validation.js";
import { generateContract } from "./documentGenerator.js";
// import { formatNumber } from "./utils.js";
import { formatDate, formatDateEng, convertNum } from "./utils.js";
import { saveInputs } from "./saveInputs.js";
import { restoreInputs } from "./saveInputs.js";
import { clearSessionStorage } from "./saveInputs.js";

document.addEventListener("DOMContentLoaded", () => {
  restoreInputs();
  initConditionalFields();
  initModal();
});

function formatDates(data) {
  data.key.contractDate = formatDate(data.key.contractDate);
  data.key.contractDateEng = formatDateEng(data.key.contractDateEng);

  data.subject.contractReviewDate = formatDate(data.subject.contractReviewDate);
  data.subject.contractReviewDateEng = formatDateEng(
    data.subject.contractReviewDateEng,
  );

  data.deadlines.contractEndDatePre = formatDate(
    data.deadlines.contractEndDatePre,
  );
  data.deadlines.contractEndDatePreEng = formatDateEng(
    data.deadlines.contractEndDatePreEng,
  );

  data.deadlines.contractEndDate = formatDate(data.deadlines.contractEndDate);
  data.deadlines.contractEndDateEng = formatDateEng(
    data.deadlines.contractEndDateEng,
  );

  data.deadlines.contractReportDate = formatDate(
    data.deadlines.contractReportDate,
  );
  data.deadlines.contractReportDateEng = formatDateEng(
    data.deadlines.contractReportDateEng,
  );

  data.deadlines.contractGetRequestDatePre = formatDate(
    data.deadlines.contractGetRequestDatePre,
  );
  data.deadlines.contractGetRequestDatePreEng = formatDateEng(
    data.deadlines.contractGetRequestDatePreEng,
  );

  data.deadlines.contractGetRequestDate = formatDate(
    data.deadlines.contractGetRequestDate,
  );
  data.deadlines.contractGetRequestDateEng = formatDateEng(
    data.deadlines.contractGetRequestDateEng,
  );

  data.deadlines.contractRequestDatePre = formatDate(
    data.deadlines.contractRequestDatePre,
  );
  data.deadlines.contractRequestDatePreEng = formatDateEng(
    data.deadlines.contractRequestDatePreEng,
  );

  data.deadlines.contractRequestDate = formatDate(
    data.deadlines.contractRequestDate,
  );
  data.deadlines.contractRequestDateEng = formatDateEng(
    data.deadlines.contractRequestDateEng,
  );
}

const submitButton = document.querySelector(".submit-btn");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  saveInputs();
  // formatNumber();
  const data = getFormData();
  // console.log(data);

  const errors = validateAllErrors(data);
  // console.log(errors);
  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  clearErrors();
  formatDates(data);
  generateContract(data);
});

const clearButton = document.querySelector(".delete-btn");

function clearAllInputs() {
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    if (input.type === "radio" || input.type === "checkbox") {
      input.checked = false;
    } else input.value = "";
  });
  clearSessionStorage();
}

clearButton.addEventListener("click", clearAllInputs);
