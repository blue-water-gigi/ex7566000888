export function initModal() {
  openModal();
  closeModal();
}
const instruction = document.querySelector(".header__instruction");
const callback = document.querySelector(".header__callback");

const openModal = () => {
  const instructionButton = document.querySelector(
    ".header__nav-box .header__list li:nth-child(1)"
  );
  const callbackButton = document.querySelector(
    ".header__nav-box .header__list li:nth-child(2)"
  );

  const instructionButtonMobile = document.querySelector(
    ".header__nav-box .header__list.mobile li:nth-child(1)"
  );
  const callbackButtonMobile = document.querySelector(
    ".header__nav-box .header__list.mobile li:nth-child(2)"
  );

  callbackButton.addEventListener("click", () => {
    callback.showModal();
    document.body.classList.add("modal-open");
  });

  instructionButton.addEventListener("click", () => {
    instruction.showModal();
    document.body.classList.add("modal-open");
  });

  callbackButtonMobile.addEventListener("click", () => {
    callback.showModal();
    document.body.classList.add("modal-open");
  });

  instructionButtonMobile.addEventListener("click", () => {
    instruction.showModal();
    document.body.classList.add("modal-open");
  });
};

const closeModal = () => {
  const closeModalBtns = document.querySelectorAll(".modal-close");

  instruction.addEventListener("click", (e) => {
    if (e.target === instruction) {
      instruction.close();
      document.body.classList.remove("modal-open");
    }
  });

  callback.addEventListener("click", (e) => {
    if (e.target === callback) {
      callback.close();
      document.body.classList.remove("modal-open");
    }
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      instruction.close();
      callback.close();
      document.body.classList.remove("modal-open");
    });
  });

  instruction.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });

  callback.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });
};
