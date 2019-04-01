window.onload = function () {
	
	blanc = document.getElementsByName("9");

	// si "not_finished" est vrai, alors
	// il reste des images à permuter
	let not_finished = true;

	//Compteur de coups
	let compteur = 0;
	function nb_permutations(array){
		let out = array;
		let i = 2;
		let n = 0;
		while(i<array.length-1){
			let j = 0
			while(j<i-1){
				if(out[j+1]<out[j]){
					let temp = out[j];
					out[j] = out[j+1];
					out[j+1] = temp;
					n++;
				}
				j++
			}
			i++;
		}
		return n;

	}

	function isSolvable(array){
		indice_blanc = array.indexOf(blanc);
		distance = 9-indice_blanc;
		return nb_permutations(array)%2 == distance%2;
	}


	// traîte le clic sur une image
	function click_on() {
		blanc = document.getElementsByName("9")[0];
	
		array = Array.from(document.getElementsByTagName("img"));
		
		
		indice_blanc = array.indexOf(blanc);
		indice_this = array.indexOf(this);
		
		
		
		
		if(isMovable(indice_blanc,indice_this)){
			
			swap(this,blanc);
			is_finished();
		}
	}


	function isMovable(indice_blanc,indice_this){
		if (indice_blanc%3==1){
			return (indice_blanc == indice_this+3 || indice_blanc == indice_this-3 || indice_blanc==indice_this-1);
		}
		else if (indice_blanc%3==0){
			return (indice_blanc == indice_this+3 || indice_blanc == indice_this-3 || indice_blanc==indice_this+1);
		}
		else{
			return (indice_blanc == indice_this+3 || indice_blanc == indice_this-3 || indice_blanc==indice_this+1 || indice_blanc==indice_this-1);
		}
	}


	function isSort(array) {
		for (let i = 0; i < array.length - 1; i++) {
			if (array[i] > array[i + 1]) { return false; }
		}
		return true;
	}

	// teste si le puzzle est terminé
	function is_finished(){
		let out = [];
        let array = document.getElementsByTagName("img");
        
		for (let i = 1; i < array.length; i++) {
			out.push(array[i].name);
		}
		console.log(isSolvable(out));

		if (isSort(out)) {
			let result = document.getElementById("result");
			result.innerHTML = "Bravo vous avez fini en " + compteur + "coups GG.";
			result.style.visibility = "visible";

		}

	}

	function swap(img1, img2) {
		let temp_src = img1.src;
		let temp_name = img1.name;
		img1.src = img2.src;
		img1.name = img2.name;
		img2.src = temp_src;
		img2.name = temp_name;
		compteur +=1;
	}

	let array = document.getElementsByTagName("img");
	for (let i = 1; i < array.length; i++) {
		array[i].onclick = click_on;
	}
};
