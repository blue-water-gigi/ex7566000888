// export function formatNumber() {
//   const numberContracts = document.querySelector("#subject__numberContracts");
//   const costPrice = document.querySelector("#cost__price");
//   const firstPayment = document.querySelector("#payment__summ-first");
//   const secondPayment = document.querySelector("#payment__summ-second");
//   const thirdPayment = document.querySelector("#payment__summ-third");

//   const arrayOfNumberInputs = [];
//   arrayOfNumberInputs.push(
//     numberContracts,
//     costPrice,
//     firstPayment,
//     secondPayment,
//     thirdPayment
//   );

//   for (const input of arrayOfNumberInputs) {
//     if (input.value !== "")
//       input.value = Number(input.value).toLocaleString("ru-RU");
//   }
// }

import { parseToInt } from "./validation.js";

export function formatDate(dateString) {
  if (!dateString) {
    return `“ ”__________20XX г.`;
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const monthNumber = date.getMonth();
  const day = date.getDate();

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return `“${day}” ${months[monthNumber]} ${year} г.`;
}

export function formatDateEng(dateString) {
  if (!dateString) {
    return `“ ”__________20XX`;
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const monthNumber = date.getMonth();
  const day = date.getDate();

  const months = [
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
  return `${day} ${months[monthNumber]} ${year}`;
}

//! конвертация числа в буквенное представление
export function convertNum(num) {
  const number = parseToInt(num);
  const units = [
    "",
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
  ];
  const unitsF = [
    "",
    "одна",
    "две",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
  ];
  const teens = [
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ];
  const tens = [
    "",
    "",
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ];
  const hundreds = [
    "",
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ];

  function convert999(n, feminine = false) {
    if (n === 0) return "";

    let result = "";
    const u = feminine ? unitsF : units;

    // Сотни
    result += hundreds[Math.floor(n / 100)] + " ";
    n %= 100;

    // Десятки и единицы
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + " ";
      n %= 10;
      result += u[n];
    } else if (n >= 10) {
      result += teens[n - 10];
    } else {
      result += u[n];
    }

    return result.trim();
  }

  // Функция для склонения слов
  function getDeclension(n, one, few, many) {
    const lastDigit = n % 10;
    const lastTwo = n % 100;

    if (lastTwo >= 11 && lastTwo <= 19) {
      return many;
    } else if (lastDigit === 1) {
      return one;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return few;
    } else {
      return many;
    }
  }

  if (number === 0) return "ноль";
  if (number < 0) return "минус " + convertNum(-num);

  let result = "";

  // Миллионы
  const millions = Math.floor(number / 1000000);
  if (millions > 0) {
    result += convert999(millions) + " ";
    result += getDeclension(millions, "миллион", "миллиона", "миллионов") + " ";
  }

  // Тысячи
  const thousands = Math.floor((number % 1000000) / 1000);
  if (thousands > 0) {
    result += convert999(thousands, true) + " ";
    result += getDeclension(thousands, "тысяча", "тысячи", "тысяч") + " ";
  }

  // Единицы, десятки, сотни
  const remainder = number % 1000;
  if (remainder > 0) {
    result += convert999(remainder);
  }

  return result.trim();
}

export function convertNumEng(num) {
  const number = parseToInt(num);

  const units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const hundreds = [
    "",
    "one hundred",
    "two hundred",
    "three hundred",
    "four hundred",
    "five hundred",
    "six hundred",
    "seven hundred",
    "eight hundred",
    "nine hundred",
  ];

  function convert999(n) {
    if (n === 0) return "";

    let result = "";

    // Сотни
    if (n >= 100) {
      result += units[Math.floor(n / 100)] + " hundred ";
      n %= 100;
    }

    // Десятки и единицы
    if (n >= 20) {
      result += tens[Math.floor(n / 10)];
      n %= 10;
      if (n > 0) {
        result += "-" + units[n];
      }
    } else if (n >= 10) {
      result += teens[n - 10];
    } else if (n > 0) {
      result += units[n];
    }

    return result.trim();
  }

  if (number === 0) return "zero";
  if (number < 0) return "minus " + convertNumEn(-num);

  let result = "";

  // Миллиарды (billions)
  const billions = Math.floor(number / 1000000000);
  if (billions > 0) {
    result += convert999(billions) + " billion ";
  }

  // Миллионы (millions)
  const millions = Math.floor((number % 1000000000) / 1000000);
  if (millions > 0) {
    result += convert999(millions) + " million ";
  }

  // Тысячи (thousands)
  const thousands = Math.floor((number % 1000000) / 1000);
  if (thousands > 0) {
    result += convert999(thousands) + " thousand ";
  }

  // Единицы, десятки, сотни
  const remainder = number % 1000;
  if (remainder > 0) {
    result += convert999(remainder);
  }

  return result.trim();
}
