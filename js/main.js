/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */

(function ($) {

	"use strict";

	const splash = document.querySelector(".splash");
	const body = document.querySelector("body");

	const db = firebase.firestore();

	const languagesContainer = document.getElementById("languages-container");
	const frameworksContainer = document.getElementById("frameworks-container");
	const databasesContainer = document.getElementById("databases-container");
	const othersContainer = document.getElementById("others-container");
	const workExperiencesContainer = document.getElementById("work-experiences");
	const studiesContainer = document.getElementById("studies");

	const getLanguages = () => db.collection("languages").orderBy("order", "asc").get();
	const getFrameworks = () => db.collection("frameworks").orderBy("order", "asc").get();
	const getDatabase = () => db.collection("databases").orderBy("order", "asc").get();
	const getOthers = () => db.collection("others").orderBy("order", "asc").get();
	const getWorkExperiences = () => db.collection("work_experiences").orderBy("order", "asc").get();
	const getStudies = () => db.collection("studies").orderBy("order", "asc").get();

	const getAge = function (birthday) {
		const date1 = new Date(birthday);
		const date2 = new Date();
		const diffTime = Math.abs(date2 - date1);
		const diffYear = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));

		return diffYear;
	}

	const populateListSkills = (data, element) =>
		data.forEach(data => element.innerHTML +=
			`<li>
				<div class="progress percent${data.data().percentage}"><span>${data.data().percentage}%</span></div>
				<strong>${data.data().description}</strong>
			</li>`
		);

	const populateWorkExperiences = (data, element) =>
		data.forEach(data => element.innerHTML +=
			`<div class="timeline-block">
					<div class="timeline-ico">
					<i class="fa fa-briefcase"></i>
					</div>

					<div class="timeline-header">
					<h3>${data.data().job_position}</h3>
					<p>${data.data().date_ini} - ${data.data().date_fin}</p>
					</div>

					<div class="timeline-content">
					<h4>${data.data().title}</h4>
					<p>
						${populateDescription(data.data().description.split("#"))}
					</p>
					</div>
				</div>`);

	const populateStudies = (data, element) =>
		data.forEach(data => element.innerHTML +=
			`<div class="timeline-block">
						<div class="timeline-ico">
						<i class="fa fa-graduation-cap"></i>
						</div>
	
						<div class="timeline-header">
						<h3>${data.data().title2}</h3>
						<p>${data.data().date_ini} - ${data.data().date_fin}</p>
						</div>
	
						<div class="timeline-content">
						<h4>${data.data().title}</h4>
						<p>
							${populateDescription(data.data().description.split("#"))}
						</p>
						</div>
					</div>`);

	function populateDescription(data) {
		var description = "<ul>";

		data.forEach(data => (data.length > 0 ? description += `<li>${data}</li>` : ""));

		description += "</ul>";

		return description;
	}

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).load(async function () {
		setTimeout(() => {
			splash.classList.add("display-none");
			body.classList.remove("none-scroll");
		}, 2500);

		$("#age").text(getAge("10/25/1997"));

		// will first fade out the loading animation 
		/*$("#loader").fadeOut("slow", function () {
			// will fade out the whole DIV that covers the website.
			$("#preloader").delay(300).fadeOut("slow");
		});*/

		//Craete new collection of firebase.
		/*const oldCollRef = db.collection(oldName);
		const oldCollSnap = await oldCollRef.get();
		let arrayPromise = [];
		oldCollSnap.forEach(async doc => {
			arrayPromise.push(new Promise(async (resolve, reject) => {
				resolve(await db.collection(newName).add(doc.data()));
			}));
		});

		Promise.all(arrayPromise);*/

		const languages = await getLanguages();

		populateListSkills(languages, languagesContainer);

		const frameworks = await getFrameworks();

		populateListSkills(frameworks, frameworksContainer);

		const databases = await getDatabase();

		populateListSkills(databases, databasesContainer);

		const others = await getOthers();

		populateListSkills(others, othersContainer);

		const work_experiences = await getWorkExperiences();

		populateWorkExperiences(work_experiences, workExperiencesContainer);

		const studies = await getStudies();

		populateStudies(studies, studiesContainer);
	});



	/*---------------------------------------------------- */
	/* FitText Settings
	------------------------------------------------------ */
	setTimeout(function () {

		$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */
	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
		navigation: false,
		pagination: true,
		itemsCustom: [
			[0, 1],
			[700, 2],
			[960, 3]
		],
		navigationText: false
	});



	/*----------------------------------------------------- */
	/* Alert Boxes
		------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function () {
		$(this).parent().fadeOut(500); f
	});


	/*----------------------------------------------------- */
	/* Stat Counter
		------------------------------------------------------- */
	var statSection = $("#stats"),
		stats = $(".stat-count");

	statSection.waypoint({

		handler: function (direction) {

			if (direction === "down") {

				stats.each(function () {
					var $this = $(this);

					$({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 4000,
						easing: 'swing',
						step: function (curValue) {
							$this.text(Math.ceil(curValue));
						}
					});
				});

			}

			// trigger once only
			this.destroy();

		},

		offset: "90%"

	});


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded(function () {

		containerProjects.masonry({
			itemSelector: '.folio-item',
			resize: true
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
	$('.item-wrap a').magnificPopup({

		type: 'inline',
		fixedContentPos: false,
		removalDelay: 300,
		showCloseBtn: false,
		mainClass: 'mfp-fade'

	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});


	/*-----------------------------------------------------*/
	/* Navigation Menu
------------------------------------------------------ */
	var toggleButton = $('.menu-toggle'),
		nav = $('.main-navigation');

	// toggle button
	toggleButton.on('click', function (e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

	// nav items
	nav.find('li a').on("click", function () {

		// update the toggle button 		
		toggleButton.toggleClass('is-clicked');
		// fadeout the navigation panel
		nav.fadeOut();

	});


	/*---------------------------------------------------- */
	/* Highlight the current section in the navigation bar
	------------------------------------------------------ */
	var sections = $("section"),
		navigation_links = $("#main-nav-wrap li a");

	sections.waypoint({

		handler: function (direction) {

			var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

			navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},

		offset: '25%'
	});


	/*---------------------------------------------------- */
	/* Smooth Scrolling
	------------------------------------------------------ */
	$('.smoothscroll').on('click', function (e) {

		e.preventDefault();

		var target = this.hash,
			$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function () {
			window.location.hash = target;
		});

	});


	/*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input, textarea, select').placeholder()


	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	/*
	$('#contactForm').validate({

		submitHandler: function (form) {

			var sLoader = $('#submit-loader');

			$.ajax({

				type: "POST",
				url: "./inc/sendEmail.php",
				data: $(form).serialize(),
				beforeSend: function () {

					sLoader.fadeIn();

				},
				success: function (msg) {

					// Message was sent
					if (msg == 'OK') {
						sLoader.fadeOut();
						$('#message-warning').hide();
						$('#contactForm').fadeOut();
						$('#message-success').fadeIn();
					}
					// There was an error
					else {
						sLoader.fadeOut();
						$('#message-warning').html(msg);
						$('#message-warning').fadeIn();
					}

				},
				error: function (msg) {
					console.error(msg);
					sLoader.fadeOut();
					$('#message-warning').html("Ha ocurrido un error. Inténtalo de nuevo.");
					$('#message-warning').fadeIn();

				}

			});
		}

	});*/


	/*----------------------------------------------------- */
	/* Back to top
------------------------------------------------------- */
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

	// Show or hide the sticky footer button
	jQuery(window).scroll(function () {

		if (!($("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}

	});

})(jQuery);