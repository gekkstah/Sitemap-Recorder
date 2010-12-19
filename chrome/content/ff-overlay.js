generator.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ generator.showFirefoxContextMenu(e); }, false);
};

generator.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-generator").hidden = gContextMenu.onImage;
};

window.addEventListener("load", generator.onFirefoxLoad, false);
