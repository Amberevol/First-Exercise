var picture_file_names = [
    {
        file: "images/buggati.jpg",
        desc: "Buggati veyron Supersport W16 "
    },
    {

        file: "images/Ferrari.jpg",
        desc: "Ferrari FXXK12 LE Mans Edition"
    },
    {
        file: "images/Porsche.jpg",
        desc: "Porsche Carrera GT V12"
    },
    {
        file: "images/Rollsroyceghost.jpg",
        desc: "Rollsroyce Ghost White V16"
    }
];
var picture_index = 0;
function show_next_picture() {
    picture_index++;
    if (picture_index >= picture_file_names.length) {
        picture_index = 0;
    }
    // First we get a reference to the img element in HTML code.
    var image_element = document.getElementById("image_element_id");
    var image_element_text = document.getElementById("image_text");
    // Then we rewrite the src attribute of the img element.
    image_element.src = picture_file_names[picture_index].file;
    const data = picture_file_names[picture_index].desc;
    image_element_text.innerHTML = data;
}

//function to show previous picture;
function showPreviousPicture() {
    picture_index--;
    if (picture_index < 0) {
        picture_index = picture_file_names.length - 1;
    }
    // First we get a reference to the img element in HTML code.
    var image_element = document.getElementById("image_element_id");
    var image_element_text = document.getElementById("image_text");
    // Then we rewrite the src attribute of the img element.
    const data = picture_file_names[picture_index].desc;
    image_element_text.innerHTML = data;
}

function zoomIn() {
    let imgSize = document.getElementById("image_element_id");
    let count = imgSize.clientWidth;
    if (count == 1000) {
        return false;
    } else {
        imgSize.style.width = (count + 20) + "px";
    }
}

function zoomOut() {
    let imgSize = document.getElementById("image_element_id");
    let count = imgSize.clientWidth;
    if (count == 200) {
        return false;
    } else {
        imgSize.style.width = (count - 20) + "px";
    }
}