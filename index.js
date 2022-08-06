        import BABYLON from './_snowpack/pkg/babylonjs.js'
        import "./_snowpack/pkg/babylonjs-loaders.js";
        import io from "./_snowpack/pkg/socket.io-client.js"
        import * as GUI from './_snowpack/pkg/babylonjs-gui.js';
        // import * as cannon from 'cannon'
        // import { CannonJSPlugin } from "babylonjs";
        // window.CANNON = cannon
        const webSocketURL = "https://unibotzsocket.herokuapp.com"
        // const webSocketURL = "ws://localhost:3000"

        const installGame = document.getElementById("installGame")
        if(window.innerWidth < 600){
            installGame.style.display='block'
            let deferredPrompt
            console.log("its on mobile mode")
            window.addEventListener("beforeinstallprompt", e => {
                deferredPrompt = e
            })
        
            installGame.addEventListener("click", e => {
                
                deferredPrompt.prompt()
                deferredPrompt.userChoice.then( choiceResult => {
                    if(choiceResult.outcome === "accepted"){
                        console.log("User want to install the game")
                    }
                    deferredPrompt = null
        
                    localStorage.setItem("universalbots", JSON.stringify({isInstalled: true})) === null
                })
                .catch(error => console.log(error))
            })
        }else{
            installGame.style.display = "none"
        }
        
        //GETTING ALL THE BUTTONS
        const signBtn = document.getElementById("sgnup")
        const loginBtn = document.getElementById("lgn")

        const goBackBtn = document.getElementById("goBack")
        const registerBtn = document.getElementById("register")

        const startGame = document.querySelector(".start-game")

        // INPUTS
        const inpname = document.getElementById("name")
        const inpusername = document.getElementById("username")
        const inpcountry = document.getElementById("country")
        const inppassword = document.getElementById("password")
        const inpconfirm = document.getElementById("confirm")

        const usern = document.getElementById("usern")
        const passd = document.getElementById("passd")

        const characName = document.getElementById("characName")


        // divs to hide and show
        const introHome = document.querySelector(".intro-home")
        const introCont = document.querySelector(".intro-cont")
        const introSign = document.querySelector(".intro-signup")
        const setCharacterBx = document.querySelector(".set-character")

        const canvas = document.getElementById("renderCanvas")
        const popBtn = document.querySelector(".popup-btn")

        // LOADING SCREEN
        const lScreen = document.getElementById("loadingScreen")

        // CREATE BOT GUI MENU
        const createBotContainer = document.querySelector(".create-bot-container")
        const hdzList = document.getElementById("hdzList")
        const bdzList = document.getElementById("bdzList")


        const cdgDisplay = document.querySelector(".cbc-display-gui")
        const createBotBtn = document.querySelector(".cdg-btn")
        const botNameInp = document.getElementById("botnameinp")

        // HOME GUI
        const homeCont = document.querySelector(".home-container")
        const launchBtn = document.getElementById("startBtn")

        // FIELD GUI
        const fireBtn = document.querySelector('.fire-btn')
        const statusCont = document.querySelector('.status-container')
        const energy = document.getElementById('energy')
        const dmgTaken = document.getElementById('dmgTaken')
        // warnsign
        const warnSign = document.querySelector('.warning-sign')
        

        const log = console.log
        const apiURL = 'https://universalbots.herokuapp.com'
        const apiOpt = (meth, toPost) => {
            return {
                method: meth, // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: toPost ? JSON.stringify(toPost) : ''
            }
        }
        
        const {ParticleSystem, ActionManager, ExecuteCodeAction, GlowLayer, PointLight, Engine, Scene, ArcRotateCamera, HemisphericLight,DirectionalLight, Vector3, MeshBuilder, FreeCamera, SceneLoader, Color3, StandardMaterial} = BABYLON
        
        let xcor //coordinates ng joystick sa world axis
        let zcor //coordinates ng joystick sa world axis
        let bodyx
        let bodyz
        let botId
        let userId
        let curPos
        let canPress = true // for moving or firing
        class App {

            constructor(isHaveBot, data) {
                this._engine = new Engine(canvas, true)
                this._scene = new Scene(this._engine)

                this._haveBot = isHaveBot
                this._user = data.details
                this._token = data.token
                this._botDet // id bodyType x z 

                this._playerz = []
                this._machinez = []
                this._bulletz = [] // for action purpose only
                this._myMechDet = null // body core isMoving id

                this._canPress = false
                this._canFire = true
                this._camBLocked = false
                this._camTargCollided = true

                this.deductEn = .009
                this.devSpeed = .001

                // ACTIONS RELATED
                this._willFireTimeOut //timeout to na kelangan i clear pag kikilos ka para di mag release yung bala
                this._canFireTimeOut // eto naman kada baril mo iclear niya yung timeout na to kase etong timeout na to e pang canpress = true

                // mode
                if(window.innerHeight < 600){
                    this._desktopMode = false
                    
                }else{
                    this._desktopMode = true
                    
                }
                
                log('desktop mode ? ' + this._desktopMode)
                
            
                this._main()
            }
            async updUIStatus(botdet, socket){
                const power = (botdet.energy/botdet.maxEnergy) * 100
                energy.innerHTML = `${parseInt(power)}%`

                const dmgTakenVal = botdet.dmgTaken/botdet.durability * 100
                dmgTaken.innerHTML  = `${parseInt(dmgTakenVal)}%`

                if(botdet.isSmoking) return log("no need to smoke already smoking !")
                if(dmgTakenVal > 60){
                    log('your bot is damaged severely !', dmgTakenVal)
                    socket.emit('smoke', botdet._id)
                    const response = await fetch(`${apiURL}/bots/bodysmoke/${botdet._id}`, apiOpt('PATCH'))
                    const data = await response.json()
                    this._botDet = data
                }else{
                    log("your bot received damage")
                }
                
            }
            updateEnergy(botdet){
                const power = (botdet.energy/botdet.maxEnergy) * 100
                energy.innerHTML = `${parseInt(power)}%`
            }
            loadFiring(){
                fireBtn.style.pointerEvents = "none"
                fireBtn.style.opacity = ".5"
                this._canFire = false
                this._canFireTimeOut = setTimeout(() => {
                    fireBtn.style.pointerEvents = "visible"
                    fireBtn.style.opacity = "1"
                    this._canFire = true
                }, 2000)
            }
            setEventListeners(socket){
                launchBtn.addEventListener("click", e => {
                    this._hideHomeGui()
                    this._goToField(socket)
                    
                })
                // for firing
                fireBtn.addEventListener("click", e => {
                    if(!canPress) return log("your canPress is false")
                    if(!this._canPress) return log("your this._canPress is false")
                    this._fire(socket)
                })
            }
            _showLoadingScreen(dura){
                if(lScreen.className.includes("screenFadeOff")){
                    lScreen.classList.remove("screenFadeOff")
                }
                lScreen.style.display = "flex"

                if(dura){
                    setTimeout( () => {
                        lScreen.classList.add("screenFadeOff")
                        setTimeout( () => {
                            lScreen.style.display = "none"
                            lScreen.classList.remove("screenFadeOff")
                        }, 1500)
                    }, dura)
                }
            }
            _hideLS(){
                lScreen.classList.add("screenFadeOff")
                setTimeout( () => {
                    lScreen.style.display = "none"
                    lScreen.classList.remove("screenFadeOff")

                }, 1500)
            }
            _showCreateBotGUI(bdy, hdz){
                let toSave = {
                    owner: this._user._id,
                    botname: '',
                    x: 0,
                    z: 0,
                    bodyType: 'classic',
                    headType: 'blackcrack',
                    weapon: { name: 'destroyer', dmg: 11}
                }
                createBotContainer.style.display = "flex"
                cdgDisplay.style.display = "flex"

                hdzList.addEventListener("click", e => {
                    if(!e.target.id || e.target.id === hdzList.id) return log("you are clicking the cotainer")
                    const headtype = e.target.id
                    toSave.headType = headtype
                    hdz.forEach(mesh => {
                        if(mesh.name.includes(headtype)){
                            mesh.isVisible = true
                        }else{
                            mesh.isVisible = false
                        }
                    })
                    log(toSave)
                })
                bdzList.addEventListener("click", e => {
                    if(!e.target.id || e.target.id === bdzList.id) return log("no id")
                    const meshName = e.target.id
                    toSave.bodyType = meshName
                    bdy.forEach(mesh => {
                        if(mesh.name.includes(meshName)){
                            mesh.isVisible = true
                        }else{
                            mesh.isVisible = false
                        }
                    })
                    log(toSave)
                })

                // the create button
                createBotBtn.addEventListener("click", async e => {
                    toSave.botname = botNameInp.value

                    // creation of new bot
                    const result = await fetch(`${apiURL}/bots/newbot`, apiOpt('POST', toSave))
                    const data = await result.json()
        
                    // update user details to haveBot true
                    const response = await fetch(`${apiURL}/users/botcreated/${this._user._id}`, apiOpt('PATCH', toSave))
                    const updatedUser = await response.json()

                    this._hideCreateBotGUI() // hide the uis in creating bot
                    this._goToStart()
                    
                })
            }
            _hideCreateBotGUI(){
                createBotContainer.style.display = "none"
                cdgDisplay.style.display = "none"
            }
            
            // GUI RELATED
            createBodyChoices(bdy,hdz){
                this._showCreateBotGUI(bdy, hdz)
                bdy.forEach(bod => {
                    const newDiv = document.createElement("div")
                    newDiv.className = 'create-bx'
                    const theName = bod.name.split(".")[1]
                    newDiv.id = theName

                    const newImg = document.createElement("img")
                    newImg.className = 'cbc-img'
                    newImg.src = `./images/${theName}.jpg`
                    newDiv.append(newImg)

                    const cbcName = document.createElement("p")
                    cbcName.className = 'cbc-name'
                    cbcName.innerHTML = theName
                    newDiv.append(cbcName)

                    bdzList.append(newDiv)
                })
                hdz.forEach(hd => {
                    const newDiv = document.createElement("div")
                    newDiv.className = 'create-bx'
                    const theName = hd.name.split(".")[1]
                    newDiv.id = theName

                    const newImg = document.createElement("img")
                    newImg.className = 'cbc-img'
                    newImg.src = `./images/${theName}.jpg`
                    newDiv.append(newImg)

                    const cbcName = document.createElement("p")
                    cbcName.className = 'cbc-name'
                    cbcName.innerHTML = theName
                    newDiv.append(cbcName)

                    hdzList.append(newDiv)
                })
            }
            _showWarnDeath(dura){
                warnSign.style.display = "flex"

                setTimeout(() => {
                    warnSign.style.display = "none"
                }, dura)
            }
            _hideWarns(){
                warnSign.style.display = "none"
            }
            _showHomeGui(){
                homeCont.style.display = "block"
            }
            _hideHomeGui(){
                homeCont.style.display = "none"
            }
            _showFieldUI(){
                fireBtn.style.display = "block"
                statusCont.style.display = "flex"
            }
            _hideFieldUI(){
                fireBtn.style.display = "none"
                statusCont.style.display = "none"
            }
            stop(){
                this._canPress = false
                canPress = false
            }
            go(){
                this._canPress = true
                canPress = true
            }
            // joystick
            makeThumbArea(name, thickness, color, background, curves){
                let rect = new GUI.Ellipse();
                    rect.name = name;
                    rect.thickness = thickness;
                    rect.color = color;
                    rect.background = background;
                    rect.paddingLeft = "0px";
                    rect.paddingRight = "0px";
                    rect.paddingTop = "0px";
                    rect.paddingBottom = "0px";    
             
                return rect;
             }
        
            _makeJoyStick(socket){
        
                let adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
                let xAddPos = 0;
                let yAddPos = 0;
                let xAddRot = 0;
                let yAddRot = 0;
                let sideJoystickOffset = 50;
                let bottomJoystickOffset = -50;
                let translateTransform;    
            
            
                let leftThumbContainer = this.makeThumbArea("leftThumb", 2, "gray", null);
                    leftThumbContainer.height = "120px";
                    leftThumbContainer.width = "120px";
                    leftThumbContainer.isPointerBlocker = true;
                    leftThumbContainer.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    leftThumbContainer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
                    leftThumbContainer.alpha = 0.3;
            
                    leftThumbContainer.left = sideJoystickOffset;
                    leftThumbContainer.top = bottomJoystickOffset;
            
            
                let leftPuck = this.makeThumbArea("leftPuck", 0, "blue", "black");
                    leftPuck.height = "65px";
                    leftPuck.width = "65px";
                    leftPuck.isVisible = true
                    leftPuck.left = 0
                    leftPuck.isDown = true
                    leftPuck.isPointerBlocker = true;
                    leftPuck.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    leftPuck.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            
            
                    leftThumbContainer.onPointerDownObservable.add(function(coordinates) {
                        if(!canPress) return log("your canPress is false")
                        leftPuck.isVisible = true;
                        leftPuck.floatLeft = coordinates.x-(leftThumbContainer._currentMeasure.width*.5)-sideJoystickOffset;
                        leftPuck.left = leftPuck.floatLeft;
                        leftPuck.floatTop = adt._canvas.height - coordinates.y-(leftThumbContainer._currentMeasure.height*.5)+bottomJoystickOffset;
                        leftPuck.top = leftPuck.floatTop*-1;
                        leftPuck.isDown = true;
                        leftThumbContainer.alpha = 0.3;
                        leftPuck.alpha = 1

         
            
                    });
            
                    leftThumbContainer.onPointerUpObservable.add(function(coordinates) {
                        if(!canPress) return log("your canPress is false")
                        xAddPos = 0;
                        yAddPos = 0;
                        leftPuck.isDown = false;
                        leftPuck.isVisible = false;
                        leftThumbContainer.alpha = 0.2;

                        
                        socket.emit("stop", ({
                            userId,
                            botId, 
                            dirTarg: {x: bodyx, z:bodyz},
                            currentPos: curPos
                        }))
                       
                    });
            
                    leftThumbContainer.onPointerMoveObservable.add(function(coordinates) {
                        if(!canPress) return log("your canPress is false")
                        if (leftPuck.isDown) {

                            
                                xAddPos = coordinates.x-(leftThumbContainer._currentMeasure.width*.5)-sideJoystickOffset;
                                yAddPos = adt._canvas.height - coordinates.y-(leftThumbContainer._currentMeasure.height*.5)+bottomJoystickOffset;
                                leftPuck.floatLeft = xAddPos;
                                leftPuck.floatTop = yAddPos*-1;
                                leftPuck.left = leftPuck.floatLeft;
                                leftPuck.top = leftPuck.floatTop;

                                log({x: xAddPos, y: yAddPos})

                                xcor = xAddPos;
                                zcor = yAddPos;

                                socket.emit("move", ({
                                    userId,
                                    botId, 
                                    dirTarg: {x: bodyx, z:bodyz}
                                }))
                                
                                // moving = true
                            
                        }       
                    });
            
                    adt.addControl(leftThumbContainer);
                    leftThumbContainer.addControl(leftPuck);
                    // leftThumbContainer.addControl(leftPuckCont);
                    leftPuck.isVisible = true;
                    // if(this._desktopMode)
                    leftThumbContainer.isVisible = true
            
                    this.leftThumbContainer = true
                    
                    return
            }

            async _main() {
                const socket = io(webSocketURL)
                this.setEventListeners(socket) // all element buttons
                if(this._haveBot){
                    log("go to starting")
                    await this._goToStart()

                }else{
                    log("go to createBot")
                    await this._setUpBot()
                }

                this._engine.runRenderLoop(() => {
                    this._scene.render()
                })

                window.addEventListener("resize", () => {
                    this._engine.resize()
                    if(window.innerHeight < 600){
                        this._desktopMode = false
                        
                    }else{
                        this._desktopMode = true
                        
                    }

                    log('desktop mode ? ' + this._desktopMode)
                })
                
            }

            async _setUpBot() {
                this._hideFieldUI()
                this._showLoadingScreen()
                const scene = new Scene(this._engine)
                scene.clearColor = new Color3(0,0,0)

                const arc = new ArcRotateCamera("arc", -Math.PI/2 + .34, 1, 5.6, new Vector3(0,0,0), scene)
                arc.attachControl(canvas, true)
                arc.minZ = .01

                const light = new PointLight("pointLight", new Vector3(0,3,1), scene)
                light.intensity = 7

                await SceneLoader.ImportMeshAsync("", "./modelz/", "smallfloor.glb", scene)

                const botz = []
                const headz = []
                const Bodies = await SceneLoader.ImportMeshAsync("", "./modelz/", "bot.glb", scene)
                Bodies.meshes.forEach(mesh => {
                    
                    
                    if(mesh.name.includes("body")){
                        botz.push(mesh)
                        if(mesh.name.includes("classic")){
                            mesh.isVisible = true
                        }else{
                            mesh.isVisible = false
                        }
                    }

                    if(mesh.name.includes("head")) {
                        headz.push(mesh)
                        if(mesh.name.includes("blackcrack")){
                            mesh.isVisible = true
                        }else{
                            mesh.isVisible = false
                        }
                    }

                })
                let armR
                Bodies.meshes[0].getChildren()[0].getChildren().forEach(mesh => {
                    if(mesh.name === 'Arm.R'){
                        armR = mesh
                        log(mesh)
                    }
                })

                const { meshes } = await SceneLoader.ImportMeshAsync("", "./modelz/", "weapons.glb", scene)
                meshes.forEach(mesh => {
                    
                    mesh.rotationQuaternion = null
                    if(mesh.name.includes("destroyer") || mesh.name.includes("root")){
                        mesh.isVisible = true
                        mesh.parent = armR
                    }else{
                        mesh.isVisible = false
                    }
                })
   
                arc.setTarget(Bodies.meshes[0])
                await scene.whenReadyAsync()
                this._scene.dispose()
                this._scene = scene
                this._hideLS()

                this.createBodyChoices(botz,headz)

            }

            async _goToStart() {
                statusCont.style.display = "flex" // for status
                this._showLoadingScreen()
                const scene = new Scene(this._engine)

                scene.clearColor = new Color3(0,0,0)

                const light = new PointLight("pointLight", new Vector3(0,3,1), scene)
                light.intensity = 5

                var gl = new GlowLayer("glow", scene);
                gl.intensity = 1;

                const cam = new ArcRotateCamera("stageCamera", -Math.PI/2 + .2, 1, 8.7, new Vector3(0,0,0),scene)
                cam.minZ = .01
                cam.attachControl(canvas, true)
                
                // get your bot details
                await this.getBotDet() // fetch data & put to this._botdet
                log(this._botDet)
                botId = this._botDet._id
                userId = this._user._id
                this.updUIStatus(this._botDet) // update element UI of your energy and damage taken
                
                await SceneLoader.ImportMeshAsync("", "./modelz/", "smallfloor.glb", scene)
                
                const {meshes} = await SceneLoader.ImportMeshAsync("", "./modelz/", "bot.glb", scene)
                
                
                meshes.forEach(mesh => {
                    
                    if(mesh.name.includes(this._botDet.bodyType) || mesh.name.includes(this._botDet.headType)){
                        mesh.isVisible = true
                        log(mesh.name)
                    }else{
                        mesh.isVisible = false
                        log(mesh.name)
                    }
                })
                cam.setTarget(meshes[0])

                let armBone
                meshes[0].getChildren()[0].getChildren().forEach(bonz => {
                    if(bonz.name === 'Arm.R') armBone = bonz
                    
                })  
                log(armBone)

                const Weap = await SceneLoader.ImportMeshAsync("","./modelz/", "weapons.glb", scene)
                Weap.meshes.forEach(mesh => {
                    
                    mesh.rotationQuaternion = null
                   if(mesh.name.includes(this._botDet.weapon.name) || mesh.name.includes('root')){
                       mesh.isVisible = true
                       log(mesh.name)
                       mesh.position = new Vector3(0,0,2)
                       mesh.parent = armBone
                   }else{
                       mesh.isVisible = false
                   }
                   
                })
                await scene.whenReadyAsync()
                this._scene.dispose()
                this._scene = scene
                this._hideLS()

                this._showHomeGui() // show all the details of our bot

            }

            async _goToField(socket){

                this._showLoadingScreen()
                // will connect to socket
                const scene = new Scene(this._engine)
                
                const cam = new ArcRotateCamera("fieldCam", Math.PI/2 + .3, .8, 9, new Vector3(0,0,0), scene)
                // cam.attachControl(canvas, true)
                // cam.panningDistanceLimit = .0001
                cam.checkCollisions = true
                
                // const camTarg = MeshBuilder.CreateBox("camTarg", { size: .1}, scene)
                // camTarg.actionManager = new BABYLON.ActionManager(scene)
                
                if(this._desktopMode){
                    cam.attachControl(canvas, true)
                    cam.collisionRadius = new Vector3(.4,.5,.4)
                    cam.angularSensibilityX = 5000
                    cam.angularSensibilityY = 5000
                    cam.lowerRadiusLimit = 15 ;
                    cam.upperRadiusLimit = 20//6.1
                    // cam.lowerBetaLimit = .9;
                    // cam.upperBetaLimit = .9

                    cam.onCollide = m => {
                        if(m.name.includes("cliff")){
                            this._camBLocked = true
                            if(cam.upperRadiusLimit > 4) cam.upperRadiusLimit -= 0.3
                        }
                    }
                }
        
                // camera.lowerBetaLimit = 0.01;
                // camera.upperBetaLimit = (1.4) * 0.99;
                // camera.lowerRadiusLimit = 8 ;
                // camera.upperRadiusLimit = 8//6.1
                const light = new HemisphericLight("fieldLight", new Vector3(0,1,0), scene)

                const gl = new BABYLON.GlowLayer("glow", scene);
                gl.intensity = 0.5;
                // creation of fire bullet
                const fireBulletJson = {"name":"CPU particle system","id":"default system","capacity":10000,"disposeOnStop":false,"manualEmitCount":-1,"emitter":[0,0,0],"particleEmitterType":{"type":"ConeParticleEmitter","radius":0.1,"angle":0.7853981633974483,"directionRandomizer":0,"radiusRange":1,"heightRange":1,"emitFromSpawnPointOnly":false},"texture":{"tags":null,"url":"https://assets.babylonjs.com/textures/flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"homogeneousRotationInUVTransform":false,"isBlocking":true,"name":"https://assets.babylonjs.com/textures/flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3,"_useSRGBBuffer":false},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":1,"maxSize":1.1,"minScaleX":1,"maxScaleX":1,"minScaleY":1,"maxScaleY":1,"minEmitPower":2,"maxEmitPower":2,"minLifeTime":0.09,"maxLifeTime":0.12,"emitRate":70,"gravity":[0,0,0],"noiseStrength":[10,10,10],"color1":[0.16470588235294117,0.00392156862745098,0.00392156862745098,1],"color2":[0.2627450980392157,0.12156862745098039,0,1],"colorDead":[0.16862745098039217,0,0,1],"updateSpeed":0.032,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"spriteCellLoop":true,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false}
                const fBulletSys = ParticleSystem.Parse(fireBulletJson, scene, "")
                
                const fexpJson = {"name":"CPU particle system","id":"default system","capacity":10000,"disposeOnStop":false,"manualEmitCount":-1,"emitter":[0,0,0],"particleEmitterType":{"type":"SphereParticleEmitter","radius":0.71,"radiusRange":1,"directionRandomizer":0},"texture":{"tags":null,"url":"https://assets.babylonjs.com/textures/flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"homogeneousRotationInUVTransform":false,"isBlocking":true,"name":"https://assets.babylonjs.com/textures/flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3,"_useSRGBBuffer":false},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":1,"maxAngularSpeed":10,"minSize":0.01,"maxSize":0.3,"minScaleX":0.4,"maxScaleX":0.88,"minScaleY":5,"maxScaleY":7,"minEmitPower":2,"maxEmitPower":2,"minLifeTime":0.1,"maxLifeTime":0.1,"emitRate":200,"gravity":[0,0,0],"noiseStrength":[10,10,10],"color1":[0.39215686274509803,0.32941176470588235,0.01568627450980392,1],"color2":[0,0.03137254901960784,0.26666666666666666,1],"colorDead":[1,0,0,1],"updateSpeed":0.041,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":1,"maxInitialRotation":20,"startSpriteCellID":0,"spriteCellLoop":true,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false}
                const fexpSys = ParticleSystem.Parse(fexpJson, scene, "")

                const fireBigExpJs = {"name":"CPU particle system","id":"default system","capacity":10000,"disposeOnStop":false,"manualEmitCount":-1,"emitter":[0,0,0],"particleEmitterType":{"type":"SphereParticleEmitter","radius":0.43,"radiusRange":1,"directionRandomizer":0},"texture":{"tags":null,"url":"https://assets.babylonjs.com/textures/flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"homogeneousRotationInUVTransform":false,"isBlocking":true,"name":"https://assets.babylonjs.com/textures/flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3,"_useSRGBBuffer":false},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":0.1,"maxSize":0.1,"minScaleX":1,"maxScaleX":0.98,"minScaleY":1,"maxScaleY":1,"minEmitPower":2,"maxEmitPower":2,"minLifeTime":0.4,"maxLifeTime":3,"emitRate":200,"gravity":[0,0,0],"noiseStrength":[10,10,10],"color1":[0.20784313725490197,0.03529411764705882,0.03529411764705882,1],"color2":[0.3176470588235294,0.12549019607843137,0.027450980392156862,1],"colorDead":[0.043137254901960784,0.00392156862745098,0.00392156862745098,1],"updateSpeed":0.068,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"spriteCellLoop":true,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"sizeGradients":[{"gradient":0,"factor1":1,"factor2":1.06},{"gradient":1,"factor1":0.04,"factor2":0.041}],"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false}
                const fBigExpSys = ParticleSystem.Parse(fireBigExpJs, scene, "")

                fexpSys.stop()
                fBigExpSys.stop()

                const smokeSys = this.createSmoke(scene)
                const bulletBx = BABYLON.MeshBuilder.CreateBox('bull', {size: .3}, scene)
                bulletBx.isVisible = false
                
                const wallz = await this.createCliffSmall(scene)
                const mechWallz = await this.mechwalls(scene)
                
                const Ground = await SceneLoader.ImportMeshAsync("", "./modelz/", "fieldground.glb", scene)
                const fieldGround = Ground.meshes[0].getChildren()[0]
                fieldGround.parent = null
                fieldGround.name = "ground"

                socket.emit("join", ({_id: this._user._id, botdet: this._botDet}))
                let findMineInterval

                socket.on('userJoined', data => {
                    data.forEach(dat => {
                        this.createBot(dat.botdet, scene, smokeSys, wallz, mechWallz)
                    })
                })
                const bx = new MeshBuilder.CreateBox("bx", {height: .5, width: 1, depth: .6}, scene)
                bx.isVisible = false

                findMineInterval = setInterval( () => {
                    const myMech = scene.getMeshByName(`Body.${this._botDet._id}`)
                    if(myMech){
                        const myMechDet = this._machinez.find(mech => mech._id === this._botDet._id)
                        this._myMechDet = myMechDet
                        this._hideLS()
                        const mechCor = scene.getMeshByName(`core.${this._botDet._id}`)
                        const cor = mechCor.getAbsolutePosition()
                        cam.setTarget(myMech)
                        // camTarg.position = new Vector3(cor.x, .2, cor.z)
                        // cam.setTarget(camTarg)
                        // camTarg.actionManager.registerAction(new ExecuteCodeAction(
                        //     {
                        //         trigger: ActionManager.OnIntersectionEnterTrigger,
                        //         parameter: mechCor
                        //     }, e => {
                        //         this._camTargCollided = true
                                
                        //     }
                        // ))
                        // camTarg.actionManager.registerAction(new ExecuteCodeAction(
                        //     {
                        //         trigger: ActionManager.OnIntersectionExitTrigger,
                        //         parameter: mechCor
                        //     }, e => {
                        //         this._camTargCollided = false
                        //     }
                        // ))
                        if(!this._desktopMode) {
                            cam.alpha = -Math.PI/2;
                            cam.beta = .8
                            cam.radius = 18

                            log("camera setup to mobile mode")
                        }else{
                            cam.attachControl(canvas, true)
                        }
                        this._canPress = true
                        const {x,y,z} = myMech.position
                        bx.position = new Vector3(x,.25,z)
                        
                        bx.locallyTranslate(new Vector3(0,0,2))
                        log("Found My Mech", this._myMechDet)
                        clearInterval(findMineInterval)
                        const percent = (this._botDet.dmgTaken/this._botDet.durability) * 100
                        if(percent > 75){
                            setTimeout( () => {
                                this._showWarnDeath(3000)
                            }, 3000)
                        }
                    }else{
                        log("first loop of interval, bot not found")
                    }
                }, 1000)

                let ml = false
                let mr = false
                let mf = false
                let moved = 0
                scene.actionManager = new ActionManager(scene)
                scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, e => {
                    if(!this._canPress) return log("not yet allowed to move")
                    const keyp = e.sourceEvent.key.toLowerCase()

                    if(keyp === 's' || keyp === 'w' || keyp === 'a' || keyp === 'd' && moved <= 0){
                        this._canFire = false
                        this._clearAllCurrentAnim()
                        const {x,z} = this._myMechDet.body.position
                        bx.position = new Vector3(x,.045,z)
                        const camD = cam.getForwardRay().direction
                        const toLook = bx.position.add(new Vector3(camD.x,0,camD.z))
                        bx.lookAt(new Vector3(toLook.x,bx.position.y,toLook.z),0,0,0)
                        moved++
                    }
                    let bxDir
                    switch(keyp){
                        case "w":
                            // const {x,z} = this._myMechDet.body.position
                           
                            // const camD = cam.getForwardRay().direction
                            // bx.position = this._myMechDet.body.position.add(new Vector3(camD.x,0,camD.z))
                            // const toLook = bx.position.add(new Vector3(camD.x,0,camD.z))
                            // bx.lookAt(new Vector3(toLook.x,bx.position.y,toLook.z),0,0,0)

                            bx.locallyTranslate(new Vector3(0,0,20))
                            bxDir = bx.getAbsolutePosition()
                        break;
                        case "a":
                            
                            bx.locallyTranslate(new Vector3(-20,0,0))
                            bxDir = bx.getAbsolutePosition()
                        break;
                        case "d":
                            
                            bx.locallyTranslate(new Vector3(20,0,0))
                            bxDir = bx.getAbsolutePosition()
                        break;
                        case "s":
                            
                            bx.locallyTranslate(new Vector3(0,0,-20))
                            bxDir = bx.getAbsolutePosition()
                        break;

                    }

                    if(keyp === 'w' || keyp === 'a' || keyp === 'd' || keyp === 's'){
                        this._botDet.energy -= this.deductEn
                        this.updateEnergy(this._botDet)
                        socket.emit("move", ({
                            userId: this._user._id,
                            botId: this._myMechDet._id, 
                            dirTarg: {x: bxDir.x, z: bxDir.z}
                        }))
                    }       


                    
                }))
                scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, e => {
                    if(!this._canPress) return log("not yet allowed to move")
                    const kepress = e.sourceEvent.key.toLowerCase()
                    if(kepress === "w" || kepress === "a" || kepress === "d" || kepress === "s"){
                        this._canFire = true
                        const bxDir = bx.getAbsolutePosition()
                        const myBody = scene.getMeshByName(`Body.${this._botDet._id}`)
                        
                        if(!myBody) return log("not found your body cannot stop !")
                        const {x, z} = myBody.position
                        socket.emit("stop", ({
                            userId: this._user._id,
                            botId: this._myMechDet._id, 
                            dirTarg: {x: bxDir.x, z: bxDir.z},
                            currentPos: {x,z}
                        }) )

                        this.saveLocOnline({xloc: x, zloc: z})
                        moved = 0
                    }
                    if(e.sourceEvent.key === " "){
                        log(this._myMechDet.body.getAbsolutePosition())
                    }

                }))

                scene.onPointerDown = e => {
                    if(e.button === 2){
                        if(!this._canFire) return log("You cannot fire")
                        this._fire(socket)
                    }
                }

                const toRender = () => {

                    if(cam.upperRadiusLimit <= 20){
                        cam.upperRadiusLimit += 0.03
                    }
                    if(!this._machinez.length) return
                    if(!this._desktopMode){
                        const myMech = scene.getMeshByName(`Body.${this._botDet._id}`)
                        if(!myMech) return

                        const {x,z} = myMech.getAbsolutePosition()
                        bx.position = new Vector3(x + xcor, bx.position.y, z + zcor)
                        const bxAbsPos = bx.getAbsolutePosition()
                        bodyx = bxAbsPos.x// bx po too lookat
                        bodyz = bxAbsPos.z // bx po too lookat
                        curPos = {x,z} // my bod pos
                    }
                    this._machinez.forEach(mech => {
                        if(mech.isMoving) {
                            mech.body.lookAt(new Vector3(mech.dirTarg.x,mech.body.position.y, mech.dirTarg.z),0,0,0)
                           
                            mech.body.locallyTranslate(new Vector3(0,0,0.08 + this.devSpeed))
                           
                            mech.RootB.animations.forEach(anim => anim.name === "moving" && anim.play())
                        }
                    })
                    // if(scene.getMeshByName(`Body.${this._botDet._id}`)){
                    //     if(!this._camTargCollided){
                    //         const {x,z} = scene.getMeshByName(`core.${this._botDet._id}`).getAbsolutePosition()
                    //         camTarg.lookAt(new Vector3(x, camTarg.position.y,z))
                    //         camTarg.locallyTranslate(new Vector3(0,0,.1))
                    //     }
                    // }
                    if(!this._bulletz.length) return
                    this._bulletz.forEach(bullet => {
                        bullet.body.locallyTranslate(new Vector3(0,-.03,bullet.speed))
                    })

                }
                scene.registerBeforeRender(toRender)

                await scene.whenReadyAsync()
                this._scene.dispose()
                this._scene = scene
                this._showFieldUI(socket)

                socket.on('aMechMove', detal => {
                    this._machinez.forEach(mech => {
                        if(mech._id === detal.botId){
                            mech.isMoving = true
                            mech.dirTarg = detal.dirTarg

                        }
                    })
                })

                socket.on('aMechStop', detal => {
                    this._machinez.forEach(mech => {
                        if(mech._id === detal.botId){
                            mech.isMoving = false
                            const {x,z} = detal.currentPos
                            mech.body.position = new Vector3(x, mech.body.position.y, z)
                            mech.body.lookAt(new Vector3(detal.dirTarg.x,mech.body.position.y,detal.dirTarg.z),0,0,0)
                            mech.RootB.animations.forEach(anim => anim.name === "moving" && anim.stop())
                            mech.RootB.animations.forEach(anim => anim.name === "fired" && anim.stop())
                        }
                    })
                })

                // ALL FIRE ACTIONS
                socket.on('uzerFired', data => {
                    let toDisposeTimeOut
                    const theBotFired = scene.getMeshByName(`Body.${data.botId}`)
                    if(!theBotFired) return log('did not found the bot who fired !')

                    scene.getSoundByName(`fireShot.${data.botId}`).play() // pag bumaril ka tutunog
                    const explodeSound = scene.getSoundByName(`explodeSound.${data.botId}`) // pag bumaril ka tutunog
                    
                    const frbx = bulletBx.clone(`firebx.${data.botId}.${Math.random()}`)
                    explodeSound.attachToMesh(frbx)
                    const explosionSys = fexpSys.clone(`explosion.${Math.random()}`)
                    const fSys = fBulletSys.clone(`fSys.${Math.random()}`)
                    explosionSys.stop()
                    // explosionSys.disposeOnStop = true
                    fSys.disposeOnStop = true
                    const {x,y,z} = theBotFired.position
                    frbx.id = data.botId
                    explosionSys.emitter = frbx
                    fSys.emitter = frbx
                    
                    frbx.position = new Vector3(x,y + .4,z)
                    frbx.lookAt(new Vector3(data.dirTarg.x, frbx.position.y,data.dirTarg.z), 0,0,0)
                    frbx.locallyTranslate(new Vector3(.4,0,2))
                    frbx.actionManager = new ActionManager(scene)
                    this._machinez.forEach(mach => {
                        frbx.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionEnterTrigger,
                            parameter: mach.core
                        }, e => {
                            
                            // frbx.dispose()
                            clearTimeout(toDisposeTimeOut) // may timeout kase to pag hinde tumama pero tumama kaya nag cleartimeout nako dito
                            const newArr = this._bulletz.filter(bull => bull.botname !== frbx.name)
                            this._bulletz = newArr
                            log(this._bulletz)
                            frbx.setParent = mach.core
                            fSys.stop()
                            // electric particle system
                            explosionSys.start()
                            explosionSys.targetStopDuration = 3.5
                            explosionSys.disposeOnStop = true
                            scene.getSoundByName(`whenHit.${mach._id}`).play()
                            explodeSound.play()

                            // Explosion Partcle system
                            const explosion = fBigExpSys.clone(`explosion.${Math.random()}`)
                            const {x,z} = mach.core.getAbsolutePosition()
                            explosion.emitter = new Vector3(x, frbx.position.y, z)
                            explosion.start()
                            explosion.targetStopDuration = 1.1
                            explosion.disposeOnStop = true

                            setTimeout(() => {
                                frbx.dispose()
                            }, 500)
                            socket.emit("hit", {botId: mach._id, dmg: data.dmg})
                        }
                        ))
                    })

                    wallz.forEach(wall => {
                        frbx.actionManager.registerAction(new ExecuteCodeAction(
                            {
                                trigger: ActionManager.OnIntersectionEnterTrigger,
                                parameter:wall
                            }, e => {
                                log(`I hit wall !`)
                                explodeSound.play()
                                const explosion = fBigExpSys.clone(`explosion.${Math.random()}`)
                                fSys.stop()
                                explosion.emitter = new Vector3(frbx.position.x, frbx.position.y, frbx.position.z)
                                explosion.start()
                                explosion.targetStopDuration = 1.1
                                explosion.disposeOnStop = true
                                frbx.dispose()
                                const newArr = this._bulletz.filter(bull => bull.botname !== frbx.name)
                                this._bulletz = newArr
                                log(this._bulletz)
                                clearTimeout(toDisposeTimeOut)
    
                            }
                        ))
                    })
                    
                    frbx.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionEnterTrigger,
                            parameter:fieldGround
                        }, e => {
                            log(`I hit ground !`)
                            explodeSound.play()
                            const explosion = fBigExpSys.clone(`explosion.${Math.random()}`)
                            fSys.stop()
                            explosion.emitter = new Vector3(frbx.position.x, frbx.position.y, frbx.position.z)
                            explosion.start()
                            explosion.targetStopDuration = 1.1
                            explosion.disposeOnStop = true
                            frbx.dispose()
                            const newArr = this._bulletz.filter(bull => bull.botname !== frbx.name)
                            this._bulletz = newArr
                            log(this._bulletz)
                            clearTimeout(toDisposeTimeOut)

                        }
                    ))
                    

                    this._bulletz.push({body: frbx, speed: data.speed, botname:frbx.name})
                    log(this._bulletz)
                    toDisposeTimeOut = setTimeout( () => {
                        
                        frbx.dispose()
                        const newArr = this._bulletz.filter(bull => bull.botname !== frbx.name)
                        this._bulletz = newArr
                        log(this._bulletz)
                    }, 3000)

                    // EFFECTS PARTICLES AND SOUND
                    const ourMech = this._machinez.find(meche => meche._id === data.botId)
                    if(!ourMech) return log("sound and particle not found !")
                    log(ourMech)
                    ourMech.armFireSys.start()
                    ourMech.armFireSys.targetStopDuration = .5

                    
                })

                socket.on("userFireAnim", botId => {
                    this._machinez.forEach(mach => {
                        if(mach._id === botId){
                            mach.RootB.animations.forEach(anim => anim.name === "fired" && anim.play())
                        }
                    })
                })

                socket.on("botIsHit", data => {
                    if(data.botId === this._botDet._id){
                        this._botDet.dmgTaken += data.dmg
                        this._botDet.energy -= parseInt(data.dmg/3)
                        
                        if(this._botDet.dmgTaken >= this._botDet.durability){
                            this.stop()
                            socket.emit("explode", data.botId)
                             // deleting of bot
                             // updating users to haveBot false to restart in making
                            this.updateDatabase(false,'DELETE',`bots/destroy/${data.botId}`)
                            this.updateDatabase(false,'PATCH',`users/botdestroyed/${this._user._id}`)
                            
                            return
                        }
                        this.updUIStatus(this._botDet, socket)
                        const body = {
                            ene: this._botDet.energy,
                            dam: this._botDet.dmgTaken
                        }
                        this.updateDatabase(body,'PATCH',`bots/energydamage/${data.botId}`)
                    }
                })

                socket.on("smokeTheBot", botId => {
                    const theBot = scene.getMeshByName(`Body.${botId}`)
                    if(!theBot) return log("cant find the bot that will smoke ")
                    const isSmokMade = scene.getParticleSystemById(`smoke.${botId}`)
                    if(isSmokMade) return log("no need to make smoke sys already made")
                    const smok = smokeSys.clone(`smoke.${botId}`)
                    smok.id = `smoke.${botId}`
                    smok.emitter = theBot
                    smok.start()
                    if(botId === this._botDet._id) this._showWarnDeath(5000)
                    
                })

                socket.on("botExploded", botId => {        
                    this._machinez.forEach(mach => {
                        if(mach._id === botId){
                            mach.isMoving = false
                            mach.core.position.y += 20
                            mach.RootB.animations.forEach(anim => anim.stop())
                            mach.RootB.animations.forEach(anim => {
                                if(anim.name === "explode"){
                                    anim.play()
                                }
                            })
                            setTimeout(() => {
                                mach.body.dispose()
                            }, 5000)
                        }
                    })
                })

                socket.on('aUserDisconnect', botId => {

                    const theMesh = this._scene.getMeshByName(`Body.${botId}`)
                    theMesh?.dispose() // remove the mesh by getting the scen

                    const newArr = this._machinez.filter(mach => mach._id !== botId)
                    this._machinez = newArr

                    
                })

                if(!this._desktopMode) this._makeJoyStick(socket)
            }
            // ACTIONS
            _clearAllCurrentAnim(){
                clearTimeout(this._willFireTimeOut) // it will stop the firebx to be created
            }
            _fire(socket){

                socket.emit("fireAnim", this._botDet._id) // animation lang ng mesh to
                
                const bx = this._scene.getMeshByName('bx')
                if(!bx) return log("cant find your bx sir")
                const {x,z} = bx.position
                this.loadFiring()
                this._willFireTimeOut = setTimeout( () => {
                    socket.emit("fire", ({
                        dirTarg: {x,z},
                        speed: .75,
                        botId: this._botDet._id,
                        dmg: this._botDet.weapon.dmg
                    }))
                    
                }, 600)

            }
            // fetch
            async getBotDet(){
                const result = await fetch(`${apiURL}/bots/${this._user._id}`)
                const bot = await result.json()
                
                this._botDet = bot
            }

            async saveLocOnline(data){ // update the location
                const result = await fetch(`${apiURL}/bots/loc/${this._botDet._id}`, apiOpt('PATCH', data))
                const bot = await result.json();
                log(bot)
            }

            async updateDatabase(body,meth,address){
                const response = await fetch(`${apiURL}/${address}`, apiOpt(meth,body))
                const data = await response.json()
                log(data)

                return data
            }

            // creations
            async createBot(botdet, scene, smokeSys, wallz, mechWallz){
                const isCreated = scene.getMeshByName(`Body.${botdet._id}`);
                if(isCreated) return log(`User ${botdet._id} is already created !`)

                log(`will create this ${botdet.bodyType} !`)
                const whenHit = new BABYLON.Sound(`whenHit.${botdet._id}`, "./sounds/whenHit.wav", scene, null, {
                    loop: false,
                    autoplay: false, spatialSound: true, volume: .4, maxDistance: 40
                });
                const fireShot = new BABYLON.Sound(`fireShot.${botdet._id}`, "./sounds/fireShot.wav", scene, null, {
                    loop: false,
                    autoplay: false, spatialSound: true, volume: .6, maxDistance: 50
                });

                const explodeSound = new BABYLON.Sound(`explodeSound.${botdet._id}`, "./sounds/explode.wav", scene, null, {
                    loop: false,
                    autoplay: false, spatialSound: true, volume: .8, maxDistance: 50
                });

                const armFireJson = {"name":`armFireJson.${botdet._id}`,"id":`armFireJson.${botdet._id}`,"capacity":10000,"disposeOnStop":false,"manualEmitCount":-1,"emitter":[0,0,0],"particleEmitterType":{"type":"ConeParticleEmitter","radius":0.1,"angle":0.7853981633974483,"directionRandomizer":0,"radiusRange":1,"heightRange":1,"emitFromSpawnPointOnly":false},"texture":{"tags":null,"url":"https://assets.babylonjs.com/textures/flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"homogeneousRotationInUVTransform":false,"isBlocking":true,"name":"https://assets.babylonjs.com/textures/flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3,"_useSRGBBuffer":false},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":0.1,"maxSize":0.1,"minScaleX":1,"maxScaleX":1,"minScaleY":1,"maxScaleY":1,"minEmitPower":2,"maxEmitPower":2,"minLifeTime":0.4,"maxLifeTime":0.5,"emitRate":300,"gravity":[0,0,0],"noiseStrength":[10,10,10],"color1":[0.2,0,0,1],"color2":[0.29411764705882354,0.0392156862745098,0,1],"colorDead":[0.0784313725490196,0.0784313725490196,0.0784313725490196,1],"updateSpeed":0.043,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"spriteCellLoop":true,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"sizeGradients":[{"gradient":0,"factor1":0.6,"factor2":0.5},{"gradient":0.56,"factor1":0.05,"factor2":0.06}],"startSizeGradients":[],"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false}
                const armFireSys = ParticleSystem.Parse(armFireJson, scene, "")


                const body = MeshBuilder.CreateBox(`Body.${botdet._id}`, {size: 1}, scene)
                const {x,z} = botdet
                log(botdet)
                body.position = new Vector3(x,1.2,z)
               
                mechWallz.forEach(mech => {
                    
                    mech.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionEnterTrigger,
                            parameter: body
                        }, e => {
                            log("i hit this body")
                        }
                    ))
                })
                const core = MeshBuilder.CreateBox(`core.${botdet._id}`, {height: 1.2, width: .6, depth: .6}, scene)
                core.parent = body
                core.position = new Vector3(0,-.5,0)
                whenHit.attachToMesh(core)
                fireShot.attachToMesh(core)

                const armMesh = MeshBuilder.CreateBox(`armMesh.${botdet._id}`, {height: .7, width: .7, depth: .7}, scene)
                armMesh.parent = body
                
                // armMesh.position = new Vector3(-.7,.68,2.3)
                armMesh.position = new Vector3(.23,2.9,0)

                armMesh.isVisible = false
                body.isVisible = false
                core.isVisible = false

                armFireSys.emitter = armMesh
                armFireSys.stop()
                armMesh.addRotation(0,0,0)

                const {animationGroups, meshes} = await SceneLoader.ImportMeshAsync("", "./modelz/", "bot.glb", scene)

               
                meshes[0].animations = animationGroups
                let armBone
                meshes[0].getChildren()[0].getChildren().forEach(bonz => {
                    if(bonz.name === "Arm.R") armBone = bonz
                })
                armMesh.parent = armBone
                armFireSys.emitter = armMesh
                
                
                meshes.forEach(mesh => {
                    if(mesh.name.includes("root") || mesh.name.includes(botdet.bodyType) || mesh.name.includes(botdet.headType)){
                        mesh.isVisible = true
                        
                        mesh.position = new Vector3(0,-1, 0)
                        
                        mesh.rotationQuaternion = null
                        
                    }else{
                        mesh.isVisible = false
                    }
                })
                meshes[0].parent = body
                meshes[0].position.y += 1.5
                
                //WEAPON
                const Weap = await SceneLoader.ImportMeshAsync("","./modelz/", "weapons.glb", scene)
                Weap.meshes.forEach(mesh => {
                    
                   if(mesh.name.includes(this._botDet.weapon.name) || mesh.name.includes('root')){
                       mesh.isVisible = true
                   }else{
                       mesh.isVisible = false
                   }
                   
                })
                Weap.meshes[0].parent = armBone
                Weap.meshes[0].position.y += 2.8
                Weap.meshes[0].addRotation(Math.PI/2,0,0)
                Weap.meshes[0].position = new Vector3(.3,2.4,0)

                if(botdet.isSmoking){
                    const smok = smokeSys.clone(`smoke.${botdet._id}`)
                    smok.id = `smoke.${botdet._id}`
                    smok.emitter = body
                    smok.start()
                }

                this._machinez.push({
                    _id: botdet._id,
                    body: body,
                    core: core,
                    isMoving: false,
                    dirTarg: {x: 0, z: 0},
                    armFireSys,
                    energy: botdet.energy,
                    maxEnergy: botdet.maxEnergy,
                    RootB: meshes[0]
                })

                const toRender = () => {
                    if(!body){
                        log(`body.${body.name} unregistered in the loop`)
                        return scene.unregisterBeforeRender(toRender)
                    }
                    wallz.forEach(wall => {
                        if(wall.intersectsMesh(body, true)){
                            log("intersecting")
                            body.locallyTranslate(new BABYLON.Vector3(0,0,-.2))
                        }
                    })
                    mechWallz.forEach(wall => {
                        if(wall.intersectsMesh(body, true)){
                            log("intersecting")
                            body.locallyTranslate(new BABYLON.Vector3(0,0,-.2))
                        }
                    })

                }
                scene.registerBeforeRender(toRender)

                // name display
                const posY = this._desktopMode ? 1.7 : 2.4
                const nameMesh = BABYLON.Mesh.CreatePlane("plane", 3);
                
                nameMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
                const textureForName = GUI.AdvancedDynamicTexture.CreateForMesh(nameMesh);
                const nameText = GUI.Button.CreateSimpleButton(`nametag.${botdet._id}`, botdet.botname);

                nameText.height = 0.9;
                nameText.color = "white";
                nameText.fontSize = this._desktopMode ? 100 : 190;
                nameText.thickness = 0
                // nameText.background = "red";

                textureForName.addControl(nameText);

                nameMesh.parent = core
                nameMesh.position = new Vector3(0,posY,0)
            }

            async createCliffSmall(scene){
                const posY = 0
                let wallz = []
                const { meshes } = await SceneLoader.ImportMeshAsync("", "./modelz/", "cliffsmall.glb", scene)
                
                const wall = meshes[0].getChildren()[0]
                wall.parent = null
                wall.name = 'cliff'
                wall.position = new Vector3(27.8,posY,47.57)
                
                wall.checkCollisions = true
                // wallmesh.parent = wall
                // wallmesh.position = new Vector3(1.6,-5.2,0)
                wall.isVisible = true

                wallz.push(wall)

                const wall2 = wall.clone(`cliff.${Math.random()}`)
                wall2.position = new Vector3(-20,posY,40.5)
                wall2.addRotation(0,-.3,0)
                wallz.push(wall2)

                const wall3 = wall.clone(`cliff.${Math.random()}`)
                wall3.position = new Vector3(-36,posY,-13.8)
                wall3.addRotation(0,-1.2,0)
                wallz.push(wall3)

                const wall4 = wall.clone(`cliff.${Math.random()}`)
                wall4.position = new Vector3(40.2,posY,-24.9)
                wall4.addRotation(0,-1.5,0)
                wallz.push(wall4)

                const wall5 = wall.clone(`cliff.${Math.random()}`)
                wall5.position = new Vector3(40.9,posY,-1)
                wall5.addRotation(0,-.5,0)
                wallz.push(wall5)

                const wall6 = wall.clone(`cliff.${Math.random()}`)
                wall6.position = new Vector3(-2.5,posY,-44.7)
                wall6.addRotation(0,-Math.PI/2,0)
                wallz.push(wall6)

                return wallz
                
            }

            async mechwalls(scene){
                const posY = 5
                let wallz = []

                const {meshes} = await SceneLoader.ImportMeshAsync("", "./modelz/", "bigwall.glb", scene)
                
                const wallmesh = meshes[0].getChildren()[0]
                const wall = MeshBuilder.CreateBox(`cliff.${Math.random()}`, { width:12, height: 10, depth: 1}, scene)
                wallmesh.parent = null
                wallmesh.parent = wall
                wallmesh.position = new Vector3(0,-4.8,0)
                wall.actionManager = new ActionManager(scene)  

                wall.position = new Vector3(12.18,posY,16.53)

                wall.checkCollisions = true
                wall.isVisible = false
                wallz.push(wall)

                const wall2 = wall.clone(`cliff.${Math.random()}`)
                wall2.position = new Vector3(-13.6,posY,1.53)
                wall2.addRotation(0,-Math.PI/2,0)
                wallz.push(wall2)
                wall2.actionManager = new ActionManager(scene)

                const wall3 = wall.clone(`cliff.${Math.random()}`)
                wall3.position = new Vector3(13.6,posY,-14.53)
                wall3.addRotation(0,-.3,0)
                wallz.push(wall3)
                wall3.actionManager = new ActionManager(scene)

                const Circle = await SceneLoader.ImportMeshAsync("", "./modelz/", "circ.glb", scene)
                const circ = Circle.meshes[0].getChildren()[0]
                circ.parent = null
                circ.name = 'bigwall'
                circ.position = new Vector3(0,0,0)
                
                circ.checkCollisions = true
                circ.isVisible = true
                

                return wallz
            }

            createSmoke(scene){
                const particleSystem = new BABYLON.ParticleSystem("particles", 8000, scene);

                //Texture of each particle
                particleSystem.particleTexture = new BABYLON.Texture("./images/particles/smoke.png", scene);
            
                // lifetime
                particleSystem.minLifeTime = 1;
                particleSystem.maxLifeTime = 2.3;
            
                // emit rate
                particleSystem.emitRate = 12;
            
                // gravity
                particleSystem.gravity = new BABYLON.Vector3(0.25, 1.5, 0);
            
                // size gradient
                particleSystem.addSizeGradient(0, 0.6, 1);
                particleSystem.addSizeGradient(0.3, 1, 2);
                particleSystem.addSizeGradient(0.5, 2, 3);
                particleSystem.addSizeGradient(1.0, 6, 8);
            
                // color gradient
                particleSystem.addColorGradient(0, new BABYLON.Color4(0.5, 0.5, 0.5, 0),  new BABYLON.Color4(0.8, 0.8, 0.8, 0));
                particleSystem.addColorGradient(0.4, new BABYLON.Color4(0.1, 0.1, 0.1, 0.1), new BABYLON.Color4(0.4, 0.4, 0.4, 0.4));
                particleSystem.addColorGradient(0.7, new BABYLON.Color4(0.03, 0.03, 0.03, 0.2), new BABYLON.Color4(0.3, 0.3, 0.3, 0.4));
                particleSystem.addColorGradient(1.0, new BABYLON.Color4(0.0, 0.0, 0.0, 0), new BABYLON.Color4(0.03, 0.03, 0.03, 0));
            
                // speed gradient
                particleSystem.addVelocityGradient(0, 1, 1.5);
                particleSystem.addVelocityGradient(0.1, 0.8, 0.9);
                particleSystem.addVelocityGradient(0.7, 0.4, 0.5);
                particleSystem.addVelocityGradient(1, 0.1, 0.2);
            
                // rotation
                particleSystem.minInitialRotation = 0;
                particleSystem.maxInitialRotation = Math.PI;
                particleSystem.minAngularSpeed = -1;
                particleSystem.maxAngularSpeed = 1;
            
                // blendmode
                particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
                
                // emitter shape
                const sphereEmitter = particleSystem.createSphereEmitter(0.1);
                particleSystem.stop()

                return particleSystem
            }
        }


        ////////////////////// STARTING OF GAME USER INTERFACE INTERACTION
        signBtn.addEventListener("click", e => {
            introCont.style.display = "none"
            introSign.style.display = "flex"
        })

        loginBtn.addEventListener("click", async e => {
            loginBtn.innerHTML = "Loading ..."
            loginBtn.style.pointerEvents = "none"
            const toPost = {
                username: usern.value,
                password: passd.value
            }
            let data
            try {
                const result = await fetch(`${apiURL}/users/login`,{
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(toPost)
                })

                data = await result.json()
                
                introHome.style.display = "none"
                canvas.style.display = "block"
                
            } catch (error) {
                alert("Server Error")
                console.log(error)
                return
            }
         
            new App(data.details.haveBot, data)
            sessionStorage.setItem("bagUserDet", JSON.stringify(data))
            
        })

        registerBtn.addEventListener("click", async e => {
            if (inppassword.value === inpconfirm.value) {
                const toSave = {
                    fullname: inpname.value,
                    username: inpusername.value,
                    password: inppassword.value
                }
                let data
                try {
                    const response = await fetch(`${apiURL}/users/register`, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify(toSave) // body data type must match "Content-Type" header
                    });

                    data = await response.json()
                    introHome.style.display = "none"
                    canvas.style.display = "block"

                } catch (error) {
                    alert("Some Error On The Server")
                    log("User already exist !")
                    return
                }
                if(data === undefined) return log("error register")
                log("register complete !", data)
                new App(false, data)


            } else {
                alert("Password Not Match")
                log({orig:inppassword.value, dup: inpconfirm.value})

            }
        })
        goBackBtn.addEventListener("click", e => {
            introCont.style.display = "block"
            introSign.style.display = "none"
        })
        startGame.addEventListener("click", e => {

            if (!characName.value.length) {
                alert("Enter Character Name")
            } else {
                introCont.style.display = "block"
                introSign.style.display = "none"
                setCharacterBx.style.display = "flex"

                const toSave = {
                    x: 0,
                    z: 0,
                    stage: "lajar",
                    myId: Math.random().toString().split(".")[1],
                }

                sessionStorage.setItem("advalleyCharacter", JSON.stringify(toSave))
                introHome.style.display = "none"
                setCharacterBx.style.display = "none"
                canvas.style.display = "block"
                setTimeout(() => {
                    new App()
                }, 500)
            }

        })
            