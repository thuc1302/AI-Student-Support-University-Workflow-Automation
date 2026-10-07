function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const chatForm = document.querySelector("#chat-form");

if (chatForm) {
  const input = document.querySelector("#chat-input");
  const messages = document.querySelector("#messages");

  const submitQuestion = async (question) => {
    const cleanQuestion = String(question || "").trim();
    if (!cleanQuestion) return;

    messages.insertAdjacentHTML(
      "beforeend",
      `<div class="message-row user-row">
        <div class="message user">${escapeHtml(cleanQuestion)}</div>
        <div class="message-avatar user-avatar">B</div>
      </div>
      <div class="message-row ai-row loading-row">
        <div class="message-avatar ai-avatar">✦</div>
        <div class="message ai loading">Đang tra cứu nguồn hướng dẫn...</div>
      </div>`
    );
    messages.scrollTop = messages.scrollHeight;
    input.value = "";
    input.focus();

    try {
      const response = await fetch("/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion })
      });

      const data = await response.json();
      const loadingRow = messages.querySelector(".loading-row");
      if (!loadingRow) return;

      loadingRow.classList.remove("loading-row");
      loadingRow.querySelector(".message").classList.remove("loading");
      loadingRow.querySelector(".message").innerHTML = `
        <p>${escapeHtml(data.answer || "Không có phản hồi.")}</p>
        <small class="source">Nguồn: ${escapeHtml(data.source || "VKU Care")}</small>
        ${data.actionHref ? `<a class="ai-action" href="${escapeHtml(data.actionHref)}">${escapeHtml(data.action || "Xem thêm")} →</a>` : ""}
      `;
    } catch (error) {
      const loadingRow = messages.querySelector(".loading-row");
      if (loadingRow) {
        loadingRow.classList.remove("loading-row");
        const bubble = loadingRow.querySelector(".message");
        bubble.classList.remove("loading");
        bubble.textContent = "Không thể kết nối trợ lý lúc này. Vui lòng thử lại.";
      }
    }

    messages.scrollTop = messages.scrollHeight;
  };

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuestion(input.value);
  });

  document.querySelectorAll(".suggestion-chip").forEach((chip) => {
    chip.addEventListener("click", () => submitQuestion(chip.dataset.question));
  });
}

const procedureSearch = document.querySelector("#procedure-search");
const procedureTabs = document.querySelectorAll(".procedure-tab");
const procedureCards = document.querySelectorAll(".procedure-card");
const procedureEmpty = document.querySelector("#procedure-empty");

if (procedureSearch && procedureCards.length) {
  let activeCategory = "all";

  const applyProcedureFilter = () => {
    const keyword = procedureSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    procedureCards.forEach((card) => {
      const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
      const matchesKeyword = !keyword || card.dataset.name.includes(keyword) || card.textContent.toLowerCase().includes(keyword);
      const visible = matchesCategory && matchesKeyword;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (procedureEmpty) procedureEmpty.hidden = visibleCount !== 0;
  };

  procedureSearch.addEventListener("input", applyProcedureFilter);

  procedureTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      procedureTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.dataset.category;
      applyProcedureFilter();
    });
  });
}

const mobileMenuButton = document.querySelector(".mobile-menu-button");
const sidebar = document.querySelector(".sidebar");
if (mobileMenuButton && sidebar) {
  mobileMenuButton.addEventListener("click", () => sidebar.classList.toggle("mobile-open"));
  document.addEventListener("click", (event) => {
    if (window.innerWidth > 760 || !sidebar.classList.contains("mobile-open")) return;
    if (!sidebar.contains(event.target) && !mobileMenuButton.contains(event.target)) {
      sidebar.classList.remove("mobile-open");
    }
  });
}
