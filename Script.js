  // ---------- MOCK DATA FOR PROPERTIES ----------
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
    },
    {
      id: 4,
      name: "Riverside Tower",
      location: "Chicago, IL",
      price: "$1,890,000",
      area: "2,100 sqft",
      bedrooms: 3,
      bathrooms: 2.5,
      type: "Condo",
      yearBuilt: 2015,
      image: "https://placehold.co/600x400/4f6f8f/white?text=Riverside+Tower"
    },
    {
      id: 5,
      name: "Oakwood Estate",
      location: "Nashville, TN",
      price: "$3,450,000",
      area: "5,200 sqft",
      bedrooms: 6,
      bathrooms: 5,
      type: "Estate",
      yearBuilt: 2005,
      image: "https://placehold.co/600x400/9c7c5b/white?text=Oakwood+Estate"
    },
    {
      id: 6,
      name: "Pearl Studios",
      location: "Brooklyn, NY",
      price: "$990,000",
      area: "1,220 sqft",
      bedrooms: 2,
      bathrooms: 2,
      type: "Loft",
      yearBuilt: 2023,
      image: "https://placehold.co/600x400/7596a8/white?text=Pearl+Studios"
    }
  ];

  // page states: dashboard (shows summary + some cards), properties (full grid), tenants (simple tenant list)
  let currentPage = "dashboard";  // dashboard, properties, tenants

  // DOM elements
  const dynamicContent = document.getElementById("dynamicContent");
  const pageMainTitle = document.getElementById("pageMainTitle");
  const pageSubTitle = document.getElementById("pageSubTitle");
  const modalOverlay = document.getElementById("propertyModal");
  const modalBody = document.getElementById("modalBodyContent");
  
  // Helper: close modal
  function closeModal() {
    modalOverlay.classList.remove("active");
  }
  
  function openModal(property) {
    // Fill modal content with property details
    modalBody.innerHTML = `
      <div style="margin-bottom: 6px;"><strong><i class="fas fa-building"></i> ${property.name}</strong></div>
      <div class="property-detail">
        <p><i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> ${property.location}</p>
        <p><i class="fas fa-tag"></i> <strong>Price:</strong> ${property.price}</p>
        <p><i class="fas fa-ruler-combined"></i> <strong>Area:</strong> ${property.area}</p>
        <p><i class="fas fa-bed"></i> <strong>Bedrooms:</strong> ${property.bedrooms} | <i class="fas fa-bath"></i> Baths: ${property.bathrooms}</p>
        <p><i class="fas fa-home"></i> <strong>Type:</strong> ${property.type} | Built: ${property.yearBuilt}</p>
      </div>
      <p style="font-size:0.9rem;">This property is actively listed. Contact admin to schedule viewing or manage documents. Fully organized in our real estate system.</p>
    `;
    modalOverlay.classList.add("active");
  }

  // Attach global modal closing
  document.getElementById("closeModalBtn").addEventListener("click", closeModal);
  document.getElementById("modalCloseFooterBtn").addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if(e.target === modalOverlay) closeModal();
  });

  // Render Property Cards (grid layout) 
  function renderPropertyCards(propertiesArray, clickHandler) {
    const gridDiv = document.createElement("div");
    gridDiv.className = "property-grid";
    propertiesArray.forEach(prop => {
      const card = document.createElement("div");
      card.className = "property-card";
      card.setAttribute("data-id", prop.id);
      // adding image background for style
      card.innerHTML = `
        <div class="card-img" style="background-image: url('${prop.image}'); background-size: cover;">
          <span class="card-badge">${prop.type}</span>
        </div>
        <div class="card-details">
          <h3>${prop.name}</h3>
          <div class="location"><i class="fas fa-map-pin"></i> ${prop.location}</div>
          <div class="price-stats">
            <span class="price">${prop.price}</span>
            <span class="area"><i class="fas fa-vector-square"></i> ${prop.area}</span>
          </div>
          <div style="margin-top: 12px; font-size:0.8rem; color:#4b6a7a;"><i class="fas fa-bed"></i> ${prop.bedrooms} beds · <i class="fas fa-bath"></i> ${prop.bathrooms} baths</div>
        </div>
      `;
      card.addEventListener("click", () => clickHandler(prop));
      gridDiv.appendChild(card);
    });
    return gridDiv;
  }

  // DASHBOARD PAGE (show featured properties + stats, grid layout)
  function renderDashboard() {
    pageMainTitle.innerText = "Dashboard";
    pageSubTitle.innerText = "Property overview & quick stats";
    const container = document.createElement("div");
    
    // Stats row minimal
    const statsRow = document.createElement("div");
    statsRow.style.display = "grid";
    statsRow.style.gridTemplateColumns = "repeat(auto-fit, minmax(180px,1fr))";
    statsRow.style.gap = "20px";
    statsRow.style.marginBottom = "32px";
    statsRow.innerHTML = `
      <div style="background:white; border-radius: 28px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        <i class="fas fa-building" style="font-size:2rem; color:#2c5f6e;"></i>
        <h2 style="margin-top: 10px;">${propertiesList.length}</h2>
        <p>Total Properties</p>
      </div>
      <div style="background:white; border-radius: 28px; padding: 18px;">
        <i class="fas fa-dollar-sign" style="font-size:2rem; color:#2c5f6e;"></i>
        <h2 style="margin-top: 10px;">$11.2M</h2>
        <p>Portfolio Value</p>
      </div>
      <div style="background:white; border-radius: 28px; padding: 18px;">
        <i class="fas fa-chart-line" style="font-size:2rem; color:#2c5f6e;"></i>
        <h2 style="margin-top: 10px;">+14%</h2>
        <p>YoY Growth</p>
      </div>
    `;
    container.appendChild(statsRow);
    
    const featuredTitle = document.createElement("h3");
    featuredTitle.style.marginBottom = "16px";
    featuredTitle.style.fontWeight = "600";
    featuredTitle.innerHTML = "<i class='fas fa-star'></i> Featured Listings";
    container.appendChild(featuredTitle);
    
    // Featured properties first 3
    const featuredProperties = propertiesList.slice(0, 3);
    const featuredGrid = renderPropertyCards(featuredProperties, (prop) => openModal(prop));
    container.appendChild(featuredGrid);
    
    const viewAllLink = document.createElement("div");
    viewAllLink.style.marginTop = "28px";
    viewAllLink.style.textAlign = "center";
    viewAllLink.innerHTML = `<button id="gotoPropertiesBtn" style="background:#2c5f6e; border:none; color:white; padding: 10px 28px; border-radius: 40px; font-weight:600; cursor:pointer;"><i class="fas fa-arrow-right"></i> View all properties</button>`;
    container.appendChild(viewAllLink);
    
    dynamicContent.innerHTML = "";
    dynamicContent.appendChild(container);
    
    document.getElementById("gotoPropertiesBtn")?.addEventListener("click", () => {
      setActivePage("properties");
      renderPropertiesPage();
    });
  }
  
  // PROPERTIES PAGE (full grid of all properties, with modal)
  function renderPropertiesPage() {
    pageMainTitle.innerText = "Properties";
    pageSubTitle.innerText = "Manage your real estate portfolio";
    const container = document.createElement("div");
    const headerInfo = document.createElement("div");
    headerInfo.style.display = "flex";
    headerInfo.style.justifyContent = "space-between";
    headerInfo.style.alignItems = "center";
    headerInfo.style.marginBottom = "24px";
    headerInfo.innerHTML = `<div><strong><i class="fas fa-list-ul"></i> All Properties (${propertiesList.length})</strong></div><div style="font-size:0.8rem;"><i class="fas fa-mouse-pointer"></i> Click any card for details</div>`;
    container.appendChild(headerInfo);
    const fullGrid = renderPropertyCards(propertiesList, (prop) => openModal(prop));
    container.appendChild(fullGrid);
    dynamicContent.innerHTML = "";
    dynamicContent.appendChild(container);
  }

  // TENANTS PAGE (third page - shows tenant list, with some property relation, respecting grid for cards not but still tenant cards style to match property card idea but also shows organization)
  function renderTenantsPage() {
    pageMainTitle.innerText = "Tenants";
    pageSubTitle.innerText = "Occupancy & leases management";
    const container = document.createElement("div");
    // Using grid layout for tenant cards to maintain consistent grid style
    const tenantGrid = document.createElement("div");
    tenantGrid.className = "property-grid";
    
    // mock tenant data linked to properties (demo)
    const tenants = [
      { name: "Eleanor Chen", property: "Harbor Loft", leaseEnd: "Dec 2026", rent: "$4,200/mo", status: "Active", imagePlaceholder: "EC" },
      { name: "Marcus Velez", property: "Sunset Villa", leaseEnd: "Aug 2027", rent: "$7,500/mo", status: "Active", imagePlaceholder: "MV" },
      { name: "Sophia Rodriguez", property: "Maple Gardens", leaseEnd: "Mar 2026", rent: "$2,950/mo", status: "Active", imagePlaceholder: "SR" },
      { name: "James Whitman", property: "Riverside Tower", leaseEnd: "Nov 2025", rent: "$3,800/mo", status: "Review", imagePlaceholder: "JW" },
      { name: "Linda Park", property: "Oakwood Estate", leaseEnd: "Sep 2028", rent: "$9,200/mo", status: "Active", imagePlaceholder: "LP" },
      { name: "Robert Hayes", property: "Pearl Studios", leaseEnd: "Feb 2027", rent: "$2,450/mo", status: "Active", imagePlaceholder: "RH" }
    ];
    
    tenants.forEach(tenant => {
      const card = document.createElement("div");
      card.className = "property-card";
      card.style.cursor = "pointer";
      card.innerHTML = `
        <div class="card-img" style="background: #2c5f6e; display: flex; align-items: center; justify-content: center; color:white; font-size: 2.5rem; font-weight:bold;">
          ${tenant.imagePlaceholder}
        </div>
        <div class="card-details">
          <h3>${tenant.name}</h3>
          <div class="location"><i class="fas fa-building"></i> ${tenant.property}</div>
          <div class="price-stats">
            <span class="price">${tenant.rent}</span>
            <span class="area"><i class="fas fa-calendar-alt"></i> ${tenant.leaseEnd}</span>
          </div>
          <div style="margin-top: 10px;"><span style="background: ${tenant.status === 'Active' ? '#dff0e6' : '#fff0e0'}; padding: 4px 12px; border-radius: 40px; font-size:0.7rem; font-weight:600;">${tenant.status}</span></div>
        </div>
      `;
      card.addEventListener("click", () => {
        // simple modal showing tenant details (modal reuse)
        modalBody.innerHTML = `
          <div><strong><i class="fas fa-user"></i> ${tenant.name}</strong></div>
          <div class="property-detail">
            <p><i class="fas fa-home"></i> Property: ${tenant.property}</p>
            <p><i class="fas fa-dollar-sign"></i> Monthly Rent: ${tenant.rent}</p>
            <p><i class="fas fa-calendar-check"></i> Lease ends: ${tenant.leaseEnd}</p>
            <p><i class="fas fa-id-card"></i> Status: ${tenant.status}</p>
          </div>
          <p>Tenant contact and documents can be managed from the admin panel.</p>
        `;
        modalOverlay.classList.add("active");
      });
      tenantGrid.appendChild(card);
    });
    container.appendChild(tenantGrid);
    dynamicContent.innerHTML = "";
    dynamicContent.appendChild(container);
  }
  
  // main page router
  function setActivePage(pageId) {
    currentPage = pageId;
    // update sidebar active class
    document.querySelectorAll(".nav-item").forEach(item => {
      const pageAttr = item.getAttribute("data-page");
      if (pageAttr === pageId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    // render based on page
    if (pageId === "dashboard") renderDashboard();
    else if (pageId === "properties") renderPropertiesPage();
    else if (pageId === "tenants") renderTenantsPage();
  }
  
  // attach sidebar navigation
  document.querySelectorAll(".nav-item").forEach(nav => {
    nav.addEventListener("click", (e) => {
      const page = nav.getAttribute("data-page");
      if (page === "dashboard") setActivePage("dashboard");
      else if (page === "properties") setActivePage("properties");
      else if (page === "tenants") setActivePage("tenants");
    });
  });
  
  
  // initial load: dashboard
  setActivePage("dashboard");