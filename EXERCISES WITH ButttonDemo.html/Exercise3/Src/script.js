// The following JavaScript function is able to modify the text inside
// the HTML tags <h1> and </h1>. The HTML element is identified with its
// id "text_on_screen".
let i = 1;

function change_text()
{
    let text = document.getElementById("text_on_screen");
    let arr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    if(i<7){
    text.innerHTML = arr[i++];
    }if(i== 7){
        i = 0;
    }
}

let j = 1;

function change_text2()
{
    let text = document.getElementById("text_on_month");
    let arr = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ] ;
    if(j<12){
    text.innerHTML = arr[i++];
    }if(i== 12){
        i = 0;
    }
}