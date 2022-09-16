// declaration of variables
const column1 = document.getElementById("col-1");
const column2 = document.getElementById("col-2");
const column3 = document.getElementById("col-3");
const errorGrid = document.getElementById("errorGrid");
const modalBody = document.getElementById("modalBody");
const imageViewLink = document.getElementById("imageViewLink");
const prevBtns = document.querySelector('.prevBtn');
const nxtBtns = document.querySelector('.nextBtn');
const downloadBtn = document.getElementById('download-btn');

var currentImage = 0;
var orderByValue = '';

// APIs.
API_KEY = "4uncxvIJOc2PFG7fcubO_UuokiHWwlYGbK3aCBrJT0Q";
apiUrl = "https://api.unsplash.com/photos/?client_id="+API_KEY+"&per_page=300";

imageURLS = [];
imageHTML = [];

window.onload = (event) => {
    fetchData();

}

const fetchData = async () => {
    var tempUrl = apiUrl;

    if(orderByValue != '') {
        tempUrl += ('&order_by='+orderByValue);
    }

    const response = await (fetch(apiUrl).catch(handleError));
    const myJson = await response.json();

    var imageArrays = myJson;

    imageArrays.forEach(element => {
        imageURLS.push(element.urls.small);
        imageHTML.push(element.links.html);
    });

    displayImage();
    // img_find();

}

var handleError = function(err) {
    console.warn(err);
    errorGrid.innerHTML = "<h4>Unable to fetch data "+err+"</h5>";
}

function displayImage() {
    errorGrid.innerHTML = "";
    if(imageURLS.length == 0) {
        errorGrid.innerHTML = "<h4>Unable to fetch data.</h5>";
        return;
    }

    column1.innerHTML = "";
    column2.innerHTML = "";
    column3.innerHTML = "";

    imageURLS.forEach((url,index) => {
        // dynamic image tag 

        var image = document.createElement('img');
        image.src = url;
        image.className="pt-4";
        image.setAttribute("width", "100%");
        image.setAttribute("onclick","displayFullImage(this.src)");

        image.addEventListener('click', ()=>{
            currentImage = index;
            //alert(currentImage);
            //alert(url);
        })

        if( (index + 1) % 3 == 0 ) {
            //alert(index);
            column1.appendChild(image);
        }
        if( (index + 2) % 3 == 0 ) {
            //alert(index);
            column2.appendChild(image);
        }
        if( (index + 3) % 3 == 0 ) {
            //alert(index);
            column3.appendChild(image);
        }
        
    });

}

//alert(imageURLS);
prevBtns.addEventListener('click', ()=>{
    if(currentImage > 0){
        currentImage--;
        displayFullImage(imageURLS[currentImage]);
    }
})
nxtBtns.addEventListener('click', ()=>{
    if(currentImage < imageURLS.length-1){
        currentImage++;
        displayFullImage(imageURLS[currentImage]);
    }
})

// downloadBtn.addEventListener('click', ()=>{

// })


// function img_find() {
//     var imgs = document.getElementsByTagName("img");
//     var imgSrcs = [];

//     for (var i = 0; i < imgs.length; i++) {
//         imgSrcs.push(imgs[i].src);
//     }

//     console.log(imgSrcs);
// }


function displayFullImage(src) {

    // dynamic image tag 
    var image = document.createElement('img');
    image.src = src;
    image.className="mt-3";
    image.setAttribute("width", "100%");


    modalBody.innerHTML = "";
    modalBody.appendChild(image);

    imageViewLink.href=imageHTML[currentImage];
    downloadBtn.href=src;

    var myModal = new bootstrap.Modal(document.getElementById('modal'), {});
    myModal.show();


}

