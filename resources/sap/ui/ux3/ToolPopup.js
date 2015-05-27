/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/Popup','sap/ui/core/theming/Parameters','./library'],function(q,C,I,P,a,l){"use strict";var T=C.extend("sap.ui.ux3.ToolPopup",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.ui.ux3",properties:{title:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconHover:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconSelected:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},modal:{type:"boolean",group:"Behavior",defaultValue:false},inverted:{type:"boolean",group:"Misc",defaultValue:true},autoClose:{type:"boolean",group:"Misc",defaultValue:false},maxHeight:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},maxWidth:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},openDuration:{type:"int",group:"Misc",defaultValue:400},closeDuration:{type:"int",group:"Misc",defaultValue:400}},defaultAggregation:"content",aggregations:{buttons:{type:"sap.ui.core.Control",multiple:true,singularName:"button"},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{initialFocus:{type:"sap.ui.core.Control",multiple:false},opener:{type:"sap.ui.core.Control",multiple:false},defaultButton:{type:"sap.ui.core.Control",multiple:false}},events:{open:{},close:{allowPreventDefault:true},enter:{parameters:{originalEvent:{type:"object"},originalSrcControl:{type:"sap.ui.core.Control"}}},iconChanged:{},closed:{},opened:{}}}});T.ARROW_LEFT=new RegExp(/my:(left|begin)([-+]\d*\%?)?\|[a-z]+([-+]\d*\%?)? at:(right|end)\|[a-z]+/);T.ARROW_RIGHT=new RegExp(/my:(right|end)([-+]\d*\%?)?\|[a-z]+([-+]\d*\%?)? at:(left|begin)\|[a-z]+/);T.ARROW_UP=new RegExp(/my:[a-z]+([-+]\d*\%?)?\|top([-+]\d*\%?)? at:[a-z]+\|bottom/);T.ARROW_DOWN=new RegExp(/my:[a-z]+([-+]\d*\%?)?\|bottom([-+]\d*\%?)? at:[a-z]+\|top/);(function(){T.prototype.init=function(){this.oPopup=null;this._bPositionSet=false;this._mParameters={};this._mParameters.that=this;this._mParameters.firstFocusable=this.getId()+"-firstFocusable";this._mParameters.lastFocusable=this.getId()+"-lastFocusable";this._bFocusSet=false;this._proxyOpened=q.proxy(p,this);this._proxyClosed=q.proxy(o,this);this._proxyFixSize=q.proxy(f,this);s(this);};T.prototype.exit=function(){if(this.oPopup){this.oPopup.detachOpened(this._proxyOpened);this.oPopup.detachClosed(this._proxyClosed);this.oPopup.destroy();delete this.oPopup;}delete this._bPositionSet;delete this._mParameters;delete this._bFocusSet;delete this._bPreventRestoreFocus;delete this._proxyOpened;delete this._proxyClosed;if(this._bBoundOnResize){q(window).unbind("resize",this._proxyFixSize);}delete this._bRTL;delete this._sArrowDir;delete this._oArrowIcon;delete this._bThemeInverted;delete this._sInitialFocusId;};var g=function(t){var e;var d=q(":sapTabbable",t.$()).get();if(!t._bFocusSet){if(d.length>0){for(var i=0;i<d.length;i++){if(d[i].id!==t._mParameters.firstFocusable&&d[i].id!==t._mParameters.lastFocusable){e=d[i];break;}}}var F=q(e).control();if(F[0]){var h=F[0].getFocusDomRef();e=h?h:e;}else{e=q.sap.domById(t._mParameters.firstFocusable);}q.sap.focus(e);t._sInitialFocusId=e.id;}else{t._sInitialFocusId=t.oPopup._sInitialFocusId;}return t._sInitialFocusId;};T.prototype.getFocusDomRef=function(){return g(this);};T.prototype.onfocusin=function(e){this._mParameters.event=e;this._mParameters.$FocusablesContent=q(":sapTabbable",this.$("content"));this._mParameters.$FocusablesFooter=q(":sapTabbable",this.$("buttons"));this.oPopup.focusTabChain(this._mParameters);};var f=function(){var t=this.$();var v=0;var m=this.getMaxHeight();var M=m?parseInt(m,10):0;var d=this.getMaxWidth();if(d){var i=parseInt(d,10);var B=t.css("border-left-width");var e=parseInt(B,10);var h=t.css("border-right-width");var j=parseInt(h,10);var k=t.css("padding-left");var n=parseInt(k,10);var w=t.css("padding-right");var x=parseInt(w,10);i-=e+n+x+j;t.css("max-width",i+"px");}else{t.css("max-width","");}var y=t.css("padding-top");var z=parseInt(y,10);var A=t.css("padding-bottom");var D=parseInt(A,10);var E=t.css("border-top-width");var F=parseInt(E,10);var H=t.css("border-bottom-width");var J=parseInt(H,10);var K=z+D+F+J;var L=q(document).scrollTop();var N=t.rect();var O=N.top-L+t.outerHeight(true);var W=q(window).height();var Q=(O>W)&&(M===0);var Y=0;if(Q){var $=q.sap.byId(this.getOpener());var U=$.rect();var V=U.top-L+$.outerHeight(true);var X=this.oPopup._getPositionOffset();if(O>V&&X.length>0){Y=Math.abs(parseInt(X[1],10));if((O-Y)<W){Q=false;var Z="Offset of "+Y+" pushes ToolPopup out of the window";q.sap.log.warning(Z,"","sap.ui.ux3.ToolPopup");}}}if(!Q){t.toggleClass("sapUiUx3TPLargeContent",false);}if(M>0){t.css("max-height",M+"px");var _=this.$("title");var a1=this.$("title-separator");var b1=this.$("buttons");var c1=this.$("buttons-separator");v=M>0?M:W-N.top-D-Y;v-=K;v-=_.outerHeight(true);v-=a1.outerHeight(true);v-=c1.outerHeight(true);v-=b1.length>0?b1.outerHeight(true):0;v=parseInt(v,10);var d1=this.$("content");d1.css("max-height",v+"px");d1.toggleClass("sapUiUx3TPLargeContent",true);}S(this);};var p=function(){this._proxyFixSize();if(!this._sInitialFocusId){var i=g(this);if(i!==sap.ui.getCore().getCurrentFocusedControlId()){var d=q.sap.byId(i);d.focus();}}this.fireOpened();};T.prototype.isOpen=function(){if(this.oPopup&&this.oPopup.isOpen()){return true;}return false;};T.prototype.willBeClosed=function(){var e=this.oPopup&&this.oPopup.getOpenState();return e!==sap.ui.core.OpenState.OPENING&&e!==sap.ui.core.OpenState.OPEN;};T.prototype.open=function(m,d){this._my=m;this._at=d;this._sArrowDir=G(this);var O=null;this.sOffset="";u(this);if(!this._bPositionSet){var i=0;var e=0;if(!this._my){this._my=P.Dock.BeginTop;}if(!this._at){this._at=P.Dock.EndTop;}O=q.sap.domById(this.getOpener());if(O){switch(this._sArrowDir){case"Up":i=0;e=this.iArrowWidth;break;case"Down":i=0;e=-this.iArrowWidth;break;case"Right":i=-this.iArrowWidth;break;default:case"Left":i=this.iArrowWidth;break;}i=parseInt(i,10);e=parseInt(e,10);this.sOffset=""+i+" "+e;this.setPosition(this._my,this._at,O,this.sOffset,"none");}else{this.setPosition(P.Dock.BeginTop,P.Dock.BeginTop,window,"0 0","fit");q.sap.log.warning("No opener set. Using a default position for Popup","","sap.ui.ux3.ToolPopup");}this._bPositionSet=false;}this._ensurePopup();var A=this.getAutoClose();var M=this.getModal();if(A&&M){q.sap.log.warning("A modal & autoclose ToolPopup will not work properly. Therefore 'autoclose' will be deactived!");A=false;}this.oPopup.setAutoClose(A);this.oPopup.setModal(M);this._oPreviousFocus=P.getCurrentFocusInfo();this.fireOpen();c(this);this.oPopup.open(this.getOpenDuration(),this._my,this._at,O,this.sOffset,"",true);S(this);return this;};var c=function(t){if(!t.getOpener()){var i="";if(t.oPopup){if(t.oPopup._oPosition.of instanceof sap.ui.core.Element){i=t.oPopup._oPosition.of.getId();}else{if(t.oPopup._oPosition.of.length>0){i=t.oPopup._oPosition.of[0].id;}else{i=t.oPopup._oPosition.of.id;}}}if(i!==""){t.setAssociation("opener",i,true);}else{q.sap.log.error("Neither an opener was set properly nor a corresponding one can be distinguished","","sap.ui.ux3.ToolPopup");}}};var s=function(t){var d="sapUiUx3ToolPopupArrowWidth";t.sArrowWidth=a.get(d);t.iArrowWidth=parseInt(t.sArrowWidth,10);d="sapUiUx3ToolPopupArrowHeight";t.sArrowHeight=a.get(d);t.iArrowHeight=parseInt(t.sArrowHeight,10);d="sapUiUx3ToolPopupArrowRightMarginCorrection";t.sArrowPadding=a.get(d);t.iArrowPadding=parseInt(t.sArrowPadding,10);d="sapUiUx3ToolPopupArrowRightMarginCorrectionInverted";t.sArrowPaddingInverted=a.get(d);t.iArrowPaddingInverted=parseInt(t.sArrowPaddingInverted,10);};var G=function(t){var d="Left";var m=t._my;var e=t._at;if(!m&&t.oPopup){m=t.oPopup._oPosition.my;}if(!e&&t.oPopup){e=t.oPopup._oPosition.at;}t._bHorizontalArrow=false;if(m&&e){var M=m.split(" ");var A=e.split(" ");var h="my:"+M[0]+"|"+M[1];h+=" at:"+A[0]+"|"+A[1];if(T.ARROW_LEFT.exec(h)){t._bHorizontalArrow=true;d="Left";}else if(T.ARROW_RIGHT.exec(h)){t._bHorizontalArrow=true;d="Right";}else if(T.ARROW_UP.exec(h)){d="Up";}else if(T.ARROW_DOWN.exec(h)){d="Down";}if(t.getDomRef()&&t.isOpen()){var $=t.$();var i=$.rect();var O=q.sap.byId(t.getOpener());var j=O.rect();if(j){if(t._bHorizontalArrow){var k=i.left+$.outerWidth(true)+t.iArrowWidth;var n=j.left+O.outerWidth(true);if(k<=n){d="Right";}else{d="Left";}}else{var v=i.top+$.outerHeight(true)+t.iArrowWidth;var w=j.top+O.outerHeight(true);if(v<=w){d="Down";}else{d="Up";}}}}}return d;};var S=function(t){if(!t.getDomRef()){return;}var k="";var v=0;var z=0;var h=t.iArrowHeight/2;t._sArrowDir=G(t);var A=t._sArrowDir;if(t._bRTL){if(t._sArrowDir==="Right"){A="Left";}else if(t._sArrowDir==="Left"){A="Right";}}var d=t.$().rect();var O=q.sap.byId(t.getOpener()).rect();if(!O){q.sap.log.warning("Opener wasn't set properly. Therefore arrow will be at a default position","","sap.ui.ux3.ToolPopup");}var $=t.$("arrow");if(!t._my&&t.oPopup){t._my=t.oPopup._oPosition.my;}if(t._bHorizontalArrow){k="top";if(O){z=O.top-d.top;v=Math.round(z+O.height/2);v=v+h>d.height?v-t.iArrowHeight:v;}}else{k="left";if(O){z=O.left-d.left;if(z<0){z=d.width-t.iArrowHeight;}v=Math.round(z+O.width/2);v=v+h>d.width?v-t.iArrowHeight:v;}}if(O){v-=h;}else{v=t.iArrowHeight;}var e="";if($.hasClass("sapUiUx3TPNewArrow")){e="sapUiUx3TPNewArrow sapUiUx3TPNewArrow";}else{e=t.isInverted()?"sapUiUx3TPArrow sapUiTPInverted sapUiUx3TPArrow":"sapUiUx3TPArrow sapUiUx3TPArrow";}$.attr("class",e+A);if(A==="Right"){var w=d.width;if(t.isInverted()){w+=t.iArrowPaddingInverted;}else{w+=t.iArrowPadding;}t._bRTL=sap.ui.getCore().getConfiguration().getRTL();if(t._bRTL){$.css("right",w+"px");}else{$.css("left",w+"px");}}else{$.css({"left":"","right":""});}v=parseInt(v,10);v=v<0?0:v;if(v>0){v-=2;$.css(k,v+"px");}};T.prototype.onsapescape=function(){if(this.fireClose()){this.close();}};var o=function(e){if(!this._bPreventRestoreFocus){P.applyFocusInfo(this._oPreviousFocus);}this.fireClosed();};T.prototype.close=function(d){if(this.oPopup&&this.oPopup.isOpen()){if(this._bBoundOnResize){q(window).unbind("resize",this._proxyFixSize);delete this._bBoundOnResize;}this.oPopup.close(this.getCloseDuration());this._bPreventRestoreFocus=d;}return this;};T.prototype.getEnabled=function(){var e=this.oPopup?this.oPopup.getOpenState():sap.ui.core.OpenState.CLOSED;return e===sap.ui.core.OpenState.OPENING||e===sap.ui.core.OpenState.OPEN;};T.prototype.onsapenter=function(e){var i=this.getDefaultButton();var F=sap.ui.getCore().byId(i);if(i&&F&&q.contains(this.getDomRef(),F.getDomRef())){if(F instanceof sap.ui.commons.Button){var $=F.$();$.click();$.focus();}}e.preventDefault();e.stopPropagation();};T.prototype.onBeforeRendering=function(){var i=this.getInitialFocus();var d=this.getDefaultButton();this._bFocusSet=true;if(i){this.oPopup.setInitialFocusId(i);}else if(d){this.oPopup.setInitialFocusId(d);}else{this._bFocusSet=false;}this._bRTL=sap.ui.getCore().getConfiguration().getRTL();};T.prototype._ensurePopup=function(){if(!this.oPopup){this.oPopup=new P(this,false,true,false);this.oPopup.attachOpened(this._proxyOpened);this.oPopup.attachClosed(this._proxyClosed);var t=this;this.oPopup._applyPosition=function(){P.prototype._applyPosition.apply(t.oPopup,arguments);var d=t.oPopup._oLastPosition.of;if(!d){t.oPopup.close();}else{var $=q.sap.byId(d.id);if(t._bPositionSet){if(!$.hasClass("sapUiUx3ShellTool")){t._my=t.oPopup._oLastPosition.my;t._at=t.oPopup._oLastPosition.at;}}S(t);}};}return this.oPopup;};T.prototype.setPosition=function(){this._ensurePopup();this.oPopup.setPosition.apply(this.oPopup,arguments);this._bPositionSet=true;c(this);return this;};var b=function(t,d){if(d==="content"){r(t);}else if(d==="buttons"){R(t);}t._proxyFixSize();t.oPopup._applyPosition(t.oPopup._oLastPosition);S(t);};var r=function(t){var d=t.getDomRef("content");d.innerHTML="";var e=t.getContent();var h=sap.ui.getCore().createRenderManager();for(var i=0;i<e.length;i++){h.renderControl(e[i]);}h.flush(d,true);h.destroy();};var R=function(t){var B=t.getDomRef("buttons");var d=t.getDomRef("buttons-separator");var e=t.getButtons();if(e.length===0){q(B).addClass("sapUiUx3TPButtonRowHidden");q(d).addClass("sapUiUx3TPButtonRowHidden");}else{q(B).removeClass("sapUiUx3TPButtonRowHidden");q(d).removeClass("sapUiUx3TPButtonRowHidden");B.innerHTML="";var h=sap.ui.getCore().createRenderManager();for(var i=0;i<e.length;i++){h.renderControl(e[i]);}h.flush(B,true);h.destroy();}};T.prototype.addContent=function(d){this.addAggregation("content",d,true);if(this.isOpen()){b(this,"content");}return this;};T.prototype.insertContent=function(d,i){this.insertAggregation("content",d,i,true);if(this.isOpen()){b(this,"content");}return this;};T.prototype.removeContent=function(d){this.removeAggregation("content",d,true);if(this.isOpen()){b(this,"content");}return this;};T.prototype.addButton=function(B){this.addAggregation("buttons",B,true);if(this.isOpen()){b(this,"buttons");}return this;};T.prototype.insertButton=function(B,i){this.insertAggregation("buttons",B,i,true);if(this.isOpen()){b(this,"buttons");}return this;};T.prototype.removeButton=function(B){this.removeAggregation("button",B,true);if(this.isOpen()){b(this,"buttons");}return this;};var u=function(t){var d="sapUiUx3ToolPopupInverted";d=a.get(d);t._bThemeInverted=d==="true";};T.prototype.onThemeChanged=function(){u(this);};T.prototype.isInverted=function(){u(this);return this.getInverted()&&this._bThemeInverted;};T.prototype.setAutoCloseAreas=function(A){this._ensurePopup();return this.oPopup.setAutoCloseAreas(A);};T.prototype.addFocusableArea=function(i){this._ensurePopup();if(typeof(i)==="string"){this.oPopup._addFocusableArea("channelId","eventId",{id:i});return this;}else{q.sap.log.error("Wrong type of focusable area ID - string expected","","sap.ui.ux3.ToolPopup");}};T.prototype.removeFocusableArea=function(i){this._ensurePopup();if(typeof(i)==="string"){this.oPopup._removeFocusableArea("channelId","eventId",{id:i});return this;}else{q.sap.log.error("Wrong type of focusable area ID - string expected","","sap.ui.ux3.ToolPopup");}};}());T.prototype.setIcon=function(i){this.setProperty("icon",i,true);this.fireIconChanged();return this;};T.prototype.setIconHover=function(i){this.setProperty("iconHover",i,true);this.fireIconChanged();return this;};T.prototype.setIconSelected=function(i){this.setProperty("iconSelected",i,true);this.fireIconChanged();return this;};T.prototype.getIconSelected=function(){return this.getProperty("iconSelected")||this.getProperty("iconHover");};T.prototype.setMaxWidth=function(m){var p=/[0-9]+px/;if(p.test(m)){this.setProperty("maxWidth",m);}else{q.sap.log.error("Only values in pixels are possible","","sap.ui.ux3.ToolPopup");}};return T;},true);
