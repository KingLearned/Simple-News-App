$('document').ready(
    $.ajax({
        method: "POST",
        success: (data) => {
         let Article = ''
         let Topic = `<h1>${data.HD}</h1>`
         let Img = `<img src="../uploads/${data.Img}" alt="${data.Img}">`;
         let Dp = `<h5>Published on: ${data.Tsp}</h5>`;
         let Author = `<h4>Author, By: ${data.Sr}</h4>`;
         let content = `${data.Art}`;
                
         Article = `<div>
                     ${Topic}
                     ${Img}
                     ${Dp}
                     ${Author}
                     ${content}
                     </div>`;
            document.querySelector(".fullnews").innerHTML = Article
            document.querySelector(".page-title").innerHTML = data.HD;
        }
    })
)