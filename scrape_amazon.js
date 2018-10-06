console.error('on amazon');
(function() {
  function wth(){
    console.error('on amazon1');
    let productData = {
      asin: window.location.href.split('/dp/').pop(),
      metadescription: document.querySelector('meta[name="description"]').content,
      metatitle: document.querySelector('meta[name="title"]').content,
      canonicalUrl: document.querySelector('link[rel="canonical"]').href,
      productTitle: document.getElementById('productTitle').innerText,
      productPrice: document.getElementById('priceblock_ourprice').innerText,
      features: document.getElementById('feature-bullets').innerText,
      keywords: document.querySelector('meta[name="keywords"]').content,
      variations: document.querySelectorAll('li[data-dp-url]')[0].innerHTML,
      productDetails: document.querySelector('table.prodDetTable').innerHTML,
      documentBody: document.body.innerHTML,
      encodedImages: {},
    };


    function getImages(){
      try {
        encodedImages = {}
        return Promise.resolve()
          .then(function(){
            var urls = Array.from(document.querySelectorAll('.a-button-text > img'))
              .map(el => {
                // replace 40px with 400px
                var ok = el.src.replace("SS40", "SS400")
                return ok;
              })
              .map(src => {
                return fetch(src)
              })

            let p1 = Promise.all(urls)
            .then(responses => {
              return Promise.all(responses.map(response => response.blob()))
            })
            .then(responses => {
              return Promise.all(responses.map(blob => {
                let reader = new FileReader()
                let base64s = []
                reader.onloadend = function() {
                    // `data:${blob.type};base64, ${btoa(String.fromCharCode(...new Uint8Array(reader.result)))}`
                    base64s.push(`${btoa(String.fromCharCode(...new Uint8Array(reader.result)))}`)
                 }
                reader.readAsArrayBuffer(blob)
                return Promise.resolve(base64s)
              }))
            })
            .then(blobs => {
              return Promise.all(urls)
                .then(urls =>{
                  urls.map((u, i) =>{ encodedImages[u.url] = blobs[i] })
                  return encodedImages
                })
              })
            .catch(console.error)

            return p1
        })
      } catch(e) {
        console.error(e)
      }
    }

    try {
      console.error('on amazon4')
      getImages()
        .then(function(encodedImages){
          console.dir(encodedImages)
          console.dir(productData)
          // fetch('http://127.0.0.1/ob/images')
          //   .then(r => r.text())
          //   .then(console.error)
          //   .catch(console.error)
        })

    } catch (e) {
      console.error(e)
    }


  }

  setTimeout(wth, 2000)



//   // document.querySelectorAll('*[id="contentArea"]')[0].style.left = '10%'
//   // const observer = new MutationObserver((mutations) => {
//   //   mutations.forEach((mutation) => {
//   //     if (mutation.addedNodes && mutation.addedNodes.length > 0) {
//   //       for (let i = 0; i < mutation.addedNodes.length; i++) {
//   //         const newNode = mutation.addedNodes[i];
//   //         console.error('on amazon')
//   //         console.error('on amazon')
//   //         console.error('on amazon')
//   //         console.error('on amazon')
//   //       }
//   //     }
//   //   })
//   // })
//   // observer.observe(document.body, {
//   //   childList: true,
//   //   subtree: true
//   // })
})()