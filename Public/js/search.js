$('document').ready(
    $.ajax({
        method: "POST",
        success: (data) => {
            
         let Article = ''
         if(data.SCH){
            for (let i = 0; i < data.SCH.length; i++) {
                
                let Img = `<img src="../uploads/${data.SCH[i].image}" alt="${data.SCH[i].image}">`;
                let link = data.SCH[i].heading.split("—").join('')
                    link = link.replace(/[^a-zA-Z^0-9 ]/g, "")
                    link = link.split(" ").join('-')
                let Title = `<a href="${data.SCH[i].category}/${link}"><h4>${data.SCH[i].heading}</h4></a>`
                //  let Dp = `<h5>Published on: ${data.Tsp}</h5>`;
                //  let Author = `<h4>Author, By: ${data.Sr}</h4>`;
                //  let content = `${data.Art}`; 
                    
                Article = `<div>
                        ${Img}
                        ${Title}
                        </div>`;
                document.querySelector(".search_result").innerHTML += Article
                document.querySelector(".word").innerHTML = data.WD
                // document.querySelector(".page-title").innerHTML = data.HD;
            }
         }else{
             document.querySelector(".word").innerHTML = data.WD
             document.querySelector(".search_result").innerHTML = '<div><h4 style="text-align:center;">No Result For Such Input</h4></div>'
         }
        }
    })
)