// js/app.js
import { menuItems } from './menu-data.js';

class CoffeeCraftApp {
  constructor() {
    this.cart = [];
    this.catalogContainer = document.getElementById('catalog-grid');
    this.cartCountElement = document.getElementById('cart-count');
    this.init();
  }

  init() {
    this.renderCatalog();
    this.bindEvents();
  }

  renderCatalog() {
    this.catalogContainer.innerHTML = menuItems.map(item => `
      <article class="product-card" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="product-image" loading="lazy">
        <div class="product-content">
          <div class="product-header">
            <h3 class="product-title">${item.name}</h3>
            <span class="product-price">$${item.price.toFixed(2)}</span>
          </div>
          <p class="product-notes">${item.origin} · ${item.roastLevel}</p>
          <button class="add-to-cart-btn" data-id="${item.id}">
            Add to Order
          </button>
        </div>
      </article>
    `).join('');
  }

  bindEvents() {
    this.catalogContainer.addEventListener('click', (e) => {
      const button = e.target.closest('.add-to-cart-btn');
      if (button) {
        const itemId = parseInt(button.dataset.id, 10);
        this.addToCart(itemId);
      }
    });
  }

  addToCart(id) {
    const item = menuItems.find(p => p.id === id);
    if (item) {
      this.cart.push(item);
      this.cartCountElement.textContent = this.cart.length;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new CoffeeCraftApp();
});