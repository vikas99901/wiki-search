let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function displayNoResultMessage(message) {
    if (searchResultsEl.textContent === "") {
        let searchSomethingEl = document.createElement("p");
        searchSomethingEl.classList.add("col-12", "text-center");
        searchSomethingEl.textContent = message;

        searchResultsEl.append(searchSomethingEl);
    }
}

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;

    // 1. Div Container -- result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item", "col-11", "col-md-5", "col-xl-3");

    searchResultsEl.appendChild(resultItemEl);

    // 2. Anchor Title -- result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";

    resultItemEl.appendChild(resultTitleEl);

    // 3. Line Break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // 4. Anchor URL -- result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = "URL: " + link;
    urlEl.href = link;
    urlEl.target = "_blank";

    resultItemEl.appendChild(urlEl);

    // 5. Line Break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // 6. Paragraph Description -- result-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("result-description");
    descriptionEl.textContent = description;

    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
    displayNoResultMessage("Your Search is Unique");
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

displayNoResultMessage("Search Something Today");
searchInputEl.addEventListener("keydown", searchWikipedia);