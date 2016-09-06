//all the menu items
var $items 		= $('#cc_menu .cc_item');
//number of menu items
var cnt_items	= $items.length;
//if menu is expanded then folded is true
var folded		= false;
//timeout to trigger the mouseenter event on the menu items
var menu_time;

$items.unbind('mouseenter')
	  .bind('mouseenter',m_enter)
	  .unbind('mouseleave')
	  .bind('mouseleave',m_leave)
	  .find('.cc_submenu > ul > li')
	  .bind('click',function(){
	var $li_e = $(this);
		  //if the menu is already folded,
		  //just replace the content
	if(folded){
		hideContent();
		showContent($li_e.attr('class'));
	}
		  else //fold and show the content
		fold($li_e);
});
function m_enter(){
	var $this 	= $(this);
	clearTimeout(menu_time);
	menu_time 	= setTimeout(function(){
	//img
	$this.find('img').stop().animate({'top':'0px'},400);
	//cc_submenu ul
	$this.find('.cc_submenu > ul').stop().animate({'height':'200px'},400);
	},200);
}
function m_leave(){
	var $this = $(this);
	clearTimeout(menu_time);
	//img
	$this.find('img').stop().animate({'top':'-600px'},400);
	//cc_submenu ul
	$this.find('.cc_submenu > ul').stop().animate({'height':'0px'},400);
}

$('#cc_back').bind('click',unfold);

function fold($li_e){
	var $item		= $li_e.closest('.cc_item');

	var d = 100;
	var step = 0;
	$items.unbind('mouseenter mouseleave');
	$items.not($item).each(function(){
		var $item = $(this);
		$item.stop().animate({
			'marginLeft':'-140px'
		},d += 200,function(){
			++step;
			if(step == cnt_items-1){
				folded = true;
				showContent($li_e.attr('class'));
			}
		});
	});
}
function unfold(){
	$('#cc_content').stop().animate({'left':'-700px'},600,function(){
		var d = 100;
		var step = 0;
	$items.each(function(){
			var $item = $(this);

			$item.find('img')
				 .stop()
				 .animate({'top':'-600px'},200)
				 .andSelf()
				 .find('.cc_submenu > ul')
				 .stop()
				 .animate({'height':'0px'},200);

			$item.stop().animate({
			'marginLeft':'0px'
			},d += 200,function(){
				++step;
				if(step == cnt_items-1){
					folded = false;
					$items.unbind('mouseenter')
						  .bind('mouseenter',m_enter)
						  .unbind('mouseleave')
						  .bind('mouseleave',m_leave);

					hideContent();
				}
			});
		});
	});
}
function showContent(idx){
	$('#cc_content').stop().animate({'left':'140px'},200,function(){
		$(this).find('.'+idx).fadeIn();
	});
}
function hideContent(){
	$('#cc_content').find('div').hide();
}
