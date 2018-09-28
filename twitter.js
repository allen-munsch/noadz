(function() {
  const F = (e,i,a) => {e.parentNode.removeChild(e);}
  const THESE = ['dashboard-right', 'wtf-module', 'Trends', 'DashboardProfileCard',
                 'promoted-tweet', 'promoted', 'Footer']
  THESE.map((e) => {
    Array.from(document.getElementsByClassName(e)).map(F)
  })
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          THESE.map((e) => {
            Array.from(document.getElementsByClassName(e)).map(F)
          })        }
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();