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

				// 弹出层属性
				content : "",	// 弹出层内容
				confirmName : "确定",	// 确定按钮名称
				cancelName : "取消",	// 取消按钮名称
				callback : function() {return true;},	// 回调函数
				type : "",	// 高级弹出层类型
				menu : "",	// 菜单弹出层内容
				live : 2000,	// 存在多少毫秒。1000毫秒=1秒
				delay : 2000,	// 延迟多少毫秒。1000毫秒=1秒
				title : "",		// 自定义弹出层的标题
				fill : "auto",	// 自定义弹出层的填充范围
				scriptArr : null,	// 自定义弹出层需要加载的JS

				// 上滑加载数据（分页）
				loadDataFunction : "",	// 请求数据的函数

				// tab选项卡切换
				current : 1,		// 默认显示第几个标签，从1开始计

				// 日期选择属性
				date : ""	// 默认显示哪一天
			};
			return $.extend(defaults, args);
		}

		var info = {
			// 生成一个不重复的id
			generateID : function() {
				return Date.now().toString(36) + Math.random().toString(36).substr(3, 3);
			},

			// 普通弹出层
			alert : function(args) {
				var opt = defaults(args);

				// 生成随机id
				var UUID = info.generateID();
				
				// 弹出层代码
				var alertHtml = '<div id=' + UUID + ' class="mask">';
				alertHtml += '<div class="container">';
				alertHtml += '<div class="dialog animated fadeInUp">';
				alertHtml += '<div class="dialog-content">';
				alertHtml += opt.content;
				alertHtml += '</div>';
				alertHtml += '<div class="dialog-button-container">';
				alertHtml += '<button class="button dialog-button" onclick="if('+opt.callback+'!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				alertHtml += '</div>';
				$(document.body).append(alertHtml);
			},

			// 确认选择弹出层
			confirm : function(args) {
				var opt = defaults(args);

				// 生成随机id
				var UUID = info.generateID();

				// 弹出层代码
				var confirmHtml = '<div id=' + UUID + ' class="mask">';
				confirmHtml += '<div class="container">';
				confirmHtml += '<div class="dialog animated fadeInUp">';
				confirmHtml += '<div class="dialog-content">';
				confirmHtml += opt.content;
				confirmHtml += '</div>';
				confirmHtml += '<div class="dialog-button-container">';
				confirmHtml += '<button class="button dialog-button" onclick="javaex.close(\'' + UUID + '\');">' + opt.cancelName + '</button>';
				confirmHtml += '<button class="button dialog-button" onclick="if('+opt.callback+'!=false)javaex.close(\'' + UUID + '\');">' + opt.confirmName + '</button>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				confirmHtml += '</div>';
				$(document.body).append(confirmHtml);
			},
			
			// 提示层
			tip : function(args) {
				var opt = defaults(args);

				// 生成随机id
				var UUID = info.generateID();
				
				// 弹出层代码
				var tipHtml = '<div id=' + UUID + ' class="tip">';
				tipHtml += '<div class="container">';
				tipHtml += '<div class="tip-content">';
				tipHtml += opt.content;
				tipHtml += '</div>';
				tipHtml += '</div>';
				tipHtml += '</div>';
				$(document.body).append(tipHtml);
				
				setTimeout(function() {
					var oDialog = document.getElementById(UUID);
					oDialog.remove();
				}, opt.live);
			},
			
			// 加载层
			loading : function(args) {
				var opt = defaults(args);
				// 生成随机id
				var UUID = info.generateID();
				
				var loadingHtml = '<div id=' + UUID + ' class="mask" style="background: rgba(0,0,0,0);">';
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
				$(".mask").remove();
			},
			
			// 高级弹出层
			dialog : function(args) {
				var opt = defaults(args);
				var type = opt.type;
				
				// 生成随机id
				var UUID = info.generateID();
				var dialogHtml = '';

				if (type=="menu") {
					// 生成菜单html代码
					var json = opt.menu;
					var menuHtml = '';
					for (var key in json) {
						if (json[key]=="") {
							menuHtml += '<button class="button dialog-button" onclick="javaex.close(\''+UUID+'\');" style="color: #999;">'+key+'</button>';
						} else {
							menuHtml += '<button class="button dialog-button" onclick="javaex.close(\''+UUID+'\');'+json[key]+';">'+key+'</button>';
						}
					}
					// 弹出层代码
					dialogHtml = '<div id=' + UUID + ' class="mask">';
					dialogHtml += '<div class="container">';
					dialogHtml += '<div class="dialog animated fadeInUp">';
					dialogHtml += '<div class="dialog-button-container vertical">';
					dialogHtml += menuHtml;
					dialogHtml += '</div>';
					dialogHtml += '</div>';
					dialogHtml += '</div>';
					dialogHtml += '</div>';
				} else if (type=="html") {
					var fill = opt.fill;
					var title = opt.title;
					var scriptArr = opt.scriptArr;
					
					// 弹出层代码
					dialogHtml += '<div id=' + UUID + ' class="popup">';
					if (title!="") {
						dialogHtml += '<div class="dialog-title">' + opt.title + '</div>';
						dialogHtml += '<span class="icon-x" style="position: absolute;right: 10px;top: 0;line-height: 1.25rem;font-size: 0.6rem;color:#666;" onclick="javaex.close(\'' + UUID + '\');"></span>';
					}
					dialogHtml += '<div class="operation">' + opt.content + '</div>';
					dialogHtml += '<div class="button-cancel" onclick="javaex.close(\'' + UUID + '\');">关闭</div>';
					dialogHtml += '</div>';
					if (scriptArr!=null) {
						for (var i in scriptArr) {
							dialogHtml += '<script src='+scriptArr[i]+'></script>';
						}
					}
				}
				
				$(document.body).append(dialogHtml);

				if (type=="html") {
					// 设置高度
					if (fill=="auto") {
						
					} else if (fill=="100%") {
						if (title=="") {
							$(".popup .operation").css("height", $(document).height()-$(".button-cancel").height()-32 + "px");
						} else {
							$(".popup .operation").css("height", $(document).height()-$(".dialog-title").height()-$(".button-cancel").height()-32 + "px");
						}
					} else {
						if (title=="") {
							$(".popup .operation").css("height", $(document).height()-$(document).height()*parseInt(fill)/100-$(".button-cancel").height()-32 + "px");
						} else {
							$(".popup .operation").css("height", $(document).height()-$(document).height()*parseInt(fill)/100-$(".dialog-title").height()-$(".button-cancel").height()-32 + "px");
						}
					}
					
					// 添加遮罩
					$("#"+UUID).before('<div class="mask"></div>');
					// 显示弹出层
					$("#"+UUID).css("transform", "translateY(0px)");

					// 点击遮罩隐藏
					$(".mask").click(function() {
						$(".mask").remove();
						$("#"+UUID).css("transform", "translateY(100%)");
						setTimeout(function() {
							info.close(UUID);
						}, 300);
					});
				}
			},

			// 关闭弹出层
			close : function(UUID) {
				// 关闭遮罩层
				var ogMask = document.querySelector(".g-mask");
				var oDialog = document.getElementById(UUID);
				if (ogMask!=null) {
					ogMask.remove();
					oDialog.style.bottom = -(oDialog.offsetHeight) + "px";
					// 删除地鼠动画
					oDialog.classList.remove("fadeInUp");
					// 添加缓慢降落动画
					oDialog.classList.add("fadeInDown");
					setTimeout(removeDialog, 300);
				} else {
					// 删除弹出层
					oDialog.remove();
					var oMask = document.querySelector(".mask");
					if (oMask!=null) {
						oMask.remove();
					}
				}

				// 删除弹出层
				function removeDialog() {
					oDialog.remove();
				}
			},

			// 重新渲染
			render : function() {
				$("script").each(function () {
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

			// 导航
			nav : function(args) {
				var opt = defaults(args);

				// 左侧滑动菜单
				if (opt.type=="slide") {
					// 判断是否存在底部功能栏
					if ($("#slide-bottom")!=null) {
						var height = $("#slide-bottom").height();
						// 重新设置导航菜单的高度
						$("#slide-list").css("height", "calc(100% - " + (160+height) + "px)");
					}

					// 添加遮罩
					$("#slide-nav").before('<div class="mask"></div>');
					// 显示导航
					$("#slide-nav").css("transform", "translateX(" + $("#slide-nav").width() + "px)");

					// 点击遮罩隐藏导航
					$(".mask").click(function() {
						$(".mask").remove();
						$("#slide-nav").css("transform", "translateX(0px)");
					});
				} else if (opt.type=="guide") {
					// 为子级 ul 添加和去除 active 属性
					if ($("#guide-nav > ul").hasClass("active")) {
						$("#guide-nav > ul").removeClass("active");
						$("#guide-nav ul").css("height", "1rem");
					} else {
						// 查询 li 的个数
						var liCount = $("#guide-nav > ul > li").length;
						// 判断可以分成几行 2.1表示视为3
						var row = Math.ceil((liCount+1)/5);
						$("#guide-nav > ul").addClass("active");
						// 设置高度
						$("#guide-nav ul.active").css("height", (row+0.2) + "rem");
					}
				}
			},

			// 滚动公告
			roll : function(args) {
				var opt = defaults(args);
				
				var fn = function() {
					$("#" + opt.id).find("ul:first").animate({
						"margin-top": "-0.5rem"
					}, 2000, function() {
						$(this).css("margin-top", 0).find("li:first").appendTo(this);
					});
				};

				// setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
				setInterval(fn, opt.delay);
			},

			// 以下这些属性相当于全局变量，用于重复赋值与使用
			loadDataFunction : "",	// 请求数据的函数
			isDataLoaded : false,	// 是否已滚动加载
			isOver : "",			// 哪一块内容区域已经没有更多数据了
			documentHeight : "",	// 文档高度
			loadDistance : 0,	// 滑到哪里开始触发加载
			windowHeight : "",	// 屏幕高度
			// 上拉加载，相当于分页
			page : function(args) {
				var opt = defaults(args);
				var pageId = opt.id;

				info.loadDataFunction = opt.loadDataFunction;
				info.documentHeight = $(document).height();
				info.windowHeight = document.documentElement.clientHeight;

				init();

				function init() {
					// 事先在下方插入加载站位div
					var obj = document.getElementById("infinite-scroll-preloader-"+pageId);
					if (obj==null) {
						$("#"+pageId).after('<div id="infinite-scroll-preloader-'+pageId+'" class="infinite-scroll-preloader"></div>');
					}

					// 判断是否存在固定底部的footer
					var oFooter = document.getElementById("footer");
					if (oFooter!=null) {
						// 判断底部固定是否是可见的
						if ($("#footer").is(":visible")==true) {
							// 为站位加载区域添加下边距
							$("#infinite-scroll-preloader-"+pageId).css("margin-bottom", oFooter.offsetHeight + "px");
						}
					}
	
					// 滑到站位加载区2/3处时加载数据
					info.loadDistance = Math.floor($("#infinite-scroll-preloader-"+pageId).height()*1/3);

					// 加载下方数据
					$(window).on('scroll',function(){
						// 滚动页面触发加载数据
						if (!info.isDataLoaded
							&& info.isOver!=pageId
							&& (info.documentHeight-info.loadDistance) <= (info.windowHeight+$(window).scrollTop())) {
							info.loadDown();
						}
					});

					// 自动向下方加载数据，直至充满整个屏幕
					info.autoLoad(pageId);
				}
			},
			// 设置上滑加载已无数据
			over : function(pageId) {
				info.isOver = pageId;
			},
			// 如果文档高度不大于窗口高度，数据较少，自动向下方加载数据
			autoLoad : function(pageId) {
				if ((info.documentHeight-info.loadDistance) <= info.windowHeight) {
					info.loadDown(pageId);
				}
			},
			// 向下方加载数据
			loadDown : function(pageId) {
				$("#infinite-scroll-preloader-"+pageId).html('<span class="preloader"></span>正在加载...');
				info.isDataLoaded = true;
				info.loadDataFunction();
			},
			// 重置上滑加载的一些属性
			resetLoad : function(pageId) {
				// 重新设置文档的高度
				info.documentHeight = $(document).height();

				info.isDataLoaded = false;
				if (info.isOver==pageId) {
					$("#infinite-scroll-preloader-"+pageId).html('<div class="no-data">已无更多数据</div>');
				} else {
					info.autoLoad();
				}
			},

			// tab选项卡切换
			tab : function(args) {
				var opt = defaults(args);
				var tabId = opt.id;
				var current = opt.current;

				// 添加下划线样式
				$("#" + tabId + " ul").append('<b class="border"></b>');

				// 判断当前有多少个选项卡
				var tabNum = $("#" + tabId + " ul li").length;
				// 为每个选项卡设置宽度
				$("#" + tabId + " ul li").css("width", (100/tabNum) + "%");
				// 为下划线设置宽度
				$("#" + tabId + " ul .border").css("width", (100/tabNum) + "%");

				// 为当前选中的选项卡添加选中属性
				$("#" + tabId + " ul li").each(function(i) {
					if (i==(current-1)) {
						$(this).addClass("current");
						$("#" + tabId + " .border").css("left", $(this).offset().left + "px");
					}
				});

				// 显示当前选中的选项卡的内容，隐藏其他选项卡的内容
				$(".tab-content>div").each(function(i) {
					if (i==(current-1)) {
						$(this).css("display", "block");
					} else {
						$(this).css("display", "none");
					}
				});

				// 初始化返回回调函数，返回选项卡的索引，从0开始计
				opt.callback({
					"index": current
				});
				
				// tab切换事件
				$("#" + tabId + " ul li").click(function() {
					// 给标题添加样式
					$(this).addClass("current").siblings().removeClass("current");
					$("#" + tabId + " .border").css("left", $(this).offset().left + "px");
					$(".tab-content>div:eq(" + $(this).index() + ")").show().siblings().hide();
					// 设置回调函数，返回选项卡的索引，从0开始计
					opt.callback({
						"index": $(this).index()+1
					});
				});
			},
			
			// 日期时间
			date : function(args) {
				var opt = defaults(args);
				var dateId = opt.id;

				// 创建数据
				var now = new Date();
				// 年
				var yearList = '';
				for (var i=1900; i<=parseInt(now.getFullYear()+50); i++) {
					yearList += '<li class="date-li date-show">'+i+'</li>';
				}
				// 月
				var monthList = '';
				for (var i=1; i<=12; i++) {
					if (i<10) {
						i = "0" + i;
					}
					monthList += '<li class="date-li date-show">'+i+'</li>';
				}
				// 日
				var dayList = '';
				for (var i=1; i<=31; i++) {
					if (i<10) {
						i = "0" + i;
					}
					dayList += '<li class="date-li date-show">'+i+'</li>';
				}

				// 日期选择器面板代码
				var dateHtml = '<div id="date-box-'+dateId+'" class="mask" style="display: none;">';
				dateHtml += '<div class="container">';
				dateHtml += '<div class="dialog animated fadeInUp">';
				dateHtml += '<div id="final-date-text-'+dateId+'" style="margin:0.1rem 0;"></div>';
				dateHtml += '<input type="hidden" id="final-date-value-'+dateId+'" value="" />';
				dateHtml += '<div class="dialog-content">';
				dateHtml += '<table style="width:100%;">';
				dateHtml += '<thead>';
				dateHtml += '<tr>';
				dateHtml += '<th style="width:34%;">年</th>';
				dateHtml += '<th style="width:33%;">月</th>';
				dateHtml += '<th style="width:33%;">日</th>';
				dateHtml += '</tr>';
				dateHtml += '</thead>';
				dateHtml += '<tbody>';
				dateHtml += '<tr>';
				dateHtml += '<td style="width:34%;">';
				dateHtml += '<div id="year-'+dateId+'" style="position:relative;height:5rem;overflow:hidden;">';
				dateHtml += '<ul class="date-ul" style="transform: translate(0px, 0px);transition: all 0.4s;">';
				dateHtml += '</ul>';
				dateHtml += '</div>';
				dateHtml += '</td>';
				dateHtml += '<td style="width:33%;position:relative;overflow:hidden;">';
				dateHtml += '<div id="month-'+dateId+'" style="position:relative;height:5rem;overflow:hidden;">';
				dateHtml += '<ul class="date-ul" style="transform: translate(0px, 0px);transition: all 0.4s;">';
				dateHtml += '</ul>';
				dateHtml += '</div>';
				dateHtml += '</td>';
				dateHtml += '<td style="width:33%;position:relative;overflow:hidden;">';
				dateHtml += '<div id="day-'+dateId+'" style="position:relative;height:5rem;overflow:hidden;">';
				dateHtml += '<ul class="date-ul" style="transform: translate(0px, 0px);transition: all 0.4s;">';
				dateHtml += '</ul>';
				dateHtml += '</div>';
				dateHtml += '</td>';
				dateHtml += '</tr>';
				dateHtml += '</tbody>';
				dateHtml += '</table>';
				dateHtml += '</div>';
				dateHtml += '<div class="dialog-button-container">';
				dateHtml += '<button id="date-cancel-'+dateId+'" class="button dialog-button">取消</button>';
				dateHtml += '<button id="date-ok-'+dateId+'" class="button dialog-button">确定</button>';
				dateHtml += '</div>';
				dateHtml += '</div>';
				dateHtml += '</div>';
				dateHtml += '</div>';

				$(document.body).append(dateHtml);
				// 添加遮罩
				$("#date-box-"+dateId+" table ul").after('<div class="mask-data"><div class="mask-up"></div><div class="mask-mid"></div><div class="mask-down"></div></div>');

				var isStart = true;
				var isMove = false;
				var isEnd = false;
				var startY = 0; // 当前触摸时的Y坐标
				var lastY = 0;	// 上一次触摸时的Y坐标
				var nowElement = null;	// 当前滚动的ul
				var liLength = 0;		// 当前滚动的ul下的li数量
				var nY = 0;
				var mY = 0;
				var endY = 0;
				var maxY = 0;
				var minY = 0;
				var nowY = 0;
				var liHeight = $(".mask-mid").height();
				
				var year = "";
				var month = "";
				var day = "";
				
				// 用于缓动的变量
				var lastMoveTime = 0;
				var lastMoveStart = 0;
				var totalDistance = 0;		// 移动总距离
				var stopInertiaMove = false;// 是否停止缓动

				init();
				if (opt.date=="" || opt.date==null || opt.date==undefined) {
				
				} else {
					// 关闭日期选择框，并把结果回显到输入框
					close(true);
				}
				
				// 绑定日期框的点击事件
				$("#"+dateId).bind("click", function() {
					init();
					// 显示日历
					$("#date-box-"+dateId).show();
					return;
				});

				// 日期选择确定按钮的点击事件
				$("#date-ok-"+dateId).bind("click", function() {
					close(true);
					// 设置回调函数，返回一个时间对象，包含所选日期
					opt.callback({
						"date": $("#final-date-text-"+dateId).text()
					});
					return;
				});
				// 日期选择关闭按钮的点击事件
				$("#date-cancel-"+dateId).bind("click", function() {
					close();
					return;
				});
				
				/**
				 * 日期选择初始化
				 */
				function init() {
					// 清空列表的内容
					$("#year-"+dateId+" ul").empty();
					$("#month-"+dateId+" ul").empty();
					$("#day-"+dateId+" ul").empty();
					// 为列表添加内容
					$("#year-"+dateId+" ul").html(yearList);
					$("#month-"+dateId+" ul").html(monthList);
					$("#day-"+dateId+" ul").html(dayList);
					
					// 判断是否已经选择过日期了
					var date = $("#final-date-value-"+dateId).val();
					if (date=="" || date==null || date==undefined) {
						// 判断用户是否自定义了日期
						if (opt.date=="" || opt.date==null || opt.date==undefined) {
							// 不变，默认显示系统日期
						} else {
							// 分割年月日
							var arr = opt.date.split("-");
							// 返回日期格式
							now = new Date(arr[0], arr[1]-1, arr[2]);
						}
					} else {
						// 分割年月日
						var arr = date.split("-");
						// 返回日期格式
						now = new Date(arr[0], arr[1]-1, arr[2]);
					}
					
					year = now.getFullYear();
					month = ((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1);
					day = (now.getDate()<10?"0":"")+now.getDate();

					// 获取当前月应该有多少天
					var curMonthDays = new Date(year, month, 0).getDate();
					var dif = curMonthDays-31;
					// 隐藏多余的天数
					if (dif<0) {
						var moveY = getTranslateY($("#day-"+dateId+" .date-ul"));
						for (var i=0; i>dif; i--) {
							$("#day-"+dateId+" .date-ul > li:eq("+[31-1+i]+")").removeClass("date-show").addClass("date-hide");
						}
					}
					
					// 默认选择年月日
					$("#year-"+dateId+" .date-ul .date-li").each(function() {
						if (parseInt($(this).text())==parseInt(year)) {
							var positionY = -($(this).index()-2)*liHeight;
							$(this).parent().css("transform", "translate(0, "+positionY+"px)");
						}
					});
					$("#month-"+dateId+" .date-ul .date-li").each(function() {
						if (parseInt($(this).text())==parseInt(month)) {
							var positionY = -($(this).index()-2)*liHeight;
							$(this).parent().css("transform", "translate(0, "+positionY+"px)");
						}
					});
					$("#day-"+dateId+" .date-ul .date-li").each(function() {
						if (parseInt($(this).text())==parseInt(day)) {
							var positionY = -($(this).index()-2)*liHeight;
							$(this).parent().css("transform", "translate(0, "+positionY+"px)");
						}
					});
					// 填充日期
					$("#final-date-text-"+dateId).html(year+"-"+month+"-"+day);
				}

				// 绑定滚动事件
				var oScrollList = document.querySelectorAll("#date-box-"+dateId+" .mask-data");
				for (var i=0; i<oScrollList.length; i++) {
					// 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发
					oScrollList[i].addEventListener("touchstart", function (event) {
						event.preventDefault();

						// 记录当前触摸时的Y坐标
						startY = event.touches[0].clientY;
						// 记录上一次触摸时的Y坐标
						lastY = startY;
						nowElement = $(this).prev(".date-ul");
						liLength = nowElement.find(".date-show").length;
						nY = getTranslateY(nowElement);
						if (!isMove && isEnd) {
							return false;
						}
						isStart = false;
						isMove = false;
						
						// 缓动代码
						lastMoveStart = lastY;
						lastMoveTime = new Date().getTime();
						stopInertiaMove = true;
					}, false);

					// 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动
					oScrollList[i].addEventListener("touchmove", function (event) {
						event.preventDefault();

						mY = event.touches[0].clientY;
						if (!isStart) {
							isMove = true;
							isEnd = true;
						}
						if (isMove) {
							nowElement.css("transition", "none");
							nowElement.css("transform", "translate(0, "+-(nY-(mY-startY))+"px)");
						}
						
						// 缓动代码
						var nowTime = new Date().getTime();
						stopInertiaMove = true;
						if ((nowTime - lastMoveTime)>300) {
							lastMoveTime = nowTime;
							lastMoveStart = mY;
						}
					}, false);

					// 当手指从屏幕上离开的时候触发
					oScrollList[i].addEventListener("touchend", function (event) {
						event.preventDefault();

						endY = event.changedTouches[0].clientY;
						maxY = liHeight*2;
						minY = -(liLength-3)*liHeight;
						if (isEnd) {
							isMove = false;
							isEnd = false;
							isStart = true;
							nY = -(nY-(mY-startY));
							nowY = endY;

							// 修正位置
							if (nY>maxY) {
								nowElement.css("transition", "all .5s");
								nowElement.css("transform", "translate(0, "+maxY+"px)");
							} else if (nY<minY) {
								nowElement.css("transition", "all .5s");
								nowElement.css("transform", "translate(0, "+minY+"px)");
							} else {
								// 缓动代码
								var endTime = new Date().getTime();
								//最后一段时间手指划动速度
								var v = (nowY-lastMoveStart)/(endTime-lastMoveTime);
								stopInertiaMove = false;
								(function(v, lastMoveTime, contentY) {
									// 加速度方向
									var dir = v > 0 ? -1 : 1;
									// 减速率 0.0006 为减速时间
									var deceleration = dir*0.0006;
									function inertiaMove() {
										if (stopInertiaMove) {
											return;
										}
										var nowTime = new Date().getTime();
										var t = nowTime - lastMoveTime;
										// 当前速度
										var nowV = v + t * deceleration;
										var moveY = (v + nowV) / 2 * t;
										// 减速停止过程
										if (dir*nowV>0) {
											// 移动总距离大于最大值时，修正回弹
											if (totalDistance>maxY) {
												nowElement.css("transition", "all .5s");
												nowElement.css("transform", "translate(0, "+maxY+"px)");
											} else if (totalDistance<minY) {
												// 同上，修正回弹
												nowElement.css("transition", "all .5s");
												nowElement.css("transform", "translate(0, "+minY+"px)");
											} else {
												nowElement.css("transition", "all .5s");
												nowElement.css("transform", "translate(0, "+Math.round(totalDistance/liHeight)*liHeight+"px)");
											}
											// 获取并填充日期
											setTimeout(function() {
												fillDate(nowElement.parent().attr("id"));
											}, 500);
											return;
										}
										// 当前移动距离
										totalDistance = contentY + moveY;
										if (totalDistance>(maxY+(liHeight*2))) {
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, "+maxY+"px)");
											return;
										} else if (totalDistance<(minY-(liHeight*2))) {
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, "+minY+"px)");
											return;
										}
										nowElement.css("transform", "translate(0, "+totalDistance+"px)");
										// 获取并填充日期
										setTimeout(function() {
											fillDate();
										}, 500);
										setTimeout(inertiaMove, 10);
									}
									inertiaMove();
								})(v, endTime, nY);
							}

							// 获取并填充日期
							setTimeout(function() {
								fillDate();
							}, 500);
						}
					}, false);
				}

				/**
				 * 获取并填充日期
				 */
				function fillDate(id) {
					var currentY = 0;
					$("#date-box-"+dateId+" .date-ul").each(function(index) {
						currentY = getTranslateY(this);
						var value = "";
						if (currentY==0) {
							value = $($(this).find(".date-li")[2]).text();
						} else {
							value = $($(this).find(".date-li")[Math.round(currentY/liHeight)+2]).text();
						}
						if (index==0) {
							year = value;
						} else if (index==1) {
							month = value;
						} else if (index==2) {
							day = value;
						}
					});

					// 修改天数
					if (id!=undefined && id!=null) {
						if (id=="year-"+dateId || id=="month-"+dateId) {
							// 获取当前月应该有多少天
							var curMonthDays = new Date(year, month, 0).getDate();
							// 获取目前列表中的天数
							var curDays = $("#day-"+dateId+" .date-ul .date-show").length;
							var dif = curMonthDays-curDays;
							if (dif>0) {
								// 显示被隐藏的天数
								for (var i=0; i<dif; i++) {
									$("#day-"+dateId+" .date-ul > li:eq("+[curDays+i]+")").removeClass("date-hide").addClass("date-show");
								}
							} else if (dif<0) {
								var moveY = getTranslateY($("#day-"+dateId+" .date-ul"));
								// 隐藏多余的天数
								for (var i=0; i>dif; i--) {
									$("#day-"+dateId+" .date-ul > li:eq("+[curDays-1+i]+")").removeClass("date-show").addClass("date-hide");
								}

								// 自动重新滚动天数
								if (moveY>(curMonthDays-1-2)*liHeight) {
									$("#day-"+dateId+" .date-ul").css("transition", "all 0s");
									$("#day-"+dateId+" .date-ul").css("transform", "translate(0, "+-(curMonthDays-1-2)*liHeight+"px)");
									
									// 重新对日期赋值
									day = curMonthDays;
								}
							}
						}
					}
					
					// 将最终日期显示在头部
					$("#final-date-text-"+dateId).html(year+"-"+month+"-"+day);
					$("#final-date-value-"+dateId).val(year+"-"+month+"-"+day);
				}

				function getTranslateY(element) {
					var matrix = $(element).css("transform");
					var translateY = 0;
					if (matrix!="none") {
						var arr = matrix.split(",");
						translateY = -(arr[5].split(")")[0]);
					}
					return translateY;
				}
				
				/**
				 * 关闭日期选择框
				 * isOk : 判断是否是点击确定按钮关闭的 
				 */
				function close(isOk) {
					if (isOk) {
						$("#final-date-value-"+dateId).val(year+"-"+month+"-"+day);
						
						// 把时间显示到页面
						var obj = document.getElementById(dateId);
						if (obj && obj.tagName=="INPUT") {
							$("#"+dateId).val($("#final-date-text-"+dateId).text());
						} else {
							$("#"+dateId).html($("#final-date-text-"+dateId).text());
						}
					}
					// 隐藏日历框
					$("#date-box-"+dateId).css("display", "none");
				}
			},
			
			// select选择框
			firstIndex : 0,	// 第一个可见项的索引
			lastIndex  : 0,	// 最后一个可见项的索引
			isSearchInit : false,	// 是否搜索过后就没再次滚动
			select : function(args) {
				var opt = defaults(args);
				var selectId = opt.id;
				
				// 判断是否已经存在input元素
				var obj = document.getElementById("input-"+selectId);
				if (obj==null) {
					$("#"+selectId).before('<input id="input-'+selectId+'" type="text" placeholder="点击选择" value="" readonly />');
				}
				// 将select框隐藏起来
				$("#"+selectId).hide();
				
				// select选择框面板代码
				var selectHtml = '<div id="select-box-'+selectId+'" class="mask" style="display: none;">';
				selectHtml += '<div class="container">';
				selectHtml += '<div class="dialog animated fadeInUp">';
				selectHtml += '<div class="search-input">';
				selectHtml += '<input type="text" id="search-'+selectId+'" placeholder="输入关键字...">';
				selectHtml += '<a href="javascript:;" class="icon" onclick="javaex.selectSearch(\''+selectId+'\')"><span class="icon-search"></span></a>';
				selectHtml += '</div>';
				selectHtml += '<div class="dialog-content">';
				selectHtml += '<div id="opt-select-'+selectId+'" style="position:relative;height:5rem;overflow:hidden;">';
				selectHtml += '<ul class="select-ul" style="transform: translate(0px, 0px);transition: all 0.4s;">';
				selectHtml += '</ul>';
				selectHtml += '</div>';
				selectHtml += '</div>';
				selectHtml += '<div class="dialog-button-container">';
				selectHtml += '<button id="select-cancel-'+selectId+'" class="button dialog-button">取消</button>';
				selectHtml += '<button id="select-ok-'+selectId+'" class="button dialog-button">确定</button>';
				selectHtml += '</div>';
				selectHtml += '</div>';
				selectHtml += '</div>';
				selectHtml += '</div>';

				$(document.body).append(selectHtml);
				$("#select-box-"+selectId+" ul").after('<div id="mask-data-'+selectId+'" class="mask-data"><div class="mask-up"></div><div class="mask-mid"></div><div class="mask-down"></div></div>');
				
				var isStart = true;
				var isMove = false;
				var isEnd = false;
				var startY = 0; // 当前触摸时的Y坐标
				var lastY = 0;	// 上一次触摸时的Y坐标
				var nowElement = null;	// 当前滚动的ul
				var liLength = 0;		// 当前滚动的ul下的li数量
				var nY = 0;
				var mY = 0;
				var endY = 0;
				var maxY = 0;
				var minY = 0;
				var nowY = 0;
				var liHeight = $(".mask-mid").height();
				
				// 用于缓动的变量
				var lastMoveTime = 0;
				var lastMoveStart = 0;
				var totalDistance = 0;		// 移动总距离
				var stopInertiaMove = false;// 是否停止缓动
				
				// 判断select是否已有默认值
				var selectValue = $("#"+selectId).val();
				var selectName = "";
				
				init();
				close(true);
				
				// 绑定select选择框的点击事件
				$("#input-"+selectId).bind("click", function() {
					init();
					// 显示select选择框
					$("#select-box-"+selectId).show();
					return;
				});
				
				// select选择确定按钮的点击事件
				$("#select-ok-"+selectId).bind("click", function() {
					close(true);
					return;
				});
				// select选择关闭按钮的点击事件
				$("#select-cancel-"+selectId).bind("click", function() {
					close();
					return;
				});
				
				/**
				 * select选择初始化
				 */
				function init() {
					// 清空列表的内容
					$("#opt-select-"+selectId+" ul").empty();
					// 为列表添加内容
					$("#opt-select-"+selectId+" ul").html($("#"+selectId).html());
					// 添加属性
					$("#opt-select-"+selectId+" option").addClass("select-option option-show");
					// 选中默认值
					$("#opt-select-"+selectId+" option").each(function() {
						if ($(this).attr("value")==selectValue) {
							var positionY = -($(this).index()-2)*liHeight;
							$(this).parent().css("transform", "translate(0, "+positionY+"px)");
						}
					});
					// 关闭select选择框，并把结果回显到页面
					selectName =$("#"+selectId).find("option:selected").text();
					
					// 初始化第一个索引和最后一个索引
					info.firstIndex = 0;
					info.lastIndex = $("#opt-select-"+selectId+" ul option").length - 1;
				}
				
				// 绑定滚动事件
				var oScroll = document.getElementById("mask-data-"+selectId);
				// 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发
				oScroll.addEventListener("touchstart", function (event) {
					event.preventDefault();

					// 记录当前触摸时的Y坐标
					startY = event.touches[0].clientY;
					// 记录上一次触摸时的Y坐标
					lastY = startY;
					nowElement = $(this).prev(".select-ul");
					liLength = nowElement.find(".option-show").length;
					nY = getTranslateY(nowElement);
					if (!isMove&&isEnd) {
						return false;
					}
					isStart = false;
					isMove = false;

					// 缓动代码
					lastMoveStart = lastY;
					lastMoveTime = new Date().getTime();
					stopInertiaMove = true;
				}, false);

				// 当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动
				oScroll.addEventListener("touchmove", function (event) {
					event.preventDefault();

					mY = event.touches[0].clientY;
					if (!isStart) {
						isMove = true;
						isEnd = true;
					}
					if (isMove) {
						nowElement.css("transition", "none");
						nowElement.css("transform", "translate(0, "+-(nY-(mY-startY))+"px)");
					}

					// 缓动代码
					var nowTime = new Date().getTime();
					stopInertiaMove = true;
					if ((nowTime - lastMoveTime)>300) {
						lastMoveTime = nowTime;
						lastMoveStart = mY;
					}
				}, false);

				// 当手指从屏幕上离开的时候触发
				oScroll.addEventListener("touchend", function (event) {
					event.preventDefault();

					endY = event.changedTouches[0].clientY;
					maxY = -(info.firstIndex-2)*liHeight;
					minY = -(info.lastIndex-2)*liHeight;
					if (isEnd) {
						isMove = false;
						isEnd = false;
						isStart = true;
						nY = -(nY-(mY-startY));
						nowY = endY;

						// 修正位置
						if (nY>maxY) {
							nowElement.css("transition", "all .5s");
							nowElement.css("transform", "translate(0, "+maxY+"px)");
						} else if (nY<minY) {
							nowElement.css("transition", "all .5s");
							nowElement.css("transform", "translate(0, "+minY+"px)");
						} else {
							// 缓动代码
							var endTime = new Date().getTime();
							//最后一段时间手指划动速度
							var v = (nowY-lastMoveStart)/(endTime-lastMoveTime);
							stopInertiaMove = false;
							(function(v, lastMoveTime, contentY) {
								// 加速度方向
								var dir = v > 0 ? -1 : 1;
								// 减速率 0.0006 为减速时间
								var deceleration = dir*0.0006;
								function inertiaMove() {
									if (stopInertiaMove) {
										return;
									}
									var nowTime = new Date().getTime();
									var t = nowTime - lastMoveTime;
									// 当前速度
									var nowV = v + t * deceleration;
									var moveY = (v + nowV) / 2 * t;
									// 减速停止过程
									if (dir*nowV>0) {
										// 移动总距离大于最大值时，修正回弹
										if (totalDistance>maxY) {
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, "+maxY+"px)");
										} else if (totalDistance<minY) {
											// 同上，修正回弹
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, "+minY+"px)");
										} else {
											nowElement.css("transition", "all .5s");
											nowElement.css("transform", "translate(0, "+Math.round(totalDistance/liHeight)*liHeight+"px)");
										}
										// 获取值
										setTimeout(function() {
											setSelectValue();
										}, 500);
										return;
									}
									// 当前移动距离
									totalDistance = contentY + moveY;
									if (totalDistance>(maxY+(liHeight*2))) {
										nowElement.css("transition", "all .5s");
										nowElement.css("transform", "translate(0, "+maxY+"px)");
										return;
									} else if (totalDistance<(minY-(liHeight*2))) {
										nowElement.css("transition", "all .5s");
										nowElement.css("transform", "translate(0, "+minY+"px)");
										return;
									}
									nowElement.css("transform", "translate(0, "+totalDistance+"px)");
									// 获取值
									setTimeout(function() {
										setSelectValue();
									}, 500);
									setTimeout(inertiaMove, 10);
								}
								inertiaMove();
							})(v, endTime, nY);
						}

						// 获取值
						setTimeout(function() {
							setSelectValue();
						}, 500);
					}
				}, false);
				
				function getTranslateY(element) {
					var matrix = $(element).css("transform");
					var translateY = 0;
					if (matrix!="none") {
						var arr = matrix.split(",");
						translateY = -(arr[5].split(")")[0]);
					}
					return translateY;
				}
				
				/**
				 * 获取值
				 */
				function setSelectValue() {
					var currentY = 0;
					$("#opt-select-"+selectId+" .select-ul").each(function(index) {
						currentY = getTranslateY(this);
						var value = "";
						var name = "";
						if (currentY==0) {
							value = $($(this).find(".select-option")[2]).attr("value");
							name = $($(this).find(".select-option")[2]).text();
						} else {
							value = $($(this).find(".select-option")[Math.round(currentY/liHeight)+2]).attr("value");
							name = $($(this).find(".select-option")[Math.round(currentY/liHeight)+2]).text();
						}
						if (index==0) {
							selectValue = value;
							selectName = name;
						}
						info.isSearchInit = false;
					});
				}

				/**
				 * 关闭select选择框
				 * isOk : 判断是否是点击确定按钮关闭的 
				 */
				function close(isOk) {
					if (isOk) {
						// 如果是检索过后就没再次滚动选择，就默认取第一条数据
						if (info.isSearchInit) {
							selectValue = $($("#opt-select-"+selectId+" .select-ul").find(".select-option")[info.firstIndex]).attr("value");
							selectName = $($("#opt-select-"+selectId+" .select-ul").find(".select-option")[info.firstIndex]).text();
						}
						// 把值显示到页面
						$("#"+selectId).val(selectValue);
						if (selectValue=="") {
							$("#input-"+selectId).val("");
						} else {
							$("#input-"+selectId).val(selectName);
						}
						
						// 回调函数
						opt.callback({
							"selectValue": selectValue,
							"selectName" : selectName
						});
					}
					// 隐藏select框
					$("#select-box-"+selectId).css("display", "none");
				}
			},
			selectSearch : function(selectId) {
				var keyword = $("#search-"+selectId).val();
				var count = 0;
				var indexArr = new Array();	// 记录符合检索条件的索引
				
				// 如果检索内容为空
				keyword = keyword.replace(/(^\s*)|(\s*$)/g, "");
				if (keyword=="") {
					// 则显示所有选项
					$("#opt-select-"+selectId+" ul option").removeClass("option-hide").addClass("option-show");
				} else {
					// 遍历匹配每一个选项
					$("#opt-select-"+selectId+" ul option").each(function(i) {
						// 因为indexOf()方法对大小写敏感，所以这里强制转化为小写后再匹配
						// 如果当前选项不匹配
						if ($(this).text().toLowerCase().indexOf(keyword.toLowerCase())==-1) {
							$(this).removeClass("option-show").addClass("option-hide");
							count++;
						} else {
							$(this).removeClass("option-hide").addClass("option-show");
							// 记录下当前的索引
							indexArr.push(i);
						}
					});

					// 重新滚动
					if (indexArr!="" && indexArr!=null) {
						$("#opt-select-"+selectId+" .select-ul").css("transition", "all 0s");
						var positionY = 0;
						var liHeight = $(".mask-mid").height();
						info.firstIndex = indexArr[0];	// 第一条被检索到的索引
						info.lastIndex = indexArr[indexArr.length-1];	// 最后一条被检索到的索引
						$("#opt-select-"+selectId+" .select-ul").css("transform", "translate(0, "+-(info.firstIndex-2)*liHeight+"px)");
						info.isSearchInit = true;
					}
				}
			}
		};

		return info;
	};
	window.javaex = javaex();
})();