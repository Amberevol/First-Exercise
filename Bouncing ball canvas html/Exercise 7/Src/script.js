let game_is_being_played = false;

class CollisionCounter {
  constructor() {
    this.count = 0;
    this.instance_of_this_class = null;
  }

  // get_instance() is a static method inside the class.
  // It creates a CollisionCounter object (instance) if necessary.

  static get_instance() {
    if (this.instance_of_this_class == null) {
      this.instance_of_this_class = new CollisionCounter();
    }

    return this.instance_of_this_class;
  }

  increment() {
    this.count++;
  }

  get_count() {
    return this.count;
  }

  reset() {
    this.count = 0;
  }
}
let collision_counter = CollisionCounter.get_instance();

class Rectangle {
  constructor(
    given_upper_left_corner_x,
    given_upper_left_corner_y,
    given_width,
    given_height
  ) {
    this.x = given_upper_left_corner_x;
    this.y = given_upper_left_corner_y;
    this.width = given_width;
    this.height = given_height;
  }
}

class GraphicalObject {
  constructor() {
    this.object_center_point_x = 400;
    this.object_center_point_y = 400;

    // object_velocity specifies the number of pixels the object
    // will be moved in a single movement operation.
    this.object_velocity = 4.0;
    this.object_color = "red";
  }

  get_object_position_x() {
    return this.object_center_point_x;
  }

  get_object_position_y() {
    return this.object_center_point_y;
  }

  set_color(new_color) {
    this.object_color = new_color;
  }

  move_right() {
    this.object_center_point_x += this.object_velocity;
  }

  move_left() {
    this.object_center_point_x -= this.object_velocity;
  }

  move_up() {
    this.object_center_point_y -= this.object_velocity;
  }

  move_down() {
    this.object_center_point_y += this.object_velocity;
  }

  move_this_object(movement_in_direction_x, movement_in_direction_y) {
    this.object_center_point_x += movement_in_direction_x;
    this.object_center_point_y += movement_in_direction_y;
  }

  move_to_position(new_position_x, new_position_y) {
    this.object_center_point_x = new_position_x;
    this.object_center_point_y = new_position_y;
  }
} // end of class GraphicalObject

// Next we specify a class named Bouncer

class Bouncer extends GraphicalObject {
  constructor(
    given_position_x,
    given_position_y,
    given_color,
    given_bouncing_area
  ) {
    super(); // Call the superclass constructor.

    this.object_center_point_x = given_position_x;
    this.object_center_point_y = given_position_y;
    this.object_color = given_color;
    this.bouncing_area = given_bouncing_area;

    this.bouncer_radius = 60;

    // bouncer_direction is an angle in radians. This angle specifies
    // the direction where the bouncer will be moved next.
    this.bouncer_direction = Math.random() * Math.PI * 2;

    // collision counter
    this.collision_counter = CollisionCounter.get_instance();
  }

  get_bouncer_radius() {
    return this.bouncer_radius;
  }

  shrink() {
    //  The if-construct ensures that the ball does not become
    //  too small.

    if (this.bouncer_radius > 5) {
      this.bouncer_radius -= 3;
    }
  }

  enlarge() {
    this.bouncer_radius = this.bouncer_radius + 3;
  }

  set_radius(new_radius) {
    if (new_radius > 3) {
      this.bouncer_radius = new_radius;
    }
  }

  contains_point(given_point_x, given_point_y) {
    //  Here we use the Pythagorean theorem to calculate the distance
    //  from the given point to the center point of the ball.
    //  See the note at the end of this file.

    var distance_from_given_point_to_ball_center = Math.sqrt(
      Math.pow(this.object_center_point_x - given_point_x, 2) +
        Math.pow(this.object_center_point_y - given_point_y, 2)
    );

    return distance_from_given_point_to_ball_center <= this.bouncer_radius;
  }

  //  The move() method is supposed to be called something like
  //  25 times a second.

  move() {
    //  In the following statement a minus sign is needed when the
    //  y coordinate is calculated. The reason for this is that the
    //  y direction in the graphical coordinate system is 'upside down'.

    this.object_center_point_x +=
      this.object_velocity * Math.cos(this.bouncer_direction);

    this.object_center_point_y -=
      this.object_velocity * Math.sin(this.bouncer_direction);

    //  Now, after we have moved this bouncer, we start finding out whether
    //  or not it has hit a wall or some other obstacle. If a hit occurs,
    //  a new direction for the bouncer must be calculated.

    //  The following four if constructs must be four separate ifs.
    //  If they are replaced with an if - else if - else if - else if
    //  construct, the program will not work when the bouncer enters
    //  a corner in an angle of 45 degrees (i.e. Math.PI / 4).

    if (
      this.object_center_point_y - this.bouncer_radius <=
      this.bouncing_area.y
    ) {
      //  The bouncer has hit the northern 'wall' of the bouncing area.

      this.bouncer_direction = 2 * Math.PI - this.bouncer_direction;
      this.collision_counter.increment();
    }

    if (
      this.object_center_point_x - this.bouncer_radius <=
      this.bouncing_area.x
    ) {
      //  The western wall has been reached.

      this.bouncer_direction = Math.PI - this.bouncer_direction;
      this.collision_counter.increment();
    }

    if (
      this.object_center_point_y + this.bouncer_radius >=
      this.bouncing_area.y + this.bouncing_area.height
    ) {
      //  Southern wall has been reached.

      this.bouncer_direction = 2 * Math.PI - this.bouncer_direction;
      this.collision_counter.increment();
    }

    if (
      this.object_center_point_x + this.bouncer_radius >=
      this.bouncing_area.x + this.bouncing_area.width
    ) {
      //  Eastern wall reached.

      this.bouncer_direction = Math.PI - this.bouncer_direction;
      this.collision_counter.increment();
    }
  }

  draw(context) {
    // What is save in canvas
    context.save();

    context.fillStyle = this.object_color;
    context.strokeStyle = "black";

    context.beginPath();
    context.arc(
      this.object_center_point_x,
      this.object_center_point_y,
      this.bouncer_radius,
      0,
      2 * Math.PI,
      true
    );
    context.closePath();
    context.stroke();
    context.fill();

    // What is resotre
    context.restore();
  }
} // end of class Bouncer

// The next class is called RotatingBouncer

class RotatingBouncer extends Bouncer {
  constructor(
    given_position_x,
    given_position_y,
    given_color,
    given_bouncing_area
  ) {
    // Calling the superclass constructor.
    super(given_position_x, given_position_y, given_color, given_bouncing_area);

    this.current_rotation = 0;

    this.another_ball_color = "green";
  }

  move() {
    // run the corresponding upper class method first
    super.move();

    this.current_rotation = this.current_rotation + 2;

    if (this.current_rotation >= 360) {
      this.current_rotation = 0;
    }
  }

  draw(context) {
    super.draw(context); // run the upper class method first

    context.save();

    context.fillStyle = this.another_ball_color;

    //  First we move the zero point of the coordinate system into
    //  the center point of the ball.

    // What is translate
    context.translate(this.object_center_point_x, this.object_center_point_y);

    //  Rotate the coordinate system as much as is the value of
    //  the data field current_rotation.
    context.rotate((2 * Math.PI * this.current_rotation) / 360);

    //  Fill one quarter of the ball with another color.
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, this.bouncer_radius, 0, 0.5 * Math.PI, false);
    context.lineTo(0, 0);
    context.closePath();
    context.stroke();
    context.fill();

    //  Fill another quarter of the ball with the new color.
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, this.bouncer_radius, Math.PI, 1.5 * Math.PI, false);
    context.lineTo(0, 0);
    context.closePath();
    context.stroke();
    context.fill();

    //  Finally we restore the original coordinate system.
    context.restore();
  }
} // End of class RotatingBouncer

// The last class in the hierarchy is ExplodingBouncer.
// An ExplodingBouncer object can have states that are
// specified with the following constants.

const BALL_ALIVE_AND_WELL = 0;
const BALL_EXPLODING = 1;
const BALL_EXPLODED = 2;

class ExplodingBouncer extends RotatingBouncer {
  constructor(
    given_position_x,
    given_position_y,
    given_color,
    given_bouncing_area
  ) {
    // Calling the superclass constructor.
    super(given_position_x, given_position_y, given_color, given_bouncing_area);

    this.ball_state = BALL_ALIVE_AND_WELL;
    this.explosion_color_alpha_value = 0.0;
  }

  explode_ball() {
    this.ball_state = BALL_EXPLODING;
    this.enlarge(); // make the ball somewhat larger in explosion
    this.enlarge();
  }

  is_exploded() {
    return this.ball_state == BALL_EXPLODED;
  }

  move() {
    //  The ball will not move if it is exploding or exploded.

    if (this.ball_state == BALL_ALIVE_AND_WELL) {
      // move the ball with the superclass method
      super.move();
    }
  }

  draw(context) {
    if (this.ball_state == BALL_ALIVE_AND_WELL) {
      // run the upper class drawing method
      super.draw(context);
    } else if (this.ball_state == BALL_EXPLODING) {
      if (this.explosion_color_alpha_value > 1.0) {
        this.ball_state = BALL_EXPLODED;
      } else {
        // The ball will be 'exploded' by drawing a transparent
        // yellow ball over the original ball.
        // As the opaqueness of the yellow color gradually increases,
        // the ball becomes ultimately completely yellow in
        // the final stage of the explosion.

        // draw the original ball first
        super.draw(context);

        context.save();

        context.fillStyle = "yellow"; // explosion color
        context.globalAlpha = this.explosion_color_alpha_value;

        context.translate(
          this.object_center_point_x,
          this.object_center_point_y
        );

        context.beginPath();
        context.arc(0, 0, this.bouncer_radius + 2, 0, 2.0 * Math.PI);
        context.closePath();
        context.stroke();
        context.fill();

        context.restore();

        this.explosion_color_alpha_value += 0.02; // decrease transparency
      }
    }
  }
} // End of class ExplodingBouncer.

var bouncing_area = new Rectangle(0, 0, 800, 600);

var ball_on_screen = new ExplodingBouncer(400, 300, "lime", bouncing_area);

function on_key_down(event) {
  if (event.which == 27) {
    // Was it the Escape key?
    ball_on_screen.explode_ball();
  }
  if (event.code === "Space") {
    game_is_being_played = !game_is_being_played;
    if (game_is_being_played) {
      draw_on_canvas();
    }
  }
}
var canvas = document.getElementById("bouncing_ball_canvas");

canvas.addEventListener("click", function (e) {
  if (!game_is_being_played) return;
  const bounding_rect = this.getBoundingClientRect();
  const x = e.clientX - bounding_rect.left;
  const y = e.clientY - bounding_rect.top;
  game_balls.map((game_ball) => {
    if (game_ball.contains_point(x, y)) {
      game_ball.explode_ball();
    }
  });
});

var context = canvas.getContext("2d");

function draw_on_canvas() {
  context.fillStyle = "grey";
  context.fillRect(0, 0, canvas.width, canvas.height);
  game_balls = game_balls.filter((game_ball) => !game_ball.is_exploded());
  const no_balls = game_balls.length === 0;
  if (no_balls) {
    prepare_a_new_game();
  }
  for (const game_ball of game_balls) {
    game_ball.move();
    context.fillStyle = "GhostWhite"; // background color
    game_ball.draw(context);
  }

  context.fillStyle = "Black";
  // context.
  context.font = "bold 24px serif";
  context.fillText("Collisions: " + collision_counter.get_count(), 20, 20);

  if (game_is_being_played) {
    if (no_balls) {
      game_is_being_played = false;
    }
    requestAnimationFrame(draw_on_canvas);
  }
}

var game_balls = []; // This destroys possible old balls.
function prepare_a_new_game() {
  var ball_center_x = 100;
  var ball_center_y = 225;
  var ball_colors = [
    "Gold",
    "FireBrick",
    "DarkViolet",
    "DeepSkyBlue",
    "Olive",
    "Orchid",
    "OrangeRed",
    "PeachPuff",
    "Snow",
    "Thistle",
  ];
  for (var ball_index = 0; ball_index < 10; ball_index++) {
    ball_center_x = 100 + 150 * ball_index;

    if (ball_index > 4) {
      ball_center_x = 100 + 150 * (ball_index - 5);
      ball_center_y = 375;
    }

    var new_ball = new ExplodingBouncer(
      ball_center_x,
      ball_center_y,
      ball_colors[ball_index],
      bouncing_area
    );
    game_balls.push(new_ball);
  }

  collision_counter.reset();
}

prepare_a_new_game(); // call the function when the page is loaded.
draw_on_canvas();
document.body.addEventListener("keydown", on_key_down);