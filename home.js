
    let plants = JSON.parse(localStorage.getItem("plants")) || [];

    function addPlant() {
      const name = document.getElementById("plantName").value;
      const type = document.getElementById("plantType").value;
      const image = document.getElementById("plantImage").value;
      const days = document.getElementById("wateringDays").value;
      const today = new Date().toISOString().split('T')[0];

      if (!name || !days) return alert("Please fill all required fields.");

      plants.push({ name, type, image, days: Number(days), lastWatered: today });
      localStorage.setItem("plants", JSON.stringify(plants));
      renderPlants();
    }

    function renderPlants() {
      const list = document.getElementById("plantList");
      list.innerHTML = "";

      plants.forEach((plant, index) => {
        const nextWater = getNextWaterDate(plant.lastWatered, plant.days);
        const card = document.createElement("div");
        card.className = "plant-card";
        card.innerHTML = `
          <strong>${plant.name}</strong> (${plant.type})<br>
          Last Watered: ${plant.lastWatered}<br>
          Next Watering: ${nextWater}<br>
          ${plant.image ? `<img src="${plant.image}" alt="${plant.name}">` : ""}<br>
          <button onclick="waterNow(${index})">Water Now</button>
          <button onclick="showTips('${plant.type}')">Care Tips</button>
        `;
        list.appendChild(card);
      });
    }

    function waterNow(index) {
      plants[index].lastWatered = new Date().toISOString().split('T')[0];
      localStorage.setItem("plants", JSON.stringify(plants));
      renderPlants();
    }

    function getNextWaterDate(lastDate, days) {
      const date = new Date(lastDate);
      date.setDate(date.getDate() + days);
      return date.toISOString().split('T')[0];
    }

    function showTips(type) {
      const tips = {
        Flower: "Needs sunlight and regular trimming.",
        Herb: "Keep in indirect sunlight. Water gently.",
        Vegetable: "Requires good drainage and daily monitoring."
      };
      alert(tips[type] || "General care needed.");
    }

    function toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
    }

    renderPlants();
