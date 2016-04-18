function init()
{
	$('div.rateit').rateit(); 
	$('.rating .value_rating').text($(".rateit").rateit('value'));
	$('.rating .value_rating_max').text($(".rateit").data('rateit-max'));	
}

$(function() {
    init(); 	
	$(".rateit").bind('rated', function (event, value,max) { 
		$('.value_rating').text(value);
		$('.value_rating_max').text(max);
	});
    $(".rateit").bind('over', function (event, value) { 
		//$(this).attr('title', "Ваша оценка: "+value);  
		if(value != null)
		{	
			$(this).parent().addClass('rating_help');
			$(this).parent().attr('data-title', "Ваша оценка: "+value);
		}
		else
		{
			$(this).parent().removeClass('rating_help');
		}
		
	});
	$('.rateit').bind('rated reset', function (e) {
		var ri = $(this);
 
         //if the use pressed reset, it will get value: 0 (to be compatible with the HTML range control), we could check if e.type == 'reset', and then set the value to  null .
         var value = ri.rateit('value');
         var productID = ri.data('productid'); // if the product id was in some hidden field: ri.closest('li').find('input[name="productid"]').val()
 
         //maybe we want to disable voting?
         ri.rateit('readonly', true);
 
         $.ajax({
             url: 'rateit.json', //your server side script
             data: { id: productID, value: value }, //our data
             type: 'POST',
             success: function (data) {
                 //$('#response').append('<li>' + data + '</li>');
				 // додумать вывод ответа от сервака!!!!!
				 $(".rating").addClass('rating_help');
				 $(".rating").attr('data-title', data.msg);
				 $(".rating").removeClass('rating_help').delay(5000).fadeOut(300);
             },
             error: function (jxhr, msg, err) {
                 //$('#response').append('<li style="color:red">' + msg + '</li>');
             }
         });
     });
});