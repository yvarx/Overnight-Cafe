const menuData = {
  coffee: {
    title: "Coffee",
    note: "Iced / Hot",
    items: [
      ["Americano", "₱69", "₱89"],
      ["Sweet Americano", "₱79", "₱99"],
      ["Overnight Latte", "₱89", "₱109"],
      ["Spanish Latte", "₱89", "₱109"],
      ["Mocha Latte", "₱99", "₱119"],
      ["Vanilla Latte", "₱99", "₱119"],
      ["Roasted Almond Latte", "₱99", "₱119"],
      ["Macadamia Nut Latte", "₱99", "₱119"],
      ["Hazelnut Latte", "₱99", "₱119"],
      ["Seasalt Latte", "₱99", "₱119"],
      ["Salted Caramel", "₱109", "₱129"],
      ["Caramel Macchiato", "₱109", "₱129"],
      ["White Chocolate Mocha", "₱109", "₱129"],
      ["Coffee Jelly", "₱109", "₱129"],
      ["Biscoff Latte", "₱119", "₱139"]
    ]
  },
  matcha: {
    title: "Matcha Series",
    note: "Iced / Hot",
    items: [
      ["Matcha Latte", "₱99", "₱119", "Smooth, earthy, and naturally sweet."],
      ["Strawberry Matcha", "₱119", "₱139", "Vibrant strawberry meets milky matcha."],
      ["Seasalt Matcha", "₱119", "₱139", "Creamy matcha with a lightly salted finish."]
    ]
  },
  noncoffee: {
    title: "Non-Coffee & Refreshers",
    note: "Iced / Hot unless marked",
    items: [
      ["Choco Latte", "₱89", "₱109"],
      ["Strawberry Milk", "₱89", "₱109"],
      ["Cookies & Cream", "₱89", "₱109"],
      ["Ube Milk", "₱89", "₱109"],
      ["Biscoff Milk", "₱109", "₱129"],
      ["Pistachio (Dubai)", "₱130", "₱150"],
      ["Strawberry Refresher", "₱79", "", "Iced only"],
      ["Green Apple Refresher", "₱79", "", "Iced only"],
      ["Lychee Refresher", "₱79", "", "Iced only"]
    ]
  },
  meals: {
    title: "Rice Meals",
    note: "Comfort food favorites",
    items: [
      ["Cheesy Chicken Poppers", "₱105", "", "Chicken poppers with creamy cheese sauce and rice."],
      ["Cheesy Bacon", "₱115", "", "Bacon, cheese sauce, and rice."],
      ["Cheesy Hungarian", "₱119", "", "Hungarian sausage, cheese sauce, and rice."],
      ["Mini Chicken Poppers Rice", "₱89", ""],
      ["Mini Cheesy Shanghai", "₱79", ""]
    ]
  },
  snacks: {
    title: "Snacks & Add-ons",
    note: "Easy extras for the table",
    items: [
      ["Chicken Poppers Bites", "₱89", "", "Good for 1–2 people."],
      ["Fries", "₱60", "", "Choose cheese, sour cream, or BBQ."],
      ["Extra Shot", "₱20", ""],
      ["Extra Syrup (15 ml)", "₱15", ""],
      ["Extra Sauce (20 ml)", "₱15", ""]
    ]
  }
};

const menuPanel = document.querySelector("#menu-panel");
const tabs = [...document.querySelectorAll(".menu-tab")];

function renderMenu(category) {
  const data = menuData[category];
  const splitAt = Math.ceil(data.items.length / 2);
  const columns = [data.items.slice(0, splitAt), data.items.slice(splitAt)];

  menuPanel.innerHTML = `
    <div class="menu-column-title">
      <h3>${data.title}</h3>
      <span>${data.note}</span>
    </div>
    ${columns.map(items => `
      <ul class="menu-list">
        ${items.map(([name, first, second, description]) => `
          <li class="menu-item">
            <span class="menu-item-name">${name}</span>
            <span class="menu-item-dots" aria-hidden="true"></span>
            <span class="menu-item-price">
              ${first ? `<span>${first}</span>` : ""}
              ${second ? `<span>${second}</span>` : ""}
            </span>
            ${description ? `<small>${description}</small>` : ""}
          </li>
        `).join("")}
      </ul>
    `).join("")}
  `;
}

renderMenu("coffee");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderMenu(tab.dataset.category);
  });
});

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("open", !isOpen);
});

siteNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("open");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeLightbox = lightbox.querySelector(".lightbox-close");

function openLightbox(source, alt) {
  lightboxImage.src = source;
  lightboxImage.alt = alt;
  lightbox.showModal();
}

document.querySelectorAll("[data-image]").forEach(item => {
  item.addEventListener("click", () => openLightbox(item.dataset.image, item.dataset.alt));
});

closeLightbox.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => {
  const rect = lightbox.getBoundingClientRect();
  const clickedOutside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (clickedOutside) lightbox.close();
});

document.querySelector("#year").textContent = new Date().getFullYear();
