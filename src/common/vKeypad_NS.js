let $=require('jquery');
var errc = {};

const keyboardData = require("./Keyboard.json");
const NumberPadData = require("./NumberPad.json");
function vKeypad_NS_Core(keypadName,inputObject,maxLength)
{
	var base = this;
	var keypadName;
	var inputObject;
	var maxLength;
	var jsonFixed;
	var jsonLayouts;
	var keylayoutFixed = keyboardData.keylayoutFixed;
	var jsonInfo;
	var currentLayout = 3;
	var keypads = new Array(3);
	var imageDir;
	var isShift = false;
	var isKr = true;
	var isMobile = false;
	var effImg = window.document.createElement('IMG');
	var layoutList = new Array(7);
	var numFixed = NumberPadData.numFixed;
	var numLayouts = NumberPadData.numLayouts;
	var numInfo = NumberPadData.numInfo;
	var keyFixed = keyboardData.keyFixed;
	var keyLayouts = keyboardData.keyLayouts;
	var keyInfo = keyboardData.keyInfo;
	
	base.doneCallback = null;
	base.keyFlag = false;
	base.doneFlag = false;
	base.ie8Flag = false;
	
	base.focusHandler = function(event)
	{
		base.Start();
	}
	
	base.blurHandler = function(event)
	{
		if (!event) {
			event = window.event;
		}
		
		if(base.ie8Flag){
			if(base.doneFlag)
			{
				base.doneFlag = false;
				return base.Stop();
			}
			else if(base.keyFlag){
			
				base.keyFlag = false;
				var target = event.target || event.srcElement;
				target.focus();
				return;
			
				
			}else{
			
				return base.Stop();
			
			}
		}
		
		if (window.document.activeElement === inputObject) {
			return;
		}
		
	
		base.Stop();
	}
	
	layoutList = ["0.png","1.png","2.png","3.png","4.png","5.png","6.png"];
	
	var makeChar = function(i, m, t) {
        var code = ((i * 21) + m) * 28 + t + 0xAC00;
        return String.fromCharCode(code);
    }
    var iChrIndex = function(chr) {
        var index = ((chr.charCodeAt(0) - 0xAC00) / 28) / 21;
        return parseInt(index);
    }
    var mChrIndex = function(chr) {
        var index = ((chr.charCodeAt(0)- 0xAC00) / 28) % 21;
        return parseInt(index);
    }
    var tChrIndex = function(chr) {
        var index = (chr.charCodeAt(0) - 0xAC00) % 28;
        return parseInt(index);
    }

    /*
	 * var ----------------------------------------------------------
	 */
    // 초성INDEX
    var indexI = [
          'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 
          'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 
          'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    
    // 중성INDEX
    var indexM = [
          'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 
          'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 
          'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 
          'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ];

    // 종성INDEX
    var indexT = [
          '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 
          'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 
          'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']; 

    // 조합INDEX
    var indexJComb1 = ['ㄳ','ㄵ','ㄶ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅄ'];
    var indexJComb2 = ['ㄱㅅ','ㄴㅈ','ㄴㅎ','ㄹㄱ','ㄹㅁ','ㄹㅂ','ㄹㅅ','ㄹㅌ','ㄹㅍ','ㄹㅎ','ㅂㅅ'];
    var indexMComb1 = ['ㅘ','ㅙ','ㅚ','ㅝ','ㅞ','ㅟ','ㅢ'];
    var indexMComb2 = ['ㅗㅏ','ㅗㅐ','ㅗㅣ','ㅜㅓ','ㅜㅔ','ㅜㅣ','ㅡㅣ'];

    // 호환용 한글 자모 (3130~318F)
    var jaCode = 'ㄱ'.charCodeAt(0);
    var jaCodeLast = 'ㅎ'.charCodeAt(0);
    var moCode = 'ㅏ'.charCodeAt(0);
    var moCodeLast = 'ㅣ'.charCodeAt(0);
	
	
	this.keypadName = keypadName;
	this.inputObject = inputObject;
	this.maxLength = maxLength;
	
	this.inputObject.readOnly="true";
	
	
	
	if(keypadName == "numpad")
	{
		imageDir = "./images/NumberPad_NS/";
	}else if(keypadName == "qwerty")
	{
		imageDir = "./images/Keyboard_NS/";
		
	}
	
	base.u_addEventListener = function(object, event, handler, useCapture) {
		if (object.addEventListener) {
			object.addEventListener(event, handler, useCapture);
		} else if (object.attachEvent) {
			object.attachEvent('on' + event, handler, useCapture);
			base.ie8Flag = true;
		}
	}
	
	base.u_removeEventListener = function(object, event, handler, useCapture) {
		if (object.addEventListener) {
			object.removeEventListener(event, handler, useCapture);
		} else if (object.attachEvent) {
			object.detachEvent('on' + event, handler, useCapture);
		}
	}
	
	if(!Array.indexOf){
		Array.prototype.indexOf = function(obj)
		{ for(var i=0; i<this.length; i++){ if(this[i]==obj){ return i; } } return -1; } }// test

	
	function getElementPoint(element) {
			var elementLeft = element.offsetLeft;
			var elementTop = element.offsetTop;
			var parentElement = element.offsetParent;

			while (parentElement !== null) {
				elementLeft += parentElement.offsetLeft;
				elementTop += parentElement.offsetTop;

				parentElement = parentElement.offsetParent;
			}

			return {
				left: elementLeft,
				top: elementTop
			};
		}
	
	function getAlignedPosition(width) {
			var inputObjectPoint = getElementPoint(inputObject);
			var top = inputObjectPoint.top + inputObject.offsetHeight;
			var left = inputObjectPoint.left;

			var alignX = 0;
			var alignY = 0;

			alignX = 0;
			alignY = 5;

			top += alignY;
			left += alignX;

			var diff = (left + width) - window.document.documentElement.scrollWidth;

			if (left < 0) {
				left = 0;
			}

			return {
				top: top,
				left: left
			};
		}
	
	base.isNullOrUndefined = function(arg) {
		
		return typeof arg === 'undefined' || arg === null;
		
	}

	
	base.contains = function(x, y, width, height, tx, ty) {
		
		if (x > tx || x + width < tx || y > ty || y + height < ty) {
			return false;
		}

		return true;
	}
	
	
	 function ConvertEtoK(key){
		  
	
		var chr = key;
	     var text = inputObject.value;
	
	    
	     var chrCode = chr.charCodeAt(0);
	     var isJa = jaCode <= chrCode && chrCode <= jaCodeLast;
	     var isMo = moCode <= chrCode && chrCode <= moCodeLast;
	
	     if (text) {
	         var lastChr = text.substring(text.length - 1);
	         var lastChrCode = lastChr.charCodeAt(0);
	         if (jaCode <= lastChrCode && lastChrCode <= moCodeLast) {
	             // 자음,모음
	             if (jaCode <= lastChrCode && lastChrCode <= jaCodeLast) {
	                 if (isMo) {
	                     var i = indexI.indexOf(lastChr);
	                     var m = indexM.indexOf(chr);
	                     var t = 0;
	                     var c = makeChar(i, m, t);
	                     inputObject.value = (text.substring(0, text.length-1) + c);
	                     return;
	                 }
	             } else if (moCode <= lastChrCode && lastChrCode <= moCodeLast) {
	             }
	         } else if (lastChrCode >= 0xAC00 && lastChrCode <= 0xAC00 + 0x2BA4) {
	             // 한글
	             var i = iChrIndex(lastChr);
	             var m = mChrIndex(lastChr);
	             var t = tChrIndex(lastChr);
	             if (t == 0) {
	                 // 종성이 없는경우
	                 if (isJa) {
							if((chr == 'ㅃ') || (chr == 'ㄲ') || (chr == 'ㄸ'))// 버그
																			// TEST
							{
								inputObject.value+=chr;
								return;
							}
	                     t = indexT.indexOf(chr);
	                     var c = makeChar(i, m, t);
	                     inputObject.value = (text.substring(0, text.length-1) + c);
	                     return;
	                 } else if (isMo) {
	                     // 모음조합문자
	                     var chkChr = indexM[m] + chr;
	                     var combIndex = indexMComb2.indexOf(chkChr);
	                     if (combIndex!=-1) {
	                         var combChr = indexMComb1[combIndex];
	                         m = indexM.indexOf(combChr);
	                         var c = makeChar(i, m, t);
	                        inputObject.value = (text.substring(0, text.length-1) + c);
	                         return;
	                     }
	                 }
	             } else {
	                 // 종성이 있는경우
	                 if (isMo) {
	                     var tChr = indexT[t];
	
	                     // 조합문자일경우 다시 쪼갠다
	                     var combIndex = indexJComb1.indexOf(tChr);
	                     if (combIndex!=-1 && combIndex!=undefined) {
	                         var partChr = indexJComb2[combIndex];
	                         
	                         partChr = partChr.split("");// ie8 bug patch
	                       
	                         t = indexT.indexOf(partChr[0]);
	                         tChr = partChr[1];
	                     } else {
	                         t = 0;
	                     }
	
	                     var c1 = makeChar(i, m, t);
	                     i = indexI.indexOf(tChr);
	                     if (i!=-1 && i!=undefined) {
	                         m = indexM.indexOf(chr);
	                         var c2 = makeChar(i, m, 0);
	                         inputObject.value = (text.substring(0, text.length-1) + c1 + c2);
	                         return;
	                     }
	                 } else if (isJa) {
	                     // 자음조합문자
	                     var chkChr = indexT[t] + chr;
	                     var combIndex = indexJComb2.indexOf(chkChr);
	                     if (combIndex!=-1) {
	                         var combChr = indexJComb1[combIndex];
	                         t = indexT.indexOf(combChr);
	                         var c = makeChar(i, m, t);
	                         inputObject.value = (text.substring(0, text.length-1) + c);
	                         return;
	                     }
	                 }
	             }
	         } else {
	             // 없는 문자
	         }
	     }
	     inputObject.value = (text + chr);
	 }
	
	function keyPress(key)
	{
		if(key == 'BACKSPACE')
		{
			inputObject.value = inputObject.value.substring(0, inputObject.value.length-1);
		}else if(key == 'DONE')
		{
			if(base.ie8Flag){
				base.doneFlag = true;
				base.keyFlag = false;
			}

			if(base.doneCallback != null) base.doneCallback();
		
			inputObject.blur();
			
		}else if(key == 'CLEAR')
		{
			inputObject.value = '';
		}else if(key == "SHIFT" || key == "CHANGE" || key == "CAPS" || key == "KREN")
		{
			
			changeLayout(key);
		}
		else{
			if(inputObject.value.length == maxLength)
			{
				return;
			}
			else{	
				if(isKr){
					ConvertEtoK(key);
				}else{
					inputObject.value += key;
				}
			}

			if(isShift)
			{
				isShift = false;
				changeLayout("SHIFT");
				
			}
			
		}
		
	}
	
	function changeLayout(key)
	{
		
		if(key == "CAPS")
		{
			if(currentLayout == 0)
			{
				keypads[currentLayout].style.display = 'none';
				currentLayout += 6;
				keypads[currentLayout].style.display = 'inline';
				
			}else if(currentLayout == 3){
				
				keypads[currentLayout].style.display = 'none';
				currentLayout += 2;
				keypads[currentLayout].style.display = 'inline';
				
			}else if(currentLayout == 6)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout -= 6;
				keypads[currentLayout].style.display = 'inline';
				
				
			}else if(currentLayout == 5)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout -= 2;
				keypads[currentLayout].style.display = 'inline';
				
			}
			
		}else if(key == "CHANGE")
		{
			
			if(currentLayout == 2)
			{
				keypads[currentLayout].style.display = 'none';
				currentLayout = 0;
				keypads[currentLayout].style.display = 'inline';
				
			}else{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout = 2;
				keypads[currentLayout].style.display = 'inline';
				
			}
			
			
			
		}else if(key == "SHIFT")
		{
			
			if(currentLayout == 0)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout += 1;
				keypads[currentLayout].style.display = 'inline';
				isShift = true;
				
			}else if(currentLayout == 3)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout += 1;
				keypads[currentLayout].style.display = 'inline';
				isShift = true;
				
				
			}else if(currentLayout == 1)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout -= 1;
				keypads[currentLayout].style.display = 'inline';
				isShift = false;
				
			}else if(currentLayout == 4)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout -= 1;
				keypads[currentLayout].style.display = 'inline';
				isShift = false;
				
				
			}
			
			
			
			
			
		}else if(key == "KREN")
		{
			
			if(currentLayout == 0)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout += 3;
				keypads[currentLayout].style.display = 'inline';
				isKr = true;
				
			}else if(currentLayout == 3)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout -= 3;
				keypads[currentLayout].style.display = 'inline';
				isKr = false;
				
				
			}else if(currentLayout == 1)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout += 3;
				keypads[currentLayout].style.display = 'inline';
				isKr = true;
				
				
			}else if(currentLayout == 4)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout -= 3;
				keypads[currentLayout].style.display = 'inline';
				isKr = false;
				
				
			}else if(currentLayout == 6)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout -= 1;
				keypads[currentLayout].style.display = 'inline';
				isKr = true;
				
				
			}else if(currentLayout == 5)
			{
				
				keypads[currentLayout].style.display = 'none';
				currentLayout += 1;
				keypads[currentLayout].style.display = 'inline';
				isKr = false;
				
			}
			
			
			
		}
		
		
	}
	
	function setEffect(el,img,name,x,y,w,h)
	{
			
			var imgName = "keyEff.png";
			if(keypadName == "numpad")
			{
				if(name == "BACKSPACE")
				{
					imgName = "numBackEff.png";
					
				}else if(name == "DONE")
				{
					return 0;
				}
				
				
				
			}else if(keypadName == "qwerty")
			{
				if(name == "BACKSPACE")
				{
					imgName = "qwrBackEff.png";
					
				}else if(name == "CHANGE_LAYOUT[0,1]")// shift
				{
					imgName = "shiftEff.png";
					
				}else if(name == "CHANGE_LAYOUT[0,2]" || name == "CHANGE_LAYOUT[1,2]")// special
				{
					imgName = "specialEff.png";
					
				}else if(name == "CLEAR" || name == " " || name == "CAPS")
				{
					imgName = "buttonEff.png";
					
				}else if(name == "DONE")
				{
					return 0;
				}
				
			}
				
			img.style.left = x+"px";
			img.style.top = y+"px";
			img.style.width = w+"px";
			img.style.height = h+"px";
			img.src = "images/"+imgName;
			img.style.position = "absolute";
			img.style.zIndex = "1";
									
			el.appendChild(img);
	}

	
	function delEffect(el,img)
	{
			if (el.hasChildNodes()){
			    var child = el.childNodes;
			    for(var i=0; i<child.length; i++){
			        if(img === child[i])
			        {
			        	el.removeChild(img);
			        	return 0;
			        }
			    }
			}
			
	}
	
	function setups()
	{
		
		
		if(keypadName == "numpad")
		{
			setup_num(0);
		}else if(keypadName == "qwerty")
		{
			for(var i=0; i<jsonInfo.info.layouts;i+=1){
			
				setup_key(i);
				
			}
			
		}
		
		
	}
	
	function preventDefault(event) {
		
			if (!event) {
				event = window.event;
			}

			if (!event.preventDefault) {
				event.returnValue = false;
			} else {
				event.preventDefault();
			}
		}
	
	function setup_num(index)
	{
		
			var div =  window.document.createElement('DIV');
			var img = window.document.createElement('IMG');
			
			div.style.position = 'absolute';
			div.style.width = jsonInfo.info.background.width+"px";
			div.style.height = jsonInfo.info.background.height+"px";
			div.style.display = 'none';
			
			
			
			// pc 인지 mobile 인지 플랫 폼 확인
			var filter = "win16|win32|win64|mac";
			
			div.onmousedown = function (event) {
				preventDefault(event);
			};
			 
			if(isMobile == true){
				// mobile 일 경우 화면 전체 / 이미지 너비 로 스케일 조정
				var scale = window.innerWidth/parseInt(div.style.width);	

			}else{
				// pc 일 경우 1:1 스케일 조정
				var scale = 1;
			}

		
			img.onmousedown = function (event) {
				
				if(base.ie8Flag)
				{
					base.keyFlag = true;
				}
				
				if (!event) {
					event = window.event;
				}
					
				var x = event.offsetX;
				var y = event.offsetY;
				
				if (base.isNullOrUndefined(x) || base.isNullOrUndefined(y)) {
					var target = event.target || event.srcElement;
					var rect = target.getBoundingClientRect();

					x = event.clientX - rect.left;
					y = event.clientY - rect.top;
				}
				 
				
				
				if (base.isNullOrUndefined(x) || base.isNullOrUndefined(y)) {
					var target = event.target || event.srcElement;
					var rect = target.getBoundingClientRect();

					x = event.clientX - rect.left;
					y = event.clientY - rect.top;
				}
				
				
				
				for (var i = 0; i < jsonLayouts.layouts[currentLayout].keys.length; i += 1) {
					if (base.contains(
							jsonLayouts.layouts[currentLayout].points[i].x*scale,
							jsonLayouts.layouts[currentLayout].points[i].y*scale,
							jsonInfo.info.keypad.width*scale,
							jsonInfo.info.keypad.height*scale,
							x, y)) {
						
						
					
						keyPress(jsonLayouts.layouts[currentLayout].keys[i].character);
						setEffect(div,
								  effImg,
								  jsonLayouts.layouts[currentLayout].keys[i].character,
								  jsonLayouts.layouts[currentLayout].points[i].x*scale,
								  jsonLayouts.layouts[currentLayout].points[i].y*scale,
								  jsonInfo.info.keypad.width*scale,
								  jsonInfo.info.keypad.height*scale);
						break;
					}
				}
				
				for(var i=0; i< jsonFixed.length; i += 1)
				{
					if (base.contains(
							jsonFixed[i].point.x*scale,
							jsonFixed[i].point.y*scale,
							jsonFixed[i].scale.width*scale,
							jsonFixed[i].scale.height*scale,
							x, y)) {
						
						
						keyPress(jsonFixed[i].character);
						setEffect(div,
								  effImg,
								  jsonFixed[i].character,
								  jsonFixed[i].point.x*scale,
								  jsonFixed[i].point.y*scale,
								  jsonFixed[i].scale.width*scale,
								  jsonFixed[i].scale.height*scale);
								  
						break;
					}
					
					
				}
				
				preventDefault(event);
				
			
				
				
			}
			
			
			div.onmouseup = function (event) {
				
				delEffect(div,effImg);
				
			};
			
			effImg.onmouseout = function(event)
			{
				
				delEffect(div,effImg);
			}
			
			
			img.style.height = 'auto';
			img.style.borderStyle = 'none';
			img.src = imageDir+layoutList[index];
			div.appendChild(img);
		
		
			
			var alignedPosition = getAlignedPosition(window.screen.width);
			
			// pc 인지 mobile 인지 플랫 폼 확인 후 위치 조정


			if(isMobile == true){
				img.style.width  = window.innerWidth + "px";
				
				div.style.width = window.innerWidth + 'px';
				div.style.height = parseInt(div.style.height)*scale + 'px';
				
				div.style.bottom = 0;
				div.style.left = 0;

			}else{
				
				div.style.top += alignedPosition.top + 'px';
				div.style.left += alignedPosition.left + 'px';

			}

			
			window.document.body.appendChild(div);
			
			keypads[index] = div;
		
		
	}
	
	function setup_key(index)
	{	
		var div =  window.document.createElement('DIV');
		var img = window.document.createElement('IMG');
			
			div.style.position = 'absolute';
			div.style.width = jsonInfo.info.background.width+"px";
			div.style.height = jsonInfo.info.background.height+"px";
			div.style.display = 'none';
			
			var filter = "win16|win32|win64|mac";

			if(isKr == false){
				currentLayout = 0;
			}

			if(isMobile == true){
				var scale = window.innerWidth/parseInt(div.style.width);
				
			}else{

				var scale = 1;
			}
			
			div.ontouchstart = function (event) {
				preventDefault(event);
			};
			
			img.ontouchstart = function(event){
				var x = event.touches[0].clientX;
				var y = event.touches[0].clientY;
				
				x = Math.round(x);
				y = Math.round(y);
				y = keypads[index].offsetHeight-(window.innerHeight - y);
				
				
				for (var i = 0; i < jsonLayouts.layouts[index].layout.length; i += 1) {
					
					for(var j = 0; j < jsonLayouts.layouts[index].layout[i].keys.length; j+= 1){	
					
							if (base.contains(
								jsonLayouts.layouts[index].layout[i].points[j].x*scale,
								jsonLayouts.layouts[index].layout[i].points[j].y*scale,
								jsonInfo.info.keypad.width*scale,
								jsonInfo.info.keypad.height*scale,
								x, y)) {
							
						
							
							keyPress(jsonLayouts.layouts[index].layout[i].keys[j].character);
							setEffect(keypads[index],
									  effImg,
									  jsonLayouts.layouts[index].layout[i].keys[j].character,
									  jsonLayouts.layouts[index].layout[i].points[j].x*scale,
									  jsonLayouts.layouts[index].layout[i].points[j].y*scale,
									  jsonInfo.info.keypad.width*scale,
									  jsonInfo.info.keypad.height*scale);
									  
									  
							break;
						}
					}
						
						
				}
				
				for(var i=0;i< keylayoutFixed.layoutsFixeds[index].layoutFixed.length;i+=1)
				{
					
					if (base.contains(
							keylayoutFixed.layoutsFixeds[index].layoutFixed[i].point.x*scale,
							keylayoutFixed.layoutsFixeds[index].layoutFixed[i].point.y*scale,
							keylayoutFixed.layoutsFixeds[index].layoutFixed[i].scale.width*scale,
							keylayoutFixed.layoutsFixeds[index].layoutFixed[i].scale.height*scale,
							x, y)) {
						
					
						
						keyPress(keylayoutFixed.layoutsFixeds[index].layoutFixed[i].character);
						setEffect(keypads[index],
								  effImg,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].character,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].point.x*scale,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].point.y*scale,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].scale.width*scale,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].scale.height*scale);
								  
						break;
					}
			
				
				}
				
				for(var i=0; i< jsonFixed.length; i += 1)
				{
					if (base.contains(
							jsonFixed[i].point.x*scale,
							jsonFixed[i].point.y*scale,
							jsonFixed[i].scale.width*scale,
							jsonFixed[i].scale.height*scale,
							x, y)) {
						
					
						
						keyPress(jsonFixed[i].character);
						setEffect(keypads[index],
								  effImg,
								  jsonFixed[i].character,
								  jsonFixed[i].point.x*scale,
								  jsonFixed[i].point.y*scale,
								  jsonFixed[i].scale.width*scale,
								  jsonFixed[i].scale.height*scale);
								  
						break;
					}
					
					
				}
				
				preventDefault(event);
				
			}
			
			div.ontouchend = function (event) {
				delEffect(keypads[index],effImg);
				
			};
			
			div.onmousedown = function (event) {
				preventDefault(event);
			};
			
			img.onmousedown = function (event) {
				
				
				
				if(base.ie8Flag)
				{
					base.keyFlag = true;
				}
				
				if (!event) {
					event = window.event;
				}
					
							
				var x = event.offsetX;
				var y = event.offsetY;
					
				if (base.isNullOrUndefined(x) || base.isNullOrUndefined(y)) {
					var target = event.target || event.srcElement;
					var rect = target.getBoundingClientRect();

					x = event.clientX - rect.left;
					y = event.clientY - rect.top;
				
				}
				 
				
				
				if (base.isNullOrUndefined(x) || base.isNullOrUndefined(y)) {
					var target = event.target || event.srcElement;
					var rect = target.getBoundingClientRect();

					x = event.clientX - rect.left;
					y = event.clientY - rect.top;
				}
				
				
				
				for (var i = 0; i < jsonLayouts.layouts[index].layout.length; i += 1) {
				
					for(var j = 0; j < jsonLayouts.layouts[index].layout[i].keys.length; j+= 1){	
					
							if (base.contains(
								jsonLayouts.layouts[index].layout[i].points[j].x*scale,
								jsonLayouts.layouts[index].layout[i].points[j].y*scale,
								jsonInfo.info.keypad.width*scale,
								jsonInfo.info.keypad.height*scale,
								x, y)) {
							
						
							
							keyPress(jsonLayouts.layouts[index].layout[i].keys[j].character);
							setEffect(keypads[index],
									  effImg,
									  jsonLayouts.layouts[index].layout[i].keys[j].character,
									  jsonLayouts.layouts[index].layout[i].points[j].x*scale,
									  jsonLayouts.layouts[index].layout[i].points[j].y*scale,
									  jsonInfo.info.keypad.width*scale,
									  jsonInfo.info.keypad.height*scale);
									  
									  
							break;
						}
					}
						
						
				}
				
				for(var i=0;i< keylayoutFixed.layoutsFixeds[index].layoutFixed.length;i+=1)
				{
					
					if (base.contains(
							keylayoutFixed.layoutsFixeds[index].layoutFixed[i].point.x*scale,
							keylayoutFixed.layoutsFixeds[index].layoutFixed[i].point.y*scale,
							keylayoutFixed.layoutsFixeds[index].layoutFixed[i].scale.width*scale,
							keylayoutFixed.layoutsFixeds[index].layoutFixed[i].scale.height*scale,
							x, y)) {
						
					
						
						keyPress(keylayoutFixed.layoutsFixeds[index].layoutFixed[i].character);
						setEffect(keypads[index],
								  effImg,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].character,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].point.x*scale,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].point.y*scale,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].scale.width*scale,
								  keylayoutFixed.layoutsFixeds[index].layoutFixed[i].scale.height*scale);
								  
						break;
					}
			
				
				}
				
				for(var i=0; i< jsonFixed.length; i += 1)
				{
					if (base.contains(
							jsonFixed[i].point.x*scale,
							jsonFixed[i].point.y*scale,
							jsonFixed[i].scale.width*scale,
							jsonFixed[i].scale.height*scale,
							x, y)) {
						
					
						
						keyPress(jsonFixed[i].character);
						setEffect(keypads[index],
								  effImg,
								  jsonFixed[i].character,
								  jsonFixed[i].point.x*scale,
								  jsonFixed[i].point.y*scale,
								  jsonFixed[i].scale.width*scale,
								  jsonFixed[i].scale.height*scale);
								  
						break;
					}
					
					
				}
				
				preventDefault(event);
				
			
				
				
			}
			
			div.onmouseup = function (event) {
				delEffect(keypads[index],effImg);
				
			};
			
			effImg.onmouseout = function(event){
				delEffect(keypads[index],effImg);
			}
			
		
			
			var alignedPosition = getAlignedPosition(window.screen.width);
			
			img.style.height = '100%';
			img.style.borderStyle = 'none';
			img.src = imageDir+layoutList[index];
			div.appendChild(img);

			if(isMobile == true){
				
				img.style.width  = window.innerWidth;	
					
				div.style.width = window.innerWidth + 'px';
				div.style.height = parseInt(div.style.height)*scale + 'px';
				
				div.style.bottom = 0;
				div.style.left = 0;
				
			}else{
				
				div.style.top += alignedPosition.top + 'px';
				div.style.left += alignedPosition.left + 'px';

			}
			
			
			window.document.body.appendChild(div);
			
			keypads[index] = div;
		
		
	}
	
	base.Create = function(){
		
		if(keypadName == "numpad")
		{
			
			jsonFixed = numFixed;
			jsonLayouts = numLayouts;
			jsonInfo = numInfo;
		
			
		}else if(keypadName == "qwerty")
		{
			
			jsonFixed = keyFixed;
			jsonLayouts = keyLayouts;
			jsonInfo = keyInfo;
			
			
		}		
		setups();	
	}
	
	base.Start = function(){
	
		keypads[currentLayout].style.display = 'inline';
	}
	
	base.Stop = function(){
		keypads[currentLayout].style.display = 'none';
	}
	
	base.setIsMobile = function(boolvalue){
		isMobile = boolvalue;
		setups();
	}

	base.setIsKr = function(boolvalue){
		isKr = boolvalue;
		setups();
	}

	base.setDoneCallback = function(doneCallback){
		base.doneCallback = doneCallback;
	}
	
}

function vKeypad_NS_Main(keypadName,inputObject,maxLength)
{
	
	var inputObject = inputObject;
	var keypadObj = new vKeypad_NS_Core(keypadName,inputObject,maxLength);
	keypadObj.Create();
	
	
	keypadObj.u_addEventListener(inputObject,'focus',keypadObj.focusHandler);

	keypadObj.u_addEventListener(inputObject,'blur',keypadObj.blurHandler);
	
	return keypadObj;
	
}

function vKeypad_NS_Global(){
	var base = this;
	
	base.newInstance = function(keypadName, inputObject, maxLength){
		var keypad_NS = new vKeypad_NS(keypadName,inputObject,maxLength);

		return keypad_NS;
	}
}

window.vKeypad_NS_Global = new vKeypad_NS_Global();

function vKeypad_NS(keypadName,inputObject,maxLength){
	var base = this;
	var keypadObj;
	var keypadName = keypadName;
	var inputObject = inputObject;
	var maxLength = maxLength;
	
	base.load = function(){
		
		keypadObj = vKeypad_NS_Main(keypadName,inputObject,maxLength);
	
	}
	
	base.unload = function(){
		
		if(keypadObj != null){
			
			keypadObj.Stop();
			inputObject.readOnly = false;
			keypadObj.u_removeEventListener(inputObject,'focus',keypadObj.focusHandler);
			keypadObj.u_removeEventListener(inputObject,'blur',keypadObj.blurHandler);
			keypadObj = null;
		
		}
		
	}
	
	base.setIsMobile = function(BoolValue){
		keypadObj.setIsMobile(BoolValue);	
	}

	base.setIsKr = function(BoolValue){
		keypadObj.setIsKr(BoolValue);
	}

	base.setDoneCallback = function(doneCallback){
		keypadObj.setDoneCallback(doneCallback);
	}
}




