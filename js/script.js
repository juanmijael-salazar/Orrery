//////////////////////////////////////
//SECTION Import
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import {
  basicInformation,
  constant,
  sunData,
  showInfo,
  select,
} from "./constant.js";
//////////////////////////////////////

//SECTION texture loader
const textureLoader = new THREE.TextureLoader();
//////////////////////////////////////

//////////////////////////////////////
//SECTION import all texture
const getTexture = (name) => textureLoader.load(`./image/${name}`);
const starTexture = getTexture("stars1.jpg");
const sunTexture = getTexture("sun.jpg");
const mercuryTexture = getTexture("mercury.jpg");
const venusTexture = getTexture("venus.jpg");
const earthTexture = getTexture("earth.jpg");
const marsTexture = getTexture("mars.jpg");
const jupiterTexture = getTexture("jupiter.jpg");
const saturnTexture = getTexture("saturn.jpg");
const uranusTexture = getTexture("uranus.jpg");
const neptuneTexture = getTexture("neptune.jpg");
const plutoTexture = getTexture("pluto.jpg");
const saturnRingTexture = getTexture("saturn_ring.png");
const uranusRingTexture = getTexture("uranus_ring.png");
//////////////////////////////////////

//////////////////////////////////////
//SECTION planet information
const planetData = {
  approx: [
    {
      radius: 3.2,
      distance: 28,
      planet_name: "mercury",
      name: mercuryTexture,
      rsas: 0.004,
      srs: 0.004,
    },
    {
      radius: 5.8,
      distance: 44,
      planet_name: "venus",
      name: venusTexture,
      rsas: 0.015,
      srs: 0.002,
    },
    {
      radius: 6,
      distance: 62,
      planet_name: "earth",
      name: earthTexture,
      rsas: 0.01,
      srs: 0.02,
    },
    {
      radius: 4,
      distance: 78,
      planet_name: "mars",
      name: marsTexture,
      rsas: 0.008,
      srs: 0.018,
    },
    {
      radius: 12,
      distance: 100,
      planet_name: "jupiter",
      name: jupiterTexture,
      rsas: 0.002,
      srs: 0.04,
    },
    {
      radius: 10,
      distance: 138,
      planet_name: "saturn",
      name: saturnTexture,
      ring: {
        innerRadius: 10,
        outerRadius: 20,
        ringmat: saturnRingTexture,
      },
      rsas: 0.0009,
      srs: 0.038,
    },
    {
      radius: 7,
      distance: 176,
      planet_name: "uranus",
      name: uranusTexture,
      ring: {
        innerRadius: 7,
        outerRadius: 12,
        ringmat: uranusRingTexture,
      },
      rsas: 0.0004,
      srs: 0.03,
    },
    {
      radius: 7,
      distance: 200,
      planet_name: "neptune",
      name: neptuneTexture,
      rsas: 0.0001,
      srs: 0.032,
    },
    {
      radius: 2.8,
      distance: 216,
      planet_name: "pluto",
      name: plutoTexture,
      rsas: 0.0007,
      srs: 0.008,
    },
  ],
  real: [
    {
      radius: 2.4397, // Mercury radius in km (originally 2439.7).....
      distance: 579.1, // Distance from the Sun in million km
      planet_name: "mercury",
      name: mercuryTexture,
      rsas: 0.000441, 
      srs: 0.01083, // Mercury rotates once every 58.6 Earth days.....
    },
    {
      radius: 6.0518, // Venus radius in km (originally 6051.8)..
      distance: 1082.1,
      planet_name: "venus",
      name: venusTexture,
      rsas: 0.00035, 
      srs: -0.00417, // Venus rotates once every 243 Earth days
    },
    {
      radius: 6.371, // Earth radius in km (originally 6371).....
      distance: 1496,
      planet_name: "earth",
      name: earthTexture,
      rsas: 0.00029, 
      srs: 1.0, // Earth rotates once every 1 day
    },
    {
      radius: 3.3895, // Mars radius in km (originally 3389.5)
      distance: 2279.4,
      planet_name: "mars",
      name: marsTexture,
      rsas: 0.00024, 
      srs: 1.025, // Mars rotates once every 1.03 Earth days
    },
    {
      radius: 69.911, // Jupiter radius in km (originally 69911)
      distance: 7785,
      planet_name: "jupiter",
      name: jupiterTexture,
      rsas: 0.00005, 
      srs: 0.041, // Jupiter rotates once every 9.93 hours
    },
    {
      radius: 58.232, // Saturn radius in km (originally 58232)
      distance: 14270,
      planet_name: "saturn",
      name: saturnTexture,
      ring: {
        innerRadius: 66.1,
        outerRadius: 136.8,
        ringmat: saturnRingTexture,
      },
      rsas: 0.000009, // 
      srs: 0.034, // Saturn rotates once every 10.7 hours
    },
    {
      radius: 25.362, // Uranus radius in km (originally 25362)....
      distance: 28710,
      planet_name: "uranus",
      name: uranusTexture,
      ring: {
        innerRadius: 30.36,
        outerRadius: 51.12,
        ringmat: uranusRingTexture,
      },
      rsas: 0.000004, 
      srs: 0.032, // Uranus rotates once every 17.24 hours
    },
    {
      radius: 24.622, // Neptune radius in km (originally 24622)....
      distance: 44970,
      planet_name: "neptune",
      name: neptuneTexture,
      rsas: 0.000001, // 
      srs: 0.671, // Neptune rotates once every 16.11 hours..
    },
    {
      radius: 1.186, // Pluto radius in km (originally 1186)....
      distance: 59060,
      planet_name: "pluto",
      name: plutoTexture,
      rsas: 0.000007, 
      srs: 0.006, // Pluto rotates once every 153.3 hours
    },
],
  store: {
    approx: {},
    real: {},
  },
};
//////////////////////////////////////

//////////////////////////////////////
//SECTION create scene
const createScene = (view, isshow) => {
  //////////////////////////////////////
  //NOTE constant
  const {
    sizeConst,
    distanceConst,
    selfRotateConst,
    rotaingSpeedAroundSunConst,
    max_view,
    max_speed,
    min_speed,
    point_light_limit,
  } = constant[view];
  //////////////////////////////////////

  //////////////////////////////////////
  //NOTE Creating renderer
  const renderer = new THREE.WebGLRenderer();
  const width = window.innerWidth * 0.8;  // Ancho fijo
  const height = window.innerHeight * 0.9; // Alto fijo  
  renderer.setSize(width, height);
  
  const container = document.getElementById('micontainer');

  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = isshow;
  //////////////////////////////////////

  //////////////////////////////////////
  //NOTE Creating scene
  const scene = new THREE.Scene();
  //////////////////////////////////////

  //////////////////////////////////////
  //NOTE screen bg
  //const cubeTextureLoader = new THREE.CubeTextureLoader();
  //const cubeTexture = cubeTextureLoader.load([
  //  starTexture,
  //  starTexture,
  //  starTexture,
  //  starTexture,
  //  starTexture,
  //  starTexture,
  //]);
  //scene.background = cubeTexture;

  //////////////////////////////////////
  const sphereGeometry = new THREE.SphereGeometry(200000, 600, 400,400); // Ajusta el radio según sea necesario
  const sphereMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    side: THREE.DoubleSide // Asegúrate de que el material esté en el lado posterior
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);
  //////////////////////////////////////
  //NOTE Perspective Camera
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    max_view
  );
  camera.position.set(1500, 900, 500);
  ////////////////////////////////////

  //////////////////////////////////////
  //NOTE Percpective controll
  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.zoomSpeed = 1.5;
  //////////////////////////////////////

  //////////////////////////////////////
  //NOTE - sun
  const sungeo = new THREE.SphereGeometry(sunData[view], 50, 500);
  const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
  });
  const sun = new THREE.Mesh(sungeo, sunMaterial);
  scene.add(sun);

  planetData.store[view].sun = sun;
  //////////////////////////////////////

  //////////////////////////////////////
  //NOTE - sun light (point light)
  const sunLight = new THREE.PointLight(0xffffff, 3, point_light_limit);
  scene.add(sunLight);
  //////////////////////////////////////

  //////////////////////////////////////
  //NOTE - ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
  scene.add(ambientLight);
  //////////////////////////////////////

  //////////////////////////////////////
  //NOTE - path for planet
  const path_of_planets = [];

  function createLineLoopWithMesh(radius, color, width, rotationX = 0, rotationY = 0, rotationZ = 0) {
    const material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: width,
    });
    const geometry = new THREE.BufferGeometry();
    const lineLoopPoints = [];
  
    // Calculate points for the circular path
    const numSegments = 300; // Number of segments to create the circular path
    for (let i = 0; i <= numSegments; i++) {
      const angle = (i / numSegments) * Math.PI * 2;
      const x = radius * Math.cos(angle); //Distancia de orbita
      const z = radius * Math.sin(angle);
      lineLoopPoints.push(x, 0, z);
    }
  
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(lineLoopPoints, 3)
    );
    const lineLoop = new THREE.LineLoop(geometry, material);
    
    // Apply rotation to the path
    lineLoop.rotation.x = rotationX;
    lineLoop.rotation.y = rotationY;
    lineLoop.rotation.z = rotationZ;
  
    scene.add(lineLoop);
    path_of_planets.push(lineLoop);
  }
  //////////////////////////////////////
  /////////////////////////////////////
  //SECTION create planet
  const genratePlanet = (dplanet) => {
    const size = sizeConst * dplanet.radius;
    const planetTexture = dplanet.name;
    const x = distanceConst * dplanet.distance;
    const ring = dplanet.ring;
    const planetGeometry = new THREE.SphereGeometry(size, 50, 50);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetTexture,
    });

    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    const planetObj = new THREE.Object3D();
    planet.position.set(x, 0, 0); //distancia de orbita planeta
    planet.rotation.x = 0;
    planet.rotation.y = 0;
    planet.rotation.z = 0;

    if (ring) {
      const ringGeo = new THREE.RingGeometry(
        sizeConst * ring.innerRadius,
        sizeConst * ring.outerRadius,
        32
      );
      const ringMat = new THREE.MeshBasicMaterial({
        map: ring.ringmat,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      planetObj.add(ringMesh);
      ringMesh.position.set(x, 0, 0);
      ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(planetObj);

    planetObj.add(planet);
    createLineLoopWithMesh(x, 0xffffff, 3);
    return {
      planetObj: planetObj,
      planet: planet,
    };


  };
  

  planetData[view].forEach((dplanet) => {
    const { planetObj, planet } = genratePlanet(dplanet);
    dplanet.planetObj = planetObj;
    dplanet.planet = planet;
    planetData.store[view][dplanet.planet_name] = planet;
  });
  //////////////////////////////////////

  //////////////////////////////////////
  //NOTE - GUI options
  var GUI = dat.gui.GUI;
  const gui = new GUI();
  gui.domElement.style.position = 'absolute';
  gui.domElement.style.top = '150px'; 
  gui.domElement.style.left = '0px';  
  gui.domElement.style.zIndex = '10';  


  const options = {
    "Natural Lighting": true,
    "Show path": true,
    speed: 0.02,
    focus: "sun",
  };
  gui.add(options, "Natural Lighting").onChange((e) => {
    ambientLight.intensity = e ? 0.15 : 0.75;
    sunLight.intensity = e ? 2 : 1;
  });
  gui.add(options, "Show path").onChange((e) => {
    path_of_planets.forEach((dpath) => {
      dpath.visible = e;
    });
  });
  gui.add(options, "speed", min_speed, max_speed);







  const makeFocus = () => {
    showInfo(options.focus);
  
    const selectedPlanet = planetData.store[cview][options.focus];
    if (selectedPlanet) {
      const planetPosition = new THREE.Vector3();
      selectedPlanet.getWorldPosition(planetPosition);
  
      // Ajustar la posición de la cámara dependiendo del objeto seleccionado
      if (options.focus === "sun") {
        // Posición específica para el Sol
        camera.position.set(planetPosition.x - 1200, planetPosition.y + 1000, planetPosition.z + 200); // Ajusta los valores según sea necesario
      } else if (options.focus === "earth") {
        // Posición para otros planetas
        camera.position.set(planetPosition.x - 20, planetPosition.y + 5, planetPosition.z - 8); 
      } else {
        camera.position.set(planetPosition.x - 80, planetPosition.y + 5, planetPosition.z - 80); 
      }
  
      camera.lookAt(planetPosition);
      orbit.target.copy(planetPosition);
      orbit.update();
    }
  };







  gui.add(options, "focus", Object.keys(basicInformation)).onChange(makeFocus);
  gui.domElement.style.width = '300px';
  gui.domElement.style.height = '130px';
  gui.domElement.style.backgroundColor = '#fff';
  gui.domElement.style.border = '1px solid #ccc';
  gui.domElement.style.borderRadius = '5px';
  gui.domElement.style.padding = '10px';
  
  gui.domElement.style.display = isshow; // Controlar la visibilidad

  //////////////////////////////////////


  //////////////////////////////////////
  //NOTE - animate function
  function animate() {

    if (cview === view) {
      sun.rotateY(options.speed * 0.0008);
      planetData[view].forEach(({ planetObj, planet, rsas, srs }) => {
        planetObj.rotateY(options.speed * rsas * rotaingSpeedAroundSunConst);
        planet.rotateY(options.speed * srs * selfRotateConst);
      });
      var innerBodyGlobalPosition = new THREE.Vector3();
      planetData.store[view][options.focus].getWorldPosition(
        innerBodyGlobalPosition
      );
      let { x, y, z } = innerBodyGlobalPosition;
      camera.lookAt(new THREE.Vector3(x, y, z));
      orbit.target.set(x, y, z);
    }
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);
  //////////////////////////////////////
  return { gui, renderer, camera, makeFocus };
};
//////////////////////////////////////

//////////////////////////////////////
//SECTION - init
let cview = "real";
const scene = {
  real: createScene("real", "block"),
  approx: createScene("approx", "none"),
};
showInfo("sun");
//////////////////////////////////////

//////////////////////////////////////
//SECTION - event
const changeSceneSelect = select(".change-scene-select");
changeSceneSelect.onclick = () => {
  changeSceneSelect.classList.toggle("selected");
  let temp = cview == "real";
  cview = temp ? "approx" : "real";
  scene.real.gui.domElement.style.display = temp ? "none" : "block";
  scene.real.renderer.domElement.style.display = temp ? "none" : "block";

  scene.approx.gui.domElement.style.display = temp ? "block" : "none";
  scene.approx.renderer.domElement.style.display = temp ? "block" : "none";
  scene[cview].makeFocus();
};
const show_info_container = select(".show-info-container");

const show_info_container2 = select(".show-info-container2");

const show_info_container3 = select(".show-info-container3");

const hide_info = select(".show-info-container>.hide-info");
const show_info = select(".show-info-container>.show-info");

//hide_info.onclick = () => show_info_container.setAttribute("show", "false");
//show_info.onclick = () => show_info_container.setAttribute("show", "true");

//////////////////////////////////////

//////////////////////////////////////
//SECTION - resize camera view
window.addEventListener("resize", () => {
  Object.values(scene).forEach(({ camera, renderer }) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
//////////////////////////////////////
















document.getElementById('send-btn').addEventListener('click', function() {
  const userInput = document.getElementById('user-input');
  const userMessage = userInput.value.trim();

  if (userMessage) {
      const chatboxBody = document.getElementById('chatbox-body');
      
      // Agregar el mensaje del usuario
      const userMessageElement = document.createElement('div');
      userMessageElement.className = 'message';
      userMessageElement.textContent = userMessage;
      chatboxBody.appendChild(userMessageElement);
      
      // Responder
      const botResponseElement = document.createElement('div');
      botResponseElement.className = 'message bot-message'; // Aquí se agrega la clase bot-message
      botResponseElement.textContent = `Bot: I received your message: "${userMessage}"`;
      chatboxBody.appendChild(botResponseElement);

      // Limpiar el campo de entrada
      userInput.value = '';
      
      // Desplazar hacia abajo el chat
      chatboxBody.scrollTop = chatboxBody.scrollHeight;
  }
});