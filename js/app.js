// Const HTML elements ( Elements created with $ )
const $adviceNumber = document.querySelector("#advice-number");
const $advice = document.querySelector("#advice");
const $spinner = document.querySelector("#spinner");
const $randomButton = document.querySelector("#random-button");

// We need a random ID because the API don't send different advice often.
const randomID = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Call the API and get the advice data
async function getAdvice() {
  try {
    const response = await fetch(
      `https://api.adviceslip.com/advice/${randomID(1, 224)}`
    );
    const data = await response.json();
    return data.slip;
  } catch (error) {
    console.error(error);
  }
}

// Show the advice data in the html
async function showAdvice() {
  $advice.textContent = "";
  $adviceNumber.textContent = "";
  $spinner.classList.remove("hidden");

  const adviceInfo = await getAdvice();

  $spinner.classList.add("hidden");

  $adviceNumber.textContent = `#${adviceInfo.id}`;
  $advice.textContent = adviceInfo.advice;
}

window.addEventListener("load", showAdvice);
$randomButton.addEventListener("click", showAdvice);
