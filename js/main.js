var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.querySelector("btn")

var webSiteList = JSON.parse(localStorage.getItem("MyWebSites"))|| [];
handleDisplaySite();

function handleAddSite() {
  if (validName() && validUrl()) {
    var webSite = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    webSiteList.push(webSite);
    localStorage.setItem("MyWebSites", JSON.stringify(webSiteList));
    handleDisplaySite();
    handleClearInputs();
  } else {
    const modal = new bootstrap.Modal(document.getElementById('rulesModal'));
    modal.show();
  }
}

function handleDisplaySite() {
  temp = "";
  for (let i = 0; i < webSiteList.length; i++) {
    temp += `<tr>
          <td>${i + 1}</td>
          <td>${webSiteList[i].name}</td>
          <td><button class="btn btn-visit"><a href="https://${webSiteList[i].url}" target="blank"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
          <td><button class="btn btn-delete " onclick="handleDeleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`;
  }
  document.getElementById("tableData").innerHTML = temp;
}

//<td><button class="btn btn-visit"><a href="https://${webSiteList[i].url}" target="blank"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
//<td><button class="btn btn-visit" onclick="VisitWebsite(${webSiteList[i].url})"><i class="fa-solid fa-eye"></i> Visit</button></td>

// function VisitWebsite (url) {
//   window.open(url , '_blank')
// }

function handleDeleteSite(index) {
  webSiteList.splice(index, 1);
  localStorage.setItem("MyWebSites", JSON.stringify(webSiteList));
  handleDisplaySite();
}

function handleClearInputs () {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

siteUrlInput.addEventListener("input" , validUrl)
siteNameInput.addEventListener("input" , validName)

function validName () {
  let regexName =/^[a-zA-Z0-9 ]{1,20}$/
  if (regexName.test(siteNameInput.value)) { 
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    return true
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    return false
  }
}

function validUrl (){
  let regexUrl= /(https:\/\/)?(www\.)[a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  if(regexUrl.test(siteUrlInput.value)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    return true
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    return false
  }
}

