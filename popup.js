document.addEventListener("DOMContentLoaded", async function() {
  const blacklistEl = document.getElementById("blacklist");
  const companyInput = document.getElementById("companyInput");
  const addButton = document.getElementById("addButton");

  // Load existing blacklist
  async function loadBlacklist() {
      chrome.storage.local.get(["blacklist"], function(data) {
          blacklistEl.innerHTML = ""; // Clear UI list
          let blacklist = data.blacklist || [];

          blacklist.forEach((company, index) => {
              let li = document.createElement("li");
              li.textContent = company;
              
              let removeBtn = document.createElement("button");
              removeBtn.textContent = "X";
              removeBtn.className = "remove";
              removeBtn.addEventListener("click", () => removeCompany(index));

              li.appendChild(removeBtn);
              blacklistEl.appendChild(li);
          });
      });
  }

  // Add new company
  addButton.addEventListener("click", () => {
      let newCompany = companyInput.value.trim();
      if (!newCompany) return;

      chrome.storage.local.get(["blacklist"], function(data) {
          let blacklist = data.blacklist || [];
          if (!blacklist.includes(newCompany.toLowerCase())) {
              blacklist.push(newCompany.toLowerCase()); // Store in lowercase
              chrome.storage.local.set({ blacklist }, loadBlacklist);
          }
      });

      companyInput.value = "";
  });

  function removeCompany(index) {
      chrome.storage.local.get(["blacklist"], function(data) {
          let blacklist = data.blacklist || [];
          blacklist.splice(index, 1);
          chrome.storage.local.set({ blacklist }, loadBlacklist);
      });
  }

  loadBlacklist();
});