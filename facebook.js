(function() {
  const F = (e,i,a) => {console.log(e);e.parentNode.replaceChild(document.createElement("div"), e);}
  const G = (e) => {
    Array.from(document.querySelectorAll(e)).map(F)
  }
  const THESE = ['*[id="leftCol"]', '*[id="rightCol"]', '*[id="pagelet_sidebar"]']
  THESE.map(G)
  document.querySelectorAll('*[id="contentArea"]')[0].style.left = '10%'
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          THESE.map(G)
        }
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
