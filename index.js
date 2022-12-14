        import BABYLON from './_snowpack/pkg/babylonjs.js'
        import "./_snowpack/pkg/babylonjs-loaders.js";
        import io from "./_snowpack/pkg/socket.io-client.js"
        import * as GUI from './_snowpack/pkg/babylonjs-gui.js';
        // import * as cannon from 'cannon'
        // import { CannonJSPlugin } from "babylonjs";
        // window.CANNON = cannon
        const webSocketURL = "https://unibotzsocket.herokuapp.com/"
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
        const homeCont = document.querySelector(".home-container") // yung Launch button
        const launchBtn = document.getElementById("startBtn")
        const shopList = document.querySelector(".sc-ul")
        const shopCont = document.querySelector(".shop_cont")
        const scInner = document.querySelector(".sc-lists")
        const shopBtn =  document.querySelector(".shop-btn")

        // FIELD GUI
        const fireBtn = document.querySelector('.fire-btn')
        const statusCont = document.querySelector('.status-container')
        const energy = document.getElementById('energy')
        const dmgTaken = document.getElementById('dmgTaken')
        const chargeCont = document.querySelector('.charge-container')
        const barsCont = document.getElementById('barsCont')

        const engineCont = document.querySelector('.engine-sett')
        const esLeft = document.querySelector('.es-left')
        const engsettingBtn = document.getElementById("engsettingBtn")

        // warnsign
        const warnSign = document.querySelector('.warning-sign')
        // admin page
        const monsBtn = document.getElementById("monsBtn")
        

        const log = console.log
        const apiURL = 'https://universalbots.herokuapp.com'
        // const apiURL = 'http://localhost:8100'
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
    
        
        const {Matrix, ParticleSystem, ActionManager, ExecuteCodeAction, GlowLayer, PointLight, Engine, Scene, ArcRotateCamera, HemisphericLight,DirectionalLight, Vector3, MeshBuilder, FreeCamera, SceneLoader, Color3, StandardMaterial} = BABYLON
        
        let xcor //coordinates ng joystick sa world axis
        let zcor //coordinates ng joystick sa world axis
        let bodyx
        let bodyz
        let botId
        let userId
        let curPos
        let canPress = true // for moving or firing
        let botMoving = false
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
                this._bounced = []
                this._bulletz = [] // for action purpose only
                this._myMechDet = null // body core isMoving id
                this._isCharging = false

                this._canPress = false
                this._canFire = true
                this._camBLocked = false
                this._camTargCollided = true

                this.deductEn = .009
                this.devSpeed = 0
                this.barsLength = 0
                this.energenSpd = 0.04

                // ACTIONS RELATED
                this._willFireTimeOut //timeout to na kelangan i clear pag kikilos ka para di mag release yung bala
                this._canFireTimeOut // eto naman kada baril mo iclear niya yung timeout na to kase etong timeout na to e pang canpress = true
                this._barsInterval // interval ng bars kada 1.5sec nag increase
                
                // AI
                this.monsterz = []
                this.bugspd = .07   
                
                
                // mode
                if(window.innerHeight < 600){
                    this._desktopMode = false
                }else{
                    this._desktopMode = true
                }
                
                log('desktop mode ? ' + this._desktopMode)
                
                if(data.details.isAdmin){
                    this._goToAdminField()
                    return log("Admin Detected")
                }
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

                engsettingBtn.addEventListener("click", e => {
                    if(esLeft.className.includes("es-left-active")){
                     return esLeft.classList.remove("es-left-active")
                    }
                    esLeft.classList.add("es-left-active")
                })

                esLeft.addEventListener("click", e => {
                    const targ = e.target.className
                    if(targ.includes("n2")){
                        log("nitro")
                    }
                    if(targ.includes("energ")){
                        log("energ")
                    }
                    if(targ.includes("boot")){
                        log("boot")
                    }
                    log(targ)
                })
                shopBtn.addEventListener("click", e => {
                    if(shopCont.className.includes("shopclose")){
                        shopCont.classList.remove("shopclose")
                    }else{
                        shopCont.classList.add("shopclose")
                    }
                })
                //  SHOP LISTS WILL FETCH THE ITEMS
                shopList.addEventListener("click", async e => {
                    const targName = e.target.className.split(" ")[1]
        
                    if(e.target.className === "sc-ul") return log("I click sc-ul")
                    e.target.parentElement.childNodes.forEach(elem => {
                        
                        if(elem.className.includes("scactive")){
                            elem.classList.remove("scactive")
                        }
                    })
                    log(e.target.parentElement.childNodes)
                    if(targName !== 'sc-label') e.target.classList.add("scactive")
                    scInner.innerHTML = ""
        
                    const response = await fetch(`${apiURL}/shopitems`)
                    const data = await response.json()
        
                    if(!data) return log("problem fetching shop items")
                    data.forEach(det => {
                        if(det.type !== targName) return log(`not a ${targName}`)
                        const newDiv = document.createElement("div")
                        newDiv.className = `scl-bx ${det._id}`
        
                        const newImg = document.createElement("img")
                        newImg.className = 'shop-img'
                        newImg.src = `./images/shop/${det.itemName}.png`
                        newDiv.append(newImg)
        
        
                        const newP = document.createElement("p")
                        newP.className = "item-name"
                        newP.innerHTML = det.itemName
                        newDiv.append(newP)
        
                        const newButt = document.createElement("button")
                        newButt.className = "buy-btn"
                        newButt.innerHTML = `${det.price}$`
                        newDiv.append(newButt)
        
                        scInner.append(newDiv)
                    })
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
                shopBtn.style.display = "block"
                
            }
            _hideHomeGui(){
                homeCont.style.display = "none"
                shopBtn.style.display = "none"
                shopCont.classList.add("shopclose")
            }
            _showFieldUI(){
                fireBtn.style.display = "block"
                statusCont.style.display = "flex"
                chargeCont.style.display = "block"

                engineCont.style.display = "flex"
            }
            _hideFieldUI(){
                fireBtn.style.display = "none"
                statusCont.style.display = "none"
                chargeCont.style.display = "none"

                engineCont.style.display = "none"
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

                        botMoving = true
            
                    });
            
                    leftThumbContainer.onPointerUpObservable.add(function(coordinates) {
                        botMoving = false
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

                                botMoving = true
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

            _goToAdminField(){

                this._hideHomeGui()
                this._hideFieldUI()
                
                log("Admin Field")
                const adminField = document.querySelector(".admin-page")
                adminField.style.display = "flex"
                const socket = io(webSocketURL)
                const monstype = document.getElementById("monstype")
                const xloc = document.getElementById("xloc")
                const zloc = document.getElementById("zloc")
                const monsname = document.getElementById("monsname")
                const loot = document.getElementById("loot")
                const monsdmg = document.getElementById("monsdmg")
                const monshp = document.getElementById("monshp")

                monsBtn.addEventListener("click", e => {
                    e.preventDefault()
                    const data = {
                        monsId: Math.random().toString().split(".")[1],
                        monstype: monstype.value,
                        xloc: xloc.value,
                        zloc: zloc.value,
                        monsname: monsname.value,
                        loot: loot.value,
                        monsdmg: monsdmg.value,
                        monshp: monshp.value,
                        maxhp: monshp.value
                    }
                    
                    socket.emit("admin", data)
                })
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
                    log(mesh.name)
                    log(this._botDet)
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
                scene.clearColor = new Color3(0,0,0)

                const cam = new ArcRotateCamera("fieldCam", Math.PI/2 + .3, .8, 9, new Vector3(0,5,0), scene)
                // cam.attachControl(canvas, true)
                // cam.panningDistanceLimit = .0001
                cam.checkCollisions = true

                
                
                window.addEventListener("keypress", e => {
                    if(e.key === "k"){
                        cam.lowerRadiusLimit += 1
                    }
                })
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
                gl.intensity = 1.3;
                // creation of fire bullet
                const fireBulletJson = {"name":"CPU particle system","id":"default system","capacity":10000,"disposeOnStop":false,"manualEmitCount":-1,"emitter":[0,0,0],"particleEmitterType":{"type":"ConeParticleEmitter","radius":0.1,"angle":0.7853981633974483,"directionRandomizer":0,"radiusRange":1,"heightRange":1,"emitFromSpawnPointOnly":false},"texture":{"tags":null,"url":"https://assets.babylonjs.com/textures/flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"homogeneousRotationInUVTransform":false,"isBlocking":true,"name":"https://assets.babylonjs.com/textures/flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3,"_useSRGBBuffer":false},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":1,"maxSize":1.1,"minScaleX":1,"maxScaleX":1,"minScaleY":1,"maxScaleY":1,"minEmitPower":2,"maxEmitPower":2,"minLifeTime":0.09,"maxLifeTime":0.12,"emitRate":70,"gravity":[0,0,0],"noiseStrength":[10,10,10],"color1":[0.16470588235294117,0.00392156862745098,0.00392156862745098,1],"color2":[0.2627450980392157,0.12156862745098039,0,1],"colorDead":[0.16862745098039217,0,0,1],"updateSpeed":0.032,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"spriteCellLoop":true,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false}
                const fBulletSys = ParticleSystem.Parse(fireBulletJson, scene, "")
                
                const fexpJson = {"name":"CPU particle system","id":"default system","capacity":10000,"disposeOnStop":false,"manualEmitCount":-1,"emitter":[0,0,0],"particleEmitterType":{"type":"SphereParticleEmitter","radius":0.71,"radiusRange":1,"directionRandomizer":0},"texture":{"tags":null,"url":"https://assets.babylonjs.com/textures/flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"homogeneousRotationInUVTransform":false,"isBlocking":true,"name":"https://assets.babylonjs.com/textures/flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3,"_useSRGBBuffer":false},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":1,"maxAngularSpeed":10,"minSize":0.01,"maxSize":0.3,"minScaleX":0.4,"maxScaleX":0.88,"minScaleY":5,"maxScaleY":7,"minEmitPower":2,"maxEmitPower":2,"minLifeTime":0.1,"maxLifeTime":0.1,"emitRate":200,"gravity":[0,0,0],"noiseStrength":[10,10,10],"color1":[0.39215686274509803,0.32941176470588235,0.01568627450980392,1],"color2":[0,0.03137254901960784,0.26666666666666666,1],"colorDead":[1,0,0,1],"updateSpeed":0.041,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":1,"maxInitialRotation":20,"startSpriteCellID":0,"spriteCellLoop":true,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false}
                const fexpSys = ParticleSystem.Parse(fexpJson, scene, "")

                const fireBigExpJs = {"name":"CPU particle system","id":"default system","capacity":10000,"disposeOnStop":false,"manualEmitCount":-1,"emitter":[0,0,0],"particleEmitterType":{"type":"SphereParticleEmitter","radius":0.43,"radiusRange":1,"directionRandomizer":0},"texture":{"tags":null,"url":"https://assets.babylonjs.com/textures/flare.png","uOffset":0,"vOffset":0,"uScale":1,"vScale":1,"uAng":0,"vAng":0,"wAng":0,"uRotationCenter":0.5,"vRotationCenter":0.5,"wRotationCenter":0.5,"homogeneousRotationInUVTransform":false,"isBlocking":true,"name":"https://assets.babylonjs.com/textures/flare.png","hasAlpha":false,"getAlphaFromRGB":false,"level":1,"coordinatesIndex":0,"coordinatesMode":0,"wrapU":1,"wrapV":1,"wrapR":1,"anisotropicFilteringLevel":4,"isCube":false,"is3D":false,"is2DArray":false,"gammaSpace":true,"invertZ":false,"lodLevelInAlpha":false,"lodGenerationOffset":0,"lodGenerationScale":0,"linearSpecularLOD":false,"isRenderTarget":false,"animations":[],"invertY":true,"samplingMode":3,"_useSRGBBuffer":false},"isLocal":false,"animations":[],"beginAnimationOnStart":false,"beginAnimationFrom":0,"beginAnimationTo":60,"beginAnimationLoop":false,"startDelay":0,"renderingGroupId":0,"isBillboardBased":true,"billboardMode":7,"minAngularSpeed":0,"maxAngularSpeed":0,"minSize":0.1,"maxSize":0.1,"minScaleX":1,"maxScaleX":0.98,"minScaleY":1,"maxScaleY":1,"minEmitPower":2,"maxEmitPower":2,"minLifeTime":0.4,"maxLifeTime":3,"emitRate":200,"gravity":[0,0,0],"noiseStrength":[10,10,10],"color1":[0.20784313725490197,0.03529411764705882,0.03529411764705882,1],"color2":[0.3176470588235294,0.12549019607843137,0.027450980392156862,1],"colorDead":[0.043137254901960784,0.00392156862745098,0.00392156862745098,1],"updateSpeed":0.068,"targetStopDuration":0,"blendMode":0,"preWarmCycles":0,"preWarmStepOffset":1,"minInitialRotation":0,"maxInitialRotation":0,"startSpriteCellID":0,"spriteCellLoop":true,"endSpriteCellID":0,"spriteCellChangeSpeed":1,"spriteCellWidth":0,"spriteCellHeight":0,"spriteRandomStartCell":false,"isAnimationSheetEnabled":false,"sizeGradients":[{"gradient":0,"factor1":1,"factor2":1.06},{"gradient":1,"factor1":0.04,"factor2":0.041}],"textureMask":[1,1,1,1],"customShader":null,"preventAutoStart":false}
                const fBigExpSys = ParticleSystem.Parse(fireBigExpJs, scene, "")

                fexpSys.stop()
                fBigExpSys.stop()

                // cloning this for performance
                const smokeSys = this.createSmoke(scene)
                const bulletBx = BABYLON.MeshBuilder.CreateBox('bull', {size: .5, height: .4, width: .7}, scene)
                bulletBx.isVisible = false
                
                const wallz = await this.createCliffSmall(scene)
                const Bigwalls = await this.createCliffBig(scene)
                const mechWallz = await this.mechwalls(scene)
                
                const Ground = await SceneLoader.ImportMeshAsync("", "./modelz/", "fieldground.glb", scene)
                const fieldGround = Ground.meshes[0].getChildren()[0]
                fieldGround.parent = null
                fieldGround.name = "ground"

                const chargers = await this.createChargerz(scene)

                socket.emit("join", ({_id: this._user._id, botdet: this._botDet}))
                let findMineInterval

                let intervl
                socket.on('userJoined', data => {
                    data.uzers.forEach(dat => {
                        this.createBot(cam, dat.botdet, scene, smokeSys, wallz, mechWallz, chargers, socket)
                    })
                    clearInterval(intervl)
                    intervl = setInterval(() => {
                        if(this._machinez.length === data.uzers.length){
                            if(data.monz.length){
                                data.monz.forEach(mons => {
                                    
                                    this.createMons(mons, scene, socket)
                                })
                            }
                            log(`PASSED ! machinez ${this._machinez.length} uzers ${data.uzers.length}`)
                            clearInterval(intervl)
                        }
                        log(`running checking machinez ${this._machinez.length} on socketdata ${data.uzers.length}`)
                    }, 1000)

                })
                const bx = new MeshBuilder.CreateBox("bx", {height: .5, width: 1, depth: .6}, scene)
                bx.isVisible = false
                let isCamSetting = false
                findMineInterval = setInterval( () => {
                    const myMech = scene.getMeshByName(`Body.${this._botDet._id}`)
                    if(myMech){
                        isCamSetting = true
                        const myMechDet = this._machinez.find(mech => mech._id === this._botDet._id)
                        this._myMechDet = myMechDet
                        this._hideLS()
                        
                        this._canPress = true
                        // const {x,y,z} = myMech.position
                        // bx.position = new Vector3(x,.25,z)
                        
                        // bx.locallyTranslate(new Vector3(0,0,2))
                        log("Found My Mech", this._myMechDet)
                        clearInterval(findMineInterval)
                        setTimeout( () => {
                            isCamSetting = false
                            log("cam setup finished")
                        }, 20000)
                        const percent = (this._botDet.dmgTaken/this._botDet.durability) * 100
                        if(percent > 75){
                            setTimeout( () => {
                                this._showWarnDeath(3000)
                            }, 3000)
                        }
                    }else{
                        log("first loop of interval, bot not found")
                    }
                }, 2000)

                this._barsInterval = setInterval( () => {
                    if(this.barsLength >= 5) return
                    this.createBar()
                    this.barsLength++
                }, 1500)

                scene.actionManager = new ActionManager(scene)
                scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, e => {
                    if(!this._canPress) return log("not yet allowed to move")
                    const keyp = e.sourceEvent.key.toLowerCase()
                    let bxDir
                    const moveFunc = () => {
                        cam.setTarget(this._myMechDet.body)
                        this._canFire = false
                        this._clearAllCurrentAnim()
                        const {x,z} = this._myMechDet.body.position
                        bx.position = new Vector3(x,.045,z)
                        const camD = cam.getForwardRay().direction
                        const toLook = bx.position.add(new Vector3(camD.x,0,camD.z))
                        bx.lookAt(new Vector3(toLook.x,bx.position.y,toLook.z),0,0,0)

                        
                    }

                    const moveSocket = () => {
                        this._botDet.energy -= this.deductEn
                        this.updateEnergy(this._botDet)
                        socket.emit("move", ({
                            userId: this._user._id,
                            botId: this._myMechDet._id, 
                            dirTarg: {x: bxDir.x, z: bxDir.z}
                        }))
                    }
                    
                    switch(keyp){
                        case "w":                            
                            moveFunc()
                            bx.locallyTranslate(new Vector3(0,0,20))
                            bxDir = bx.getAbsolutePosition()
                            moveSocket()
                        break;
                        case "a":
                            moveFunc()
                            bx.locallyTranslate(new Vector3(-20,0,0))
                            bxDir = bx.getAbsolutePosition()
                            moveSocket()

                        break;
                        case "d":
                            moveFunc()
                            bx.locallyTranslate(new Vector3(20,0,0))
                            bxDir = bx.getAbsolutePosition()
                            moveSocket()
                        break;
                        case "s":
                            moveFunc()
                            bx.locallyTranslate(new Vector3(0,0,-20))
                            bxDir = bx.getAbsolutePosition()
                            moveSocket()
                        break;

                    }
                    
                }))
                scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, e => {
                    if(!this._canPress) return log("not yet allowed to move")
                    const kepress = e.sourceEvent.key.toLowerCase()

                    if(kepress === "w" || kepress === "a" || kepress === "d" || kepress === "s"){
                        const pos = this._myMechDet.body.position
                        cam.setTarget(new Vector3(pos.x,pos.y,pos.z))
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
                let setInt = 0
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
                        if(isCamSetting){
                            cam.setTarget(myMech)
                            cam.alpha = -Math.PI/2;
                            cam.beta = .5
                            cam.radius = 18
                            cam.lowerRadiusLimit = 18
                            setInt++
                            log("cam setting ..." + setInt)
                        }
                    }
                    this._machinez.forEach(mech => {
                        if(mech.isMoving) {
                            mech.body.lookAt(new Vector3(mech.dirTarg.x,mech.body.position.y, mech.dirTarg.z),0,0,0)
                           
                            mech.body.locallyTranslate(new Vector3(0,0,mech.speed + this.devSpeed))
                           
                            mech.RootB.animations.forEach(anim => anim.name === "moving" && anim.play())
                        }
 
                    })
                    this.monsterz.forEach(mon => {
                        if(mon.isMoving){
                            const bot = scene.getMeshByName(`Body.${mon.targId}`)
                            
                            if(bot){
                                const {x,z} = bot.position
                                mon.body.lookAt(new Vector3(x,mon.body.position.y,z),0,0,0)
                                mon.body.locallyTranslate(new Vector3(0,0,this.bugspd))
                                mon.spad.animations.forEach(anim => anim.name === "walking" && anim.play())
                            }else{ log("bot not found ")}
                            
                        }
                        if(!mon.isMoving && mon.isAttacking){
                            const bot = scene.getMeshByName(`Body.${mon.targId}`)
                            mon.spad.animations.forEach(anim => anim.name === "walking" && anim.stop())
                            if(bot){
                                const {x,z} = bot.position
                                mon.body.lookAt(new Vector3(x,mon.body.position.y,z),0,0,0)
                                
                            }else{ 
                                mon.isAttacking = false
                                log("bot not found to attack ")
                            }
                            
                        }
                    })
                    if(this._isCharging && this._botDet.energy < this._botDet.maxEnergy-1){
                        this._botDet.energy += this.energenSpd
                        this.updateEnergy(this._botDet)
                        log("charging ...")
                        
                    }
                    
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
                    
                    frbx.position = new Vector3(x,y + .7,z)
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
                    this.monsterz.forEach(mons => {
                        frbx.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionEnterTrigger,
                            parameter: mons.body
                        }, e => {
                            if(mons.monshp <= data.dmg){
                                socket.emit("monsremove", mons.monsId)
                                mons.initDeath()
                                this.monsterz = this.monsterz.filter(themon => themon.monsId !== mons.monsId)
                                log(this.monsterz)
                                
                                setTimeout( () => {
                                    mons.body.dispose()
                                    
                                }, 5400)
                                return
                            }
                            mons.monshp -= data.dmg
                            log(`after deduction monshp ${mons.monshp} mydmg ${data.dmg}`)
                            mons.spad.animations.forEach(anim => {
                                if(anim.name === "walking") anim.stop()
                                if(anim.name === "hit") anim.play()
                            })
                            // frbx.dispose()
                            clearTimeout(toDisposeTimeOut) // may timeout kase to pag hinde tumama pero tumama kaya nag cleartimeout nako dito
                            const newArr = this._bulletz.filter(bull => bull.botname !== frbx.name)
                            this._bulletz = newArr

                            frbx.setParent = mons.body
                            fSys.stop()
                            // electric particle system
                            explosionSys.start()// naka dikit sa bala
                            explosionSys.targetStopDuration = .5
                            explosionSys.disposeOnStop = true
                            
                            explodeSound.play()

                            // Explosion Partcle system
                            const explosion = fBigExpSys.clone(`explosion.${Math.random()}`)
                            const {x,z} = mons.body.getAbsolutePosition()
                            explosion.emitter = new Vector3(x, frbx.position.y, z)
                            explosion.start()
                            explosion.targetStopDuration = 1.1
                            explosion.disposeOnStop = true

                            setTimeout(() => {
                                frbx.dispose()
                            }, 500)
                            socket.emit("monshit", {monsId: mons.monsId, dmg: data.dmg})
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
                        log(`HITTED ${this._botDet.dmgTaken} ${this._botDet.durability}`)
                        // if the bot is destroyed
                        if(this._botDet.dmgTaken >= this._botDet.durability){
                            this.stop()
                            this._hideFieldUI()
                            this._canFire = false
                            socket.emit("explode", data.botId)
                             // deleting of bot
                             // updating users to haveBot false to restart in making
                             const dmgTakenVal = this._botDet.dmgTaken/this._botDet.durability * 100
                             dmgTaken.innerHTML  = `${parseInt(dmgTakenVal)}%`

                             this.updateDatabase(false,'DELETE',`bots/destroy/${data.botId}`)                            
                            
                            return
                        }
                        this.updUIStatus(this._botDet, socket)
                        const body = {
                            ene: this._botDet.energy,
                            dam: this._botDet.dmgTaken
                        }// save my current energy and damage status to the db
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
                            mach.core.position.y += 50
                            mach.core.dispose()
                            log("core is disposed !")
                            mach.RootB.animations.forEach(anim => anim.stop())
                            mach.RootB.animations.forEach(anim => {
                                if(anim.name === "explode"){
                                    anim.play()
                                }else{
                                    anim.stop()
                                }
                            })
                            setTimeout(() => {
                                mach.body.dispose()
                                const newArr = this._machinez.filter(mac => mac._id !== botId)
                                this._machinez = newArr
                            }, 4000)
                        }
                    })
                    if(this._botDet._id === botId){
                        setTimeout( () => window.location.reload, 4000)
                    }
                })

                socket.on("botbounced", det => {
                    
                    const BotMesh = this._machinez.find(mech => mech._id === det.botId)
                    if(!BotMesh) return log("not found Bot that hit the wall")
                    BotMesh.isMoving = false

                    BotMesh.body.locallyTranslate(new Vector3(0,0,-.5))
                    BotMesh.RootB.animations.forEach(anim => {
                        if(anim.name === "moving") anim.stop()
                        if(anim.name === "wallhit"){
                            anim.stop()
                            anim.play()
                        }
                    })
                })

                // creating monster
                socket.on('mkemons', data => {
                    log("creating monster " + data.monstype)
                    this.createMons(data,scene,socket)
                })

                socket.on("monsdetected", data => {
                    this.monsterz.forEach(mon => {
                        if(mon.monsId === data.monsId){
                            mon.isMoving = true
                            mon.targId = data.targId
                        }
                    })
                })
                socket.on("monstoped", data => {
                    const newArr = this.monsterz.map(mon => mon.monsId === data.monsId ? {...mon, isMoving: false, isAttacking: false} : mon)
                    this.monsterz = newArr
                    log(this.monsterz)
                })

                socket.on('monattacked', data => {
                    this.monsterz.forEach(mon => {
                        if(mon.monsId === data.monsId){
                            const bot = scene.getMeshByName(`Body.${data.targId}`)
                            if(!bot) return log("the bot to attacked is not found !")
                            const {x,z} = bot.position
                            const bugweapon = scene.getMeshByName(`bugweapon.${data.monsId}`)
                            if(!bugweapon) return log("did not found the weapon of bug")
                            bugweapon.position = new Vector3(-.1,.33,0)
                            mon.body.lookAt(new Vector3(x,mon.body.position.y,z),0,0,0)
                            mon.targId = data.targId
                            mon.isMoving = false
                            mon.isAttacking = true
                            mon.body.locallyTranslate(new Vector3(0,0,.1))
                            mon.spad.animations.forEach(anim => anim.name === "attack" && anim.play())
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
                if(botMoving) return log("desktop mode in normal fire you cant fire while moving")

                socket.emit("fireAnim", this._botDet._id) // animation lang ng mesh to
                
                const bx = this._scene.getMeshByName('bx')
                if(!bx) return log("cant find your bx sir")
                const {x,z} = bx.position
                this.loadFiring() // di mapipindot yung fire button
                this._willFireTimeOut = setTimeout( () => {
                    const myDMG = (this._botDet.weapon.dmg/5) * this.barsLength
                    log("my weapon dmg is " + this._botDet.weapon.dmg)
                    log("my current dmg is " + myDMG)
                    socket.emit("fire", ({
                        dirTarg: {x,z},
                        speed: .75,
                        botId: this._botDet._id,
                        dmg: myDMG
                    }))
                    this.resetBars()
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
            }

            async updateDatabase(body,meth,address){
                if(!body){
                    const response = await fetch(`${apiURL}/${address}`, apiOpt(meth))
                    const data = await response.json()
                    log(data)

                    return data
                }
                const response = await fetch(`${apiURL}/${address}`, apiOpt(meth,body))
                const data = await response.json()
                log(data)

                return data
            }

            // creations
            async createBot(cam, botdet, scene, smokeSys, wallz, mechWallz, chargers, socket){
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

                if(this._botDet._id === botdet._id && !this._desktopMode){
                    cam.setTarget(body)
                    cam.alpha = -Math.PI/2;
                    cam.beta = .5
                    cam.radius = 18
                    cam.lowerRadiusLimit = 18
                    
                    log("camera setup to mobile mode")
                
                }
                if(this._botDet._id === botdet._id && this._desktopMode){
                    cam.setTarget(body)
                    log("camera desktop mode")
                
                }
                if(this._botDet._id === botdet._id){
                    chargers.forEach(charger => {
                        charger.isVisible = false
                        charger.actionManager.registerAction(new ExecuteCodeAction(
                            {
                                trigger: ActionManager.OnIntersectionEnterTrigger,
                                parameter: body
                            }, e => {
                                this._isCharging = true
                                log("charging " + this._isCharging)
                            }
                        ))

                        charger.actionManager.registerAction(new ExecuteCodeAction(
                            {
                                trigger: ActionManager.OnIntersectionExitTrigger,
                                parameter: body
                            }, e => {
                                this._isCharging = false
                                log("charging " + this._isCharging)
                            }
                        ))
                    })
                   
                }
                const core = MeshBuilder.CreateBox(`core.${botdet._id}`, {height: 1.2, width: .9, depth: .9}, scene)

                core.position = new Vector3(0,-.5,0)
                whenHit.attachToMesh(core)
                fireShot.attachToMesh(core)

                const armMesh = MeshBuilder.CreateBox(`armMesh.${botdet._id}`, {height: .7, width: .7, depth: .7}, scene)
 
                
                // armMesh.position = new Vector3(-.7,.68,2.3)
                armMesh.position = new Vector3(.23,1.5,0)

                armMesh.isVisible = false
                body.isVisible = false
                core.isVisible = false
                // armFireSys.stop()
                armMesh.addRotation(0,0,0)

                const {animationGroups, meshes} = await SceneLoader.ImportMeshAsync("", "./modelz/", "bot.glb", scene)

               
                meshes[0].animations = animationGroups
                let armBone
                const spine = meshes[0].getChildren()[0].getChildren()[4]
                core.parent = spine
                meshes[0].getChildren()[0].getChildren().forEach(bonz => {
                    if(bonz.name === "Arm.R"){
                        
                        armBone = bonz.getChildren()[0]
                    }
                    
                })
   
                armFireSys.emitter = armMesh
                armMesh.parent = armBone
                
                let handMesh
                meshes.forEach(mesh => {
                    if(mesh.name.includes("root") || mesh.name.includes(botdet.bodyType) || mesh.name.includes(botdet.headType)){
                        mesh.isVisible = true
                        
                        mesh.position = new Vector3(0,-1, 0)
                        
                        mesh.rotationQuaternion = null
                        if(mesh.name.includes(botdet.bodyType)){
                            handMesh = mesh
                        }
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
                Weap.meshes[0].position.y -= .2
                Weap.meshes[0].addRotation(Math.PI/2,0,0)
                Weap.meshes[0].position = new Vector3(.3,1.8,0)

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
                    RootB: meshes[0],
                    speed: botdet.speed,
                    onGround:false
                })

                wallz.forEach(wall => {
                    wall.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionEnterTrigger,
                            parameter: core
                        }, e => {
                            if(this._botDet._id === botdet._id){
                                this.stop()
                                const bx = scene.getMeshByName('bx')
                                cam.setTarget(new Vector3(body.position.x, body.position.y, body.position.z))
                                const {x,z} = bx.getAbsolutePosition()
                                const toEmit = {
                                    botId: botdet._id,
                                    dirTarg: {x,z}
                                }
                                socket.emit("bounce", toEmit)

                                setTimeout( () => {
                                    this.go()
                                    cam.setTarget(body)
                                }, 1800)
                            }

                        }
                    ))
                })
                // mechWallz.forEach(wall => {
                //     wall.actionManager.registerAction(new ExecuteCodeAction(
                //         {
                //             trigger: ActionManager.OnIntersectionEnterTrigger,
                //             parameter: body
                //         }, e => {
                //             if(this._botDet._id === botdet._id){
                //                 this.stop()
                //                 const bx = scene.getMeshByName('bx')
                //                 cam.setTarget(new Vector3(body.position.x, body.position.y, body.position.z))
                //                 const {x,z} = bx.getAbsolutePosition()
                //                 const toEmit = {
                //                     botId: botdet._id,
                //                     dirTarg: {x,z}
                //                 }
                //                 socket.emit("bounce", toEmit)

                //                 setTimeout( () => {
                //                     this.go()
                //                     cam.setTarget(body)
                //                 }, 1800)
                //             }

                //         }
                //     ))
                // })

                const toRender = () => {
                    if(!body){
                        log(`body.${body.name} unregistered in the loop`)
                        return scene.unregisterBeforeRender(toRender)
                    }
                    // wallz.forEach(wall => {
                    //     if(wall.intersectsMesh(body, true)){
                    //         log("intersecting")
                    //         body.locallyTranslate(new BABYLON.Vector3(0,0,-.2))
                    //     }
                    // })
                    mechWallz.forEach(wall => {
                        if(wall.intersectsMesh(body, true)){
                            log("intersecting")
                            body.locallyTranslate(new BABYLON.Vector3(0,0, -botdet.speed))
                        }
                    })

                }
                scene.registerBeforeRender(toRender)

                // name display
                const posY = this._desktopMode ? -2.2 : -2.7
                const nameMesh = BABYLON.Mesh.CreatePlane("plane", 3);
                
                nameMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
                const textureForName = GUI.AdvancedDynamicTexture.CreateForMesh(nameMesh);
                const nameText = GUI.Button.CreateSimpleButton(`nametag.${botdet._id}`, botdet.botname);

                nameText.height = 0.9;
                nameText.color = "white";
                nameText.fontSize = this._desktopMode ? 150 : 190;
                nameText.thickness = 0
                // nameText.background = "red";

                textureForName.addControl(nameText);

                nameMesh.parent = core
                nameMesh.position = new Vector3(0,posY,0)
                nameMesh.rotation = new Vector3(0,Math.PI,Math.PI)
                
            }
            async createChargerz(scene){
                let chargerz = []
                const bx = MeshBuilder.CreateBox(`chargg.${Math.random}ing`, {size: 3}, scene)
                bx.actionManager = new ActionManager(scene)

                const {meshes} = await SceneLoader.ImportMeshAsync("charger", "./modelz/", "charger.glb", scene)

                const charger = BABYLON.Mesh.MergeMeshes([meshes[1], meshes[2]], true, true, undefined, false, true);
                charger.showBoundingBox = false

                const bx2 = bx.clone(`charging.${Math.random}`); bx2.actionManager = new ActionManager(scene)
                const bx3 = bx.clone(`charging.${Math.random}`); bx3.actionManager = new ActionManager(scene)
                const bx4 = bx.clone(`charging.${Math.random}`); bx4.actionManager = new ActionManager(scene)

                const fins = new Matrix.Translation(-10,.2,10); bx.position = new Vector3(-10,1,10);
                const sins = new Matrix.Translation(10,.2,5); bx2.position = new Vector3(10,1,5);
                const thr = new Matrix.Translation(1,.2,5); bx3.position = new Vector3(1,1,5);
                const fourIns = new Matrix.Translation(1,.2,-10); bx4.position = new Vector3(1,1,-10);

                charger.thinInstanceAdd(fins)
                charger.thinInstanceAdd(sins)
                charger.thinInstanceAdd(thr)
                charger.thinInstanceAdd(fourIns)

                charger.thinInstanceSetMatrixAt(charger, fins)
                charger.thinInstanceSetMatrixAt(charger, sins)
                charger.thinInstanceSetMatrixAt(charger, thr)
                charger.thinInstanceSetMatrixAt(charger, fourIns)

                chargerz.push(bx)
                chargerz.push(bx2)
                chargerz.push(bx3)
                chargerz.push(bx4)

                return chargerz
            }
            async createCliffSmall(scene){
                const posY = 3
                let wallz = []
                const { meshes } = await SceneLoader.ImportMeshAsync("", "./modelz/", "cliffsmall.glb", scene)
                
                const wallMesh = meshes[0].getChildren()[0]
                const wall = BABYLON.MeshBuilder.CreateBox("cliff", {height: 6, width: 8, depth: 22}, scene)
                wallMesh.parent = null
                wallMesh.parent = wall
                wall.position = new Vector3(27.8,posY,47.57)
                
                wall.checkCollisions = true // for camera
                wallMesh.position = new Vector3(.4,-3,0)
                wall.isVisible = false

                wallz.push(wall)

                const wall2 = wall.clone(`cliff.${Math.random()}`)
                wall2.position = new Vector3(-20,posY,40.5)
                wallz.push(wall2)

                const wall3 = wall.clone(`cliff.${Math.random()}`)
                wall3.position = new Vector3(-36,posY,-13.8)

                wallz.push(wall3)

                const wall4 = wall.clone(`cliff.${Math.random()}`)
                wall4.position = new Vector3(40.2,posY,-24.9)
                // wall4.addRotation(0,-1.5,0)
                wallz.push(wall4)

                const wall5 = wall.clone(`cliff.${Math.random()}`)
                wall5.position = new Vector3(40.9,posY,-1)
                // wall5.addRotation(0,-.5,0)
                wallz.push(wall5)

                const wall6 = wall.clone(`cliff.${Math.random()}`)
                wall6.position = new Vector3(-2.5,posY,-44.7)
                // wall6.addRotation(0,-Math.PI/2,0)
                wallz.push(wall6)

                wallz.forEach(wall => {
                    wall.actionManager = new ActionManager(scene)
                })

                return wallz
                
            }
            async createCliffBig(scene){
                const posY = -.5
                let Bigwalls = []
                const { meshes } = await SceneLoader.ImportMeshAsync("", "./modelz/", "cliffBig.glb", scene)
                meshes.forEach(mesh => log(mesh.name))
                const wall = meshes[0].getChildren()[0]
                log(wall)
                wall.rotationQuaternion = null
                wall.position = new Vector3(80,posY,-20)
                
                wall.checkCollisions = true // for camera
                wall.showBoundingBox = false
                wall.isVisible = true

                Bigwalls.push(wall);

                const wall2 = wall.clone(`cliff.${Math.random()}`)
                wall2.position = new Vector3(94,posY,70.5)
                Bigwalls.push(wall2)

                
                const wall3 = wall.clone(`cliff.${Math.random()}`)
                wall3.position = new Vector3(-110,posY,70.5)
                wall3.rotation = new Vector3(0,Math.PI,0)
                Bigwalls.push(wall3)

                const wall4 = wall.clone(`cliff.${Math.random()}`)
                wall4.position = new Vector3(-110,posY,-20)
                wall4.rotation = new Vector3(0,Math.PI,0)
                Bigwalls.push(wall4)

                const BackCliff = await SceneLoader.ImportMeshAsync("", "./modelz/", "cliffBigBack.glb", scene)
             
                const wall5 = BackCliff.meshes[0].getChildren()[0]

         
                wall5.position = new Vector3(-10,posY,-85)
                wall5.rotation = new Vector3(0,Math.PI,0)
         
                wall5.checkCollisions = true // for camera
                wall5.isVisible = true

                Bigwalls.push(wall5);
                Bigwalls.forEach(wall => {
                    wall.actionManager = new ActionManager(scene)
                })

                return Bigwalls
                
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
                // wall2.addRotation(0,-Math.PI/2,0)
                wallz.push(wall2)
                wall2.actionManager = new ActionManager(scene)

                const wall3 = wall.clone(`cliff.${Math.random()}`)
                wall3.position = new Vector3(13.6,posY,-14.53)
                // wall3.addRotation(0,-.3,0)
                wallz.push(wall3)
                wall3.actionManager = new ActionManager(scene)

                const Circle = await SceneLoader.ImportMeshAsync("", "./modelz/", "circ.glb", scene)
                const circ = Circle.meshes[0].getChildren()[0]
                circ.parent = null
                circ.name = 'Circ'
                circ.position = new Vector3(0,.15,0)
                circ.isVisible = true

                const Bridge = await SceneLoader.ImportMeshAsync("", "./modelz/", "bridge.glb", scene)
                const bridg = Bridge.meshes[0].getChildren()[0]
                bridg.parent = null
                bridg.name = 'Circ'
                bridg.position = new Vector3(-6.4,-.5,108.7)
                bridg.isVisible = true
                

                return wallz
            }
            async createMons(data, scene,socket){
                log("create monster " + data.monsId)
                if(!scene.getMeshByName(`bugmesh.${data.monsId}`)){
                    switch(data.monstype){
                        case "bug":
                            this.createBug(data,scene,socket)
                        break;
                    }
                }
            }
            async createBug(data,scene,socket){
            
                const posY = 1.1
                const bugDmg = 20
                let isDead = false
                let theTarget = undefined

                const Spader = await SceneLoader.ImportMeshAsync("", "./modelz/", "spader.glb", scene)
                const spad = Spader.meshes[0]
                const bugmesh = MeshBuilder.CreateBox(`bugmesh.${data.monsId}`, {height: 2, depth: 4, width:.9}, scene)
                bugmesh.position = new Vector3(data.xloc, posY, data.zloc)

                Spader.meshes.forEach(spad => {
                    spad.rotationQuaternion = null
                })
                spad.parent = bugmesh
                spad.animations = Spader.animationGroups
                spad.position = new Vector3(0,-.9,0)


                const bugCollision = MeshBuilder.CreateBox(`bugcollision.${data.monsId}`, {height: .5, depth: 30, width:30}, scene)
                bugCollision.parent = bugmesh

                const spaderArm = Spader.meshes[0].getChildren()[0].getChildren()[5].getChildren()[0].getChildren()[0]
                const bugweaponColl = MeshBuilder.CreateBox(`bugweapon.${data.monsId}`, {height: .7, depth: .21, width:.5}, scene)
                bugweaponColl.parent = spaderArm
                bugweaponColl.position = new Vector3(0,-1,0)
 

                bugCollision.actionManager = new ActionManager(scene)
                bugmesh.actionManager = new ActionManager(scene)
                bugweaponColl.actionManager = new ActionManager(scene)
                
                bugCollision.isVisible = false
                bugCollision.visibility = .5
                bugmesh.isVisible = false
                bugweaponColl.isVisible = false
                
                let chaseAfterTimeOut
                let attackingInterval
                let checkTargetInterval
                const chaseMach = (mach) => {

                    socket.emit('monsdetect', ({
                        monsId: data.monsId,
                        targId: mach._id
                    }))
                    
                }
                const initDeath = () => {
                    isDead = true
                    clearTimeout(chaseAfterTimeOut)
                    clearInterval(attackingInterval)
                    clearInterval(checkTargetInterval)
                    bugCollision.position.y += 40
                    bugCollision.dispose()
                    bugweaponColl.dispose()

                    spad.animations.forEach(anim => {
                        if(anim.name !== "death"){
                            anim.stop()
                        }else{
                            anim.play()
                        }
                    })
                }
                setInterval( () => {
                    log(theTarget)
                }, 2000)

                this._machinez.forEach(mach => {
                    
                    bugCollision.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionEnterTrigger,
                            parameter: mach.body
                        }, e => {
                            if(theTarget !== undefined) return log("spider has a target cannot register new !")
                            theTarget = mach
                            
                            log('bug sensed this bot ' + mach._id)
                            chaseMach(theTarget)
                            
                            clearInterval(checkTargetInterval)
                            checkTargetInterval = setInterval(() => {
                                if(theTarget) return clearInterval(checkTargetInterval)
                                const body = scene.getMeshByName(`Body.${theTarget._id}`)
                                if(!body){
                                    theTarget = undefined
                                    log("the bot im chasing is maybe disposed")
                                    clearInterval(checkTargetInterval)
                                }
                            }, 1000)
                        }
                    ))
                    bugCollision.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionExitTrigger,
                            parameter: mach.body
                        }, e => {
                            
                            if(theTarget && theTarget._id === mach._id){           
                                clearTimeout(chaseAfterTimeOut)
                                log('bug stoped')
                                const {x,z} = mach.body.getAbsolutePosition()
                                
                                theTarget = undefined
                                clearInterval(checkTargetInterval) // checking kung may hinahabol pa siya
                                socket.emit('monstop', ({
                                    monsId: data.monsId,
                                    dirTarg: {x,z},
                                    loc: {x:bugmesh.position.x,z:bugmesh.position.z}
                                }))
                                
                            }

                        }
                    ))
                    bugmesh.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionEnterTrigger,
                            parameter: mach.body
                        }, e => {
                            if(isDead) return
                            if(theTarget && theTarget._id === mach._id){
                                log('bug attack ' + mach._id)
                                clearTimeout(chaseAfterTimeOut)
                                const {x,z} = mach.body.getAbsolutePosition()
                                socket.emit('monsattack', ({
                                    monsId: data.monsId,
                                    targId: mach._id,
                                    dirTarg: {x,z},
                                    loc: {x:bugmesh.position.x,z:bugmesh.position.z}
                                }))
                                clearInterval(attackingInterval)
                                attackingInterval = setInterval(() => {
                                    if(!theTarget){
                                        log("I will attack but there is no target")
                                        return clearInterval(attackingInterval)
                                    }
                                    const theCore = scene.getMeshByName(`core.${theTarget._id}`)
                                    if(!theCore){
                                    theTarget = undefined
                                    return clearInterval(attackingInterval)
                                    } 
                                    socket.emit('monsattack', ({
                                        monsId: data.monsId,
                                        targId: mach._id,
                                        dirTarg: {x,z},
                                        loc: {x:bugmesh.position.x,z:bugmesh.position.z}
                                    }))
                                }, 3000)
                            }
                            
                        }
                    ))
                    bugmesh.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionExitTrigger,
                            parameter: mach.body
                        }, e => {
                            if(isDead) return
                            if(theTarget && theTarget._id === mach._id){
                                clearTimeout(chaseAfterTimeOut)
                                clearInterval(attackingInterval) // hinde na titirahin pag ka alpas sa ulo
                                chaseAfterTimeOut = setTimeout( () => {
                                    chaseMach(mach)
                                }, 1500)
                            }
                        }
                    ))

                    bugweaponColl.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionEnterTrigger,
                            parameter: mach.core
                        }, e => {
                            
                            socket.emit("hit", {botId: mach._id, dmg: bugDmg})
                        }
                    ))
                    bugweaponColl.actionManager.registerAction(new ExecuteCodeAction(
                        {
                            trigger: ActionManager.OnIntersectionExitTrigger,
                            parameter: mach.core
                        }, e => {
                            bugweaponColl.position = new Vector3(0,-1,0)
                            
                        }
                    ))
                })


                this.monsterz.push({monsId: data.monsId, body: bugmesh, collis: bugCollision, monshp: data.monshp, maxhp: data.maxhp,
                isMoving: false, isAttacking: false, dirTarg: {x:0, z:0}, targId: null,
                spad, initDeath})

            }
            createBar(){
                const newBar = document.createElement('div')
                newBar.className = "bar"

                barsCont.append(newBar)
            }
            resetBars(){
                this.barsLength = 0
                barsCont.innerHTML = ''
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
                const result = await fetch(`${apiURL}/users/login`, apiOpt('POST', toPost))

                data = await result.json()
                
                introHome.style.display = "none"
                canvas.style.display = "block"
                
            } catch (error) {
                alert("Server Error")
                console.log(error)
                return
            }
            const botres = await fetch(`${apiURL}/bots`)
            const botz = await botres.json()
           
            const isHaveBot = botz.some(bot => bot.owner === data.details._id)
            new App(isHaveBot, data)
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

            