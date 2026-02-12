//! опциональные инпуты
export function initConditionalFields() {
  handleDeadlineStages();
  handlePaymentDevision();
  handleMenu();
  handleContractLang();
}

const handleDeadlineStages = () => {
  const deadlinesStage = document.querySelector("#deadlines__stage");
  const deadlinesBox3 = document.querySelector(
    ".deadlines__inner .deadlines__box:nth-child(3)",
  );
  const deadlinesBox6 = document.querySelector(
    ".deadlines__inner .deadlines__box:nth-child(6)",
  );
  const deadlinesBox8 = document.querySelector(
    ".deadlines__inner .deadlines__box:nth-child(8)",
  );

  deadlinesStage.addEventListener("change", (e) => {
    if (e.target.value === "yes") {
      deadlinesBox3.classList.add("show");
      deadlinesBox6.classList.add("show");
      deadlinesBox8.classList.add("show");
    } else {
      deadlinesBox3.classList.remove("show");
      deadlinesBox6.classList.remove("show");
      deadlinesBox8.classList.remove("show");
    }
  });
};

const handlePaymentDevision = () => {
  const paymentDivision = document.querySelector("#payment__devided");
  const paymentBoxFirst = document.querySelector(
    ".payment__inner .payment__box:nth-child(3)",
  );
  const paymentBoxSecond = document.querySelector(
    ".payment__inner .payment__box:nth-child(4)",
  );
  const paymentBoxThird = document.querySelector(
    ".payment__inner .payment__box:nth-child(5)",
  );

  paymentDivision.addEventListener("change", (e) => {
    if (e.target.value === "one") {
      paymentBoxFirst.classList.add("show");
      paymentBoxSecond.classList.remove("show");
      paymentBoxThird.classList.remove("show");
    } else if (e.target.value === "two") {
      paymentBoxFirst.classList.add("show");
      paymentBoxSecond.classList.add("show");
      paymentBoxThird.classList.remove("show");
    } else {
      paymentBoxFirst.classList.add("show");
      paymentBoxSecond.classList.add("show");
      paymentBoxThird.classList.add("show");
    }
  });
};

const handleMenu = () => {
  const menuBtn = document.querySelector("#menu");
  const subMenu = document.querySelector(".header__list.mobile");

  menuBtn.addEventListener("click", () => {
    subMenu.classList.toggle("show");
  });
};

// обновление состояния чекбокса
const updateLangField = () => {
  const allEngFields = document.querySelectorAll(".eng");
  const langSwitchBtn = document.querySelector(".cb");

  if (langSwitchBtn.checked) {
    allEngFields.forEach((field) => {
      field.classList.add("show");
    });
  } else {
    allEngFields.forEach((field) => {
      field.classList.remove("show");
    });
  }
};

const handleContractLang = () => {
  const langSwitchBtn = document.querySelector(".cb");
  langSwitchBtn.addEventListener("change", updateLangField);
  updateLangField();
};
