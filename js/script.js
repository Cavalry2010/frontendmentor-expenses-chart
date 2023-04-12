"use strict";

class expensesChart {
  barsBox = document.querySelector(".spending-bars-box");

  constructor() {
    this.renderDays();
  }

  async getJSON() {
    const response = await fetch("../data.json");
    const data = await response.json();
    return data;
  }

  async renderDays() {
    const data = await this.getJSON();
    const amounts = [];
    let biggest = 0;
    data.forEach((dayEntry) => {
      const { day, amount } = dayEntry;
      amounts.push(amount);
      this.barsBox.insertAdjacentHTML(
        "beforeend",
        `<div class="spending-bar">
            <div class="bar" data-money="${amount}"></div>
            <p class="spending-day">${day}</p>
        </div>`
      );
    });
    amounts.forEach((amount) => {
      if (amount > biggest) {
        biggest = amount;
      }
    });
    const barsBox = Array.from(this.barsBox.children);
    barsBox.forEach((child) => {
      const bar = Array.from(child.children);
      const money = +bar[0].dataset.money;
      if (money === biggest) {
        bar[0].style.paddingTop = "15rem";
        bar[0].classList.add("bar--biggest");
      } else {
        bar[0].style.paddingTop = `${(money / biggest) * 15}rem`;
      }
    });
  }
}

const chart = new expensesChart();
