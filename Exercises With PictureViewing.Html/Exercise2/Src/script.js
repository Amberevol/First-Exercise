var picture_file_names = [ "images/buggati.jpg",
"images/Ferrari.jpg",
"images/Porsche.jpg",
"images/Rollsroyceghost.jpg" ] ;
var picture_index = 0 ;
function show_next_picture()
{
picture_index ++ ;
if ( picture_index >= picture_file_names.length )
{
picture_index = 0 ;
}
// First we get a reference to the img element in HTML code.
var image_element = document.getElementById( "image_element_id" ) ;
// Then we rewrite the src attribute of the img element.
image_element.src = picture_file_names[ picture_index ] ;
}

//function to show previous picture;
function showPreviousPicture(){
    picture_index -- ;
if ( picture_index < 0 )
{
picture_index = picture_file_names.length-1 ;
}
// First we get a reference to the img element in HTML code.
var image_element = document.getElementById( "image_element_id" ) ;
// Then we rewrite the src attribute of the img element.
image_element.src = picture_file_names[ picture_index ] ;
}
