function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  console.log(gl.getShaderInfoLog(shader));

  if (success) {
    return shader;
  }

  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  console.log(gl.getProgramInfoLog(program));

  if (success) {
    return program;
  }

  gl.deleteProgram(program);
}

function main() {
  let canvas = document.getElementById("webgl");

  /**
   * @type WebGLRenderingContext
   */
  let gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("webgl isn't supported in your browser");
  }

  let vertexShaderSource =
    "attribute vec4 a_Position; \n" +
    "void main() {\n" +
    "gl_Position = a_Position;\n" +
    "gl_PointSize = 10.0;\n" +
    "}\n";

  let fragmentShaderSource =
    "void main() {\n" + "gl_FragColor = vec4(1.0, 0.0, 0.0, 1);\n" + "}\n";

  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  let fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  let program = createProgram(gl, vertexShader, fragmentShader);
  let a_Position = gl.getAttribLocation(program, "a_Position");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // три двумерных точки
  var positions = [0, 0, 0, 0.5, 0.7, 0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // говорим использовать нашу программу (пару шейдеров)
  gl.useProgram(program);
  gl.enableVertexAttribArray(a_Position);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2; // 2 components per iteration
  var type = gl.FLOAT; // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(a_Position, size, type, normalize, stride, offset);

  // draw
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset, count);
}

main();
