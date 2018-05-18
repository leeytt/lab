/**
 * 作者：陈霓清
 * 官网：http://www.javaex.cn
 */
;(function() {
	var javaex = function() {
		// 默认属性
		function defaults(args) {
			var defaults = {
				id : "",	// 元素id
				type : "",	// 组件类型
				url : "",	// 请求地址

				// 弹出层属性
				mask : true,			// 是否使用遮罩
				width : 350,			// 弹出层宽度，单位px
				height : "",			// 弹出层高度
				top : "30%",			// 距离顶部距离，支持 200px 这种写法
				title : "温馨提示",		// 弹出层标题
				closeIcon : true,		// 是否显示右上角关闭 X
				content : "",			// 弹出层内容
				textAlign : "left",		// 内容位置：left；center；right
				tip : "删除后不可恢复，请慎重操作",	// 提示
				confirmName : "确定",	// 确定按钮名称
				cancelName : "取消",	// 取消按钮名称
				callback : function() {return true;},	// 回调函数
				live : 2000,		// 操作提示存在时间
				selector : "",		// 图片数组选择器

				// 左侧菜单属性
				isAutoSelected : false,	// 是否自动选中

				// Tab切换属性
				current : 1,			// 默认显示第几个标签，从1开始计
				mode : "mouseover",		// 切换模式。mouseover : 鼠标移动切换； click : 鼠标点击切换
				delay : 200,			// 鼠标移动切换时，延迟多少毫秒
				display : "block",		// div的display属性

				// 表格选择属性
				colArr : null,		// 需要合并的列数组（从1开始），例如[1,3]

				// select选择框属性
				maxNum : 6,		// 下拉列表最多显示多少项，超出会显示滚动条
				isSearch : true,	// 是否允许检索，true：允许；false：不允许

				// 分页属性
				pageCount : null,	// 总页数
				currentPage : 1,	// 默认选中第几页
				position : "right",	// 分页显示位置。 left:居左；center:居中；right:居右

				// 日期选择属性
				// 单选日期
				date : "",
				// 日期范围
				startDate : "",	// 开始日期，默认今天
				endDate : "",	// 结束日期，默认今天
				alignment : "left",	// 日期选择框的对齐方式。left代表左对齐；right代表右对齐
				monthNum : 1,	// 展示的月份数，最大是2。 1代表选择单日；2代表选择范围
				splitLine : " - ",	// 两个日期之间的连接符

				// 头像上传属性
				imgDivId : "image-box", // 本地上传的图片区域id
				cutBox : "cut-box",		// 裁剪区域id
				moveBox : "move-box",	// 背景区域id，可拖动
				dataUrl : "data-url",	// 最终将图片地址返回给哪个input存储
				
				// 文件上传属性
				containerId : "",	// 图片容器id
				param : "file",		// 参数名称，SSM中与MultipartFile的参数名保持一致
				maxSize : "",		// 单张图片的大小上限，单位KB，0或空为不限制
				imgUrl : "",		// 图片回显地址
				dataType : "base64",	// 图片上传后的返回类型
				
				// 富文本编辑器属性
				image : null
			};
			return $.extend(defaults, args);
		}

		var info = {
			// 生成一个不重复的id
			generateID : function() {
				return Date.now().toString(36) + Math.random().toString(36).substr(3, 3);
			},

			// 普通确认框
			alert : function(args) {
				var opt = defaults(args);

				// 添加遮罩
				if (opt.mask==true || opt.mask=="true") {
					info.addMask();
				}

				// 生成随机id
				var UUID = info.generateID();

				// 弹出层代码
				var alertHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:' + opt.width + 'px;top:' + opt.top + ';left:' + (document.documentElement.clientWidth-opt.width)/2 + 'px;">';
				alertHtml += '<div id="dialog-top-' + UUID + '" class="dialog-top">';
				alertHtml += '<div class="dialog-title">' + opt.title + '</div>';
				if (opt.closeIcon==true || opt.closeIcon=="true") {
					alertHtml += '<div class="dialog-close-icon" onclick="javaex.close(\'' + UUID + '\');"><span class="close"><span></div>';
				}
				alertHtml += '</div>';
				alertHtml += '<div class="dialog-content" style="text-align:'+opt.textAlign+';">';
				alertHtml += opt.content;
				alertHtml += '</div>';
				alertHtml += '<div class="dialog-footer">';
				alertHtml += '<div class="dialog-btn-container">';
				alertHtml += '<button class="dialog-btn dialog-btn-true" onclick="if('+opt.callback+'!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				$(document.body).append(alertHtml);

				// 弹出层拖拽
				var oDialog = document.getElementById(UUID);
				var oDrag = document.getElementById("dialog-top-" + UUID);
				info.drag(oDialog, oDrag);
			},

			// 确定、取消框
			confirm : function(args) {
				var opt = defaults(args);
				
				// 添加遮罩
				if (opt.mask==true || opt.mask=="true") {
					info.addMask();
				}

				// 生成随机id
				var UUID = info.generateID();

				// 弹出层代码
				var confirmHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:' + opt.width + 'px;top:' + opt.top + ';left:' + (document.documentElement.clientWidth-opt.width)/2 + 'px;">';
				confirmHtml += '<div id="dialog-top-' + UUID + '" class="dialog-top">';
				confirmHtml += '<div class="dialog-title">' + opt.title + '</div>';
				if (opt.closeIcon==true || opt.closeIcon=="true") {
					confirmHtml += '<div class="dialog-close-icon" onclick="javaex.close(\'' + UUID + '\');"><span class="close"><span></div>';
				}
				confirmHtml += '</div>';
				confirmHtml += '<div class="dialog-content" style="text-align:'+opt.textAlign+';">';
				confirmHtml += opt.content;
				confirmHtml += '</div>';
				confirmHtml += '<div class="dialog-footer">';
				confirmHtml += '<div class="dialog-btn-container">';
				confirmHtml += '<button class="dialog-btn dialog-btn-true" onclick="if('+opt.callback+'!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				confirmHtml += '<button class="dialog-btn dialog-btn-false" onclick="javaex.close(\'' + UUID + '\');">' + opt.cancelName + '</button>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				$(document.body).append(confirmHtml);

				// 弹出层拖拽
				var oDialog = document.getElementById(UUID);
				var oDrag = document.getElementById("dialog-top-" + UUID);
				info.drag(oDialog, oDrag);
			},

			// 元素追随弹出层
			followDialog : function(obj, args) {
				// 删除追随弹出层，防止二次弹出
				$(".danger-dialog").remove();

				var opt = defaults(args);

				var left = obj.getBoundingClientRect().left + document.documentElement.scrollLeft;
				var top = obj.getBoundingClientRect().top + document.documentElement.scrollTop;

				// 生成随机id
				var UUID = info.generateID();

				// 弹出层代码
				var followHtml = '<div id=' + UUID + ' class="danger-dialog" style="left:' + parseInt(left-186+(obj.offsetWidth/2)+30) + 'px;top:' + parseInt(top+obj.offsetHeight+3) + 'px;">';
				followHtml += '<div class="danger-dialog-wrapper">';
				followHtml += '<div class="danger-dialog-wrapper-content">';
				followHtml += opt.content;
				followHtml += '</div>';
				followHtml += '<div class="danger-dialog-wrapper-tip">';
				followHtml += opt.tip;
				followHtml += '</div>';
				followHtml += '<div class="danger-dialog-wrapper-button">';
				followHtml += '<button class="danger" onclick="if('+opt.callback+'!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				followHtml += '<button onclick="javaex.close(\'' + UUID + '\');">'+opt.cancelName+'</button>';
				followHtml += '</div>';
				followHtml += '</div>';
				followHtml += '</div>';
				$(document.body).append(followHtml);
			},

			// 提示气泡
			optTip : function(args) {
				var opt = defaults(args);
				var tipHtml = '';
				var type = opt.type;
				if (type=="success" || type=="") {
					tipHtml = '<div class="top-tip animated fadeInDown" style="background-color: #5cb85c;">' + opt.content + '</div>';
				} else {
					tipHtml = '<div class="top-tip animated shake" style="background-color: #fd4c5b;">' + opt.content + '</div>';
				}
				$(document.body).append(tipHtml);
				setTimeout(function() {
					$(".top-tip").remove();
				}, opt.live);
			},
			// 加载层
			loading : function(args) {
				var opt = defaults(args);

				var loadingHtml = '<div class="loading-mask">';
				loadingHtml += '<div style="margin: auto;">';
				loadingHtml += '<div class="loading">';
				loadingHtml += '<i></i>';
				loadingHtml += '<p>' + opt.content + '</p>';
				loadingHtml += '</div>';
				loadingHtml += '</div>';
				$(document.body).append(loadingHtml);
			},

			// 关闭加载层
			closeLoading : function() {
				$(".loading-mask").remove();
			},

			// 高级弹出层
			num : 0,	// 代表第几张图片切换
			dialog : function(args) {
				var opt = defaults(args);

				// 必须重新赋值，不然无法传递该参数
				attribute = args;

				// 生成随机id
				var UUID = info.generateID();

				// 弹出层代码
				var dialogHtml = '';
				// 判断弹出层样式
				if (opt.type=="image") {
					// 单图放大
					if (opt.title=="温馨提示") {
						opt.title = "";
					}
					// 添加遮罩
					info.addMask();

					dialogHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:' + opt.width + 'px;left:' + (document.documentElement.clientWidth-opt.width)/2 + 'px;';
					if (opt.height!="") {
						dialogHtml += 'height:' + opt.height + 'px;">';
					} else {
						dialogHtml += '">';
					}
					dialogHtml += '<div id="dialog-content-' + UUID + '" class="dialog-content full" style="height:' + (opt.height-80) + 'px;overflow-y:hidden;">';
					dialogHtml += '<img src="' + opt.url + '" />';
					dialogHtml += '</div>';
					dialogHtml += '<a class="close2" href="javascript:;" onclick="javaex.close(\'' + UUID + '\');"></a>';
					dialogHtml += '</div>';
				} else if (opt.type=="images") {
					// 查看多图
					if (opt.title=="温馨提示") {
						opt.title = "";
					}

					// 遍历图片
					$(opt.selector).each(function(i) {
						// 判断当前点击的是第几张图片
						if ($(this).attr("src")==opt.url) {
							info.num = i;
						}
					});

					// 添加遮罩
					info.addMask();

					dialogHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:' + opt.width + 'px;left:' + (document.documentElement.clientWidth-opt.width)/2 + 'px;';
					if (opt.height!="") {
						dialogHtml += 'height:' + opt.height + 'px;">';
					} else {
						dialogHtml += '">';
					}
					dialogHtml += '<div id="dialog-content-' + UUID + '" class="dialog-content full" style="height:' + (opt.height-80) + 'px;overflow-y:hidden;">';
					dialogHtml += '<img id="img-' + UUID + '" src="' + opt.url + '"/>';
					dialogHtml += '<a class="last-next-image last" href="javascript:;"><span title="上一张" onclick="javaex.lastImg(\'' + UUID + '\', \'' + opt.selector + '\');"></span></a>';
					dialogHtml += '<a class="last-next-image next" href="javascript:;"><span title="下一张" onclick="javaex.nextImg(\'' + UUID + '\', \'' + opt.selector + '\');"></span></a>';
					dialogHtml += '</div>';
					dialogHtml += '<a class="close2" href="javascript:;" onclick="javaex.close(\'' + UUID + '\');"></a>';
					dialogHtml += '</div>';
				} else {
					// 高级弹出层
					// 添加遮罩
					if (opt.mask==true || opt.mask=="true") {
						info.addMask();
					}

					dialogHtml = '<div id=' + UUID + ' class="dialog animated zoomIn" style="width:'+opt.width+'px;top:'+(document.documentElement.clientHeight-opt.height)/2+'px;left:'+(document.documentElement.clientWidth-opt.width)/2+'px;height:'+opt.height+'px;">';
					dialogHtml += '<div class="dialog-top">';
					dialogHtml += '<div id="dialog-title-' + UUID + '" class="dialog-title">' + opt.title + '</div>';
					dialogHtml += '<div id="dialog-min-' + UUID + '" class="dialog-min-icon" onclick="javaex.min(\'' + UUID + '\');"><span class="min"><span></div>';
					dialogHtml += '<div id="dialog-max-' + UUID + '" class="dialog-max-icon" onclick="javaex.max(\'' + UUID + '\');"><span class="max"><span></div>';
					dialogHtml += '<div id="dialog-revert-' + UUID + '" style="display:none;" class="dialog-revert-icon" onclick="javaex.revert(\'' + UUID + '\', attribute);"><span class="revert"><span></div>';
					dialogHtml += '<div class="dialog-close-icon" onclick="javaex.close(\'' + UUID + '\');"><span class="close"><span></div>';
					dialogHtml += '</div>';
					dialogHtml += '<div id="dialog-content-' + UUID + '" class="dialog-content full" style="height:' + (opt.height-80) + 'px;overflow-y:hidden;">';
					dialogHtml += '<iframe src="' + opt.url + '" width="100%" height="100%" frameborder="0" scrolling="yes" style="overflow: visible;border: 0;"></iframe>';
					dialogHtml += '</div>';
					dialogHtml += '<div id="dialog-resize-' + UUID + '" class="resize" onmousemove="javaex.resize(\'' + UUID + '\', attribute);"></div>';
					dialogHtml += '</div>';
				}
				$(document.body).append(dialogHtml);

				var oDialog = document.getElementById(UUID);
				// 弹出层垂直居中
				if (opt.title=="") {
					var heightDifference = document.documentElement.clientHeight - oDialog.offsetHeight;
					oDialog.style.top = (heightDifference/2) + "px";
					
					$(".mask").click(function() {
						info.close(UUID);
					});
				} else {
					// 弹出层拖拽
					var oDrag = document.getElementById("dialog-title-" + UUID);
					info.drag(oDialog, oDrag);
				}
			},

			// 切换上一张图片
			lastImg : function(UUID, selector) {
				info.num--;
				if (info.num>=0) {
					var oImgSrc = document.getElementById("img-" + UUID);
					oImgSrc.src = "";
					oImgSrc.src = $(selector).eq(info.num).attr("src");
				} else {
					info.num = 0;
				}
			},

			// 切换下一张图片
			nextImg : function(UUID, selector) {
				info.num++;
				if (info.num<$(selector).length) {
					var oImgSrc = document.getElementById("img-" + UUID);
					oImgSrc.src = "";
					oImgSrc.src = $(selector).eq(info.num).attr("src");
				} else {
					info.num = $(selector).length - 1;
				}
			},

			// 改变弹出层大小
			resize : function(UUID, args) {
				var opt = defaults(args);
				
				// 弹出层的最小宽度和高度
				var dragMinWidth = opt.width;
				var dragMinHeight = opt.height;

				var oDialog = document.getElementById(UUID);
				var oResize = document.getElementById("dialog-resize-" + UUID);

				oResize.onmousedown = function (event) {
					var oEvent = event || window.event;
					var absX = oEvent.clientX - oResize.offsetLeft;
					var absY = oEvent.clientY - oResize.offsetTop;	

					document.onmousemove = function (eve) {
						var oEve = eve || window.event;

						var offsetLeft = oEve.clientX - absX;
						var offsetTop = oEve.clientY - absY;
						var maxWidth = document.documentElement.clientWidth - oDialog.offsetLeft - 2;
						var maxHeight = document.documentElement.clientHeight - oDialog.offsetTop - 2;			
						var offsetWidth = oResize.offsetWidth + offsetLeft;
						var offsetHeight = oResize.offsetHeight + offsetTop;

						if (offsetWidth<dragMinWidth) {
							offsetWidth = dragMinWidth;
						}
						if (offsetWidth>maxWidth) {
							offsetWidth = maxWidth;
						}
						oDialog.style.width = offsetWidth + "px";

						if (offsetHeight<dragMinHeight) {
							offsetHeight = dragMinHeight;
						}
						if (offsetHeight>maxHeight) {
							offsetHeight = maxHeight;
						}
						oDialog.style.height = offsetHeight + "px";
						document.getElementById("dialog-content-" + UUID).style.height = (offsetHeight-80) + "px";
						
						return false;
					};
					document.onmouseup = function() {
						document.onmousemove = null;
						document.onmouseup = null;
					};
					return false;
				};
			},

			// 弹出层最小化
			min : function(UUID) {
				// 最小化图标隐藏
				var oMin = document.getElementById("dialog-min-" + UUID);
				oMin.style.display = "none";
				// 右下角拖放图标隐藏
				var oResize = document.getElementById("dialog-resize-" + UUID);
				oResize.style.display = "none";
				// 最大化图标隐藏
				var oMax = document.getElementById("dialog-max-" + UUID);
				oMax.style.display = "none";
				// 还原图标显示
				var oRevert = document.getElementById("dialog-revert-" + UUID);
				oRevert.style.display = "block";

				// 隐藏该弹出层内容区域
				var oContent = document.getElementById("dialog-content-" + UUID);
				oContent.style.display = "none";

				// 重新设置该弹出层的一些属性
				var oDialog = document.getElementById(UUID);
				oDialog.style.left = "0";
				oDialog.style.width = "260px";
				oDialog.style.height = "40px";
				offsetTop = document.documentElement.clientHeight - oDialog.offsetHeight;
				oDialog.style.top = offsetTop + "px";
			},

			// 弹出层最大化
			max : function(UUID) {
				// 最大化图标隐藏
				var oMax = document.getElementById("dialog-max-" + UUID);
				oMax.style.display = "none";
				// 右下角拖放图标显示
				var oResize = document.getElementById("dialog-resize-" + UUID);
				oResize.style.display = "none";
				// 最小化图标显示
				var oMin = document.getElementById("dialog-min-" + UUID);
				oMin.style.display = "block";
				// 还原图标显示
				var oRevert = document.getElementById("dialog-revert-" + UUID);
				oRevert.style.display = "block";

				// 重新设置该弹出层的一些属性
				var oDialog = document.getElementById(UUID);
				oDialog.style.top = "0";
				oDialog.style.left = "0";
				oDialog.style.width = document.documentElement.clientWidth - 2 + "px";
				oDialog.style.height = document.documentElement.clientHeight - 2 + "px";

				// 重新设置该弹出层内容区域的高度
				var oContent = document.getElementById("dialog-content-" + UUID);
				oContent.style.display = "block";
				oContent.style.height = document.documentElement.clientHeight - 2 -80 + "px";
			},

			// 弹出层大小还原
			revert : function(UUID, args) {
				var opt = defaults(args);

				// 最小化图标显示
				var oMin = document.getElementById("dialog-min-" + UUID);
				oMin.style.display = "block";
				// 还原图标隐藏
				var oRevert = document.getElementById("dialog-revert-" + UUID);
				oRevert.style.display = "none";
				// 最大化图标显示
				var oMax = document.getElementById("dialog-max-" + UUID);
				oMax.style.display = "block";
				// 右下角拖放图标显示
				var oResize = document.getElementById("dialog-resize-" + UUID);
				oResize.style.display = "block";

				// 还原该弹出层的属性
				var oDialog = document.getElementById(UUID);
				oDialog.style.top = opt.top;
				oDialog.style.left = (document.documentElement.clientWidth-opt.width)/2 + "px";
				oDialog.style.width = opt.width + "px";
				oDialog.style.height = opt.height + "px";

				// 还原该弹出层内容区域的高度
				var oContent = document.getElementById("dialog-content-" + UUID);
				oContent.style.display = "block";
				oContent.style.height = (opt.height-80) + "px";
			},

			// 关闭弹出层
			close : function(UUID) {
				var oDialog = document.getElementById(UUID);
				if (oDialog.getAttribute("class")=="danger-dialog") {
					// 删除追随弹出层
					oDialog.remove();
				} else {
					// 删除淡入属性
					oDialog.classList.remove("zoomIn");
					// 添加淡出属性
					oDialog.classList.add("zoomOut");
					// 删除遮罩
					$(".mask").remove();

					// 删除弹出层
					setTimeout(function() {
						oDialog.remove();
					}, 300);
				}
			},

			// 添加遮罩背景
			addMask : function() {
				$(document.body).append('<div class="mask"></div>');
			},

			// 拖拽事件
			drag : function(oDialog, oDrag) {
				oDrag.onmousedown = function(event) {
					var oEvent = event || window.event;
					var absX = oEvent.clientX - oDialog.offsetLeft;
					var absY = oEvent.clientY - oDialog.offsetTop;

					document.onmousemove = function(eve) {
						var oEve = eve || window.event;
						var offsetLeft = oEve.clientX - absX;
						var offsetTop = oEve.clientY - absY;

						// 防止拖动溢出
						if (offsetLeft<=0) {
							offsetLeft = 0;
						} else if (offsetLeft>=(document.documentElement.clientWidth-oDialog.offsetWidth)) {
							offsetLeft = document.documentElement.clientWidth - oDialog.offsetWidth;
						}

						if (offsetTop<=0) {
							offsetTop = 0;
						} else if (offsetTop>=(document.documentElement.clientHeight-oDialog.offsetHeight)) {
							offsetTop = document.documentElement.clientHeight - oDialog.offsetHeight;
						}

						// 修改属性
						oDialog.style.left = offsetLeft + "px";
						oDialog.style.top = offsetTop + "px";
					};
					document.onmouseup = function() {
						document.onmousemove = null;
						document.onmouseup = null;
					};
				};
			},

			// 重新渲染
			render : function() {
				$("script").each(function() {
					if ($(this).attr("src")=="" || $(this).attr("src")==null || $(this).attr("src")==undefined) {
						
					} else {
						if ($(this).attr("src").indexOf("common.js")>-1) {
							var jsSrc = $(this).attr("src");
							var script = document.createElement("script");
							script.src = jsSrc;
							$(document.body).append(script);
						}
						if ($(this).attr("src").indexOf("javaex-formVerify.js")>-1) {
							var jsSrc = $(this).attr("src");
							var script = document.createElement("script");
							script.src = jsSrc;
							$(document.body).append(script);
						}
					}
				});
			},

			// 左侧菜单
			menu : function(args) {
				var opt = defaults(args);
				var menuId = opt.id;

				// 左侧菜单 —— 展开/收起
				$("#"+menuId+" .menu-item>a").on("click", function() {
					if ($(this).next().css("display")=="none") {
						$(".menu-item").children("ul").slideUp(300);
						$(this).next("ul").slideDown(300);
						$(this).parent("li").addClass("menu-show").siblings("li").removeClass("menu-show");
					} else {
						$(this).next("ul").slideUp(300);
						$(".menu-item.menu-show").removeClass("menu-show");
					}
				});
				// 选中菜单高亮
				$("#"+menuId+" li.menu-item").click(function() {
					// 没有展开菜单时，其本身高亮
					if ($(this).children().length==1) {
						addHover($(this));
					}
				});
				$("#"+menuId+" .menu-item ul li").click(function() {
					addHover($(this));
				});
				
				/**
				 * 为选中菜单添加高亮
				 */
				function addHover(obj) {
					// 清除所有菜单项的高亮
					$("#"+menuId+" li.menu-item").removeClass("hover");
					$("#"+menuId+" .menu-item ul li").removeClass("hover");
					// 为当前点击菜单添加高亮
					obj.addClass("hover");
				}

				// 是否自动选中高亮
				if (opt.isAutoSelected) {
					// 标识有没有找到匹配的链接
					var flag = false;
					
					// 获取当前页面的url
					var url = window.location.href;
					// 自动高亮菜单
					menuSelected(url);
					
					// 未找到匹配的链接时，从cookie中取上一次获取的链接，并高亮该链接
					if (flag==false) {
						var url = getCookie("menuUrl");
						// 自动高亮菜单
						menuSelected(url);
					}
				}
				
				/**
				 * 设置菜单自动选中
				 */
				function menuSelected(url) {
					// 遍历导航
					$("#"+menuId+" li").each(function() {
						var href = $(this).children().first().attr("href");
						if (url.indexOf(href)>=0) {
							// 找到匹配的链接时，设置cookie
							flag = true;
							setCookie("menuUrl", url);
							
							// 判断该菜单是不是展开菜单
							if ($(this).hasClass("menu-item")) {
								// 没有展开菜单时，其本身高亮
								// 清除所有菜单项的高亮
								$("#menu li.menu-item").removeClass("hover");
								$("#menu .menu-item ul li").removeClass("hover");
								// 为当前点击菜单添加高亮
								$(this).addClass("hover");
							} else {
								$(this).addClass("hover").siblings().removeClass("hover");
								$(this).parent().parent().addClass("menu-show");
							}
						}
					});
				}
				
				/**
				 * 设置cookie
				 */
				function setCookie(key, value) {
					document.cookie = key+"="+value+"; expires=-1";
				}
				
				/**
				 * 获取cookie
				 */
				function getCookie(key) {
					var keyName = key + "=";
					var arr = document.cookie.split(";");
					for (var i=0; i<arr.length; i++) {
						var cookieName = arr[i].trim();
						if (cookieName.indexOf(keyName)==0) {
							return cookieName.substring(keyName.length, cookieName.length);
						}
					}
					return "";
				}
			},

			// Tab切换
			tab : function(args) {
				var opt = defaults(args);
				var tabId = opt.id;
				var current = opt.current;
				var mode = opt.mode;
				var display = opt.display;

				// 为当前选中的选项卡添加样式
				$("#" + tabId + " .tab-title ul li").each(function(i) {
					if (i==(current-1)) {
						$(this).addClass("current");
					}
				});

				// 显示当前选中的选项卡的内容，隐藏其他选项卡的内容
				$("#" + tabId + " .tab-content>div").each(function(i) {
					if (i==(current-1)) {
						$(this).css("display", display);
					} else {
						$(this).css("display", "none");
					}
				});

				// 判断鼠标移动切换还是鼠标点击切换
				if (mode=="mouseover") {
					$("#" + tabId + " .tab-title ul li").mouseover(function() {
						$this = $(this);
						setTimeout(function() {
							$this.addClass("current").siblings().removeClass("current");
							$("#" + tabId + " .tab-content>div:eq(" + $this.index() + ")").show().siblings().hide();
						}, opt.delay);
					});
				} else if (mode=="click") {
					$("#" + tabId + " .tab-title ul li").click(function() {
						$(this).addClass("current").siblings().removeClass("current");
						$("#" + tabId + " .tab-content>div:eq(" + $(this).index() + ")").show().siblings().hide();	
					});
				}
			},

			// 表格
			table : function(args) {
				var opt = defaults(args);
				var tableId = opt.id;
				var colArr = opt.colArr;

				for (var i in colArr) {
					// colArr[i]-1是因为数组从0开始计算，而页面默认第一行或第一列从1开始计算
					tableMerge($("#"+tableId), colArr[i]-1);
				}

				// 清理数据：removeData() 方法移除之前通过 data() 方法设置的数据
				$("#"+tableId).removeData();

				/**
				 * 表格根据内容自动合并
				 */
				function tableMerge(obj, colIndex) {
					 // 存放单元格内容
					obj.data("content", "");
					// rowspan，是HTML语言中的一个对象属性。通常使用在td与th标签中，可以实现表格中一列跨越多行
					// 默认为1，即不跨行
					obj.data("rowspan", 1);
					// 与上一行比较结果不同的td, 默认一个"空"的jquery对象
					// 例如合并前3行，则表示第4行的td
					obj.data("td", $());
					// 表格的总行数，用于最后一行做特殊处理时进行判断之用
					obj.data("trNum", $("tbody tr", obj).length);
					// 遍历每一行的数据，关键是定位td, 和其对应的rowspan
					$("tbody tr", obj).each(function(index) {
						var $tr = $(this);
						// :eq() 选择器选取带有指定 index 值的元素。td:eq中的colIndex即列索引
						var $td = $("td:eq(" + colIndex + ")", $tr);
						var currentContent = $td.html();

						// 根据内容自动合并
						if (obj.data("content")=="") {
							obj.data("content", currentContent);
							obj.data("td", $td);
						} else {
							// 当前行的内容与上一行相同时
							if (obj.data("content")==currentContent) {
								// rowspan累加
								addRowspan();
							} else {
								// 重新指定一个新的rowspan
								newRowspan();
							}
						}

						/**
						 * rowspan累加
						 */
						function addRowspan() {
							var rowspan = obj.data("rowspan") + 1;
							obj.data("rowspan", rowspan);
							$td.hide();
							// 最后一行的情况比较特殊一点
							// 比如最后2行 td中的内容是一样的, 那么到最后一行就应该把此时的td里保存的td设置rowspan
							if (++index == obj.data("trNum")) {
								obj.data("td").attr("rowspan", obj.data("rowspan"));
							}
						}

						/**
						 * 重新指定一个新的rowspan
						 */
						function newRowspan() {
							// rowspan默认为1，如果统计出的rowspan没有变化，则不处理
							if (obj.data("rowspan")!=1) {
								obj.data("td").attr("rowspan", obj.data("rowspan"));
							}
							// 保存第一次出现不同内容的td, 和其内容, 重置rowspan
							obj.data("td", $td);
							obj.data("content", $td.html());
							obj.data("rowspan", 1);
						}
					});
				}
			},

			// select下拉选择框
			select : function(args) {
				var opt = defaults(args);
				var selectId = opt.id;
				
				// 先隐藏页面的select元素
				$("#"+selectId).css("display", "none");
				
				// 生成样式代码
				var selectHtml = '<span id="span-'+selectId+'" style="position: relative;">';
				if (opt.isSearch==true) {
					// 判断是否去除阴影
					if ($("#"+selectId).hasClass("no-shadow")) {
						selectHtml += '<input id="input-'+selectId+'" type="text" class="select no-shadow" oninput="javaex.selectSearch(\''+selectId+'\', this.value)" />';
					} else {
						selectHtml += '<input id="input-'+selectId+'" type="text" class="select" oninput="javaex.selectSearch(\''+selectId+'\', this.value)" />';
					}
				} else {
					// 判断是否去除阴影
					if ($("#"+selectId).hasClass("no-shadow")) {
						selectHtml += '<input id="input-'+selectId+'" type="text" class="select no-shadow" readonly />';
					} else {
						selectHtml += '<input id="input-'+selectId+'" type="text" class="select" readonly />';
					}
				}
				selectHtml += '<span id="icon-'+selectId+'" class="icon-chevron-down"></span>';
				selectHtml += '<ul id="ul-'+selectId+'" class="select-ul">';
				selectHtml += '</ul>';
				selectHtml += '</span>';
				$("#"+selectId).before(selectHtml);
				
				// 设置箭头样式
				$("#icon-"+selectId).css({
					"position" : "absolute",
					"right" : "6px",
					"font-size" : "20px",
					"color" : "#999",
					"top" : "0"
				});
				
				// 改变样式大小
				var zoom = $("#"+selectId).attr("zoom");
				if (zoom!=null) {
					$("#span-"+selectId).css("zoom", zoom);
				}
				
				// 设置宽度
				// 获取选项最大宽度
				var width = $("#"+selectId).width();
				if (width<140) {
					width = 140;
				}
				$("#input-"+selectId).css("width", width+"px");

				// 清空列表的内容
				$("#ul-"+selectId).empty();
				// 为列表添加内容
				$("#ul-"+selectId).html($("#"+selectId).html());
				// 添加属性
				$("#ul-"+selectId+" option").addClass("select-ul-item");
				// 选中默认值
				$("#ul-"+selectId+" option").each(function() {
					if ($(this).val()==$("#"+selectId).val()) {
						$(this).addClass("select-ul-item-selected");
						$("#input-"+selectId).val($(this).text());
						return false;
					}
				});

				// 设置下拉列表最大高度
				$("#ul-"+selectId).css("max-height", 28*parseInt(opt.maxNum)+2+"px");
				
				// 绑定select选择框的点击事件
				$("#span-"+selectId).click(function(event) {
					// 删除属性
					$("#ul-"+selectId+" option").removeClass("select-ul-item-selected");
					$("#ul-"+selectId+" option").each(function() {
						if ($(this).val()==$("#"+selectId).val()) {
							$(this).addClass("select-ul-item-selected");
							return false;
						}
					});
					// 显示每一项（因为检索过后，很多项都被隐藏了）
					$("#ul-"+selectId+" option").css("display", "block");
					// 显示ul
					$(this).find("ul").css({
						"width" : $(this).find("input").width()+22,
						"display" :"block"
					});
					// 该方法将停止事件的传播，阻止它被分派到其他 Document 节点。
					// 因为涉及到点击空白处隐藏select框，这里必须加这个方法
					event.stopPropagation();
				});

				// 选中某一项
				$("#ul-"+selectId+" option").on("click", function(event) {
					var selectValue = $(this).val();
					var selectName = $(this).text();
					
					// 设置元素select的值
					$("#"+selectId).val(selectValue);
					// 将文本回显到input框
					$("#input-"+selectId).val($(this).text());
					// 隐藏选择列表
					$("#ul-"+selectId).css("display", "none");
					
					// 回调函数
					opt.callback({
						"selectValue": selectValue,
						"selectName" : selectName
					});
					event.stopPropagation();
				});

				// 点击空白处隐藏select框
				$(document).click(function() {
					$("#ul-"+selectId).css("display", "none");
				});
			},
			selectSearch : function(selectId, keyword) {
				var count = 0;
				// 如果检索内容为空
				keyword = keyword.replace(/(^\s*)|(\s*$)/g, "");
				if (keyword=="") {
					// 则显示所有选项
					$("#ul-"+selectId+" option").show();
				} else {
					// 遍历匹配每一个选项
					$("#ul-"+selectId+" option").each(function(i) {
						// 因为indexOf()方法对大小写敏感，所以这里强制转化为小写后再匹配
						// 如果当前选项不匹配
						if ($(this).text().toLowerCase().indexOf(keyword.toLowerCase())==-1) {
							$(this).css("display", "none");
							count++;
						} else {
							$(this).css("display", "block");
						}
					});
				}
			},
			
			// page分页
			page : function(args) {
				var opt = defaults(args);
				var pageId = opt.id;
				// 获取总页数
				var pageCount = opt.pageCount;
				if (pageCount==null) {
					return false;
				}
				// 获取默认选中页
				var currentPage = opt.currentPage;
				if (currentPage<1 || currentPage>pageCount) {
					currentPage = 1;
				}
				// 获取显示位置
				var position = opt.position;
				$("#"+pageId).parent().css("margin", "16px 0");
				if (position=="left") {
					$("#"+pageId).parent().css("text-align", "left");
				} else if (position=="center") {
					$("#"+pageId).parent().css("text-align", "center");
				} else if (position=="right") {
					$("#"+pageId).parent().css("text-align", "right");
				}
				
				// 判断总页数数量
				if (pageCount<=1) {
					$("#"+pageId).append('');
					return;
				} else if (pageCount<7) {
					var html = '<li><a aria-label="Previous">首页</a></li><li><a>上一页</a></li>';
					for (var i=1; i<=pageCount; i++) {
						if (i==currentPage) {
							html += '<li class="active" page="'+i+'"><a>'+i+'</a></li>';
						} else {
							html += '<li page="'+i+'"><a>'+i+'</a></li>';
						}
					}
					html += '<li><a>下一页</a></li><li><a aria-label="Next">尾页</a></li>';
					$("#"+pageId).append(html);
					init(pageId);
				} else {
					newPages(pageId, "jump", currentPage);
				}

				/**
				 * 初始化
				 */
				function init(pageId) {
					// 监听点击分页事件
					$("#"+pageId).children("li").click(function() {
						// 当前点击对象（点击非数字时，需要改变）
						var element = $(this);
						// 当前点击的是第几页
						var pageText = $(this).children("a").text();
						// 当前页
						var currentPage = "";
						// 上一页
						var lastPage = $("#"+pageId).children("li.active").attr("page");
						// 判断点击的是数字页还是上一页、下一页之类的
						if (isNaN(pageText)) {
							switch (pageText) {
								case "首页":
									if (lastPage=="1") {
										return;
									}
									if (pageCount>6) {
										newPages(pageId, "首页", 1);
									}
									element = $("#"+pageId).children("li[page=1]");
									break;
								case "上一页":
									if (lastPage=="1") {
										return;
									}
									if (lastPage>=(pageCount-1) || lastPage<=3 || pageCount<7) {
										element = $("#"+pageId).children("li.active").prev();
									} else {
										newPages(pageId, "prev", (parseInt(lastPage)-1));
										element = $("#"+pageId).children("li.active");
									}
									break;
								case "下一页":
									if (lastPage==pageCount) {
										return;
									}
									if (lastPage>=(pageCount-2) || lastPage<3 || pageCount<7) {
										element = $("#"+pageId).children("li.active").next();
									} else {
										newPages(pageId, "next", (parseInt(lastPage)+1));
										element = $("#"+pageId).children("li.active");
									}
									break;
								case "尾页":
									if (lastPage==pageCount) {
										return;
									}
									if (pageCount>6) {
										newPages(pageId, "尾页", pageCount);
									}
									element = $("#"+pageId).children("li[page=" + pageCount + "]");
									break;
								case "...":
									return;
							}
						} else {
							if (pageCount>6) {
								if (pageText<=3 || pageText>=(pageCount-3)) {
									newPages(pageId, "jump", pageText);
								}
							}
						}

						currentPage = activePage(pageId, element);
						if (currentPage!="" && currentPage!=lastPage) {
							opt.callback(currentPage);
						}
					});
				}

				/**
				 * 激活页
				 */
				function activePage(pageId, element) {
					element.addClass("active").siblings().removeClass("active");
					return $("#"+pageId).children("li.active").text();
				}

				function newPages(pageId, type, i) {
					var htmlLeft = "";
					var htmlRight = "";
					var htmlC = "";
					var HL = '<li><a>...</a></li>';
					var html = '<li><a aria-label="Previous">首页</a></li><li><a>上一页</a></li>';
					for (var n=0; n<3; n++) {
						htmlC += '<li '+((n-1)==0?'class="active"':'')+' page="'+(i+n-1)+'"><a>'+(i+n-1)+'</a></li>';
						htmlLeft += '<li '+((n+2)==i?'class="active"':'')+' page="'+(n+2)+'"><a>'+(n+2)+'</a></li>';
						htmlRight += '<li '+((pageCount+n-3)==i?'class="active"':'')+' page="'+(pageCount+n-3)+'"><a>'+(pageCount+n-3)+'</a></li>';
					}

					switch (type) {
						case "next":
							if (i<=4) {
								html += '<li page="1"><a>1</a></li>' + htmlLeft + HL + '<li page="'+pageCount+'"><a>' + pageCount + '</a></li>';
							} else if (i>=(pageCount-3)) {
								html += '<li page="1"><a>1</a></li>' + HL + htmlRight + '<li page="'+pageCount+'"><a>' + pageCount + '</a></li>';
							} else {
								html += '<li page="1"><a>1</a></li>' + HL + htmlC + HL + '<li page="'+pageCount+'"><a>' + pageCount+'</a></li>';
							}
							break;
						case "prev":
							if (i<=4) {
								html += '<li page="1"><a>1</a></li>' + htmlLeft + HL + '<li page="'+pageCount+'"><a>'+pageCount+'</a></li>';
							} else if (i>=(pageCount-3)) {
								html += '<li page="1"><a>1</a></li>' + HL + htmlRight + '<li page="'+pageCount+'"><a>' + pageCount + '</a></li>';
							} else {
								html += '<li page="1"><a>1</a></li>' + HL + htmlC + HL + '<li page="'+pageCount+'"><a>' + pageCount + '</a></li>';
							}
							break;
						case "首页":
							html +='<li class="active" page="1"><a>1</a></li>' + htmlLeft + HL + '<li page="'+pageCount+'"><a>' + pageCount + '</a></li>';
							break;
						case "尾页":
							html += '<li page="1"><a>1</a></li>' + HL + htmlRight + '<li class="active" page="' + pageCount + '"><a>' + pageCount + '</a></li>';
							break;
						case "jump":
							if (i<=4) {
								if (i==1) {
									html += '<li class="active" page="1"><a>1</a></li>' + htmlLeft + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>';
								} else {
									html += '<li page="1"><a>1</a></li>' + htmlLeft + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>';
								}
							} else if((i>=pageCount-3) && (pageCount>=7)) {
								if (i==pageCount) {
									html += '<li page="1"><a>1</a></li>' + HL + htmlRight + '<li class="active" page="' + pageCount + '"><a>' + pageCount + '</a></li>';
								}else{
									html += '<li page="1"><a>1</a></li>' + HL + htmlRight + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>';
								}
							} else {
								html += '<li page="1"><a>1</a></li>' + HL + htmlC + HL + '<li page="' + pageCount + '"><a>' + pageCount + '</a></li>';
							}
					}
					html += '<li><a>下一页</a></li><li><a aria-label="Next">尾页</a></li>';
					if (pageCount> 5 || pageCount< 3) {
						$("#"+pageId).empty();
						$("#"+pageId).append(html);
						init(pageId);
					}
				}
			},

			// 日期选择
			date : function(args) {
				var opt = defaults(args);
				var dateId = opt.id;

				// 是否清空
				var isClear = false;
				// 记录初始值，以此来控制取消按钮事件
				var initDate = "";
				var initStart = "";
				var initEnd = "";
				// 开始日期和结束日期的中间日期
				var hideMidDate = 0;

				// 默认日历参数最大是2
				var monthNum = Math.min(opt.monthNum, 2);

				// 初始化日期选择器面板的HTML代码
				var dateHtml = '<div id="date-box-' + dateId + '" class="date-main date-ui" style="display: none;">';
				dateHtml += '<div class="date-body date-ui" id="date-list-' + dateId + '">';
				dateHtml += '</div>';
				dateHtml += '<div class="date-foot date-ui">';
				dateHtml += '<div class="form-msg" style="display:none;">';
				dateHtml += '<input type="text" id="hide-start-' + dateId + '" value="' + opt.startDate + '" readonly />';
				dateHtml += '<span> - </span>';
				dateHtml += '<input type="text" id="hide-end-' + dateId + '" value="' + opt.endDate + '" readonly />';
				dateHtml += '<input type="text" id="hide-date-' + dateId + '" value="' + opt.date + '" readonly />';
				dateHtml += '</div>';
				dateHtml += '<div class="form-btn">';
				dateHtml += '<button class="button gray btn-left" id="date-clear-' + dateId + '">清空</button>';
				dateHtml += '<button class="button wathet btn-left" id="date-cancel-' + dateId + '">取消</button>';
				dateHtml += '<button class="button blue btn-right" id="date-ok-' + dateId + '">确定</button>';
				dateHtml += '</div>';
				dateHtml += '</div>';
				dateHtml += '</div>';
				$(document.body).append(dateHtml);

				// 初始化
				init();
				// 关闭日期选择框，并把结果回显到输入框
				close(true);

				// 日期框的点击事件
				$("#"+dateId).bind("click", function() {
					if (monthNum==1) {
						initDate = document.getElementById("hide-date-"+dateId).value;
					} else {
						initStart = document.getElementById("hide-start-"+dateId).value;
						initEnd = document.getElementById("hide-end-"+dateId).value;
						
						// 获取开始日期和结束日期的中间日期
						if (initStart!="" && initEnd!="") {
							var hideStartDate = str2date(initStart).getTime();
							var hideEndDate = str2date(initEnd).getTime();
							hideMidDate = hideStartDate + (hideEndDate - hideStartDate)/2;
						}
					}

					init();
					show();
					return;
				});
				// 日期选择确定按钮的点击事件
				$("#date-ok-"+dateId).bind("click", function() {
					close(true);
					// 设置回调函数，返回一个时间对象，包含开始和结束时间
					opt.callback({
						"startDate": $("#hide-start-"+dateId).val(), 
						"endDate": $("#hide-end-"+dateId).val(),
						"date": $("#hide-date-"+dateId).val()
					});
					return;
				});
				// 日期选择取消按钮的点击事件
				$("#date-cancel-"+dateId).bind("click", function() {
					// 重新赋值
					if (monthNum==1) {
						document.getElementById("hide-date-"+dateId).value = initDate;
					} else {
						document.getElementById("hide-start-"+dateId).value = initStart;
						document.getElementById("hide-end-"+dateId).value = initEnd;
					}

					close();

					isClear = false;
					return;
				});
				// 日期选择清空按钮的点击事件
				$("#date-clear-"+dateId).bind("click", function() {
					var date = document.getElementById("hide-date-"+dateId).value;
					var start = document.getElementById("hide-start-"+dateId).value;
					var end = document.getElementById("hide-end-"+dateId).value;

					// 先清除样式
					if (monthNum==1) {
						document.getElementById("hide-date-"+dateId).value = "";
					} else {
						document.getElementById("hide-start-"+dateId).value = "";
						document.getElementById("hide-end-"+dateId).value = "";
					}
					removeCSS();

					isClear = true;
					return;
				});

				/**
				 * 日期选择器初始化
				 */
				function init() {
					var exDate = this;
					// 清空日期列表的内容
					$("#date-list-"+dateId).empty();

					// 如果结束日期为空，则取当天的日期为结束日期
					var endDate = "";
					if (opt.endDate=="") {
						endDate = new Date();
					} else {
						endDate = str2date(opt.endDate);
					}

					// 日历结束时间
					this.calendarEndDate = new Date(endDate.getFullYear(), endDate.getMonth()+1, 0);

					// 计算并显示以 endDate 为结尾的最近几个月的日期列表
					for (var i=0; i<monthNum; i++) {
						var td = "";
						td = fillDate(endDate.getFullYear(), endDate.getMonth(), i);
						if (0==i) {
							$("#date-list-"+dateId).append(td);
						} else {
							var firstTd = $("#date-list-"+dateId).find("table").get(0);
							$(firstTd).before(td);
						}
						endDate.setMonth(endDate.getMonth()-1, 1);
					}
					// 日历开始时间
					this.calendarStartDate = new Date(endDate.getFullYear(), endDate.getMonth()+1, 1);

					// 上一年
					$("#last-year-"+dateId).bind("click", function() {
						exDate.calendarEndDate.setFullYear(exDate.calendarEndDate.getFullYear()-1, exDate.calendarEndDate.getMonth(), 1);
						opt.endDate = date2ymd(exDate.calendarEndDate).join("-");
						init();
						return;
					});
					// 上一个月
					$("#last-month-"+dateId).bind("click", function() {
						exDate.calendarEndDate.setMonth(exDate.calendarEndDate.getMonth()-1, 1);
						opt.endDate = date2ymd(exDate.calendarEndDate).join("-");
						init();
						return;
					});
					// 下一个月
					$("#next-month-"+dateId).bind("click", function() {
						exDate.calendarEndDate.setMonth(exDate.calendarEndDate.getMonth()+1, 1);
						opt.endDate = date2ymd(exDate.calendarEndDate).join("-");
						init();
						return;
					});
					// 下一年
					$("#next-year-"+dateId).bind("click", function() {
						exDate.calendarEndDate.setFullYear(exDate.calendarEndDate.getFullYear()+1, exDate.calendarEndDate.getMonth(), 1);
						opt.endDate = date2ymd(exDate.calendarEndDate).join("-");
						init();
						return;
					});
					// 添加样式
					addCSS();
				}

				/**
				 * 移除日历的样式
				 */
				function removeCSS() {
					// 整个日期列表的开始日期
					var csd = this.calendarStartDate;
					var ced = this.calendarEndDate;

					var bDate = new Date(csd.getFullYear(), csd.getMonth(), csd.getDate());
					var choice = "";
					// 从开始日期循环到结束日期
					for (var d=new Date(bDate); d.getTime()<=ced.getTime(); d.setDate(d.getDate()+1)) {
						// 移除日期样式
						choice = "choice-style";
						// 移除指定样式
						$("#date_" + date2ymd(d).join("-")).removeClass(choice);
						$("#date_" + date2ymd(d).join("-")).removeClass("started").removeClass("ended").removeClass("selected");
					}
				}

				/**
				 * 为选中的日期添加样式
				 */
				function addCSS() {
					// 展示的月份数为1时，视为单选日期
					if (monthNum==1) {
						// 获得选中日期
						var date = str2date($("#hide-date-"+dateId).val());
						// 为选中日期添加特殊样式
						$("#date_" + date2ymd(new Date(date)).join("-")).removeClass().addClass("ended");
						return;
					}

					// 获得开始、结束日期
					var startDate = str2date($("#hide-start-"+dateId).val());
					var endDate = str2date($("#hide-end-"+dateId).val());

					var choice = "";
					for (var d=new Date(startDate); d.getTime()<=endDate.getTime(); d.setDate(d.getDate()+1)) {
						// 添加日期样式
						choice = "choice-style";
						$("#date_" + date2ymd(d).join("-")).removeClass("started").removeClass("ended").removeClass("selected");
						$("#date_" + date2ymd(d).join("-")).removeClass(choice);
						$("#date_" + date2ymd(d).join("-")).attr("class", choice);
					}

					// 为开始、结束日期添加特殊样式
					$("#date_" + date2ymd(new Date(startDate)).join("-")).removeClass().addClass("started");
					$("#date_" + date2ymd(new Date(endDate)).join("-")).removeClass().addClass("ended");
				}

				/**
				 * 选择日期
				 * ymd : 时间字符串
				 */
				function selectDate(ymd) {
					isClear = false;

					// 格式化日期
					var ymdFormat = formatDate(ymd);

					// 如果是单选日期
					if (this.dateInput==("hide-date-" + dateId)) {
						// 移除样式
						removeCSS();
						// 为当前点添加样式
						$("#date_" + ymd).attr("class", "selected");
						// 更改对应输入框的值
						$("#" + this.dateInput).val(ymdFormat);
						return;
					}

					// 如果是范围日期
					// 如果没有选择日期
					if ($("#" + this.dateInput).val()=="") {
						// start、end input切换
						if (this.dateInput==("hide-start-" + dateId)) {
							// 移除样式
							removeCSS();
							// 为当前点添加样式
							$("#date_" + ymd).attr('class', "selected");
							// 更改对应输入框的值
							$("#" + this.dateInput).val(ymdFormat);
							this.dateInput = "hide-end-" + dateId;
						} else if (this.dateInput==("hide-end-" + dateId)) {
							// 如果开始时间未选
							if ($("#hide-start-"+dateId).val()=="") {
								this.dateInput = "hide-start-" + dateId;
								selectDate(ymd);
								return;
							}
							// 更改对应输入框的值
							$("#" + this.dateInput).val(ymdFormat);
							// 切换输入框焦点
							this.dateInput = "hide-start-" + dateId;
							
							// 如果endDateTime小于hideStartDate，则相互交换
							var hideStartDate = str2date($("#hide-start-"+dateId).val()).getTime();
							var hideEndDate = str2date($("#hide-end-"+dateId).val()).getTime();
							if (hideEndDate<hideStartDate) {
								var tmp = $("#hide-start-"+dateId).val();
								$("#hide-start-"+dateId).val($("#hide-end-"+dateId).val());
								$("#hide-end-"+dateId).val(tmp);
							}
							
							removeCSS();
							addCSS();
						}
					} else {
						var nowClickDate = str2date(ymdFormat).getTime()
						
						// 如果此次点击的日期比中间日期小
						if (nowClickDate<hideMidDate) {
							// 变更开始日期，结束日期不变
							$("#hide-start-"+dateId).val(ymdFormat);
						} else {
							// 如果此次点击的日期大于等于中间日期
							// 变更结束日期，开始日期不变
							$("#hide-end-"+dateId).val(ymdFormat);
						}
						removeCSS();
						addCSS();
						var hideStartDate = str2date($("#hide-start-"+dateId).val()).getTime();
						var hideEndDate = str2date($("#hide-end-"+dateId).val()).getTime();
						hideMidDate = hideStartDate + (hideEndDate - hideStartDate)/2;
					}
				}

				/**
				 * 显示日历
				 */
				function show() {
					var pos = $("#"+dateId).offset();
					var left = pos.left;
					if (opt.alignment=="right") {
						var width = $("#"+dateId).width();
						left = left + width - ($("#date-box-"+dateId).width()+20);
					}
					$("#date-box-"+dateId).css("display", "block");
					$("#date-box-"+dateId).css("left", left+"px");
					$("#date-box-"+dateId).css("top", pos.top+$("#"+dateId).height()+4+"px");
					// 展示的月份数为1时，视为单选日期
					if (monthNum==1) {
						this.dateInput = "hide-date-" + dateId;
					} else {
						this.dateInput = "hide-start-" + dateId;
					}
				}

				/**
				 * 关闭日期选择框
				 * isOk : 判断是否是点击确定按钮关闭的 
				 */
				function close(isOk) {
					if (isOk) {
						var str = "";
						// 判断此前是否按了清空按钮
						if (isClear) {
							if (monthNum==1) {
								document.getElementById("hide-date-"+dateId).value = "";
							} else {
								document.getElementById("hide-start-"+dateId).value = "";
								document.getElementById("hide-end-"+dateId).value = "";
							}
						} else {
							// 展示的月份数为1时，视为单选日期
							if (monthNum==1) {
								$("#"+dateId).val($("#hide-date-"+dateId).val());
							} else {
								if ($("#hide-end-"+dateId).val()=="") {
									$("#"+dateId).val($("#hide-start-"+dateId).val());
								} else {
									$("#"+dateId).val($("#hide-start-"+dateId).val() + opt.splitLine + $("#hide-end-"+dateId).val());
								}
							}

							// 展示的月份数为1时，视为单选日期
							if (monthNum==1) {
								str = $("#hide-date-"+dateId).val();
							} else {
								// 否则为日期范围
								// 只选了开始日期时。默认结束日期和开始日期为同一天
								if ($("#hide-end-"+dateId).val()=="") {
									$("#hide-end-"+dateId).val($("#hide-start-"+dateId).val())
								}
								str = $("#hide-start-"+dateId).val() + opt.splitLine + $("#hide-end-"+dateId).val();
								if (str==opt.splitLine) {
									str = "";
								}
							}
						}

						// 把时间显示到页面
						var obj = document.getElementById(dateId);
						if (obj && obj.tagName=="INPUT") {
							$("#"+dateId).val(str);
						} else {
							$("#"+dateId).html(str);
						}
						
						isClear = false;
					}
					// 隐藏日历框
					$("#date-box-"+dateId).css("display", "none");
				}

				/**
				 * 日期填充函数
				 * year : 年
				 * month : 月
				 */ 
				function fillDate(year, month, index) {
					var exDate = this;
					// 当月第一天
					var firstDayOfMonth = new Date(year, month, 1);
					var dateBegin = new Date(year, month, 1);
					var w = dateBegin.getDay();
					// 计算应该开始的日期
					dateBegin.setDate(1 - w);

					// 当月最后一天
					var lastDayOfMonth = new Date(year, month + 1, 0);
					var dateEnd = new Date(year, month + 1, 0);
					w = dateEnd.getDay();
					// 计算应该结束的日期
					dateEnd.setDate(dateEnd.getDate() + 6 - w);

					var today = new Date();
					var table = document.createElement("table");
					cap = document.createElement("caption");

					$(cap).append(year + "年" + (month + 1) + "月");
					$(table).append(cap);
					thead = document.createElement("thead");
					tr = document.createElement("tr");
					var days = ["日", "一", "二", "三", "四", "五", "六"];
					for (var i=0; i<7; i++) {
						th = document.createElement("th");
						$(th).append(days[i]);
						$(tr).append(th);
					}
					$(thead).append(tr);
					$(table).append(thead);

					tr = document.createElement("tr");
					td = document.createElement("td");
					// 如果是最后一个月的日期，则加上下一个月和下一年的链接
					if (index==0) {
						$(td).append('<a href="javascript:void(0);" id="next-month-'+dateId+'"><span class="icon-chevron-right2" style="position: absolute;top: 10px;right: 30px;color: #555;font-size: 14px;"></span></a>');
						$(td).append('<a href="javascript:void(0);" id="next-year-'+dateId+'"><span class="icon-next" style="position: absolute;top: 6px;right: 8px;color: #555;font-size: 20px;"></span></a>');
					}

					// 如果是第一个月的日期，则加上上一个月和上一年的链接
					if((index+1)==monthNum) {
						$(td).append('<a href="javascript:void(0);" id="last-year-'+dateId+'"><span class="icon-previous" style="position: absolute;top: 6px;left: 8px;color: #555;font-size: 20px;"></span></a>');
						$(td).append('<a href="javascript:void(0);" id="last-month-'+dateId+'"><span class="icon-chevron-left2" style="position: absolute;top: 10px;left: 30px;color: #555;font-size: 14px;"></span></a>');
					}

					$(td).attr("colSpan", 7);
					$(td).css("text-align", "center");
					$(tr).append(td);
					$(table).append(tr);

					// 当前月的所有日期(包括空白位置填充的日期)
					var tdClass = "";
					var deviation = 0;
					var ymd = "";
					for (var d=dateBegin; d.getTime()<=dateEnd.getTime(); d.setDate(d.getDate()+1)) {
						// 当前月之前的日期
						if (d.getTime()<firstDayOfMonth.getTime()) {
							tdClass = "ta_dateRangeGray";
							deviation = -1;
						} else if (d.getTime()>lastDayOfMonth.getTime()) {
							// 当前月之后的日期
							tdClass = "ta_dateRangeGray";
							deviation = 1;
						} else {
							// 当前月日期
							deviation = 0;
							tdClass = "";
						}

						// 如果是周日
						if (d.getDay()==0) {
							tr = document.createElement("tr");
						}

						td = document.createElement("td");
						td.innerHTML = d.getDate();
						if (tdClass!="") {
							$(td).attr("class", tdClass);
						}

						// 只有当前月可以点击
						if (deviation==0) {
							ymd = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
							$(td).attr("id", "date" + "_" + ymd);
							$(td).css("cursor", "pointer");
							(function(ymd) {
								$(td).bind("click", ymd, function() {
									selectDate(ymd);
									return;
								});
							})(ymd);
						}

						$(tr).append(td);

						// 如果是周六
						if (d.getDay()==6) {
							$(table).append(tr);
						}
					}
					return table;
				}

				/**
				 * 把时间字串转成时间格式
				 * str : 时间字符串
				 */ 
				function str2date(str) {
					var arr = str.split("-");
					// 返回日期格式
					return new Date(arr[0], arr[1]-1, arr[2]);
				}

				/**
				 * 把时间格式转成对象
				 * date : 时间
				 */ 
				function date2ymd(date) {
					return [date.getFullYear(), (date.getMonth() + 1), date.getDate()];
				}

				/**
				 * 日期格式化，前面加0
				 */ 
				function formatDate(ymd) {
					return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d) {
						if (m < 10) {
							m = '0' + m;
						}
						if (d < 10) {
							d = '0' + d;
						}
						return y + "-" + m + "-" + d;
					});
				}
			},
			
			// 文件上传
			upload : function(args) {
				var opt = defaults(args);
				
				var type = opt.type;	// 上传类型
				var url = opt.url;		// 请求路径
				var inputId = opt.id;	// <input type="file" />的id
				var containerId = opt.containerId;	// 图片容器id
				var maxNum = opt.maxNum;	// 文件上传数量上限
				var maxSize = opt.maxSize;	// 单张图片的大小上限，单位KB，0或空为不限制
				var param = opt.param;
				var imgUrl = opt.imgUrl;	// 图片回显地址
				var dataType = opt.dataType;// 图片上传后的返回类型
				
				if (type=="image") {
					// 点击上传
					$("#"+inputId).change(function() {
						// 得到上传图片按钮的图像文件
						var imageFile = $("#"+inputId)[0].files[0];

						// 校验图片类型
						if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imageFile.name)) {
							info.optTip({
								content : "图片类型必须是.gif,jpeg,jpg,png中的一种",
								type : "error"
							});
							return false;
						}
						
						// 校验图片大小
						if (maxSize=="" || maxSize==0 || maxSize=="0") {
							// 不校验
						} else {
							if (imageFile.size>(maxSize*1024)) {
								info.optTip({
									content : "图片过大，单张图片上限 "+maxSize+"KB",
									type : "error"
								});
								return false;
							}
						}
						
						if (dataType=="base64") {
							// 创建FileReader对象
							var reader = new FileReader();

							if (imageFile) {
								// onload表示文件读取完成并成功时，触发回调函数
								reader.onload = function (event) {
									// 得到图片的base64编码
									var base64Img = event.target.result;
									if (containerId!="") {
										$("#"+containerId+" img").attr("src", base64Img);
									}
									// 回调函数，返回图片的base64
									opt.callback(base64Img);
								};
							}
							// 使用FileReader对象的readAsDataURL方法来读取图像文件
							reader.readAsDataURL(imageFile);
						} else if (dataType=="url") {
							// 创建FormData对象
							var data = new FormData();
							// 为FormData对象添加数据
							data.append(param, imageFile);

							// 发送数据
							$.ajax({
								url : url,
								type : "post",
								data : data,
								dataType : "json",
								cache : false,
								contentType : false,
								processData : false,
								success : function(rtn) {
									opt.callback(rtn);
								},
								error:function() {
									info.optTip({
										content : "上传失败，可能跨域了",
										type : "error"
									});
								}
							});
						}
					});
				} else if (type=="images") {
					// 回显图片
					if (imgUrl!="" && imgUrl!=null) {
						// 定义一个数组，用来存储UUID
						var uuidArr = new Array();
						
						for (var i=0; i<imgUrl.length; i++) {
							// 生成随机id
							var UUID = info.generateID();
							uuidArr.push(UUID);
							
							var imgHtml = '<div id='+UUID+' class="upload-images-thumbnail" style="width:'+opt.width+'px;height:'+opt.height+'px;">';
							imgHtml += '<img src="'+imgUrl[i]+'" width="100%" />';
							imgHtml += '<div class="img-trash"><span class="icon-trash-can"></span></div>';
							imgHtml += '</div>';
							$("#"+containerId).append(imgHtml);
						}
						
						// 为每一张图片绑定事件
						imgBindEvent(uuidArr);
					}
					
					// 点击上传
					$("#"+inputId).change(function() {
						// 判断上传数量是否已达上限
						if ($("#"+containerId+" img").length>(parseInt(maxNum)-1)) {
							info.optTip({
								content : "最多上传"+maxNum+"张图片",
								type : "error"
							});
							return false;
						}
						
						if (dataType=="base64") {
							// 定义一个数组，用来存储UUID
							var uuidArr = new Array();
							var imgUrlArr = new Array();
							var count = 0;
							var fileLength = $("#"+inputId)[0].files.length;
							
							// 遍历得到上传的图片
							$.each($("#"+inputId)[0].files, function(i) {
								// 当前已经存在的图片数量
								var nowNum = $("#"+containerId+" img").length;
								if ((nowNum+i)<=(parseInt(maxNum)-1)) {
									// 生成随机id
									var UUID = info.generateID();
									uuidArr.push(UUID);
									// 获取图片
									var imageFile = $("#"+inputId)[0].files[i];
									
									// 校验图片类型
									if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(imageFile.name)) {
										info.optTip({
											content : "图片类型必须是.gif,jpeg,jpg,png中的一种",
											type : "error"
										});
										return false;
									}
									
									// 校验图片大小
									if (maxSize=="" || maxSize==0 || maxSize=="0") {
										// 不校验
									} else {
										if (imageFile.size>(maxSize*1024)) {
											info.optTip({
												content : "图片过大，单张图片上限 "+maxSize+"KB",
												type : "error"
											});
											return false;
										}
									}
									
									// 创建FileReader对象
									var reader = new FileReader();
									// onload表示文件读取完成并成功时，触发回调函数
									reader.onload = function(event) {
										// 得到图片的base64编码
										var base64Img = event.target.result;
										imgUrlArr.push(base64Img);

										var imgHtml = '<div id='+UUID+' class="upload-images-thumbnail" style="width:'+opt.width+'px;height:'+opt.height+'px;">';
										imgHtml += '<div class="img-trash"><span class="icon-trash-can"></span></div>';
										imgHtml += '<img src="'+base64Img+'" width="100%" />';
										imgHtml += '</div>';
										$("#"+containerId).append(imgHtml);

										// 为每一张图片绑定事件
										// 这里是个坑，写在循环体外无效，写在循环体内会调用多次。并且，每一次的UUID数组都是最终结果
										imgBindEvent(uuidArr);
										
										count++;
										if (count==fileLength) {
											// 回调函数
											opt.callback(imgUrlArr);
										}
									};
									// 使用FileReader对象的readAsDataURL方法来读取图像文件
									reader.readAsDataURL(imageFile);
								}
							});
						}
					});
					
					/**
					 * 为图片绑定事件
					 * uuidArr : 图片容器的id集合
					 */
					function imgBindEvent(uuidArr) {
						for (var i in uuidArr) {
							// 绑定鼠标移入事件
							$("#"+uuidArr[i]).on("mouseenter", {index:i}, function(event) {
								var i = event.data.index;
								$("#"+uuidArr[i]+" .img-trash").stop().animate({height:"30px"});
							});
							// 绑定鼠标移出事件
							$("#"+uuidArr[i]).on("mouseleave", {index:i}, function(event) {
								var i = event.data.index;
								$("#"+uuidArr[i]+" .img-trash").stop().animate({height:0});
							});
							// 绑定删除图片事件
							$("#"+uuidArr[i]+" .img-trash span").on("click", {index:i}, function(event) {
								var i = event.data.index;
								$("#"+uuidArr[i]).remove();

								var imgUrlArr = new Array();
								$("#"+containerId+" img").each(function() {
									imgUrlArr.push($(this).attr("src"));
								});

								// 回调函数
								opt.callback(imgUrlArr);
							});
						}
					}
				}
			},
			
			// 头像上传
			// 下列几个属性是为了防止属性值初始化，相当于全局变量
			ratio : 1,	// 初始化比例，缩放时会用到。没有特别需要，请勿更改
			dragAble : false,	// 图片是否可拖动（只有鼠标左键按在图片上时，才可以拖动）
			mouseX : 0,	// 鼠标按下时的X坐标
			mouseY : 0,	// 鼠标按下时的Y坐标
			imgDivId : "", // 本地上传的图片区域
			cutBox : "",	// 裁剪区域
			moveBox : "",	// 背景区域，可拖动
			dataUrl : "",	// 最终将图片地址返回给哪个input存储
			imgSrc : "",	// 裁剪后的图片的地址
			image : new Image(),
			uploadAvatar : function(obj, args) {
				var opt = defaults(args);
				info.imgDivId = opt.imgDivId;
				info.moveBox = opt.moveBox;
				info.cutBox = opt.cutBox;
				info.dataUrl = opt.dataUrl;
				
				// 创建FileReader对象
				var reader = new FileReader();
				// 得到上传图片按钮的图像文件
				var imageFile = obj.files[0];
				if (imageFile) {
					// onload表示文件读取完成并成功时，触发回调函数
					reader.onload = function (event) { 
						// 得到图片的base64编码
						info.imgSrc = event.target.result;
						// 图片预加载
						info.image.src = info.imgSrc;
						info.image.onload = function() {
							$("#"+opt.moveBox).hide();
							// 设置图片显示
							info.setBackgroundImage();
							// 头像预览
							info.headPreview();
							
							// 为图片div区域绑定鼠标滚动缩放事件
							$("#"+info.imgDivId).bind("mousewheel DOMMouseScroll", info.imageZoom);
							// 为图片div区域绑定鼠标左键按下事件
							$("#"+info.imgDivId).bind("mousedown", info.mouseDown);
							// 为图片div区域绑定鼠标拖动图片事件
							$("#"+info.imgDivId).bind("mousemove", info.imageDrag);
							// 为整个窗口绑定鼠标左键弹起事件
							$(window).bind("mouseup", info.mouseUp);
						};
					};
				}
				// 使用FileReader对象的readAsDataURL方法来读取图像文件
				reader.readAsDataURL(imageFile);
			},
			// 放大
			enlarge: function() {
				this.ratio = this.ratio * 1.1;
				info.setBackgroundImage();
			},
			// 缩小
			narrow: function() {
				this.ratio = this.ratio * 0.9;
				info.setBackgroundImage();
			},
			// 在图片div区域显示图片
			setBackgroundImage : function() {
				// 缩放后的图片宽、高
				var zoomImgWidth = parseInt(info.image.width) * info.ratio;
				var zoomImgHeight = parseInt(info.image.height) * info.ratio;
				// 缩放后的图片左上角，距离背景层左上角的距离：x、y
				var posX = ($("#"+info.imgDivId).width() - zoomImgWidth) / 2;
				var posY = ($("#"+info.imgDivId).height() - zoomImgHeight) / 2;
				// 为图片div添加样式
				$("#"+info.imgDivId).css({
					"background-image" : "url(" + info.image.src + ")",
					"background-repeat" : "no-repeat",
					"background-size" : zoomImgWidth + "px " + zoomImgHeight + "px",
					"background-position" : posX + "px " + posY + "px"
				});
			},
			// 鼠标滚轮滚动实现图片缩放
			imageZoom : function(event) {
				if (event.originalEvent.wheelDelta>0 || event.originalEvent.detail<0) {
					info.ratio = info.ratio * 1.1;
				} else {
					info.ratio = info.ratio * 0.9;
				}
				info.setBackgroundImage();
				info.headPreview();
			},
			// 鼠标左键按下
			mouseDown : function(event) {
				event.stopImmediatePropagation();

				// 设置图片可以被拖动
				info.dragAble = true;
				// 设置鼠标此刻所在的坐标
				info.mouseX = event.clientX;
				info.mouseY = event.clientY;
			},
			// 拖动图片
			imageDrag : function(event) {
				event.stopImmediatePropagation();

				// 只有鼠标左键按在图片上时，才可以拖动
				if (info.dragAble) {
					// 计算图片被拖动后，此时鼠标所在的坐标与拖动前所在的坐标之差
					var diffX = event.clientX - info.mouseX;
					var diffY = event.clientY - info.mouseY;

					// 分割图片左上角距离背景层左上角的距离：x、y
					var arr = $("#"+info.imgDivId).css("background-position").split(" ");

					// 得到新的图片左上角距离背景层左上角的距离：x、y
					var posX = diffX + parseInt(arr[0]);
					var posY = diffY + parseInt(arr[1]);

					// 重新设置图片div区域的属性
					$("#"+info.imgDivId).css("background-position", posX + "px " + posY + "px");

					// 重新记录鼠标所在的坐标
					info.mouseX = event.clientX;
					info.mouseY = event.clientY;
				}
			},
			// 鼠标左键弹起
			mouseUp : function(event) {
				event.stopImmediatePropagation();
				info.dragAble = false;
				info.headPreview();
			},
			// 头像预览
			headPreview : function() {
				var cutBoxWidth = $("#"+info.cutBox).width();
				var cutBoxHeight = $("#"+info.cutBox).height();

				var canvas = document.createElement("canvas");
				var posArr = $("#"+info.imgDivId).css("background-position").split(" ");
				var sizeArr = $("#"+info.imgDivId).css("background-size").split(" ");
				var swidth = parseInt(info.image.width);	// 被剪切图像的宽度
				var sheight = parseInt(info.image.height);	// 被剪切图像的高度
				var x = parseInt(posArr[0]) - $("#"+info.imgDivId).width()/2 + cutBoxWidth/2;	// 在画布上放置图像的 x 坐标位置
				var y = parseInt(posArr[1]) - $("#"+info.imgDivId).height()/2 + cutBoxHeight/2;	// 在画布上放置图像的 y 坐标位置
				var width = parseInt(sizeArr[0]);	// 要使用的图像的宽度。（伸展或缩小图像）
				var height = parseInt(sizeArr[1]);	// 要使用的图像的高度。（伸展或缩小图像）

				canvas.width = cutBoxWidth;
				canvas.height = cutBoxHeight;
				// 当前，唯一支持的是 "2d",它返回一个 CanvasRenderingContext2D 对象，使用它可以绘制到 Canvas 元素中。
				var context = canvas.getContext("2d");
				context.drawImage(info.image, 0, 0, swidth, sheight, x, y, width, height);
				// 用canvas的toDataURL()将图片转为dataURL(base64)
				var avatarPreviewImageSrc = canvas.toDataURL('image/png');

				// 填充预览头像
				$(".avatar180").html('');
				$(".avatar50").html('');
				$(".avatar30").html('');
				$(".avatar180").append('<img src="'+avatarPreviewImageSrc+'" align="absmiddle" style="width:180px;border-radius:180px;">');
				$(".avatar50").append('<img src="'+avatarPreviewImageSrc+'" align="absmiddle" style="width:50px;border-radius:50px;">');
				$(".avatar30").append('<img src="'+avatarPreviewImageSrc+'" align="absmiddle" style="width:30px;border-radius:30px;">');

				// 自动返回裁剪后的图片地址
				$("#"+info.dataUrl).val(avatarPreviewImageSrc);
			},

			// 富文本编辑器
			edit : function(args) {
				var opt = defaults(args);
				var editId = opt.id;
				var content = opt.content;
				
				// 生成随机id
				var UUID = info.generateID();
				
				var editHtml = '';
				editHtml += '<div class="edit-toolbar">';
				editHtml += '<div class="edit-btn-toolbar">';
				editHtml += '<a class="edit-btn edit-btn-fullscreen" title="全屏">';
				editHtml += '<div class="edit-icon-fullscreen edit-icon"></div>';
				editHtml += '</a>';
				editHtml += '<a class="edit-btn edit-btn-image" title="本地图片">';
				editHtml += '<div class="edit-icon">';
				editHtml += '<label for="'+UUID+'" style="display: inline-block; width:100%;height:100%;">';
				editHtml += '</label>';
				editHtml += '</div>';
				editHtml += '<input type="file" style="display:none;" id="'+UUID+'" accept="image/gif, image/jpeg, image/jpg, image/png" />';
				editHtml += '</a>';
				// 加粗
				editHtml += '<a class="edit-btn edit-btn-bold" title="加粗">';
				editHtml += '<div class="edit-icon"></div>';
				editHtml += '</a>';
				// 斜体
				editHtml += '<a class="edit-btn edit-btn-italic" title="斜体">';
				editHtml += '<div class="edit-icon"></div>';
				editHtml += '</a>';
				editHtml += '</div>';
				editHtml += '</div>';
				editHtml += '<div class="edit-editor-body">';
				editHtml += '<div class="edit-body-container" contenteditable="true">';
				if (content=="") {
					editHtml += '<p><br /></p>';
				} else {
					editHtml += '<p>'+content+'</p>';
				}
				editHtml += '</div>';
				editHtml += '</div>';
				$("#"+editId).append(editHtml);

				// 编辑器内容区域光标发生变化时，保存selection
				$("#"+editId+" .edit-body-container").bind("mouseup keyup", function() {
					// 保存当前范围
					saveCurRange();
					
					// 回调函数，返回完整html代码内容和纯文字内容
					opt.callback({
						"html": $("#"+editId+" .edit-body-container").html(),
						"text" : $("#"+editId+" .edit-body-container").text()
					});
				});
				
				// 图片上传
				var image = opt.image;
				if (image==null || image.dataType=="base64") {
					info.upload({
						type : "image",
						id : UUID,	// <input type="file" />的id
						dataType : "base64",		// 返回的数据类型：base64 或 url
						callback : function (rtn) {
							// 还原selection
							restoreSelection();
							// 插入图片
							execCommand("insertimage", false, rtn);
						}
					});
				} else {
					info.upload({
						type : "image",
						url : image.url,	// 请求路径
						id : UUID,	// <input type="file" />的id
						param : image.param,			// 参数名称，SSM中与MultipartFile的参数名保持一致
						dataType : "url",		// 返回的数据类型：base64 或 url
						callback : function (rtn) {
							// 还原selection
							restoreSelection();
							// 插入图片
							image.rtnData = rtn;
							if (image.prefix=="undefined" || image.prefix==undefined) {
								execCommand("insertimage", false, image.rtnData.data.imgUrl);
							} else {
								execCommand("insertimage", false, image.prefix+image.rtnData.data.imgUrl);
							}
						}
					});
				}
				
				// 加粗
				var isBold = false;
				$("#"+editId+" .edit-btn-bold").bind("click", function() {
					restoreSelection();
					execCommand("bold", false, null);
					
					if (isBold) {
						isBold = false;
						$(this).removeClass("edit-active");
					} else {
						isBold = true;
						$(this).addClass("edit-active");
					}
					return false;
				});
				
				// 斜体
				var isItalic = false;
				$("#"+editId+" .edit-btn-italic").bind("click", function() {
					restoreSelection();
					execCommand("italic", false, null);
					
					if (isItalic) {
						isItalic = false;
						$(this).removeClass("edit-active");
					} else {
						isItalic = true;
						$(this).addClass("edit-active");
					}
					return false;
				});
				
				// 当前范围
				var curRange = "";
				
				/**
				 * 获取当前的范围
				 */
				function getCurRange() {
					var selection = null;
					var range = null;
					var parentElement = null;
					var oEditArea = $("#"+editId+" .edit-body-container")[0];
					//获取选中区域
					selection = window.document.getSelection();
					if (selection.getRangeAt && selection.rangeCount) {
						range = window.document.getSelection().getRangeAt(0);
						parentElement = range.commonAncestorContainer;
					}
					// 判断选中区域是否在编辑区域
					if (parentElement && (parentElement.id==oEditArea.id || window.jQuery.contains(oEditArea, parentElement))) {
						return range;
					}
				}
				
				/**
				 * 保存当前的范围
				 */
				function saveCurRange() {
					curRange = getCurRange();
				}
				
				/**
				 * 还原selection
				 */
				function restoreSelection() {
					if (curRange) {
						var selection = null;
						selection = window.document.getSelection();
						selection.removeAllRanges();
						selection.addRange(curRange);
					}
				}
				
				/**
				 * 插入数据
				 * command ： 指令
				 * mode ： 交互方式
				 * data ： 数据
				 */
				function execCommand(command, mode, data) {
					// 执行指令
					document.execCommand(command, mode, data);

					// 回调函数，返回完整html代码内容和纯文字内容
					opt.callback({
						"html": $("#"+editId+" .edit-body-container").html(),
						"text" : $("#"+editId+" .edit-body-container").text()
					});
				}
			}
		};

		return info;
	};
	window.javaex = javaex();
})();
