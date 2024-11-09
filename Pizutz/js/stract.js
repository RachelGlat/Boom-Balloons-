//שחקן-Player
function Player(PName, Point, Level) {
    this.PName = PName;
    this.Point = Point;
    this.Level = Level
}
//משחק-Game
function Game(PName, numElements, level, selPicture) {
    this.PName = PName;
    this.numElements = numElements;
    this.level = level;
    this.selPicture = selPicture;
}
//Conductorאלוף
function Conductor(CName,CDots) {
    this.CName = CName;
    this.CDots = CDots;
}