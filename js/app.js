/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

//  Wait till the DOM is read
function docReady(fn) {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

const sections = [
  {
    id: "section1",
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.",
    title: "Section 1",
  },
  {
    id: "section2",
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.",
    title: "Section 2",
  },
  {
    id: "section3",
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.",
    title: "Section 3",
  },
  {
    id: "section4",
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.",
    title: "Section 4",
  },
];

const topbutton = document.getElementById("topbtn");

/**
 * Function For check What Is section On Screen Now
 * https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
 */
function isSectionOnScreen(el, buffer) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
}

/** Add active Class */
function addActiveClass(sectionID) {
  //Add Link Active
  document.querySelector(".link__active")?.classList.remove("link__active");
  document
    .querySelector(`[data-section="${sectionID}"]`)
    ?.classList.add("link__active");

  //Add Section Active
  document
    .querySelector(".your-active-class")
    ?.classList.remove("your-active-class");
  document.querySelector(`#${sectionID}`).classList.add("your-active-class");
}

//Build the Nav
let sectionsString = "";

let navHTML = "";
const buildSections = () => {
  sections.forEach((sectionObj) => {
    let sectionID = `section_${sectionObj.id}`;
    let sectionString = `
          <section id="${sectionID}" data-nav="${sectionObj.title}" class="your-active-class">
              <div class="landing__container">
              <h2>${sectionObj.title}</h2>
              <p>${sectionObj.paragraph}</p>
              </div>
          </section>
          `;
    sectionsString = sectionsString + sectionString;
    navHTML =
      navHTML +
      `<li><a id="link_${sectionObj.id}" class="nav-link" data-section="${sectionID}" >${sectionObj.title}</a></li>`;
  });
};

buildSections();

//Link the nav to the section when scrolling
const addEventListenernav = () => {
  const elements = document.getElementsByClassName("nav-link");
  console.log("addEventListenernav -> elements", elements);
  const navlink = function () {
    const attribute = this.getAttribute("data-section");
    console.log("navlink -> attribute", attribute);
    let sectionDiv = document.getElementById(attribute);
    sectionDiv.scrollIntoView();
    addActiveClass(attribute);
    alert(attribute);
  };

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", navlink, false);
  }
};

document.getElementById("main-content").innerHTML = sectionsString;
document.getElementById("navbar__list").innerHTML = navHTML;
document.read;

window.addEventListener("scroll", () => {
  let scrollPrecent =
    ((window.innerHeight + window.scrollY) / document.body.offsetHeight) * 100;

  //Update Section Active And Menu Link
  document.querySelectorAll("section").forEach((element) => {
    if (isSectionOnScreen(element, -300)) {
      addActiveClass(element.id);
    }
  });
});

//Go to top button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    (document.body.scrollTop > 100) |
    (document.documentElement.scrollTop > 100)
  ) {
    topbutton.style.display = "block";
  } else {
    topbutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Don't attach listener till the DOM is read
docReady(function () {
  // DOM is loaded and ready for manipulation here
  addEventListenernav();
});
