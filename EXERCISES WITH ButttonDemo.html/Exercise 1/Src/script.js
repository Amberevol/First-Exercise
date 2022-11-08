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

