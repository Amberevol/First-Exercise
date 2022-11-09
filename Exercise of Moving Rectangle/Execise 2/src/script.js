var rectangle_position_left = 276 ;
   var rectangle_position_top  = 200 ;

   function reset(){
      var size = document.getElementById( "moving_rectangle" ) ;
      size.style = null;
   }
   function left_button_clicked()
   {
      rectangle_position_left -= 4 ;

      rectangle_element = document.getElementById( "moving_rectangle" ) ;

      // Here we set style property named "left". The value being set
      // is a string. Operator + converts the value of variable
      // rectangle_position_left to a string and adds the string "px"
      // to the string.
      rectangle_element.style.left = rectangle_position_left + "px" ;

      console.log( "\n left " + rectangle_element.style.left ) ; 
   }

   function down_button_clicked()
   {
      rectangle_position_top += 4 ;
      rectangle_element = document.getElementById( "moving_rectangle" ) ;
      rectangle_element.style.top = rectangle_position_top + "px" ;
   }

   function up_button_clicked()
   {
      rectangle_position_top -= 4 ;
      rectangle_element = document.getElementById( "moving_rectangle" ) ;
      rectangle_element.style.top = rectangle_position_top + "px" ;
   }

   function right_button_clicked()
   {
      rectangle_position_left += 4 ;
      rectangle_element = document.getElementById( "moving_rectangle" ) ;
      rectangle_element.style.left = rectangle_position_left + "px" ;
   }

   function change_rectangle_color()
   {
      // The color specifications in the following array
      // must match the order of colors in the HTML <select> tag.
      // Colors can be specified either with numerical values, or with
      // strings that are listed, for example, in the following page
      // http://www.w3schools.com/html/html_colornames.asp

      var selectable_colors = [ "Red", "Green", "Blue", "Yellow", "Magenta",
                                "rgb( 0, 255, 255 )",   // Color "Cyan"
                                "rgb( 255, 255, 255 )", // Color "White"
                                "Khaki", "Gray", "Olive",
                                "#87F717"] ;

      var color_index =
             document.getElementById( "color_selection_list" ).selectedIndex ;

      rectangle_element = document.getElementById( "moving_rectangle" ) ;

      rectangle_element.style.background = selectable_colors[ color_index ] ;
   }