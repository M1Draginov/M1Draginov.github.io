const btnOne = document.querySelector("#btn-one");
const btnTwo = document.querySelector("#btn-two");
const btnThree = document.querySelector("#btn-three");
const articleOne = document.querySelector("#article-one");
const articleTwo = document.querySelector("#article-two");
const articleThree = document.querySelector("#article-three");

btnOne.addEventListener("click", () => {
  articleOne.style.display = "flex";
  articleTwo.style.display = "none";
  articleThree.style.display = "none";
});

btnTwo.addEventListener("click", () => {
  articleOne.style.display = "none";
  articleTwo.style.display = "flex";
  articleThree.style.display = "none";
});

btnThree.addEventListener("click", () => {
  articleOne.style.display = "none";
  articleTwo.style.display = "none";
  articleThree.style.display = "flex";
});


const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const article1 = document.querySelector("#article1");
const article2 = document.querySelector("#article2");
const article3 = document.querySelector("#article3");

btn1.addEventListener("click", () => {
    article1.style.display = "flex";
    article2.style.display = "none";
    article3.style.display = "none";
});

btn2.addEventListener("click", () => {
    article1.style.display = "none";
    article2.style.display = "flex";
    article3.style.display = "none";
});

btn3.addEventListener("click", () => {
    article1.style.display = "none";
    article2.style.display = "none";
    article3.style.display = "flex";
});

const buttons = document.querySelectorAll('button');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        buttons.forEach((btn, btnIndex) => {
            if (index === btnIndex) {
                btn.classList.add('button-underline');
            } else {
                btn.classList.remove('button-underline');
            }
        });
    });
});