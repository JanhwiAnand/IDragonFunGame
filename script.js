//calculating score
score=0;//global variable taken
//i want that score should increase at the time when the dragon cross rino
cross=true;
//including the
audio=new Audio('music/8-bit-background-music-for-arcade-game-come-on-mario-164702.mp3') ;
audiogo=new Audio('music/negative_beeps-6008.mp3');
setTimeout(() => {
    audio.play();
}, 1000);
let gamecont=document.querySelector('.gameContainer');
window.addEventListener('keydown',(ev)=>{ 
    if(ev.key=="b"){
        dragon=document.querySelector('.dragon');

        // console.log("clicked");
        dragon.classList.add('animateDragon');
         setTimeout(() => {
                    dragon.classList.remove('animateDragon');
                }, 700);
                // this is done so that the animation does not last for ever, the dragon must come to its original state and when again the click event takes place then again animation happens 
            }
    if(ev.key=="n"){
        dragon=document.querySelector('.dragon');
        dragonx=parseInt(window.getComputedStyle(dragon,null).getPropertyValue('left'));//taking computed left value for the dragon
        dragon.style.left=dragonx+112+"px";//left value of dragon got increased by some more value so that it can move some way in forwad direction
    }
    //to move the dragon in the backward direction we will subtract some value form the left
    if(ev.key=="v"){
        dragon=document.querySelector('.dragon');
        dragonx=parseInt(window.getComputedStyle(dragon,null).getPropertyValue('left'));//taking computed left value for the dragon
        dragon.style.left=dragonx-112+"px";//left value of dragon got increased by some more value so that it can move some way in forwad direction
    }

})
    //to check the collision between dragon and the rino
    setInterval(() => {
        dragon=document.querySelector('.dragon');
        gameOver=document.querySelector('.gameOver');
        rino=document.querySelector('.rino');
        games=document.querySelector('.games');
        
        //to detect collision we can get that at certain time what is the left and top (or bottom)positions of the dragon and rino
        dx=parseInt(window.getComputedStyle(dragon,null).getPropertyValue('left'));//the value given through animation will be displayed and also the window.get....takes the style where to check 2nd parameter can be null
        dy=parseInt(window.getComputedStyle(dragon,null).getPropertyValue('top'));//gives value in px so converted into int form
           
        rx=parseInt(window.getComputedStyle(rino,null).getPropertyValue('left'));
        ry=parseInt(window.getComputedStyle(rino,null).getPropertyValue('top'));
        //then calculate the absolute difference between the positions
        offsetx=Math.abs(dx-rx);
        offsety=Math.abs(dy-ry);
        //there positions must be away from each other (if the collide)
        if(offsetx<113 && offsety<80)//random numbers taken(when the objects come close then they will collide so dragon wants to be away from the rino)
        {
            rino.classList.remove('rinoAni');//after the game is over the obstacle should stop moving
            gameOver.style.visibility="visible";
            games.style.visibility='hidden'; 
            audiogo.play();  
            setTimeout(() => {
                
                audio.pause();
            }, 500);       
        }
        //if they don't collide
        else if(offsetx<145 && cross){
            score+=1;
            updatescore(score);
            cross=false;
            //set cross value as false
            //then call set time out and update cross value as true again after 1sec
            setTimeout(() => {
                cross=true;
            }, 1000);

            setTimeout(() => {
                //to increase the speed of the obstacle , exact value of the animation duration should be known

                // animation duration is changed so a sudden jerk is seen in the dragon when it jumps so to avoid that add set tim out
            anidur=parseFloat(window.getComputedStyle(rino,null).getPropertyValue('animation-duration'));   
            newdur=anidur-0.1;
            rino.style.animationDuration=newdur+'s';  
            }, 500);   
        }
    }, 10);

    function updatescore(score){
        let scorecnt=document.querySelector('#scorecount');
        scorecnt.innerHTML="Your Score:"+score;
    }
