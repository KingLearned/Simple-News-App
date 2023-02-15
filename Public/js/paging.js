$('document').ready(
    $.ajax({
        method: "POST",
        success: (data) => {
            var Start = data.Pstart
            var Stop = data.Pstop
                    var ResPage1 = Math.floor(data.News.length/4)
                    var ResPage = data.News.length%4
                    if(ResPage == 0){
                    ResPage1 = ResPage1
                    }
                    if(ResPage > 0){
                    ResPage1 = ResPage1 + 1
                    }
                    
                    let page;
                    for (let n = 1; n <= (ResPage1); n++) {
                        page = `<a href="/${data.link}/p%20a%20g%20e%20${n}%20of%20n%20e%20w%20s" id="active${n}">${n}</a>`
                        document.querySelector('.page-links').innerHTML += page
                    }
                    
                    for (let i = 0; i < 5; i++) {
                        const add = document.querySelector(`.nav${i}`).innerHTML
            
                        if(add == data.link){
                            document.querySelector(`.nav${i}`).setAttribute("class", "nav_active")
                        }
                    }

                    for (let i = 1; i <= Stop; i++) {
                        var active = ((Start/4)+1) == i
                       if(active){
                         document.querySelector(`#active${i}`).setAttribute("class", "active")
                       } 
                    }
            
                let Heading = "";
                if(Start == 0){
                    Start = 1
                }
                if(Stop == 4){
                    Stop = 5
                }
                for (let i = Start; i < Stop; i++) {

                    function timeSince(date) {
                        let seconds = Math.floor((new Date() - date) / 1000);
                        let interval = seconds / date;
                        interval = seconds / 3600;
                        if (interval > 24) {
                            return 'On ' + data.News[i].timpstamp
                        }
                        interval = seconds / 3600;
                        if (interval >= 2) {
                        return Math.floor(interval) + " hours ago";
                            // return "Today"
                        }
                        interval = seconds / 3600;
                        if (interval >= 1) {
                        return Math.floor(interval) + " hour ago";
                            // return "Today"
                        }
                        interval = seconds / 60;
                        if (interval >= 2) {
                            return Math.floor(interval) + " mins ago";
                        }
                        interval = seconds / 60;
                        if (interval >= 1) {
                            return Math.floor(interval) + " min ago";
                        }
                        return Math.floor(seconds) + " secs ago";
                    }

                var Rout = data.News[i].heading.split("—").join('')
                    Rout = Rout.replace(/[^a-zA-Z^0-9 ]/g, "")
                    Rout = Rout.split(" ").join('-')
                var newsRout = Rout
                var NewsDate = timeSince(data.News[i].publish)
                let Topic = `<h1>${data.News[i].heading}</h1>`
                let Img = `<a href="/${data.link}/${newsRout}"><img src="../uploads/${data.News[i].image}" alt="${data.News[i].image}" title="Read More!"></a>`;
                let Dp = `<h5>Published ${NewsDate}</h5>`;
                let Author = `<h4>Author, By: ${data.News[i].source}</h4>`;

                Heading += `<div>
                ${Topic}
                ${Img}
                ${Dp}
                ${Author}
                </div>`;
                document.querySelector(".category").innerHTML = Heading;
                document.querySelector(".category_name").innerHTML = `${data.News[i].category}`;
            }
        }
    }),
)