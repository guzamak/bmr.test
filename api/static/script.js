var animation = bodymovin.loadAnimation({
	container:document.getElementById('test1'),
	path: '../static/fai.json',//นับจาก html
	renderer: 'svg',
	loop: false,
	autoplay: false,
});
var animation2 = bodymovin.loadAnimation({
	container:document.getElementById('test2'),
	path: '../static/hujon.json',//นับจาก html
	renderer: 'svg',
	loop: false,
	autoplay: false,
});
var animation3 = bodymovin.loadAnimation({
	container:document.getElementById('test3'),
	path: '../static/salad.json',//นับจาก html
	renderer: 'svg',
	loop: false,
	autoplay: false,
});

var test5 = {};

$( document ).ready(function() {
	
	$('#bmrform').on('submit', function(event) {

        $('#output1').animate({ opacity: 1 }, 500);

        $.ajax({
			data : {
				sex : $('#sex').val(),
				weight : $('#weight').val(),
                height : $('#height').val(),
                age : $('#age').val(),
			},
			type : 'POST',
			url : '/bmrcal'
        }) //.done ห้ามมีต่อ ;
        .done(function(data){
            $('#output1').text(data.bmr);
			test5.weight = $('#weight').val();
			test5.bmr = data.bmr;
			animation.playSegments([1, 30], true);
			
        });

		event.preventDefault();
	});	

	$('.tdeechoice').on('change',function() {
		$('.tdeechoice').not(this).prop('checked',false);
	});

	$('#tdeeform').on('submit', function(event) {

		$('#output2').animate({ opacity: 1 }, 500);
		$('.tdeechoice:checked').each(function(){
			bmr = test5.bmr;
			x = $(this).val();
			$.ajax({
				data : {'tdeeans':x,
						'bmr':bmr},// ajax ใข้คู่กับ data
				type : 'POST',
				url : '/tdeecal'
			})
			.done(function(data){
				test5.tdee = data.tdee;
				$('#output2').text(data.tdee);
				animation2.playSegments([1, 30], true);
			});
		});
		
		event.preventDefault();
	});

	$('#calform').on('submit', function(event) {

		$('#output3').animate({ opacity: 1 }, 500);
		tdee = test5.tdee;
		weight = test5.weight;

		$.ajax({
			data: {
				'tdee':tdee,
				'weight':weight,
				newweight : $('#newweight').val(),
				day : $('#day').val(),
			},
			type : 'POST',
			url : '/calcal'
		})
		.done(function(data){
			$('#output3').text(data.calperday);
			animation3.playSegments([1, 30], true);
		});
		
		event.preventDefault();

	});
	
	$('.tdeecheck').on('click',function() {
		$('.tdeecheck').not(this).css({"border-color":"black",
										"color":"black"});
		$(this).css({"border-color":"rgb(112,128,144)",
					"color":"rgb(112,128,144)"});
	});

});