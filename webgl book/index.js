let canvas = document.getElementById("webgl");

let vertexShader =
  "attribute vec4 a_Position; \n" +
  "void main() { \n" +
  "  gl_Position = a_Position; \n" +
  "  gl_PointSize = 5.0;\n" +
  "}\n";

let fragmentShader =
  "void main () { \n" + "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n" + "}";

/**
 * @type WebGLRenderingContext
 */
//let gl = canvas.getContext("webgl");
let gl = getWebGLContext(canvas);
console.log(gl);
initShaders(gl, vertexShader, fragmentShader);

let a_Position = gl.getAttribLocation(gl.program, "a_Position");

//gl.vertexAttrib3f(a_Position, 1.0, 0.0, 0.0);

// Register function (event handler) to be called on a mouse press
canvas.onmousedown = function (ev) {
  click(ev, gl, canvas, a_Position);
};

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

var g_points = []; // The array for the position of a mouse press
/**
 * @param gl : WebGLRenderingContext
 */
function click(ev, gl, canvas, a_Position) {
  var rect = ev.target.getBoundingClientRect();
  //var x = ev.clientX; // x coordinate of a mouse pointer
  //var y = ev.clientY; // y coordinate of a mouse pointer

  var x = ev.clientX - rect.left; // x coordinate of a mouse pointer
  var y = ev.clientY - rect.top; // y coordinate of a mouse pointer
  //x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  //y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  console.log(x, y);
  // Store the coordinates to g_points array
  g_points.push(x);
  g_points.push(y);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  //gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  var len = g_points.length;
  for (var i = 0; i < len; i += 2) {
    // Pass the position of a point to a_Position variable

    console.log(
      gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0)
    );

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
