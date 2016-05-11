function init()
{
	$('.clip').dotdotdot();
}

$(function() {
    init(); 	
	 
	$('.plus').on('click',function(event){
		var newsBody = $(this).parents('.news').find('.news-body');
		var plus = $(this);
		if(newsBody.css('display') == 'none')
		{	
			newsBody.slideDown('slow',function(){
				$(this).parent().removeClass('news-panel');
				plus.removeClass('plus');
				plus.addClass('minus');
			});	
			
		}
		else
		{
			newsBody.slideUp('slow',function(){
				$(this).parent().addClass('news-panel');
				plus.addClass('plus');
				plus.removeClass('minus');
			});	
		}
				
	});
	
	$('.registr').on('click',function(event){
		var form = $('.form_registr');
		console.log(form);
		if(form.css('display') == 'none')
		{	
			form.slideDown('slow');
		}
		else
		{
			form.slideUp('slow');
		}
				
	});
	
	$('#auth').submit(function(event){
		$(this).hide();
		$("#user_auth").show();
		event.preventDefault();
	});
	
	$('#user_auth').submit(function(event){
		$(this).hide();
		$("#auth").show();
		event.preventDefault();
	});
	
	 /*$(".dropdown").hover(            
			 function() {
		          $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideDown("fast");
		          $(this).toggleClass('open');        
		     },
		     function() {
		          $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideUp("fast");
		          $(this).toggleClass('open');       
		     }
	);*/
	
});