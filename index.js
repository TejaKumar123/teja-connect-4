
var select=[6,6,6,6,6,6,6]
var player1="red";
var player2="green";
var current=player1;
var result=[];

var rows=7;
var cols=7;
var parent=document.getElementById("container");
for(let i=0;i<7;i++){
	let ex=[]; 
	for(let j=0;j<7;j++){
		ex.push(i+""+j);
		let div=document.createElement("div");
		div.setAttribute("id",i+""+j);
		div.setAttribute("onclick","color_change(event)");
		div.setAttribute("onmousemove","mousem(event)");
		parent.appendChild(div);
	}
	result.push(ex);
}


function color_change(event){
	let id=event.target.id;
	let row=id[0];
	let col=id[1];
	if(select[col]<=-1){return}
	document.getElementById(select[col]+""+col).style.backgroundColor=current;
	result[select[col]][col]=current;
	select[col]-=1;
	current=current==player1?player2:player1;
	document.getElementById("current").children[0].innerHTML=current=="red"?"Player1":"Player2";
	document.getElementById("current").children[0].style.color=current;
	let flag=check();
	if(flag){
		document.getElementById("win").innerHTML=(current=="red"?"Player2":"Player1")+" win the game";
		document.getElementById("win").style.color=current=="red"?"green":"red";
		document.getElementById("container").style.pointerEvents="none";
		flag.forEach((ids)=>{
			document.getElementById(ids).style.animation="scal 1s ease-in-out 0s infinite alternate";
		})
		return;
	}
	if(select[0]==0 && select[1]==0 && select[2]==0 && select[3]==0 && select[4]==0 && select[5]==0 && select[6]==0){
		document.getElementById("win").innerHTML="The game is draw. Please try again.";
		document.getElementById("win").style.color="black";
	}
	//alert(result)
}

function check(){
	let i=0;
	let j=0;
	for(i=0;i<rows;i++){
		for(j=0;j<cols-3;j++){
			if(result[i][j]==result[i][j+1] && result[i][j+1]==result[i][j+2] && result[i][j+2]==result[i][j+3])
				{return [i+""+j,i+""+(j+1),i+""+(j+2),i+""+(j+3)];}
		}
	}
	
	for(i=0;i<cols;i++){
		for(j=0;j<rows-3;j++){
			if(result[j][i]==result[j+1][i] && result[j+1][i]==result[j+2][i] && result[j+2][i]==result[j+3][i])
				{return [j+""+i,(j+1)+""+i,(j+2)+""+i,(j+3)+""+i];}
		}
	}
	
	for(i=0;i<rows-3;i++){
		for(j=0;j<cols-3;j++){
			if(result[i][j]==result[i+1][j+1] && result[i+1][j+1]==result[i+2][j+2] && result[i+2][j+2]==result[i+3][j+3])
				{return [i+""+j,(i+1)+""+(j+1),(i+2)+""+(j+2),(i+3)+""+(j+3)];}
		}
	}
	
	for(i=0;i<rows-3;i++){
		for(j=3;j<cols;j++){
			if(result[i][j]==result[i+1][j-1] && result[i+1][j-1]==result[i+2][j-2] && result[i+2][j-2]==result[i+3][j-3])
				{return [i+""+j,(i+1)+""+(j-1),(i+2)+""+(j-2),(i+3)+""+(j-3)];}
		}
	}
	
	return 0;
}


window.addEventListener("keydown",(event)=>{
	if(event.key=="r"){
		location.reload();
	}
})

document.getElementById("container").addEventListener("mousemove",mousem);
document.getElementById("container").addEventListener("mouseout",mouseo);

function mousem(event){
	let ele=document.getElementById("container");
	let left=ele.offsetLeft;
	let xd=event.pageX;
	let x=xd-left-30;
	ele.style.setProperty("--left",x+"px");
}

function mouseo(event){
	let ele=document.getElementById("container");
	ele.style.setProperty("--left","-70px");
}





