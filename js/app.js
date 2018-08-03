
// Setup the variables for the application
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('button.searchButton');
const resultsDiv = document.querySelector('#results-container');
const listUl = resultsDiv.querySelector('ul');
const repoResultsHeader = resultsDiv.querySelector('#repoResultsHeader');
const overlay = document.querySelector('#overlay-container');
const repoName = overlay.querySelector('.repoName');
const repoOwner = overlay.querySelector('.repoOwner');
const repoLang = overlay.querySelector('.repoLang');
const repoFollowers = overlay.querySelector('.repoFollowers');
const repoUrl = overlay.querySelector('.repoUrl');
const repoDesc = overlay.querySelector('.repoDesc');
const closeOverlayButton = overlay.querySelector('#closeOverlayButton');



// Function to query the github api
function gitSearch(keyword) {
  var url = "https://api.github.com/legacy/repos/search/" + keyword;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(repoJson) {
      // Send
      resultsTable(repoJson);
    });
}

// Function to display repository results in a list

function resultsTable(repoJson) {
  for (var key in repoJson) {
    let repoArray = repoJson[key];
    // Select the ul element from the dom
    let ul = document.querySelectorAll('ul')[0];
    // Loop through each repository json object and append to a new li element
    for (var i = 0; i < repoArray.length; i++) {
      let repo = repoArray[i];
      let li = document.createElement('li');
      li.innerHTML = "<span><strong>Repository's name:</strong>    " + repo.name + " |    <strong>Owner:</strong> " + repo.owner + "</span>" ;
      li.data = repo;
      ul.appendChild(li);

      let viewMoreButton = document.createElement('button');
      viewMoreButton.className = "viewMoreButton";
      viewMoreButton.textContent = "View More";
      li.appendChild(viewMoreButton);

    }
  }
}

// Show Overlay with extra information
function showOverlay(repoData) {

  // Set the overlay text for (name, owner, language, followers, url, and description)
  repoName.textContent =  repoData.name;
  repoOwner.textContent = "Owner: " + repoData.owner;
  repoLang.textContent = "Language: " + repoData.language;
  repoFollowers.textContent = "Followers: " + repoData.followers;
  repoUrl.innerHTML = "URL: <a href=" + repoData.url + " target=" + "_blank" + ">See repository here</a>";
  if (repoData.description) {
    repoDesc.textContent = "Description: " + repoData.description ;
  } else {
    repoDesc.textContent = "Description: [No Description available]"
  }


  // show overlay
  overlay.style.display = "block";
}



// Search button has been clicked --> search for valid keyword
searchButton.addEventListener('click',() =>{
  let keyword = searchInput.value;
  if (keyword) {
    repoResultsHeader.style.display = "block";
    gitSearch(keyword);
  } else {
    alert("Please enter a valid keyword");
  }
});


// If "view more" button has been clicked -->  show Overlay
listUl.addEventListener('click',(e) => {
  let target = e.target;
  if (target.tagName == "BUTTON") {
    if (target.className == "viewMoreButton") {
      let li = target.parentNode;
      let selectedRepoData = li.data;
      showOverlay(selectedRepoData);
    }
  }
});

// If overlay "close me" button has been clicked --> well close it
closeOverlayButton.addEventListener('click',(e) => {
  let target = e.target;
  if (target.tagName == "BUTTON") {
    overlay.style.display = "none";
  }
});
