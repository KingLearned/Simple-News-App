//INITIALIZING OUR SERVERs
const express = require('express')
const app = express()
const fs = require('fs')
const PATH = require('path')
const bodyparser = require('body-parser') // FOR CAPTURING OF INPUT FROM FRONT END
const CORS = require('cors')
const BCRYPT = require('bcrypt') // FOR DECRYPTING OF PASSWORD
const JOI = require('joi') // FOR VALIDATION OF LOGIN || FORMS
const MD5 = require('md5')
const session = require('express-session')
const UUID = require('uuid')
const MULTER = require('multer')
const PORT = process.env.PORT || 1000 // FOR HOSTING OF SERVER
const authenticated = require('speakeasy')
const MAILER = require('nodemailer')
const TWILIO = require('twilio')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
dotenv.config()
 
// ###################### Serving Static Files ###########################
app.use(express.static(PATH.join(__dirname, './Public')))
            
// ############################# MIDDLE-WARES #############################
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
const expDate = 1000 * 60 * 60 * 24 * 7 //It will Last for Days

app.use(session({
        name: "Ve&xh&ub_0000_10101_&session",
        secret: UUID.v4(),
        resave: false,
        saveUninitialized: process.env.NODE_ENV === "production",
        cookie: {
            httpOnly: process.env.NODE_ENV === "production" ? false : true,
            maxAge: expDate, 
            secure: false,
            sameSite: true //'strict'
        }
}))

// ################ IMPORTED MODULES #################
// ################ IMPORTED MODULES #################
const MYSQL = require('./MODULES/Conn')
// ######################################################
const Storage = MULTER.diskStorage({
    destination: `./Public/uploads`,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = MULTER({
    storage: Storage
}).single('user_img')

// ################ CONSTUME MIDDLE-WARES #################
// ################ CONSTUME MIDDLE-WARES #################
const AdminLogIn = (req, res, next) => {
    if(!req.session.admin){
        res.redirect('/')
    }else{
        next()
    }
}

// ####################################################

// app.get('/logout', (req, res) =>{
//     req.session.destroy((err) => {
//         if(err){
//             return res.redirect('/dasboard')
//         }else{
//             console.log('User Logged Out Successfully')
//             res.clearCookie("Ve&xh&ub_0000_10101_&session")
//             res.redirect('/')
//         }
//     })
// })

app.get('/Admin/Log-in', (req,res) =>{
        res.sendFile(PATH.join(__dirname, './Public/AdminLog.html'))  
})
app.post('/Admin/Log-in', (req,res) =>{
    const Admin_Name = 'Admin'
    const Admin_pass = '12345'
    const Name = req.body.Admin_name 
    const Pwd = req.body.Admin_pwd 
    if((Name == Admin_Name) && (Pwd == Admin_pass)){
        req.session.admin = Name
        res.redirect('/Admin/Article-Dev')
    }
})
app.get('/Admin/Article-Dev', AdminLogIn, (req,res) =>{
        res.sendFile(PATH.join(__dirname, './Public/contentwrite.html'))  
})

app.post('/Admin/Article-Dev', AdminLogIn, (req, res) => {
    upload(req,res, (err) => {
        // ######### GENERATING DATE ##########
        const d = new Date()
        const GeneratDate  = d.getTime()
        // console.log(GeneratDate)
        const DateMonth = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const DateDay = ['Sunday', 'Monday', 'Tuseday', 'Wednessday', 'Thursday', 'Friday', 'Satuday']
        const Day = DateDay[d.getDay()]
        const Month = DateMonth[d.getMonth()]
        const FullDate = `${Day}, ${d.getDate()} ${Month}, ${d.getFullYear()}`
        // console.log(FullDate)
        const title = req.body.title
        const author = req.body.author_name
        const Newscontent = req.body.content
        const Newscategory = req.body.category
        if(err){
            console.log(err)
        }else{
            if(req.file){
                console.log(req.file.originalname)
                img_name = req.file.originalname
                const query = "INSERT INTO `trends`(`heading`, `category`, `source`, `article`, `publish`, `timpstamp`, `image`) VALUES(?,?,?,?,?,?,?)"
                MYSQL.query(query, [title, Newscategory, author, Newscontent, GeneratDate, FullDate, img_name], (err, result) =>{
                    News()
                    setTimeout(() => {
                        res.redirect(`/Admin/Article-Dev`)
                    }, 1000);       
                })
            }
         }})
})



// MAIN PAGE LANDING PAGE FOR NOW
app.get('/', (req,res) =>{
        res.sendFile(PATH.join(__dirname, './Public/index.html'))
})
app.post('/', (req, res) =>{
    const SearchWord = req.body.seard_W
    if(SearchWord){

        req.session.word = SearchWord
        res.redirect('/search')

    }else{
        const query = "SELECT * FROM `trends` WHERE `category`='National' ORDER BY `trends`.`publish` DESC"
        MYSQL.query(query, (err, National) => {
            const query = "SELECT * FROM `trends` WHERE `category`='Politics' ORDER BY `trends`.`publish` DESC"
            MYSQL.query(query, (err, Politics) => {
                const query = "SELECT * FROM `trends` WHERE `category`='Foreign' ORDER BY `trends`.`publish` DESC"
                MYSQL.query(query, (err, Foreign) => {
                    const query = "SELECT * FROM `trends` WHERE `category`='Sports' ORDER BY `trends`.`publish` DESC"
                    MYSQL.query(query, (err, Sports) => {
                        const query = "SELECT * FROM `trends` WHERE `category`='Entertainment' ORDER BY `trends`.`publish` DESC"
                        MYSQL.query(query, (err, Entertainment) => {
                            res.json({Nat: National,
                            Poli: Politics,
                            Fore: Foreign,
                            Enment: Entertainment,
                            Sport: Sports,
                            preloader: `<script type="text/javascript" src="./js/preloader.js"></script>`
                        })
                        })
                    })
                })
            })
        })
    }
})

// ########################### SEO SEARCH ##################################
// ########################### SEO SEARCH ##################################
app.get(`/search`, (req,res) =>{
    const {word} = req.session
    res.redirect(`/search-${word}`)
    app.get(`/search-${word}`, (req,res) =>{
        res.sendFile(PATH.join(__dirname, './Public/search.html'))
    })
    app.post(`/search-${word}`, (req,res) =>{
        const SearchWord = req.body.seard_W
    if(SearchWord){
        req.session.word = SearchWord
        res.redirect('/search')
    }else{
        const query = "SELECT * FROM `trends` WHERE heading like ?"
        MYSQL.query(query, [`%${word}%`],(err, result) => {
            if(result.length > 0){
                res.json({SCH:result, WD:word})
            }else{
                res.json({None:'None', WD:word})
            }
        })
    }
    })
})

// ########################### THE MAIN FUNCTION PERFORMIN ALL TASK ##################################
// ########################### THE MAIN FUNCTION PERFORMIN ALL TASK ##################################
function News() {
    const query = "SELECT * FROM `trends` ORDER BY `publish` DESC"
    MYSQL.query(query, (err, result) => {
        if(result){
            var NewsRoute = ['National', 'Foreign', 'Politics', `Sports`, 'Entertainment']
            for (let i = 0; i < result.length; i++) {
                var vb = result[i].heading
                vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                vb = vb.split(" ").join('-')
                const Rout = vb

                for (let n = 0; n < NewsRoute.length; n++) {
                    const rout1 = NewsRoute[n]
                    app.get(`/${rout1}/${Rout}`, (req,res) =>{
                        News() 
                        res.sendFile(PATH.join(__dirname, '/Public/fullnews.html'))
                    })
                    app.post(`/${rout1}/${Rout}`, (req, res) =>{
                        News() 
                        const SearchWord = req.body.seard_W
                        if(SearchWord){
                            req.session.word = SearchWord
                            res.redirect('/search')
                        }else{
                            const query = "SELECT * FROM `trends` WHERE `category`='National' ORDER BY `trends`.`publish` DESC"
                            MYSQL.query(query, (err, National) => {
                                const query = "SELECT * FROM `trends` WHERE `category`='Politics' ORDER BY `trends`.`publish` DESC"
                                MYSQL.query(query, (err, Politics) => {
                                    const query = "SELECT * FROM `trends` WHERE `category`='Foreign' ORDER BY `trends`.`publish` DESC"
                                    MYSQL.query(query, (err, Foreign) => {
                                        const query = "SELECT * FROM `trends` WHERE `category`='Sports' ORDER BY `trends`.`publish` DESC"
                                        MYSQL.query(query, (err, Sports) => {
                                            const query = "SELECT * FROM `trends` WHERE `category`='Entertainment' ORDER BY `trends`.`publish` DESC"
                                            MYSQL.query(query, (err, Entertainment) => {
                                                var article = result[i].article.split("p$").join('<p>')   
                                                res.json({
                                                HD: result[i].heading,
                                                Sr: result[i].source,
                                                Art: article,
                                                Tp: result[i].publish,
                                                Tsp: result[i].timpstamp,
                                                Img: result[i].image,
                                                Nat: National,
                                                Poli: Politics,
                                                Fore: Foreign,
                                                Enment: Entertainment,
                                                Sport: Sports})
                                            })
                                        })
                                    })
                                })
                            }) 
                        }
                    })
                
                }
            }
        }
        })

        const query1 = "SELECT * FROM `trends` ORDER BY `publish` DESC"
        MYSQL.query(query1, (err, result) => {
            if(result){
                var ResPage1 = Math.floor(result.length/4)
                var ResPage = result.length%4
                if(ResPage == 0){
                    ResPage1 = ResPage1
                }
                if(ResPage > 0){
                    ResPage1 = ResPage1 + 1
                }
                for (let n = 1; n <= ResPage1; n++) {
                    const NewsRoute = ['National', 'Foreign', 'Politics', `Sports`, 'Entertainment']
                        for (let i = 0; i < NewsRoute.length; i++) {
                            app.get(`/${NewsRoute[i]}/p%20a%20g%20e%20${n}%20of%20n%20e%20w%20s`, (req,res) =>{
                                News()
                                res.sendFile(PATH.join(__dirname, './Public/category.html'))  
                            })
                            app.get(`/${NewsRoute[i]}`, (req, res) => {
                                res.redirect(`/${NewsRoute[i]}/p%20a%20g%20e%20${1}%20of%20n%20e%20w%20s`)
                            }) 
                        }
                        // ######################### FOR NATIONAL CATEGORY #############################
                        
                        app.post(`/National/p%20a%20g%20e%20${n}%20of%20n%20e%20w%20s`, (req, res) => {
                            const SearchWord = req.body.seard_W
                            if(SearchWord){
                                req.session.word = SearchWord
                                res.redirect('/search')
                            }else{
                            const query = "SELECT * FROM `trends` WHERE `category`='National' ORDER BY `trends`.`publish` DESC"
                            MYSQL.query(query, (err, National) => {
                                const query = "SELECT * FROM `trends` WHERE `category`='Politics' ORDER BY `trends`.`publish` DESC"
                                MYSQL.query(query, (err, Politics) => {
                                    const query = "SELECT * FROM `trends` WHERE `category`='Foreign' ORDER BY `trends`.`publish` DESC"
                                    MYSQL.query(query, (err, Foreign) => {
                                        const query = "SELECT * FROM `trends` WHERE `category`='Sports' ORDER BY `trends`.`publish` DESC"
                                        MYSQL.query(query, (err, Sports) => {
                                            const query = "SELECT * FROM `trends` WHERE `category`='Entertainment' ORDER BY `trends`.`publish` DESC"
                                            MYSQL.query(query, (err, Entertainment) => {
                                                const Pend = 4*n
                                                const no = Pend - 4
                                                res.json({Nat: National,
                                                Poli: Politics,
                                                Fore: Foreign,
                                                Enment: Entertainment,
                                                Sport: Sports,
                                                link: 'National',
                                                News: National, Pstart: no, Pstop: Pend
                                            })
                                            })
                                        })
                                    })
                                })
                            })
                        }
                        })
                        // ######################### FOR POLITICS CATEGORY #############################
                        app.post(`/Politics/p%20a%20g%20e%20${n}%20of%20n%20e%20w%20s`, (req, res) => {
                        const SearchWord = req.body.seard_W
                        if(SearchWord){
                            req.session.word = SearchWord
                            res.redirect('/search')
                        }else{    
                            const query = "SELECT * FROM `trends` WHERE `category`='National' ORDER BY `trends`.`publish` DESC"
                            MYSQL.query(query, (err, National) => {
                                const query = "SELECT * FROM `trends` WHERE `category`='Politics' ORDER BY `trends`.`publish` DESC"
                                MYSQL.query(query, (err, Politics) => {
                                    const query = "SELECT * FROM `trends` WHERE `category`='Foreign' ORDER BY `trends`.`publish` DESC"
                                    MYSQL.query(query, (err, Foreign) => {
                                        const query = "SELECT * FROM `trends` WHERE `category`='Sports' ORDER BY `trends`.`publish` DESC"
                                        MYSQL.query(query, (err, Sports) => {
                                            const query = "SELECT * FROM `trends` WHERE `category`='Entertainment' ORDER BY `trends`.`publish` DESC"
                                            MYSQL.query(query, (err, Entertainment) => {
                                                var Pend = 4*n
                                                var no = Pend - 4
                                                res.json({Nat: National,
                                                Poli: Politics,
                                                Fore: Foreign,
                                                Enment: Entertainment,
                                                Sport: Sports,
                                                News: Politics,
                                                link: 'Politics',
                                                Pstart: no, Pstop: Pend
                                                })
                                                // console.log(Politics.length)
                                            })
                                        })
                                    })
                                })
                            })
                        }
                        })
                        // ######################### FOR SPORTS CATEGORY #############################
                        app.post(`/Sports/p%20a%20g%20e%20${n}%20of%20n%20e%20w%20s`, (req, res) => {
                            const SearchWord = req.body.seard_W
                            if(SearchWord){
                                req.session.word = SearchWord
                                res.redirect('/search')
                            }else{
                                const query = "SELECT * FROM `trends` WHERE `category`='National' ORDER BY `trends`.`publish` DESC"
                                MYSQL.query(query, (err, National) => {
                                    const query = "SELECT * FROM `trends` WHERE `category`='Politics' ORDER BY `trends`.`publish` DESC"
                                    MYSQL.query(query, (err, Politics) => {
                                        const query = "SELECT * FROM `trends` WHERE `category`='Foreign' ORDER BY `trends`.`publish` DESC"
                                        MYSQL.query(query, (err, Foreign) => {
                                            const query = "SELECT * FROM `trends` WHERE `category`='Sports' ORDER BY `trends`.`publish` DESC"
                                            MYSQL.query(query, (err, Sports) => {
                                                const query = "SELECT * FROM `trends` WHERE `category`='Entertainment' ORDER BY `trends`.`publish` DESC"
                                                MYSQL.query(query, (err, Entertainment) => {
                                                    const Pend = 4*n
                                                    const no = Pend - 4
                                                    res.json({Nat: National,
                                                    Poli: Politics,
                                                    Fore: Foreign,
                                                    Enment: Entertainment,
                                                    Sport: Sports,
                                                    link: 'Sports',
                                                    News: Sports, Pstart: no, Pstop: Pend
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        })

                        // ######################### FOR ENTERTAINMENT CATEGORY #############################
                        app.post(`/Entertainment/p%20a%20g%20e%20${n}%20of%20n%20e%20w%20s`, (req, res) => {
                            const SearchWord = req.body.seard_W
                            if(SearchWord){
                                req.session.word = SearchWord
                                res.redirect('/search')
                            }else{
                                const query = "SELECT * FROM `trends` WHERE `category`='National' ORDER BY `trends`.`publish` DESC"
                                MYSQL.query(query, (err, National) => {
                                    const query = "SELECT * FROM `trends` WHERE `category`='Politics' ORDER BY `trends`.`publish` DESC"
                                    MYSQL.query(query, (err, Politics) => {
                                        const query = "SELECT * FROM `trends` WHERE `category`='Foreign' ORDER BY `trends`.`publish` DESC"
                                        MYSQL.query(query, (err, Foreign) => {
                                            const query = "SELECT * FROM `trends` WHERE `category`='Sports' ORDER BY `trends`.`publish` DESC"
                                            MYSQL.query(query, (err, Sports) => {
                                                const query = "SELECT * FROM `trends` WHERE `category`='Entertainment' ORDER BY `trends`.`publish` DESC"
                                                MYSQL.query(query, (err, Entertainment) => {
                                                    const Pend = 4*n
                                                    const no = Pend - 4
                                                    res.json({Nat: National,
                                                    Poli: Politics,
                                                    Fore: Foreign,
                                                    Enment: Entertainment,
                                                    Sport: Sports,
                                                    link: 'Entertainment',
                                                    News: Entertainment, Pstart: no, Pstop: Pend
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        })

                        // ######################### FOR FOREIGN CATEGORY #############################
                        app.post(`/Foreign/p%20a%20g%20e%20${n}%20of%20n%20e%20w%20s`, (req, res) => {
                            const SearchWord = req.body.seard_W
                            if(SearchWord){
                                req.session.word = SearchWord
                                res.redirect('/search')
                            }else{
                                const query = "SELECT * FROM `trends` WHERE `category`='National' ORDER BY `trends`.`publish` DESC"
                                MYSQL.query(query, (err, National) => {
                                    const query = "SELECT * FROM `trends` WHERE `category`='Politics' ORDER BY `trends`.`publish` DESC"
                                    MYSQL.query(query, (err, Politics) => {
                                        const query = "SELECT * FROM `trends` WHERE `category`='Foreign' ORDER BY `trends`.`publish` DESC"
                                        MYSQL.query(query, (err, Foreign) => {
                                            const query = "SELECT * FROM `trends` WHERE `category`='Sports' ORDER BY `trends`.`publish` DESC"
                                            MYSQL.query(query, (err, Sports) => {
                                                const query = "SELECT * FROM `trends` WHERE `category`='Entertainment' ORDER BY `trends`.`publish` DESC"
                                                MYSQL.query(query, (err, Entertainment) => {
                                                    const Pend = 4*n
                                                    const no = Pend - 4
                                                    res.json({Nat: National,
                                                    Poli: Politics,
                                                    Fore: Foreign,
                                                    Enment: Entertainment,
                                                    Sport: Sports,
                                                    link: 'Foreign',
                                                    News: Foreign, Pstart: no, Pstop: Pend
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                        })
                    
                }
            }
        })
}News()
// ###################################################################################
// ###################################################################################

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))