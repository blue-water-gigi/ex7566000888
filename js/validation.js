export function validateINN(inn) {
  const regex = /^\d{10}$|^9909\d{6}$/;
  return regex.test(inn);
}

export function validateKPP(kpp) {
  const regex = /^\d{9}$/;
  return regex.test(kpp);
}

export function validateBankAccount(account) {
  const regex = /^\d{20}$/;
  return regex.test(account);
}

export function validateBIK(bik) {
  const regex = /^\d{9}$/;
  return regex.test(bik);
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

//! проверка на только цифры в стоимости
export function validateCost(contractCost) {
  const regex = /^\d+(\s\d+)*$/;
  return regex.test(contractCost);
}

//! перевод текста в число
export function parseToInt(string) {
  const newString = string.replace(/\s/g, "");
  return parseInt(newString);
}

//! сравнивает итоговую стоимость с платежами
function compareSums(total, ...args) {
  let result = total;
  for (let i = 0; i < args.length; i++) {
    result = Math.abs(result - args[i]);
  }
  return result === 0;
}

//! проверка на равенство общей суммы договора с платежами по договору
export function validatePayments(data) {
  const costPrice = parseToInt(data.cost.contractPrice);
  const firstPayment = parseToInt(data.payment.contractFirstPayment);
  const secondPayment = parseToInt(data.payment.contractSecondPayment);
  const thirdPayment = parseToInt(data.payment.contractThirdPayment);

  if (data.payment.contractDevided === "one") {
    return compareSums(costPrice, firstPayment);
  } else if (data.payment.contractDevided === "two") {
    return compareSums(costPrice, firstPayment, secondPayment);
  } else if (data.payment.contractDevided === "three") {
    return compareSums(costPrice, firstPayment, secondPayment, thirdPayment);
  }
}

export function validateAllErrors(data) {
  const errors = [];

  //! для обязательных полей
  if (!data.key.contractNumber) {
    errors.push({
      inputId: "key__contract-number",
      input: "contractNumber",
      message: "Поле обязательно для заполнения",
    });
  }
  if (!data.key.contractDate) {
    errors.push({
      inputId: "key__contract-date",
      input: "contractDate",
      message: "Поле обязательно для заполнения",
    });
  }
  if (!data.key.contractCounterpartyName) {
    errors.push({
      inputId: "key__contract-name",
      input: "contractCounterpartyName",
      message: "Поле обязательно для заполнения",
    });
  }
  if (!data.key.contractCounterpartyAddress) {
    errors.push({
      inputId: "key__details-addres",
      input: "contractCounterpartyAddress",
      message: "Поле обязательно для заполнения",
    });
  }
  if (!validateINN(data.key.contractCounterpartyTIN)) {
    errors.push({
      inputId: "key__details-TIN",
      input: "contractCounterpartyTIN",
      message: `ИНН должен содержать 10 цифр (для иностранных компаний - начинаться с "9909")`,
    });
  }
  if (!validateKPP(data.key.contractCounterpartyKPP)) {
    errors.push({
      inputId: "key__details-KPP",
      input: "contractCounterpartyKPP",
      message: "КПП должен содержать 9 цифр",
    });
  }
  if (!validateBankAccount(data.key.contractCounterpartyBankAccount)) {
    errors.push({
      inputId: "key__details-account",
      input: "contractCounterpartyBankAccount",
      message: "Расчётный счёт должен содержать 20 цифр",
    });
  }
  if (!data.key.contractCounterpartyBank) {
    errors.push({
      inputId: "key__details-bank",
      input: "contractCounterpartyBank",
      message: "Поле обязательно для заполнения",
    });
  }
  if (!validateBIK(data.key.contractCounterpartyBIK)) {
    errors.push({
      inputId: "key__details-BIK",
      input: "contractCounterpartyBIK",
      message: "БИК должен состоять из 9 цифр",
    });
  }
  if (!validateEmail(data.payment.contractEmail)) {
    errors.push({
      inputId: "payment__email",
      input: "contractEmail",
      message: `email должен быть указан в формате "example@email.com"`,
    });
  }

  if (!validateCost(data.cost.contractPrice)) {
    errors.push({
      inputId: "cost__price",
      input: "contractPrice",
      message: "Стоимость должна быть указана в цифровом формате",
    });
  }

  if (data.payment.contractDevided === "one") {
    if (!validateCost(data.payment.contractFirstPayment)) {
      errors.push({
        inputId: "payment__summ-first",
        input: "contractFirstPayment",
        message: "Стоимость должна быть указана в цифровом формате",
      });
    }
    if (!validatePayments(data)) {
      errors.push(
        {
          inputId: "payment__summ-first",
          input: "contractFirstPayment",
          message:
            "Общая стоимость услуг отличается от итоговой суммы платежей",
        },
        {
          inputId: "cost__price",
          input: "contractPrice",
          message:
            "Общая стоимость услуг отличается от итоговой суммы платежей",
        },
      );
    }
  }

  if (data.payment.contractDevided === "two") {
    if (!validateCost(data.payment.contractFirstPayment)) {
      errors.push({
        inputId: "payment__summ-first",
        input: "contractFirstPayment",
        message: "Стоимость должна быть указана в цифровом формате",
      });
    }
    if (!validatePayments(data)) {
      errors.push(
        {
          inputId: "payment__summ-first",
          input: "contractFirstPayment",
          message:
            "Общая стоимость услуг отличается от итоговой суммы платежей",
        },
        {
          inputId: "cost__price",
          input: "contractPrice",
          message:
            "Общая стоимость услуг отличается от итоговой суммы платежей",
        },
      );
    }
    if (!validateCost(data.payment.contractSecondPayment)) {
      errors.push({
        inputId: "payment__summ-second",
        input: "contractSecondPayment",
        message: "Стоимость должна быть указана в цифровом формате",
      });
    }
    if (!validatePayments(data)) {
      errors.push({
        inputId: "payment__summ-second",
        input: "contractSecondPayment",
        message: "Общая стоимость услуг отличается от итоговой суммы платежей",
      });
    }
  }

  if (data.payment.contractDevided === "three") {
    if (!validateCost(data.payment.contractFirstPayment)) {
      errors.push({
        inputId: "payment__summ-first",
        input: "contractFirstPayment",
        message: "Стоимость должна быть указана в цифровом формате",
      });
    }

    if (!validatePayments(data)) {
      errors.push(
        {
          inputId: "payment__summ-first",
          input: "contractFirstPayment",
          message:
            "Общая стоимость услуг отличается от итоговой суммы платежей",
        },
        {
          inputId: "cost__price",
          input: "contractPrice",
          message:
            "Общая стоимость услуг отличается от итоговой суммы платежей",
        },
      );
    }

    if (!validateCost(data.payment.contractSecondPayment)) {
      errors.push({
        inputId: "payment__summ-second",
        input: "contractSecondPayment",
        message: "Стоимость должна быть указана в цифровом формате",
      });
    }

    if (!validatePayments(data)) {
      errors.push({
        inputId: "payment__summ-second",
        input: "contractSecondPayment",
        message: "Общая стоимость услуг отличается от итоговой суммы платежей",
      });
    }

    if (!validateCost(data.payment.contractThirdPayment)) {
      errors.push({
        inputId: "payment__summ-third",
        input: "contractThirdPayment",
        message: "Стоимость должна быть указана в цифровом формате",
      });
    }

    if (!validatePayments(data)) {
      errors.push({
        inputId: "payment__summ-third",
        input: "contractThirdPayment",
        message: "Общая стоимость услуг отличается от итоговой суммы платежей",
      });
    }
  }
  return errors;
}

export function clearErrors() {
  document.querySelectorAll(".error").forEach((element) => {
    element.classList.remove("error");
  });
  document.querySelectorAll(".error-message").forEach((element) => {
    element.remove();
  });
}

export function showErrors(errors) {
  clearErrors();

  errors.forEach((error) => {
    const input = document.querySelector(`#${error.inputId}`);
    if (!input) return;

    input.classList.add("error");

    const errorSpan = document.createElement("span");
    errorSpan.className = `error-message`;
    errorSpan.textContent = error.message;

    input.parentElement.appendChild(errorSpan);
  });
}
