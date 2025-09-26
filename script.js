const postsData = [
  {
    title: "Top 5 Tech Trends in 2025",
    category: "tech",
    date: "Sept 25, 2025",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    excerpt: "Explore the emerging technologies shaping the digital future.",
    content: "In 2025, AI continues to redefine industries while blockchain and 5G push innovation forward. From smart cities to quantum computing, here’s how technology is evolving..."
  },
  {
    title: "Mastering UI Layouts with Grids",
    category: "design",
    date: "Sept 20, 2025",
    image: "https://images.unsplash.com/photo-1522205408450-add114ad53fe",
    excerpt: "Learn how grid systems create balance and clarity in design.",
    content: "CSS Grid revolutionized web layouts, providing flexibility and precision. We'll explore practical design examples and how to combine grids with Flexbox for responsive magic."
  },
  {
    title: "Work-Life Balance for Remote Designers",
    category: "lifestyle",
    date: "Sept 18, 2025",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    excerpt: "Tips for maintaining productivity and wellness while working remotely.",
    content: "Remote work offers freedom but demands structure. We'll explore ways to create healthy routines and stay connected with your creative community."
  },
  {
    title: "Top Travel Destinations for Digital Nomads",
    category: "travel",
    date: "Sept 15, 2025",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    excerpt: "Find the perfect balance of work, sun, and adventure.",
    content: "From Bali to Lisbon, discover cities that offer affordable living, vibrant coworking spaces, and breathtaking experiences for nomads."
  }
];

const postsContainer = document.getElementById("blogPosts");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalText = document.getElementById("modalText");
const closeBtn = document.querySelector(".close-btn");

let currentPage = 1;
const postsPerPage = 2;

// Load posts
function renderPosts() {
  postsContainer.innerHTML = "";
  const start = (currentPage - 1) * postsPerPage;
  const paginated = postsData.slice(start, start + postsPerPage);

  paginated.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post-card");
    div.dataset.category = post.category;
    div.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="post-content">
        <h2>${post.title}</h2>
        <p class="date">${post.date}</p>
        <p class="excerpt">${post.excerpt}</p>
        <a href="#" class="read-more">Read More →</a>
      </div>
    `;
    div.querySelector(".read-more").addEventListener("click", e => {
      e.preventDefault();
      openModal(post);
    });
    postsContainer.appendChild(div);
  });

  document.getElementById("pageNumber").textContent = currentPage;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = start + postsPerPage >= postsData.length;
}

// Modal logic
function openModal(post) {
  modal.style.display = "flex";
  modalTitle.textContent = post.title;
  modalImage.src = post.image;
  modalText.textContent = post.content;
}
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// Pagination
document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  renderPosts();
});
document.getElementById("prevPage").addEventListener("click", () => {
  currentPage--;
  renderPosts();
});

// Search
document.getElementById("searchInput").addEventListener("keyup", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".post-card").forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    const excerpt = card.querySelector(".excerpt").textContent.toLowerCase();
    card.style.display = title.includes(term) || excerpt.includes(term) ? "block" : "none";
  });
});

// Category Filter
document.querySelectorAll(".category-filter").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const category = btn.dataset.category;
    document.querySelectorAll(".category-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".post-card").forEach(card => {
      card.style.display = (category === "all" || card.dataset.category === category) ? "block" : "none";
    });
  });
});

// Smooth scroll
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

renderPosts();
