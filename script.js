import data from "./data.json" assert {type: "json"};

const filterBoxWrapper = document.querySelector(".filterBoxWrapper");
const filterBox = document.querySelector(".filterBox");
const list = document.querySelector(".jobs");
let dotSymbol = "•";


filterBoxWrapper.style.display = "none";


function createDomElement(tag, className, src, text, event, eventFun) {
    const element = document.createElement(tag);
    element.classList.add(className);

    if (src) {
        element.setAttribute("src", src);
    }

    if (text) {
        element.textContent = text;
    }

    if (event) {
        element[event] = () => {
            eventFun();
        }
    }
    return element;
}


let tagFilter = [];


function updateFilterBox() {
    filterBox.innerHTML = "";
    filterBoxWrapper.style.display = "flex";

    tagFilter.forEach((item) => {
        let filterButton = createDomElement("button", "filterButtons");
        filterButton.textContent = item;
        let removeIcon = createDomElement("img", "xStyle", "./images/icon-remove.svg");
        filterButton.append(removeIcon);
        filterBox.append(filterButton);

        filterButton.addEventListener("click", () => {
            tagFilter = tagFilter.filter((val) => val !== item);
            updateFilterBox();
            displayJobs(dataFilter());

            if (tagFilter.length === 0) {
                filterBoxWrapper.style.display = "none";
            }
        });
    });
}


let clearButton = createDomElement("button", "clearButton");
clearButton.innerHTML = "Clear";
filterBoxWrapper.append(clearButton);


clearButton.addEventListener("click", () => {
    tagFilter = [];
    updateFilterBox();
    displayJobs(data);
    filterBoxWrapper.style.display = "none";
});


const displayJobs = (data) => {
    list.innerHTML = "";
    for (let index = 0; index < data.length; index++) {
        const {company, logo, new1, featured, position, role, level, postedAt, contract, location, languages, tools} = data[index];

        const jobBox = createDomElement("div", "jobBox");
        const topSideWrapper = createDomElement("div", "topSideWrapper");
        const sideAndTagWrapper = createDomElement("div", "sideAndTagWrapper");
        const icon = createDomElement("img", "icon", logo);
        const topSideWrapperWithPhoto = createDomElement("div", "topSideWrapperWithPhoto");
        const companyName = createDomElement("h1", "companyName", null, company);
        const positionName = createDomElement("p", "positionName", null, position)
        const descriptionWrapper = createDomElement("div", "descriptionWrapper");
        const uploadTime = createDomElement("p", "postedAt", null, postedAt);
        const contractTime = createDomElement("p", "contractTime", null, contract);
        const locationText = createDomElement("p", "location", null, location);
        const line = createDomElement("div", "lineDiv");
        const roleName = createDomElement("button", "buttonStyles", null, role);
        const levelName = createDomElement("button", "buttonStyles", null, level);
        const tagsWrapper = createDomElement("div", "tagsWrapper");
        const languagesDiv = createDomElement("div", "languagesDiv");
        const toolsDiv = createDomElement("div","languagesDiv");
        const nameAndSpecial = createDomElement("div", "nameAndSpecial");
        const newStatus = createDomElement("h1", "newStatus");
        const featuredStatus = createDomElement("h1", "featuredStatus");


        roleName.addEventListener("click", () => {
            if (!tagFilter.includes(role)) {
                tagFilter.push(role);
                updateFilterBox();
                displayJobs(dataFilter());
            }
        });

        levelName.addEventListener("click", () => {
            if (!tagFilter.includes(level)) {
                tagFilter.push(level);
                updateFilterBox();
                displayJobs(dataFilter());
            }
        });

        languages.map((language) => {
            const languageName = createDomElement("button", "buttonStyles", null, language);
            languagesDiv.append(languageName);
            languageName.addEventListener("click", () => {
                if(!tagFilter.includes(language)) {
                    tagFilter.push(language);
                    updateFilterBox();
                    displayJobs(dataFilter());
                }
            });
        });

        tools.map((tool) => {
            const toolName = createDomElement("button", "buttonStyles", null, tool);
            languagesDiv.append(toolName);
            toolName.addEventListener("click", () => {
                if (!tagFilter.includes(tool)) {
                    tagFilter.push(tool);
                    updateFilterBox();
                    displayJobs(dataFilter())
                }
            });
        });

        
        nameAndSpecial.append(companyName);
    

        if (new1 == true) {
            nameAndSpecial.append(newStatus);
            newStatus.textContent = "new!";
        } else {
            nameAndSpecial.remove(newStatus);
        }
    
        if (featured == true) {
            nameAndSpecial.append(featuredStatus);
            featuredStatus.innerHTML = "Featured";
            jobBox.classList.add("borderStyle");
        }


        list.append(jobBox);
        descriptionWrapper.append(uploadTime, dotSymbol, contractTime, dotSymbol, locationText);
        topSideWrapper.append(nameAndSpecial, positionName, descriptionWrapper);
        sideAndTagWrapper.append(topSideWrapper, tagsWrapper);
        topSideWrapperWithPhoto.append(icon, topSideWrapper, line);
        tagsWrapper.append(roleName, levelName, languagesDiv, toolsDiv);
        jobBox.append(topSideWrapperWithPhoto, tagsWrapper);
    };
}


displayJobs(data);


function dataFilter() {
    const filterArray = data.filter((item) => {
        const values = [item.role, item.level, ...item.languages, ...item.tools];
        return tagFilter.every((val) => values.includes(val));
    });
    return filterArray;
}