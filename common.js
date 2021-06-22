
function admin()
{
    var adminDivision = document.getElementById("adminDiv");
    if (adminDivision.style.display === "none") {
        adminDivision.style.display = "block";
    } else {
        adminDivision.style.display = "none";
     }
}
function customer()
{
    var customerDivision = document.getElementById("customerDiv");
    if (customerDivision.style.display === "none") {
        customerDivision.style.display = "block";
    } else {
        customerDivision.style.display = "none";
     }
}


function clearInput()
{
        var inputText = document.getElementsByClassName('clear');

        for (var i = 0; i < inputText.length; i++) {
            inputText[i].value = "";
        }
}
function clearParagraph()
{
    var paraText = document.getElementsByClassName('clearPara');
    for (var i = 0; i < paraText.length; i++) {
        paraText[i].innerHTML = "";
    }
}
function inputClear(idClr)
{
    document.getElementById(idClr).value = ''
}

function paraClear(paraId)
{
    document.getElementById(paraId).innerHTML = ''
}
function mouseoverPass(ids) {
    var obj = document.getElementById(ids);
    obj.type = "text";
  }
  function mouseoutPass(ids) {
    var obj = document.getElementById(ids);
    obj.type = "password";
  }

  function hideAndView(idsEntered)
  {
    var hideView = document.getElementById(idsEntered);
    if (hideView.style.display === "none") {
        hideView.style.display = "block;";
        hideView.style.display = "inline"
    } else {
        hideView.style.display = "none";
     } 
  }
  function hide(idss)
  {
      var hide1 = document.getElementById(idss);
      if (hide1.style.display === 'block')
      {
        hide1.style.display = 'none'
        
      }
      else{
        hide1.style.display = 'none'
      }
      
  }
  function view(id)
  {
      var view1 = document.getElementById(id);
      if (view1.style.display === 'none')
      {
        view1.style.display = 'block'
        view1.style.display = "inline"
      }
      else{
        view1.style.display = 'block'
        view1.style.display = "inline"
      }
  }