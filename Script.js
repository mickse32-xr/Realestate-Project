const propertiesList = [
  {
    id: 1,
    name: "Harbor Loft",
    location: "Downtown, Seattle",
    price: "$1,250,000",
    area: "2,450 sqft",
    bedrooms: 4,
    bathrooms: 3,
    type: "Penthouse",
    yearBuilt: 2020,
    image: "https://placehold.co/600x400/2c5f6e/white?text=Harbor+Loft"
  },
  {
    id: 2,
    name: "Sunset Villa",
    location: "Santa Monica, CA",
    price: "$2,890,000",
    area: "3,200 sqft",
    bedrooms: 5,
    bathrooms: 4,
    type: "Villa",
    yearBuilt: 2018,
    image: "https://placehold.co/600x400/c68b5e/white?text=Sunset+Villa"
  },
  {
    id: 3,
    name: "Maple Gardens",
    location: "Austin, TX",
    price: "$745,000",
    area: "1,870 sqft",
    bedrooms: 3,
    bathrooms: 2,
    type: "Townhouse",
    yearBuilt: 2022,
    image: "https://placehold.co/600x400/5f8b6c/white?text=Maple+Gardens"
  }
];

const tenants = [
  { name: "Eleanor Chen", property: "Harbor Loft", rent: "$4,200/mo", leaseEnd: "Dec 2026" },
  { name: "Marcus Velez", property: "Sunset Villa", rent: "$7,500/mo", leaseEnd: "Aug 2027" }
];


const dynamicContent = document.getElementById("dynamicContent");
const pageMainTitle = document.getElementById("pageMainTitle");
const pageSubTitle = document.getElementById("pageSubTitle");

const modal = document.getElementById("propertyModal");
const modalBody = document.getElementById("modalBodyContent");
const closeBtn = document.getElementById("closeModalBtn");
const footerClose = document.getElementById("modalCloseFooterBtn");


function openModal(property) {
  modalBody.innerHTML = `
    <h2>${property.name}</h2>
    <p><strong>Location:</strong> ${property.location}</p>
    <p><strong>Price:</strong> ${property.price}</p>
    <p><strong>Area:</strong> ${property.area}</p>
    <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
    <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
  `;

  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

closeBtn.addEventListener("click", closeModal);
footerClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});


function createPropertyCard(property) {
  const card = document.createElement("div");
  card.className = "property-card";

  card.innerHTML = `
    <div class="card-img" style="background-image:url('${property.image}')">
      <span class="card-badge">${property.type}</span>
    </div>
    <div class="card-details">
      <h3>${property.name}</h3>
      <div class="location">${property.location}</div>
      <div class="price-stats">
        <span class="price">${property.price}</span>
        <span>${property.area}</span>
      </div>
    </div>
  `;

  
  if (property.id === 1) {
    card.addEventListener("click", () => openModal(property));
  }

  return card;
}

function renderPropertyGrid(properties) {
  const grid = document.createElement("div");
  grid.className = "property-grid";

  properties.forEach(property => {
    grid.appendChild(createPropertyCard(property));
  });

  return grid;
}


function renderDashboard() {
  pageMainTitle.textContent = "Dashboard";
  pageSubTitle.textContent = "Property overview";

  dynamicContent.innerHTML = "";

  const stats = document.createElement("div");
  stats.style.marginBottom = "30px";
  stats.innerHTML = `
    <h2>Total Properties: ${propertiesList.length}</h2>
  `;

  dynamicContent.appendChild(stats);
  dynamicContent.appendChild(renderPropertyGrid(propertiesList));
}

function renderPropertiesPage() {
  pageMainTitle.textContent = "Properties";
  pageSubTitle.textContent = "All properties";

  dynamicContent.innerHTML = "";
  dynamicContent.appendChild(renderPropertyGrid(propertiesList));
}

function renderTenantsPage() {
  pageMainTitle.textContent = "Tenants";
  pageSubTitle.textContent = "Tenant management";

  dynamicContent.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "property-grid";

  tenants.forEach(tenant => {
    const card = document.createElement("div");
    card.className = "property-card";

    card.innerHTML = `
      <div class="card-details">
        <h3>${tenant.name}</h3>
        <p>${tenant.property}</p>
        <p>${tenant.rent}</p>
        <p>${tenant.leaseEnd}</p>
      </div>
    `;

    wrapper.appendChild(card);
  });

  dynamicContent.appendChild(wrapper);
}


function setActivePage(page) {
  document.querySelectorAll(".nav-item").forEach(nav => {
    nav.classList.remove("active");
    if (nav.dataset.page === page) nav.classList.add("active");
  });

  switch (page) {
    case "dashboard":
      renderDashboard();
      break;
    case "properties":
      renderPropertiesPage();
      break;
    case "tenants":
      renderTenantsPage();
      break;
  }
}


document.querySelectorAll(".nav-item").forEach(nav => {
  nav.addEventListener("click", () => {
    setActivePage(nav.dataset.page);
  });
});


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Initial page
setActivePage("dashboard");
