(function(){
			var width = '180';
			var height = '18';
			var uMatch = navigator.userAgent.match(/Firefox\/(.*)$/);
			var ffVersion;
			var ffSize = 4.3 ;
			if (uMatch && uMatch.length > 1) {
					ffVersion = uMatch[1];
				}
			
			$.fn.niceFileInput = function(options){
				var settings = $.extend( {
				  'width'         : '100', //width of button
				  'height'		  : '20',  //height of text
				  'btnText'       : '파일 찾기', //text of the button     
				  'btnWidth'	  : '100' ,  // width of button
				  'margin'        : '20',	// gap between textbox and button 	
				  'cursor'        : 'pointer'
				}, options);
				     			 			
			for(var i= 150 ; i <= settings.width ; i += 5)
			{
				 ffSize = ffSize + 0.715; 				 
			}
			
			this.css({
						'height':height, 
						'width' :'100' ,
						'zIndex': '99',
						'opacity': '0', 
						'position':'fixed', 
						'right':'30px', 
						'top':'64px',
						'font-size' : '16px',
						'cursor' : 'pointer'
					})
					.wrap('<div class="fileWrapper" />')
					.parent()
					.css({
						   width : settings.width
				     })
					.append("<input type='text' class='fileInputText' readonly='readonly' />")
					.append("<input type='button' class='fileInputButton' value='"+settings.btnText+"' style='height:"+settings.height+"px ; width:"+settings.btnWidth+"px' />")
				 			
					if(ffVersion < 22)
						{
							this.attr('size',ffSize);							
						}														
					this.parent().find('input[type="text"].fileInputText').css({
						'height' : height + "px" ,
						'width'  : width + "px"				
					});
				
				this.change(function(){
						var textPath = $(this).val().replace("C:\\fakepath\\", "");
						$(this).closest('.fileWrapper').find(".fileInputText").val(textPath);
					}			
				)};
				
				return this;					
		})();
	
