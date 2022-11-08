
// function draw_on_canvas()
// {
// var canvas = document.getElementById( "canvas_for_drawings" ) ;
// var context = canvas.getContext( "2d" ) ;
// // We'll fill the entire canvas with light color, which overdraws
// // the previous drawings.
// context.fillStyle = "LightYellow" ;
// context.fillRect( 0, 0, canvas.width, canvas.height ) ;
// context.lineWidth = 3 ;
// context.strokeStyle = "Blue" ; // Color for the first line.
// context.fillStyle = "Black" ;
// context.fillText( "Canvas size is " + canvas.width
// + " x " + canvas.height, 20, 20 ) ;
// context.beginPath() ; // Start a new drawing path
// context.moveTo( 64, 128 ) ; // Specifying a beginning for a line.
// context.lineTo( 512, 128 ) ; // Specifying the end point of the line.
// context.stroke() ; // This actually draws the line.
// context.fillStyle = "Cyan" ;
// context.fillRect( 64, 192, 128, 128 ) ; // Filled square with size 128x128
// context.strokeRect( 256, 192, 148, 128 ) ; // Hollow rectangle 148x128
// context.fillStyle = "Magenta" ;
// context.fillRect( 266, 202, 128, 108 ) ; // Filled rectangle 128x108
// context.beginPath() ; // New path for a 'ball' or circle.
// context.arc( 512, 256, // The center point of the circle is (512, 256)
// 64, 0, 2 * Math.PI, false ) ; // Radius is 64 points.
// context.fillStyle = "Yellow" ;
// context.fill() ; // Fill the defined path with filling color.
// context.stroke() ; // Draw the outline of the path.
// // The following statements draw a 'Pacman'
// context.fillStyle = "LightGray" ;
// context.strokeStyle = "Black" ;
// context.beginPath() ;
// context.moveTo( 704, 256 ) ;
// context.arc( 704, 256,
// 64, 0.25 * Math.PI, 1.75 * Math.PI, false ) ;
// context.lineTo( 704, 256 ) ;
// context.fill() ; // Fill the defined path with filling color.
// context.stroke() ; // Draw the outline of the path.
// // The following statements draw the 'missing' part of the Pacman.
// context.beginPath() ;
// context.moveTo( 768, 256 ) ;
// context.arc( 768, 256,
// 64, 0.25 * Math.PI, 1.75 * Math.PI, true ) ;
// context.lineTo( 768, 256 ) ;
// context.fill() ;
// context.stroke() ;
// context.beginPath() ; // New path to make a horizontal line.
// context.moveTo( 512, 384 ) ;
// context.lineTo( 768, 384 ) ;
// context.stroke() ;
// }

// the x and y coordinates of a point in a graphical drawing surface.

class Point
{
   constructor( given_x_coordinate,
                given_y_coordinate )
   {
      this.x = given_x_coordinate ;
      this.y = given_y_coordinate ;
   }
}

var starting_points  =  [] ;
var ending_points    =  [] ;
var new_starting_point  = null ;
var new_ending_point  = null ;

var new_rectangle_is_being_drawn = false ;

function on_mouse_down( event )
{
   // The mouse or some other pointing device was
   // pressed down in the canvas area.

   var pointer_position_x = event.offsetX ;
   var pointer_position_y = event.offsetY ;

   new_starting_point = new Point( pointer_position_x,
                                   pointer_position_y ) ;

   new_rectangle_is_being_drawn = true ;
   draw_on_canvas() ;
}


function on_mouse_move( event )
{
   if ( new_rectangle_is_being_drawn == true )
   {
      var pointer_position_x = event.offsetX ;
      var pointer_position_y = event.offsetY ;

      new_ending_point = new Point( pointer_position_x,
                                    pointer_position_y ) ;

      draw_on_canvas() ;
   }
}

function on_mouse_up( event )
{
   if ( new_rectangle_is_being_drawn == true )
   {
      var pointer_position_x = event.offsetX ;
      var pointer_position_y = event.offsetY ;

      // The drawing of a new rectangle is finished now. The start and
      // end points of the new rectangle will be pushed to the end
      // of the arrays.

      starting_points.push( new_starting_point ) ;
      ending_points.push( new Point( pointer_position_x,
                                     pointer_position_y ) ) ;
      new_rectangle_is_being_drawn = false ;
      new_starting_point = null ;
      new_ending_point   = null ;

      draw_on_canvas() ;
   }
}

//  The following function, which is called from 
//  draw_on_canvas(), adjusts coordinates so that the rectangle
//  is shown "in a correct way" in relation to the mouse movement.

function draw_filled_rectangle( given_context,
                                starting_point,
                                ending_point,
                                filling_color )
{
   var upper_left_corner_x = starting_point.x ;
   var upper_left_corner_y = starting_point.y ;
   var rectangle_width  = ending_point.x - starting_point.x ;
   var rectangle_height = ending_point.y - starting_point.y ;

   if ( rectangle_width < 0 )
   {
      rectangle_width  = - rectangle_width ;
      upper_left_corner_x -= rectangle_width ;
   }

   if ( rectangle_height < 0 )
   {
      rectangle_height  =  - rectangle_height ;
      upper_left_corner_y  -=  rectangle_height ;         
   }

   given_context.save() ;

   given_context.fillStyle = filling_color ;
   given_context.strokeStyle = "black" ;
   given_context.lineWidth = 2 ;

   given_context.fillRect( upper_left_corner_x,
                           upper_left_corner_y,
                           rectangle_width,
                           rectangle_height ) ;

   given_context.strokeRect( upper_left_corner_x,
                             upper_left_corner_y,
                             rectangle_width,
                             rectangle_height ) ;

   given_context.restore() ;
}

function draw_on_canvas()
{
   var canvas = document.getElementById( "drawing_rectangles_canvas" ) ;
   var context = canvas.getContext("2d") ;

   // We'll fill the entire canvas with light color, which overdraws
   // the previous drawings.

   context.fillStyle = "Beige" ;
   context.fillRect( 0, 0, canvas.width, canvas.height ) ;

   var rectangle_colors = [ "Teal", "Tomato", "Turquoise", "Violet",
                            "YellowGreen", "Gold", "black"] ;

   // The following loop draws all the rectangles that the user has drawn.

   for ( var rectangle_index  =  0 ;
             rectangle_index  <  starting_points.length ;
             rectangle_index  ++ )
   {
      // Method pop() removes and returns the last color
      // of the array.

      var color_from_list = rectangle_colors.pop() ;

      draw_filled_rectangle( context,
                             starting_points[ rectangle_index ],
                             ending_points[ rectangle_index ],
                             color_from_list ) ;

      // Method unshift() puts the used color to the beginning of the array.
      // This way the the used color will be used again after all
      // other colors have been used.

      rectangle_colors.unshift( color_from_list ) ;
   }

   if ( new_ending_point != null )
   {
      // We will draw a not-yet-finished rectangle.

      draw_filled_rectangle( context,
                             new_starting_point,
                             new_ending_point,
                             "Snow" ) ;  // Almost white
   }
}
