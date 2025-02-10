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

    if (blacklist.some(term => companyName.includes(term))) {
      console.log(`❌ Removing job posting from: ${companyName}`);
      vacatures[i].remove();
    }   
  }
}


setTimeout(filterList, 2000);

      if (vacatureDetails.length >= 2) {
        const companyName = vacatureDetails[0].innerHTML.trim().toLowerCase();
        const location = vacatureDetails[1].innerHTML.trim();

        if (blacklist.some(term => companyName.includes(term))) {
          console.log(`Removing job posting from: ${companyName}`);
          vacatures[i].remove();
        }
      } else {
        console.warn(`No <strong> elements found inside .c-vacature-meta.-location for vacature ${i}`);
      }
    } else {
      console.warn(`No .c-vacature-meta.-location found for vacature ${i}`);
    }
  }
}, 3000); 