let callback = function(event){

  let apiBtn = document.getElementById('api-btn');
  let apiOutput = document.getElementsByClassName('api-output')[0];
  let req = new XMLHttpRequest();

 // GET APU KEY JS KODE
    function getApi(){
      req.onreadystatechange = function(event) {
        if (req.readyState == 4) {
          let obj = JSON.parse(req.responseText);
          apiOutput.innerHTML = obj.key;
        }
      };
      req.open('GET', 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey');
      req.send();
    }

    apiBtn.addEventListener('click', function() {
      getApi()
    });



}
window.addEventListener('load', callback);
