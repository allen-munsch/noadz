(function() {
  const F = (e,i,a) => {e.parentNode.removeChild(e);}
  const G = (e) => {
    Array.from(document.getElementsByClassName(e)).map(F)
  }
  const THESE = ['dashboard-right', 'wtf-module', 'Trends',
                'DashboardProfileCard','promoted-tweet',
                'promoted', 'Footer']
  THESE.map(G)
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