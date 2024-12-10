
let bottom = document.querySelectorAll(".bottom");

bottom.forEach(function(el) {
  el.classList.add("disappear");
  el.classList.add("toggle");
});

let moreText = document.querySelectorAll(".more-text");

moreText.forEach(function(el) {
  el.style.display = "none";
});


let clicker = document.querySelectorAll(".clicker");
let moreLink = document.querySelectorAll(".more-link");

clicker.forEach(function(el) {
  el.onclick = e => {
    let div = e.target.closest("section").querySelector(".bottom");

    bottom.forEach(function(el) {
      if (el !== div) {
        el.classList.add("disappear");
      }
    });

    if (div.classList.contains("disappear")) {
      div.classList.remove("disappear");
    } else {
      div.classList.add("disappear");
    }
  }; 
});

moreLink.forEach(function(el) {
  el.onclick = e => {
    const text = e.target;
    // toggle text
    if (text.textContent === " MORE ") {
      text.previousSibling.previousSibling.style.display = "inline";
      text.textContent = " LESS ";
    } else {
      text.previousSibling.previousSibling.style.display = "none";
      text.textContent = " MORE ";
    }
  }; 
});


//Card Slider

document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const wrapper = document.querySelector(".wrapper");

    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => { 
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
    
        // Calculate the new scroll position
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
    
        // Check if the new scroll position exceeds 
        // the carousel boundaries
        if (newScrollLeft <= 0 || newScrollLeft >= 
            carousel.scrollWidth - carousel.offsetWidth) {
            
            // If so, prevent further dragging
            isDragging = false;
            return;
        }
    
        // Otherwise, update the scroll position of the carousel
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false; 
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
    
        // Return if window is smaller than 800
        if (window.innerWidth < 800) return; 
        
        // Calculate the total width of all cards
        const totalCardWidth = carousel.scrollWidth;
        
        // Calculate the maximum scroll position
        const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
        
        // If the carousel is at the end, stop autoplay
        if (carousel.scrollLeft >= maxScrollLeft) return;
        
        // Autoplay the carousel after every 2500ms
        timeoutId = setTimeout(() => 
            carousel.scrollLeft += firstCardWidth, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper.addEventListener("mouseenter", () => 
        clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Add event listeners for the arrow buttons to 
    // scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? 
                -firstCardWidth : firstCardWidth;
        });
    });
});



// Skin Type Quiz

var prompts = [
{
	prompt: 'My skin lacks moisture and often feels tight or flaky',
	weight: -1,
	class: 'group0'
},
{
	prompt: 'I currently deal with/have dealt with severe acne breakouts',
	weight: -1,
	class: 'group1'
},
{
	prompt: 'I notice that oil builds up in the T-Zone (forehead, nose, and chin) of my face',
	weight: -1,
	class: 'group2'
},
{
	prompt: 'I find myself using way more moisturizing/skincare product than is recommended',
	weight: -1,
	class: 'group3'
},
{
	prompt: 'I have enlarged pores on any area of my face',
	weight: -1,
	class: 'group4'
},
{
	prompt: 'My skin tends to crack easily, especially during the winter months',
	weight: 1,
	class: 'group5'
},
]

var prompt_values = [
{
	value: 'Strongly Agree', 
	class: 'btn-default btn-strongly-agree',
	weight: 5
},
{
	value: 'Agree',
	class: 'btn-default btn-agree',
	weight: 3,
}, 
{
	value: 'Neutral', 
	class: 'btn-default',
	weight: 0
},
{
	value: 'Disagree',
	class: 'btn-default btn-disagree',
	weight: -3
},
{ 
	value: 'Strongly Disagree',
	class: 'btn-default btn-strongly-disagree',
	weight: -5
}
]

// For each prompt, create a list item to be inserted in the list group
function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}

function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();

// Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;

// Get the weight associated to group number
function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}

// When user clicks a value to agree/disagree with the prompt, display to the user what they selected
$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	// console.log(classList);
	var classArr = classList.split(" ");
	// console.log(classArr);
	var this_group = classArr[0];
	// console.log(this_group);

	// If button is already selected, de-select it when clicked and subtract any previously added values to the total
	// Otherwise, de-select any selected buttons in group and select the one just clicked
	// And subtract deselected weighted value and add the newly selected weighted value to the total
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {
		// $('[class='thisgroup).prop('checked', false);
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
		// console.log($('.'+this_group+'.active').text());
		$('.'+this_group).removeClass('active');

		// console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
		// $(this).prop('checked', true);
		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {
	// After clicking submit, add up the totals from answers
	// For each group, find the value that is active
	$('.results').removeClass('hide');
	$('.results').addClass('show');
	
	if(total < 0) {
		document.getElementById('results').innerHTML = '<b>You have an oily skin type!</b><br><br>';
	} else if(total > 0) {
		document.getElementById('results').innerHTML = '<b>You have a dry skin type!</b><br><br>insert info here';
	} else {
		document.getElementById('results').innerHTML = '<b>You have combination skin!</b><br> insert info here'
	}

	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})