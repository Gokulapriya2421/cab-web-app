
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
function mouseoverPass(ids) {
    var obj = document.getElementById(ids);
    obj.type = "text";
  }
  function mouseoutPass(ids) {
    var obj = document.getElementById(ids);
    obj.type = "password";
  }