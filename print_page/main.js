//upload 기능
const upload = document.querySelector('.upload');
const pic = document.querySelector('.pic');

const reader = new FileReader();

const previewFile = () => {
    const file = document.querySelector('input[type=file]').files[0];
    
    if (file) {
        reader.readAsDataURL(file);
    }
    reader.addEventListener("load", function () {
        //pic.src = reader.result;
        //box-shadow 문제로 img 를 div 로 바꿈
        pic.setAttribute('style', 
            `background:url(${reader.result}) no-repeat;
                background-size:1200px 1800px;
                box-shadow:1px`);
        upload.style.display = 'none';
    }, false);

}
//print 기능
const print = document.querySelector('.print');
const back = document.querySelector('.back');

print.addEventListener('click', () => {
    upload.style.display = 'none';
    print.style.display = 'none';
    back.style.display = 'inline-block';

    pic.style.boxShadow = "-100px -100px 0px 50px gray inset, " + 
        "100px 100px 0px 50px gray inset";
});

back.addEventListener('click', () => {
    upload.style.display = 'inline-block';
    print.style.display = 'inline-block';
    back.style.display = 'none';

    pic.style.boxShadow = "0px 0px 0px 0px";
})