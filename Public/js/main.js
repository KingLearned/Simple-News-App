$('document').ready(
    $.ajax({
        method: "POST",
        success: (data) => {
            for (let i = 1; i < 2; i++) {
                var vb = data.Nat[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let Topic = `<h3>${data.Nat[i].category}</h3>`
                let Img = `<a href="/National/${newsRout}"><img src="../uploads/${data.Nat[i].image}" alt="${data.Nat[i].image}" title="Read More!" ></a>`;
                let Cat = `<h6>${data.Nat[i].heading}</h6>`

                Heading = `<div class="head-column">
                ${Topic}
                ${Img}
                ${Cat}
                </div>`;
                document.querySelector(".right-handle").innerHTML = Heading;
            }
            for (let i = 1; i < 2; i++) {
                var vb = data.Poli[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let Topic = `<h3>${data.Poli[i].category}</h3>`
                let Img = `<a href="/Politics/${newsRout}"><img src="../uploads/${data.Poli[i].image}" alt="${data.Poli[i].image}" title="Read More!" ></a>`;
                let Cat = `<h6>${data.Poli[i].heading}</h6>`

                Heading = `<div class="head-column">
                ${Topic}
                ${Img}
                ${Cat}
                </div>`;
                document.querySelector(".right-handle").innerHTML += Heading;
            }
            for (let i = 1; i < 2; i++) {
                var vb = data.Sport[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let Topic = `<h3>${data.Sport[i].category}</h3>`
                let Img = `<a href="/Sports/${newsRout}"><img src="../uploads/${data.Sport[i].image}" alt="${data.Sport[i].image}" title="Read More!" ></a>`;
                let Cat = `<h6>${data.Sport[i].heading}</h6>`

                Heading = `<div class="head-column">
                ${Topic}
                ${Img}
                ${Cat}
                </div>`;
                document.querySelector(".right-handle").innerHTML += Heading;
            }
            for (let i = 1; i < 2; i++) {
                var vb = data.Fore[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let Topic = `<h3>${data.Fore[i].category}</h3>`
                let Img = `<a href="/Foreign/${newsRout}"><img src="../uploads/${data.Fore[i].image}" alt="${data.Fore[i].image}" title="Read More!"></a>`;
                let Cat = `<h6>${data.Fore[i].heading}</h6>`

                Heading = `<div class="head-column">
                ${Topic}
                ${Img}
                ${Cat}
                </div>`;
                document.querySelector(".right-handle").innerHTML += Heading;
            }
            for (let i = 1; i < 2; i++) {
                var vb = data.Enment[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let Topic = `<h3>${data.Enment[i].category}</h3>`
                let Img = `<a href="/Entertainment/${newsRout}"><img src="../uploads/${data.Enment[i].image}" alt="${data.Enment[i].image}" title="Read More!"></a>`;
                let Cat = `<h6>${data.Enment[i].heading}</h6>`

                Heading = `<div class="head-column" style="position:sticky; top:70px;">
                ${Topic}
                ${Img}
                ${Cat}
                </div>`;
                document.querySelector(".right-handle").innerHTML += Heading;
            }

             // ################### FOREIGN HANDLE ##############################
             for (let i = 0; i < 1; i++) {
                var vb = data.Fore[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let Topic = `<h1>${data.Fore[i].heading}</h1>`
                let Img = `<a href="/Foreign/${newsRout}"><img src="./uploads/${data.Fore[i].image}" alt="${data.Fore[i].image}" title="Read More!"></a>`;
                let Cat = `<h3>${data.Fore[i].category}</h3>`

                Heading = `
                ${Topic}
                ${Img}
                ${Cat}
                `;
                document.querySelector(".foreign_article").innerHTML = Heading;
            }
            // #################### FOR RELATED ##################
            for (let i = 1; i < 3; i++) {
                var vb = data.Fore[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let link = `<a href="/Foreign/${newsRout}">${data.Fore[i].heading}</a><br>`;
                document.querySelector(".foreign_relate").innerHTML += link;
            }
            // ################################################################

             // ################### POLITICS HANDLE ##############################
             // ################### POLITICS HANDLE ##############################
             for (let i = 0; i < 1; i++) {
                var vb = data.Poli[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let Topic = `<h1>${data.Poli[i].heading}</h1>`
                let Img = `<a href="/Politics/${newsRout}"><img src="./uploads/${data.Poli[i].image}" alt="${data.Poli[i].image}" title="Read More!"></a>`;
                let Cat = `<h3>${data.Poli[i].category}</h3>`

                Heading = `
                ${Topic}
                ${Img}
                ${Cat}
                `;
                document.querySelector(".politics_article").innerHTML = Heading;
            }
            for (let i = 2; i < 5; i++) {
                var vb = data.Poli[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let link = `<a href="/Politics/${newsRout}">${data.Poli[i].heading}</a>`;
                document.querySelector(".politics_relate").innerHTML += link;
            }
            // ################################################################

            // ################### NATIONAL HANDLE ##############################
            for (let i = 0; i < 1; i++) {
                var vb = data.Nat[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let Topic = `<h1>${data.Nat[i].heading}</h1>`
                let Img = `<a href="/National/${newsRout}"><img src="./uploads/${data.Nat[i].image}" alt="${data.Nat[i].image}" title="Read More!"></a>`;
                let Cat = `<h3>${data.Nat[i].category}</h3>`

                Heading = `
                ${Topic}
                ${Img}
                ${Cat}
                `;
                document.querySelector(".national_article").innerHTML = Heading;
            }
            for (let i = 2; i < 5; i++) {
                var vb = data.Nat[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let link = `<a href="/National/${newsRout}">${data.Nat[i].heading}</a><br>`;
                document.querySelector(".national_relate").innerHTML += link;
            }
            // ################################################################

            // ################### SPORTS HANDLE ##############################
            for (let i = 0; i < 1; i++) {
                var vb = data.Sport[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let Topic = `<h1>${data.Sport[i].heading}</h1>`
                let Img = `<a href="/Sports/${newsRout}"><img src="./uploads/${data.Sport[i].image}" alt="${data.Sport[i].image}" title="Read More!"></a>`;
                let Cat = `<h3>${data.Sport[i].category}</h3>`

                Heading = `
                ${Topic}
                ${Img}
                ${Cat}
                `;
                document.querySelector(".sports_article").innerHTML = Heading;
            }
             // #################### FOR RELATED ##################
            for (let i = 2; i < 5; i++) {
                var vb = data.Sport[i].heading.split("—").join('')
                    vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
                    vb = vb.split(" ").join('-')
                var newsRout = vb
                let link = `<a href="/Sports/${newsRout}">${data.Sport[i].heading}</a><br>`;
                document.querySelector(".sports_relate").innerHTML += link;
            }
            document.querySelector('.home_loader').innerHTML = data.preloader
            // ################################################################
    }
    }),
)
$('document').ready(
    $.ajax({
        method: "POST",
        success: (data) => {
// ################### ENTERTAINMENT HANDLE ##############################
for (let i = 0; i < 1; i++) {
    var vb = data.Enment[i].heading.split("—").join('')
        vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
        vb = vb.split(" ").join('-')
    var newsRout = vb
    let Topic = `<h1>${data.Enment[i].heading}</h1>`
    let Img = `<a href="/Entertainment/${newsRout}"><img src="./uploads/${data.Enment[i].image}" alt="${data.Enment[i].image}" title="Read More!"></a>`;
    let Cat = `<h3>${data.Enment[i].category}</h3>`

    Heading = `
    ${Topic}
    ${Img}
    ${Cat}
    `;
    document.querySelector(".entertainment_article").innerHTML = Heading;
}
// #################### FOR RELATED ##################
for (let i = 2; i < 5; i++) {
    var vb = data.Enment[i].heading.split("—").join('')
        vb = vb.replace(/[^a-zA-Z^0-9 ]/g, "")
        vb = vb.split(" ").join('-')
    var newsRout = vb
    let link = `<a href="/Entertainment/${newsRout}">${data.Enment[i].heading}</a><br>`;
    document.querySelector(".entertainment_relate").innerHTML += link;
}
}
}),
)
// ##############################################################