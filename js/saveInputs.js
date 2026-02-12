export function saveInputs() {
  const allInputs = document.querySelectorAll("input, select");
  allInputs.forEach((input) => {
    if (input.id) {
      if (input.type === "checkbox" || input.type === "radio") {
        sessionStorage.setItem(input.id, input.checked);
      } else sessionStorage.setItem(input.id, input.value);
    }
  });
}

export function restoreInputs() {
  const allInputs = document.querySelectorAll("input, select");
  allInputs.forEach((input) => {
    if (input.id) {
      const savedInput = sessionStorage.getItem(input.id);
      if (savedInput !== null) {
        if (input.type === "checkbox" || input.type === "radio") {
          input.checked = savedInput === "true";
        } else input.value = savedInput;
      }
    }
  });
}

export function clearSessionStorage() {
  sessionStorage.clear();
}
