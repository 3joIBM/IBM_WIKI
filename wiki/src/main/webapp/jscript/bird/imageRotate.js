function imageRotate(imageTag,rotValue)
{
	imageTag.css({
	    "-webkit-transform": "rotate("+rotValue+"deg)",
	    "-moz-transform": "rotate("+rotValue+"deg)",
	    "-ms-transform": "rotate("+rotValue+"deg)"
	});
}