var scene, camera, renderer;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var objects = [];
var tooltip = $("#tooltip");

init();
animate();

// Sets up the scene.
function init() {
	// Create the scene and set the scene size.
	scene = new THREE.Scene();
	var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

	// Create a renderer and add it to the DOM.
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);

	// Create a camera, zoom it out from the model a bit, and add it to the scene.
	camera = new THREE.PerspectiveCamera(100, WIDTH / HEIGHT, 0.1, 20000);
	camera.position.set(0, 6, 0);
	scene.add(camera);

	// Create an event listener that resizes the renderer with the browser window.
	window.addEventListener("resize", function() {
	var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
	});

	// Create a light, set its position, and add it to the scene.
	var light = new THREE.PointLight(0xffffff);
	light.position.set(-100, 200, 100);
	scene.add(light);

	// Load in the mesh and add it to the scene.
	var loader = new THREE.JSONLoader();
	loader.load("https://dulinimendis.github.io/neuron.json", function(geometry) {
	var material = new THREE.MeshLambertMaterial({ color: 0x005500 });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.callback = function(e) {
	tooltip.text("Excitatory");
	};
	scene.add(mesh);
	objects.push(mesh);

	var material = new THREE.MeshLambertMaterial({ color: 0x005500 });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-5, -2, 5);
	mesh.rotation.set(90, 0, 90);
	mesh.callback = function(e) {
	tooltip.text("Excitatory");
	};
	scene.add(mesh);
	objects.push(mesh);

	var material = new THREE.MeshLambertMaterial({ color: 0x550000 });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-5, 2, -5);
	mesh.rotation.set(270, 90, 180);
	mesh.scale.set(mesh.scale.x * 0.7, mesh.scale.y * 0.7, mesh.scale.z * 0.7);
	mesh.callback = function(e) {
	tooltip.text("Inhibitory");
	};
	scene.add(mesh);
	objects.push(mesh);

	var material = new THREE.MeshLambertMaterial({ color: 0x550000 });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(5, 2, -10);
	mesh.rotation.set(0, 90, 180);
	mesh.scale.set(mesh.scale.x * 0.5, mesh.scale.y * 0.5, mesh.scale.z * 0.5);
	mesh.callback = function(e) {
	tooltip.text("Inhibitory");
	};
	scene.add(mesh);
	objects.push(mesh);

	var material = new THREE.MeshLambertMaterial({ color: 0x550000 });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-5, -5, -5);
	mesh.rotation.set(270, 180, 180);
	mesh.scale.set(mesh.scale.x * 0.7, mesh.scale.y * 0.7, mesh.scale.z * 0.7);
	mesh.callback = function(e) {
	tooltip.text("Inhibitory");
	};
	scene.add(mesh);
	objects.push(mesh);

	var material = new THREE.MeshLambertMaterial({ color: 0x005500 });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(5, 5, 0);
	mesh.rotation.set(20, 90, 90);
	mesh.callback = function(e) {
	tooltip.text("Excitatory");
	};
	scene.add(mesh);
	objects.push(mesh);

	var material = new THREE.MeshLambertMaterial({ color: 0x550000 });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(5, 5, -1);
	mesh.rotation.set(180, 90, 180);
	mesh.scale.set(mesh.scale.x * 0.7, mesh.scale.y * 0.7, mesh.scale.z * 0.7);
	mesh.callback = function(e) {
	tooltip.text("Inhibitory");
	};
	scene.add(mesh);
	objects.push(mesh);
	});

	// Add OrbitControls so that we can pan around with the mouse.
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	document.addEventListener("mousemove", onDocumentMouseDown, false);
}

// Renders the scene and updates the render as needed.
function animate() {
	// Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	requestAnimationFrame(animate);
	for (var i = 0; i < objects.length; i++) {
	objects[i].rotation.x += 0.001;
	}
	// Render the scene.
	renderer.render(scene, camera);
	controls.update();
	}

	function onDocumentMouseDown(event) {
	event.preventDefault();

	mouse.x = event.clientX / renderer.domElement.clientWidth * 2 - 1;
	mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(objects);

	if (intersects.length > 0) {
	tooltip
	.css("visibility", "visible")
	.css("left", event.clientX)
	.css("top", event.clientY);
	intersects[0].object.callback();
	} else tooltip.css("visibility", "hidden").text("Excitatory");
}