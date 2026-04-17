const input = document.getElementById("inputText");
const button = document.getElementById("addBtn");
const list = document.getElementById("list");
const errorMsg = document.getElementById("errorMsg");

const API_URL = "http://localhost:3000/items";

async function loadItems() {
  try {
    const res = await fetch(API_URL);
    const items = await res.json();

    list.innerHTML = "";

    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Erreur lors du chargement :", error);
  }
}

button.addEventListener("click", async () => {
  const value = input.value.trim();

  if (!value) {
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: value })
    });

    input.value = "";
    loadItems();
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
  }
});

loadItems();