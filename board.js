/*

Hard Coded representations of the board the original game came with

Terrain type legend:
1 = clear terrain
2 = rough terrian
3= mountainous terrian

*/

//The whole board, cosnider converting to json and exporting, for more customizability in the future
const layout = [
[3,1,1,1,1,1,3,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,3],
[1,1,1,1,1,1,3,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,2,1,1,1,1,1],
[1,1,1,3,1,1,1,1,3,2,1,1,1,3,1,1,1,1,1,1,1,1,1,1],
[2,1,1,3,3,2,3,1,3,3,1,1,1,2,1,1,1,1,1,1,1,1,1,1],
[3,1,1,1,1,3,3,1,1,1,1,1,1,1,3,3,1,1,2,3,1,1,1,1],
[1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,3,3,1,3,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1],
[1,1,1,3,1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,3],
[1,1,1,3,3,1,1,1,1,1,3,1,1,1,1,1,1,1,1,3,3,1,1,3],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,2,3,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,3,1],
[1,1,1,1,1,1,1,1,1,1,2,1,1,3,3,1,1,1,1,2,1,1,3,1],
[1,1,1,1,1,3,1,1,1,1,3,1,1,3,1,1,1,1,1,1,2,1,1,1],
[1,1,1,3,1,3,1,1,1,1,1,1,1,2,1,1,3,1,3,1,1,1,1,1],
[3,1,1,1,2,3,3,3,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1],
[3,1,1,1,1,3,1,3,1,1,2,1,1,1,1,1,1,1,3,1,1,1,1,1],
[1,1,1,1,1,1,1,2,1,1,3,1,1,1,1,1,3,3,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,3,3,1,1,1,1,1,3,1,3,3,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[3,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,1,1,1,3],
];

//To achieve all possible board combinations, we need to be able to rotate the board in board_map.js 90 degress a series of times
// I've basically copied Josh Comeau, aritcle located at: https://medium.com/front1end1weekly/matrix1rotation1%EF%B8%8F16550397f16ab
const reverse = array => [...array].reverse();
const compose = (a, b) => x => a(b(x));

const get = id => array => array[id];

const map = (fn, array) => array.map(fn);

const pluck = (index, data) => map(get(index), data);

const rangeFrom = ({length}) => [...Array(length).keys()];

const flipMatrix = matrix => (
  map(index => pluck(index, matrix), rangeFrom(matrix))
);

const rotateMatrix = compose(flipMatrix, reverse);
const flipMatrixCounterClockwise = compose(reverse, rotateMatrix);
const rotateMatrixCounterClockwise = compose(reverse, flipMatrix);

//The four possible maps to choose from
const map_one = layout;
const map_two = rotateMatrix(layout);
const map_three = rotateMatrix(rotateMatrix(layout));
const map_four = rotateMatrixCounterClockwise(layout);

//Assigns map based on user seleciton
//const map_choice = map_one;


//Board logic

const empty = 0;
const black = 1;
const white = 2;



//Piece data, consider exporting to json file for better visibility, or even to tweak in the future.
const knight = {
  type: "knight",
  noble: false,
  mounted: true,
  ranged: false,
  straight: 24,
  diagonal: 24
};
const prince = {
  type: "prince",
  noble: true,
  mounted: true,
  ranged: false,
  straight: 24,
  diagonal: 24
};
const duke = {
  type: "duke",
  noble: true,
  mounted: true,
  ranged: false,
  straight: 24,
  diagonal: 24
};
const king = {
  type: "king",
  noble: true,
  mounted: false,
  ranged: false,
  straight: 2,
  diagonal: 2
};
const pikeman = {
  type: "pikeman",
  noble: false,
  mounted: false,
  ranged: false,
  straight: 12,
  diagonal: 1
};
const sergeant = {
  type: "sergeant",
  noble: false,
  mounted: false,
  ranged: false,
  straight: 1,
  diagonal: 12
};
const squire = {
  type: "squire",
  noble: false,
  mounted: false,
  ranged: false,
  straight: 1,
  diagonal: 1
};
const archer  = {
  type: "archer",
  noble: false,
  mounted: false,
  ranged: true,
  straight: 3,
  diagonal: 3
};

//The list of units to be generated
const unit_list = [king,duke,prince,knight,knight,
  knight,knight,knight,sergeant,sergeant,
  sergeant,sergeant,squire,squire,archer,
  archer,pikeman,pikeman,pikeman,pikeman,
  pikeman,pikeman,pikeman,pikeman];


class Board {

  constructor (map_choice) {
    this.current_turn = 1;
    this.board = this.create_board(map_choice);
    this.roster_b = [];
    this.roster_w = [];
    this.black_units = this.create_pieces(1);
    this.white_units = this.create_pieces(2);
    };

    create_board (map_choice) {
      let m = [];
      for(var i = 0; i < map_choice.length; i++){
        m[i] = []
        for(var j = 0; j < map_choice.length; j++) {
          m[i][j] = new Space(map_choice[i][j],j,i);
        };
      };
      return m;
      };

      create_pieces (color_id) {

          for(var i = 0; i < unit_list.length; i++){
            if(unit_list[i] === 'archer'){
              this.roster_b.push(new Archer(archer, 0, 0, color_id, i));
            } else {
              this.roster_b.push(new Piece(unit_list[i], 0, 0, color_id, i));
            };
          };
      };

      //We need a castle piece, and the movement restrictions that it adds. try adding it to the terrain matrix so that the matrix isn't technically even, then just not rendering the wall tiles in the presentation layer.
  };


//Individual space logic
class Space {
  constructor(tile, x, y) {
    this.occupied = 0;
    this.terrain = tile;
    this.x = x;
    this.y = y;
  };
};


//Individual piece logic
class Piece {
  constructor(unit,y,x,c,id){
    this.id = id;
    this.type = unit.type;
    this.noble = unit.noble;
    this.mounted = unit.mounted;
    this.ranged = unit.ranged;
    this.straight = unit.straight;
    this.diagonal = unit.diagonal;
    this.move_status = 0;
    this.x = x;
    this.y = y;
    this.spaces_moved_hv = 0;
    this.spaces_moved_d = 0;
    this.color = c;
  };

  //Change from unmoved to moved
  change_move_status () {
    if(this.spaces_moved_hv > 0 || this.spaces_moved_d > 0){
      this.move_status =
        this.move_status == 0 ? 1 : 0;
      }
  };

  //Check to see if the piece can pass through or into a space
  pass(space) {
    if(space.occupied === this.color){
      return false;
    } else if(space.terrain === 3){
        console.log('Cannot enter mountains')
        return false;
    } else if(this.mounted === true && space.terrain === 2){
        console.log('Mounted units cannot enter rough terrain');
        return false;
    }
    else {
      return true;
    }
  };

    //check if we can capture
    capture_check(space) {
      if(space.occupied === this.color) {
        return false;
      } else if(space.occupied === 0) {
          return false;
      } else {
        return true;
      };
    };

    //within horizontal & vertical range check
    check_hv_range(space) {
      const xd = Math.abs(this.x - space.x);
      const yd = Math.abs(this.y - space.y);

      if(xd <= this.straight || yd <= this.stright) {
        return true;
      } else {
        return false;
      };
    };

    //within diagonal range check;
    check_d_range(space) {
      const xd = Math.abs(this.x - space.x);

      if(xd <= this.straight) {
        return true;
      } else {
        return false;
      };
    };

    //validate a horizonal or vertical move
    //Would like to refactor this in the future.
    hv_move_val(space) {
      if(this.check_hv_range(space)) {
        if(space.x > this.x) {
          for(let i = this.x + 1; i < space.x + 1; i++) {
            if(this.pass(game.board[this.y][i])) {
              if(this.capture_check(game.board[this.y][i])) {
                console.log('can capture');
                return false;
              } else {
                console.log('Pass');
              };
              } else {
                  console.log('test failed');
                  return false;
                };
              };
              return true;
        } else if (space.x < this.x) {
            for(let i = this.x - 1; i > space.x - 1; i--) {
              if(this.pass(game.board[this.y][i])) {
                if(this.capture_check(game.board[this.y][i])) {
                  console.log('can capture');
                  return false;
                } else {
                  console.log('Pass');
                };
            } else {
                console.log('test failed');
                return false;
                };
            };
            return true;
        } else if (space.y > this.y) {
            for(let i = this.y + 1; i < space.y + 1; i++) {
              if(this.pass(game.board[i][this.x])) {
                if(this.capture_check(game.board[i][this.x])) {
                  console.log('can capture');
                  return false;
                } else {
                  console.log('Pass');
                };
              } else {
                  console.log('test failed');
                  return false;
              };
            };
            return true;
          } else if (space.y < this.y) {
              for(let i = this.y - 1; i > space.y - 1; i--) {
                if(this.pass(game.board[i][this.x])) {
                  if(this.capture_check(game.board[i][this.x])) {
                    console.log('can capture');
                    return false;
                } else {
                  console.log('Pass');
                };
              } else {
                    console.log('test failed');
                    return false;
                };
              };
              return true;
          } else {
            console.log('Error in move validation');
            return false;
          };
        } else {
          console.log('Out of range');
          return false;
      };
    };


    //validate a diagonal move;
    //Would like to refactor this. The function is the same thing wirtten 4 times each time tweaked to account for position of move space relative to piece
    d_move_val(space) {
      if(this.check_d_range(space)) {
        if(space.x > this.x && space.y > this.y) {
          for(let i = this.x + 1, j = this. y + 1; i < space.x + 1; i++,j++) {
            if(this.pass(game.board[j][i])) {
              if(this.capture_check(game.board[j][i])) {
                console.log('can capture');
                return false;
              } else {
                console.log('Pass');
              };
              } else {
                  console.log('test failed');
                  return false;
                };
              };
              return true;
        } else if (space.x < this.x && space.y < this.y) {
            for(let i = this.x - 1, j = this. y - 1; i > space.x - 1; i--,j--) {
              if(this.pass(game.board[j][i])) {
                if(this.capture_check(game.board[j][i])) {
                  console.log('can capture');
                  return false;
                } else {
                  console.log('Pass');
                };
            } else {
                console.log('test failed');
                return false;
                };
            };
            return true;
        } else if (space.x > this.x && space.y < this.y) {
            for(let i = this.y - 1, j = this.x + 1; j > space.y - 1; i--, j++) {
              if(this.pass(game.board[j][i])) {
                if(this.capture_check(game.board[j][i])) {
                  console.log('can capture');
                  return false;
                } else {
                  console.log('Pass');
                };
              } else {
                  console.log('test failed');
                  return false;
              };
            };
            return true;
          } else if (space.x < this.x && space.y > this.y) {
              for(let i = this.y + 1, j = this.x -1; j < space.y + 1; i++, j--) {
                if(this.pass(game.board[j][i])) {
                  if(this.capture_check(game.board[j][i])) {
                    console.log('can capture');
                    return false;
                } else {
                  console.log('Pass');
                };
              } else {
                    console.log('test failed');
                    return false;
                };
              };
              return true;
          } else {
            console.log('Error in move validation');
            return false;
          };
        } else {
          console.log('Out of range');
          return false;
      };
    };

    //capture a space
    capture(space) {
      //add some code to remove the piece
      console.log('Piece Captured');
      this.x = space.x;
      this.y = space.y;
      space.occupied = this.color;
    };

    //Occupy a space
    occupy(space) {
          this.x = space.x;
          this.y = space.y;
          space.occupied = this.color;
    };

  //Move event
  move(space){
    if(this.pass(space)) {
      this.occupy(space);
      console.log(`Moved ${this.id} to [${space.x},${space.y}]`)
    } else {
        if(this.capture_check(space)){
          capture(space);
          console.log(`[${space.x},${space.y}] Captured`);
        } else {
          console.log('Cannot move, occupied by same color')
        }
    };
  };
};

//Archer class needs a shoot function.
class Archer extends Piece {
  shoot(space) {
    console.log(`Shoot into space [${space.x},${space.y}]`);
  };
};

class Squire extends Piece {

  mval(space){
    const i = this.x;
    const j = this.y;

    if(space === game.board[i+1][j+2]){
      return ((this.pass(game.board[i][j+1])) && (this.pass(game.board[i+1][j+2]))) ? true : false;
      } else if(space === game.board[i-1][j+2]){
          return ((this.pass(game.board[i][j+1])) && (this.pass(game.board[i-1][j+2]))) ? true : false;
      } else if(space === game.board[i+1][j-2]){
          return ((this.pass(game.board[i][j-1])) && (this.pass(game.board[i+1][j-2]))) ? true : false;
      } else if(space === game.board[i-1][j-2]){
          return ((this.pass(game.board[i][j-1])) && (this.pass(game.board[i-1][j-2]))) ? true : false;
      } else if(space === game.board[i+2][j+1]){
          return ((this.pass(game.board[i+1][j])) && (this.pass(game.board[i+2][j+1]))) ? true : false;
      } else if(space === game.board[i+2][j-1]){
          return ((this.pass(game.board[i+1][j])) && (this.pass(game.board[i+2][j-1]))) ? true : false;
      } else if(space === game.board[i-2][j+1]){
          return((this.pass(game.board[i-1][j])) && (this.pass(game.board[i-2][j+1]))) ? true : false;
      } else if(space === game.board[i-2][j-1]){
          return ((this.pass(game.board[i-1][j])) && (this.pass(game.board[i-2][j-1]))) ? true : false;
      } else {
          return false;
      }
    }
  };
/*
  move(space){
    if(mval(space)){
      //check if we can capture or if we can't, capture if we can, regular move if we can't
    }
  };
}
*/

//Test functions


game = new Board(map_one);
console.log(game.board);
player = new Squire(squire,3,3,1);
console.log(player);
player_two = new Archer(archer,3,5,1);
console.log(player_two);
player_two.move(game.board[1][1]);
//player_two.move(game.board[1][2]);
player.mval(game.board[1][1]);
//console.log(player);


//game = new Board(map_one);
//console.log(game.roster_b);
