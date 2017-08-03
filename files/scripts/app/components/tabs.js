define(function() {
  var sectionTabs = document.querySelectorAll("#section-tabs li"),
      sections = document.querySelectorAll("section.section");

  function switchTab() {
    var sectionTab = this,
        section = document.getElementById(sectionTab.dataset.target);
    for (var i =0; i < sections.length; i++) {
      sectionTabs[i].classList.remove("is-active");
      sections[i].classList.remove("is-active");
    }
    sectionTab.classList.add("is-active");
    section.classList.add("is-active");
  }

  function init() {
    for (var i = 0; i < sections.length; i++ ) {
      sectionTabs[i].addEventListener("click", switchTab);
    }
  }

  return {
    init: init
  }
});
