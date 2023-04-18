$(function(){
    var lastRandom = -1;
    var chooseCount = 0;
    $("input").on("click",function(){
        //alert("Hi");
        let foodPics = ["https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1-1525230190.jpg", "https://fairylolita.com/wp-content/uploads/2020/10/DSCF8136.jpg", "https://shoplineimg.com/5f572aeae1ce2b001ced4e41/5fa4fdb932e439001d9c9275/800x.jpg?"]
        
        // 產生隨機
        do{
            var numberOfListItem = $("li").length;
            var randomChildNumber = Math.floor(Math.random() * numberOfListItem);
        }
        while(randomChildNumber == lastRandom);
        lastRandom = randomChildNumber;
        chooseCount++;
        
        $("h1").text($("li").eq(randomChildNumber).text());
        $("img").attr("src", foodPics[randomChildNumber]);

        if (chooseCount >= 10){
            $("h1").text("再挑就沒東西吃了!!!");
            $("img").attr("src", "https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1635588397060.jpg")
        }
    });
});