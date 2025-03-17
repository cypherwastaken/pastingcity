document.getElementById("search-btn").addEventListener("click", fetchInventory);

async function fetchInventory() {
    const userId = document.getElementById("user-id").value;
    if (!userId) return;

    const avatarRes = await fetch(`https://hexagon.pw/api/avatarthumbnail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetid: userId, type: "headshot", asset: "user" })
    });
    const avatarData = await avatarRes.json();
    const avatarUrl = avatarData.success ? avatarData.data.url : "/assets/default-avatar.png";

    const inventoryRes = await fetch("https://hexagon.pw/api/users/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: userId, page: 1 })
    });
    const inventoryData = await inventoryRes.json();

    document.getElementById("user-info").innerHTML = `
        <img src="${avatarUrl}" alt="User Avatar">
        <h2>User Inventory</h2>
    `;

    const inventoryDiv = document.getElementById("inventory");
    inventoryDiv.innerHTML = "";

    if (inventoryData.success) {
        inventoryData.data.inventory.forEach(async (item) => {
            if (!item.limited) return;

            const priceRes = await fetch(`https://hexagon.pw/api/catalog/item/${item.assetid}`);
            const priceData = await priceRes.json();
            const price = priceData.success ? priceData.data.item.price : "Unknown";

            inventoryDiv.innerHTML += `
                <div class="item">
                    <h3>${item.assetname}</h3>
                    <img src="http://hexagon.pw//Thumbs/Asset.ashx?assetId=${item.assetid}">
                    <p>Serial: ${item.serialid || "N/A"}</p>
                    <p>Price: ${price}</p>
                    ${item.limited === "limitedu" ? `<img src="/assets/limitedu.svg" class="tag">` : ""}
                    ${item.limited === "limited" ? `<img src="/assets/limited.svg" class="tag">` : ""}
                </div>
            `;
        });
    }
}