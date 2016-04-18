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
});