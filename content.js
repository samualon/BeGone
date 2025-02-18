async function getBlacklist() {
  return new Promise(resolve => {
    chrome.storage.local.get(["blacklist"], data => {
      resolve(data.blacklist || []);
    });
  });
}

const defaultList = [
  "ago",
  "actief",
  "konvert",
  "randstad",
  "adecco",
  "start people",
  "hays",
  "manpower",
  "jobat",
  "trixxo",
  "unique",
  "experis",
  "talentus",
  "select",
  "let's work",
  "forum jobs",
  "liantis",
  "synergie",
  "sos interim",
  "robert half",
  "michael page",
  "kelly services",
  "xquisit",
  "würth",
  "jobtime",
  "actiris",
  "ceres",
  "axxes",
  "euromaintenance",
  "vms",
  "manpowergroup",
  "jobmatch",
  "asap",
  "vlaamse rand",
  "experis it",
  "luca recruitment",
  "open work",
  "cigna global",
  "house of hr",
  "impakto",
  "agilitas",
  "asap",
  "toba",
  "human capital",
  "inhouse services",
  "intelect",
  "adecco",
  "adworx",
  "q jobs",
  "qjobs",
  "start people",
  "talentus",
  "bright plus",
  "stepstone",
  "horesca",
  "flanders talent",
  "altran",
  "agenor",
  "go4jobs",
  "selexium",
  "stella talent",
  "meinselect",
  "actief interim",
];

async function filterList() {
  let blacklist = await getBlacklist();
  
  blacklist = blacklist.concat(defaultList).map(term => term.toLowerCase());

  const vacatures = document.getElementsByClassName("c-vacature");

  for (let i = vacatures.length - 1; i >= 0; i--) {
    const companyName = vacatures[i].querySelector(".c-vacature-meta").getElementsByTagName('span')[0].getElementsByTagName('strong')[0].innerHTML.toLowerCase();

    const parser = new DOMParser();
    const companyNameDecoded = parser.parseFromString(companyName, "text/html").body.textContent || "";

    if (blacklist.some(term => companyNameDecoded.includes(term))) {
      console.log(`❌ Removing job posting from: ${companyNameDecoded}`);
      vacatures[i].remove();
    }   
  }
}


setTimeout(filterList, 2000);

let lastUrl = window.location.href;

setInterval(() => {
  let currentUrl = window.location.href;
  if (lastUrl !== currentUrl) {
    lastUrl = currentUrl;
    setTimeout(filterList, 1000);
  }
}, 1000);
