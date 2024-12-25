(function () {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    95,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xe2ded2, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.SphereGeometry(6, 64, 64);

  var uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib["ambient"],
    THREE.UniformsLib["lights"],
    THREE.UniformsUtils.clone(THREE.ShaderLib.phong.uniforms),
    {
      diffuse: {
        type: "c",
        value: new THREE.Color(0xff00ff)
      },
      dirSpecularWeight: {
        type: "v3",
        value: new THREE.Vector3(1, 9, 1)
      },
      time: {
        type: "f",
        value: 0.0
      }
    }
  ]);

  var vertex = [
    "#define PHONG",
    "varying vec3 vViewPosition;",
    "varying vec2 vUv;",
    "varying vec3 vNormal;",
    THREE.ShaderChunk["common"],
    THREE.ShaderChunk["uv_pars_vertex"],
    THREE.ShaderChunk["uv2_pars_vertex"],
    THREE.ShaderChunk["displacementmap_pars_vertex"],
    THREE.ShaderChunk["envmap_pars_vertex"],
    THREE.ShaderChunk["color_pars_vertex"],
    THREE.ShaderChunk["fog_pars_vertex"],
    THREE.ShaderChunk["morphtarget_pars_vertex"],
    THREE.ShaderChunk["skinning_pars_vertex"],
    THREE.ShaderChunk["shadowmap_pars_vertex"],
    THREE.ShaderChunk["logdepthbuf_pars_vertex"],
    THREE.ShaderChunk["clipping_planes_pars_vertex"],
    document.getElementById("vertCode").text,
    "void main() {",
    THREE.ShaderChunk["uv_vertex"],
    THREE.ShaderChunk["uv2_vertex"],
    THREE.ShaderChunk["color_vertex"],
    THREE.ShaderChunk["beginnormal_vertex"],
    THREE.ShaderChunk["morphnormal_vertex"],
    THREE.ShaderChunk["skinbase_vertex"],
    THREE.ShaderChunk["skinnormal_vertex"],
    THREE.ShaderChunk["defaultnormal_vertex"],
    "vNormal = normalize( transformedNormal);",
    THREE.ShaderChunk["begin_vertex"],
    THREE.ShaderChunk["displacementmap_vertex"],
    THREE.ShaderChunk["morphtarget_vertex"],
    THREE.ShaderChunk["skinning_vertex"],
    THREE.ShaderChunk["project_vertex"],
    THREE.ShaderChunk["logdepthbuf_vertex"],
    THREE.ShaderChunk["clipping_planes_vertex"],
    "vViewPosition = - mvPosition.xyz;",
    THREE.ShaderChunk["worldpos_vertex"],
    THREE.ShaderChunk["envmap_vertex"],
    THREE.ShaderChunk["shadowmap_vertex"],
    THREE.ShaderChunk["fog_vertex"],
    "vUv = uv;",
    document.getElementById("vertMain").text,
    "}"
  ].join("\n");

  var fragment = [
    "#define PHONG",
    "uniform vec3 diffuse;",
    "uniform float opacity;",
    "uniform vec3 ambient;",
    "uniform vec3 emissive;",
    "uniform vec3 specular;",
    "uniform float shininess;",
    "varying vec2 vUv;",
    THREE.ShaderChunk["common"],
    THREE.ShaderChunk["packing"],
    THREE.ShaderChunk["color_pars_fragment"],
    THREE.ShaderChunk["uv_pars_fragment"],
    THREE.ShaderChunk["uv2_pars_fragment"],
    THREE.ShaderChunk["map_pars_fragment"],
    THREE.ShaderChunk["alphamap_pars_fragment"],
    THREE.ShaderChunk["aomap_pars_fragment"],
    THREE.ShaderChunk["lightmap_pars_fragment"],
    THREE.ShaderChunk["emissivemap_pars_fragment"],
    THREE.ShaderChunk["envmap_pars_fragment"],
    THREE.ShaderChunk["gradientmap_pars_fragment"],
    THREE.ShaderChunk["fog_pars_fragment"],
    THREE.ShaderChunk["bsdfs"],
    THREE.ShaderChunk["lights_pars"],
    THREE.ShaderChunk["lights_phong_pars_fragment"],
    THREE.ShaderChunk["shadowmap_pars_fragment"],
    THREE.ShaderChunk["bumpmap_pars_fragment"],
    THREE.ShaderChunk["normalmap_pars_fragment"],
    THREE.ShaderChunk["specularmap_pars_fragment"],
    THREE.ShaderChunk["logdepthbuf_pars_fragment"],
    THREE.ShaderChunk["clipping_planes_pars_fragment"],
    document.getElementById("fragCode").text,
    "void main() {",
    "vec3 color = vec3(1.0);",
    document.getElementById("fragColor").text,
    "vec4 diffuseColor = vec4( color, opacity );",
    "ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );",
    "vec3 totalEmissiveRadiance = emissive;",
    THREE.ShaderChunk["logdepthbuf_fragment"],
    THREE.ShaderChunk["map_fragment"],
    THREE.ShaderChunk["color_fragment"],
    THREE.ShaderChunk["alphamap_fragment"],
    THREE.ShaderChunk["alphatest_fragment"],
    THREE.ShaderChunk["specularmap_fragment"],
    THREE.ShaderChunk["normal_flip"],
    THREE.ShaderChunk["normal_fragment"],
    THREE.ShaderChunk["emissivemap_fragment"],
    THREE.ShaderChunk["lights_phong_fragment"],
    THREE.ShaderChunk["lights_template"],
    THREE.ShaderChunk["aomap_fragment"],
    "vec3 outgoingLight = reflectedLight.directDiffuse +reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;",
    THREE.ShaderChunk["envmap_fragment"],
    "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
    THREE.ShaderChunk["premultiplied_alpha_fragment"],
    THREE.ShaderChunk["tonemapping_fragment"],
    THREE.ShaderChunk["encodings_fragment"],
    THREE.ShaderChunk["fog_fragment"],
    "}"
  ].join("\n");

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    lights: true
  });

  material.uniforms.shininess.value = 34.0;

  var sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  hemiLight.color.setHSL(0.6, 1, 0.8);
  hemiLight.position.set(0, 10, 0);
  scene.add(hemiLight);

  var dirLight = new THREE.DirectionalLight(0xffffff, 0.45);
  dirLight.color.setHSL(0.1, 1.0, 0.8);
  dirLight.position.set(-1, 1.75, 1);
  dirLight.position.multiplyScalar(30);
  scene.add(dirLight);

  camera.position.z = 10;

  var reqAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  var render = function (timestamp) {
    var t = timestamp * 0.001;
    material.uniforms.time.value = t;

    sphere.rotation.z = -t * 0.02 - 0.2;

    renderer.render(scene, camera);
    reqAnimFrame(render);
  };

  render();
})();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const points = [];
const numPoints = 12;
const radius = 150;
const centerX = width / 2;
const centerY = height / 2;

// Create points around a circle
for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    points.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        originX: centerX + Math.cos(angle) * radius,
        originY: centerY + Math.sin(angle) * radius,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000
    });
}

function noise(x, y) {
    return Math.sin(x/10) * Math.cos(y/10) * 20;
}

function drawBlob() {
    ctx.clearRect(0, 0, width, height);
    
    // Update points
    points.forEach(point => {
        point.noiseOffsetX += 0.05;
        point.noiseOffsetY += 0.05;
        point.x = point.originX + noise(point.noiseOffsetX, point.noiseOffsetY);
        point.y = point.originY + noise(point.noiseOffsetY, point.noiseOffsetX);
    });

    // Draw shape
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const nextPoint = points[(i + 1) % points.length];
        
        const mx = (point.x + nextPoint.x) / 2;
        const my = (point.y + nextPoint.y) / 2;
        
        ctx.quadraticCurveTo(point.x, point.y, mx, my);
    }

    ctx.fillStyle = '#4facfe';
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.closePath();
}

function animate() {
    drawBlob();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

animate();
