const blacklist = [
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
]


setTimeout(() => {
  const vacatures = document.getElementsByClassName("c-vacature");

  for (let i = 0; i < vacatures.length; i++) {
    const vacatureLijn = vacatures[i].querySelector(".c-vacature-meta.-location");

    if (vacatureLijn) {
      const vacatureDetails = vacatureLijn.getElementsByTagName("strong");

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