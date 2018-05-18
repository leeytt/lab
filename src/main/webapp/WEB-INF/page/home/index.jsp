<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>实验室系统</title>
<!--字体图标样式-->
<link href="${pageContext.request.contextPath}/static/javaex/pc/css/icomoon.css" rel="stylesheet" />
<!--动画样式-->
<link href="${pageContext.request.contextPath}/static/javaex/pc/css/animate.css" rel="stylesheet" />
<!--核心样式-->
<link href="${pageContext.request.contextPath}/static/javaex/pc/css/style.css" rel="stylesheet" />
<!--jquery，当前版本不可更改jquery版本-->
<script src="${pageContext.request.contextPath}/static/javaex/pc/lib/jquery-1.7.2.min.js"></script>
<!--全局动态修改-->
<script src="${pageContext.request.contextPath}/static/javaex/pc/js/common.js"></script>
<!--核心组件-->
<script src="${pageContext.request.contextPath}/static/javaex/pc/js/javaex.min.js"></script>
<!--表单验证-->
<script src="${pageContext.request.contextPath}/static/javaex/pc/js/javaex-formVerify.js"></script>
<style>
.header{height: 300px;background: linear-gradient(45deg, #0071d3 10%, #53ffdc 100%);}#top{position: fixed;top: 0px;width: 100%;height: 70px;background-color: #fff;box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.5);z-index: 1003;}.container{width: 1170px;height: 50px;line-height: 50px;padding: 10px;margin: 0 auto;}.footer .container a{color: #ccc;}#logo > a{font-size: 18px;color: #666;}#nav{text-align: right;}#big-title{width: 1170px;margin: 0 auto;height: 430px;line-height: 430px;text-align: center;font-size: 46px;color: #fff;}#content{margin: -60px 30px 0;-webkit-box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);}.block{margin: 0 auto;overflow:visible;}.block2{margin-top:30px;margin-bottom: 10px;border-radius: 6px;-webkit-box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);-moz-box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);}.block2 h4{margin-top: 24px;}.block2 h4 a{color: #06999e;}.block2 h2{font-weight: normal;line-height: 60px;border-bottom:0;padding-left: 0;}.block2 h2 a{color: #3C4858;}.block2 p{color: #999;}.block2 p a{margin-left: 10px;color: #23527c;}.block2 .day{color: #3C4858;margin-top: 20px;}.img{height: 250px;margin: -15px 15px 0;}.img img{width:100%;height: 100%;border-radius: 6px;}.nav > li{display: inline-block;}.nav > li > a{font-size: 12px;margin: 0 15px;display: block;}.nav li a:link{color: #666;}.nav li:hover{background:#ededf1;}.nav li a:hover, .active > a{color: #06999e;}.nav > li:hover .classified-nav{display: block;}.classified-nav{position: absolute;top: 48px;left: -40%;z-index: 1000;display: none;float: left;min-width: 140px;padding: 5px 0;margin: 2px 0 0;font-size: 14px;text-align: center;list-style: none;background-color: #fff;-webkit-background-clip: padding-box;background-clip: padding-box;border: 1px solid #ccc;border: 1px solid rgba(0,0,0,.15);border-radius: 4px;-webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);box-shadow: 0 6px 12px rgba(0,0,0,.175);}input[type="text"]{border:none;}.search{-webkit-box-shadow: none;-moz-box-shadow: none;box-shadow: none;background-image: -webkit-gradient(linear, left top, left bottom, from(#9c27b0), to(#9c27b0)), -webkit-gradient(linear, left top, left bottom, from(#d2d2d2), to(#d2d2d2));background-image: -webkit-linear-gradient(#9c27b0, #9c27b0), -webkit-linear-gradient(#d2d2d2, #d2d2d2);background-image: linear-gradient(#9c27b0, #9c27b0), linear-gradient(#d2d2d2, #d2d2d2);border: 0;border-radius: 0;background-color: transparent;background-repeat: no-repeat;background-position: center bottom, center -webkit-calc(100% - 1px);background-position: center bottom, center calc(100% - 1px);background-size: 0 2px, 100% 1px;-webkit-transition: background 0s ease-out;transition: background 0s ease-out;height: 36px;width: 220px;}.is-focused .search{background-image: -webkit-gradient(linear, left top, left bottom, from(#06999e), to(#06999e)), -webkit-gradient(linear, left top, left bottom, from(#d2d2d2), to(#d2d2d2));background-image: -webkit-linear-gradient(#06999e, #06999e), -webkit-linear-gradient(#d2d2d2, #d2d2d2);background-image: linear-gradient(#06999e, #06999e), linear-gradient(#d2d2d2, #d2d2d2);outline: none;background-size: 100% 2px, 100% 1px;-webkit-transition-duration: 0.3s;transition-duration: 0.3s;}.active{background:#ededf1;color: #06999e;}.page > ul >li > a{height: 30px;padding: 0 12px;border-radius: 50px !important;color: #999999;background: transparent;font-size: 12px;line-height: 30px;border: 1px solid #eee;}.page > ul >li{background: transparent;}.page .active a{background-color: #06999e;border-color: #06999e;-webkit-box-shadow: 0 14px 26px -12pxrgba(6,153,158,0.42),0 4px 23px 0 rgba(0,0,0,0.12),0 8px 10px -5px rgba(6,153,158,0.2);box-shadow: 0 14px 26px -12px rgba(6,153,158,0.42), 0 4px 23px 0 rgba(0,0,0,0.12), 0 8px 10px -5px rgba(6,153,158,0.2);color: #fff;}.pagination>li>a:focus, .pagination>li>a:hover{z-index: 2;border-color: #ddd;background: #ddd;color: #fff;}.pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover{background-color: #06999e;border-color: #06999e;-webkit-box-shadow: 0 14px 26px -12pxrgba(6,153,158,0.42),0 4px 23px 0 rgba(0,0,0,0.12),0 8px 10px -5px rgba(6,153,158,0.2);box-shadow: 0 14px 26px -12px rgba(6,153,158,0.42), 0 4px 23px 0 rgba(0,0,0,0.12), 0 8px 10px -5px rgba(6,153,158,0.2);color: #fff;}.pagination>li{margin-right: 10px;}
.side-bar{position: fixed; bottom: 12px; right: 10px; z-index: 999; color: #fff; min-width: 50px;}
#goTopBtn{display: none;width: 50px;height: 50px;border-radius: 50%;cursor: pointer;text-align: center;background-color: #999;}#goTopBtn > span{font-size: 20px;line-height: 50px;}
</style>
</head>

<body>
	<div class="header">
		<div id="top">
			<div class="grid-1-3 container">
				<div id="logo">
					<a href="javascript:;"><span class="icon-home" style="font-size:50px;color:#0071d3;"></span>实验室系统</a>
				</div>
				<div id="nav">
					<ul class="nav">
						<li class="active"><a href="#">首页</a></li>
						<li><a href="#">实验室申请</a></li>
						<li><a href="#">设备申请</a></li>
						<li><a href="#">项目申请</a></li>
						<li style="position: relative;">
							<a href="javascript:;">公告目录</a>
							<ul class="classified-nav">
								<li><a href="#">前端</a></li>
								<li><a href="#">java基础</a></li>
								<li><a href="#">数据库</a></li>
								<li><a href="#">SSM</a></li>
							</ul>
						</li>
						<li><a href="javascript:;" onClick="openSearch()"><span class="icon-search" style="font-size: 14px;"></span></a></li>
					</ul>
					<div id="search" class="hide">
						<span class="search-field-wrapper form-group">
							<input type="text" class="search" placeholder="搜索…" value="" name="">
						</span>
						<span id="close-search" class="icon-close" style="font-size: 16px;"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="main-0" style="margin-top:70px;">
			<!--公告块元素-->
			<div class="block" style="width:1340px;">
							<!--正文内容-->
							<ul class="equal-2" style="width:1320px;">
								<c:forEach items="${pageInfo.list}" var="entity" varStatus="status" >
									<li>
									<div class="block block2" style="width:640px; height:160px;">
										<div class="grid-5-7 spacing-20">
												<div class="img" style="width:180px; height:160px;">
													<img src="/upload/${entity.cover}"/>
												</div>
												<div class="main-10">
													<h4><a href="#">${entity.typeName}</a></h4>
													<h3><a href="#"><b>${entity.tipTitle}</b></a></h3>
													<p>
														<a href="#"> 查看详请…</a>
													</p>
													<div class="day">${entity.updateTime}</div>
												</div>
											
										</div>
									</div>
									</li>
								</c:forEach>
							</ul>
			</div>
			<!--分页-->
			<div class="page" >
				<ul id="page" class="pagination"></ul>
			</div>
		</div>
		<!-- <h1 id="big-title">首页</h1> -->
	</div>

	<div id="content">
		<div class="block" style="border-radius: 6px 6px 0 0;">
			<div class="grid-1">
				<div id="main-content" style="min-width: 950px; padding:50px;">
					<!--栅格系统 嵌套演示-->
					<!--导航选项卡切换-->
					<div class="grid spacing-20">
						<!--块元素-->
						<div class="block">
							<!--正文内容-->
							<div class="main-20">
								<!--选项卡切换-->
								<div id="tab" class="tab">
									<!--选项卡标题部分-->
									<div class="tab-title">
										<!--可以为选项卡添加图标、大标题、链接-->
										<img class="mod-icon" src="http://upload.javaex.cn/dm.png" />
										<em><a href="#" target="_blank">鼠标移动切换  <i style="color:#ccc">></i></a></em>
										<ul>
											<li>实验室申请</li>
											<!--可以为选项卡右上角添加链接-->
											<a class="more" href="#" target="_blank">其他排行</a>
										</ul>
									</div>
									<!--选项卡内容部分-->
									<div class="tab-content" style="background:#eee;">
										<div>实验室申请
											<div class="grid spacing-20" style="margin-top: 20px;">
												<!--表格上方的搜索操作-->
												<div style="text-align:center;margin-bottom:30px;">
													<!-- 类型检索 -->
													<select id="type_id" class="no-shadow">
														<option value="">请选择类型</option>
													</select>
													<!-- 范围日期检索 -->
													<input type="text" id="date2" class="date" style="width: 300px;" value="" readonly/>
													<!-- 标题检索 -->
													<input type="text" class="text" id="title" value="" placeholder="检索实验室名称" />
													<!-- 点击查询按钮 -->
													<button class="button blue" style="margin-top: -3px;width:50px;" onclick="search()"><span class="icon-search"> 检索</span></button>
												</div>
											</div>
											<div class="grid spacing-20" style="margin-top: 20px; margin-bottom:50px;">
												<div class="grid-1-1-1-1-1-1 spacing-20">
													<div style="height:100px;background-color:#209cee;">1/6</div>
													<div style="height:100px;background-color:#ff3860;">1/6</div>
													<div style="height:100px;background-color:#23d160;">1/6</div>
													<div style="height:100px;background-color:#209cee;">1/6</div>
													<div style="height:100px;background-color:#ff3860;">1/6</div>
													<div style="height:100px;background-color:#23d160;">1/6</div>
												</div>
												<div class="grid-1-1-1-1-1-1 spacing-20">
													<div style="height:100px;background-color:#209cee;">1/6</div>
													<div style="height:100px;background-color:#ff3860;">1/6</div>
													<div style="height:100px;background-color:#23d160;">1/6</div>
													<div style="height:100px;background-color:#209cee;">1/6</div>
													<div style="height:100px;background-color:#ff3860;">1/6</div>
													<div style="height:100px;background-color:#23d160;">1/6</div>
												</div>
												<div class="grid-1-1-1-1-1-1 spacing-20">
													<div style="height:100px;background-color:#209cee;">1/6</div>
													<div style="height:100px;background-color:#ff3860;">1/6</div>
													<div style="height:100px;background-color:#23d160;">1/6</div>
													<div style="height:100px;background-color:#209cee;">1/6</div>
													<div style="height:100px;background-color:#ff3860;">1/6</div>
													<div style="height:100px;background-color:#23d160;">1/6</div>
												</div>
												<div class="grid-1-1-1-1-1-1 spacing-20">
													<div style="height:100px;background-color:#209cee;">1/6</div>
													<div style="height:100px;background-color:#ff3860;">1/6</div>
													<div style="height:100px;background-color:#23d160;">1/6</div>
													<div style="height:100px;background-color:#209cee;">1/6</div>
													<div style="height:100px;background-color:#ff3860;">1/6</div>
													<div style="height:100px;background-color:#23d160;">1/6</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="grid spacing-20" style="margin-top: 20px;">
						<div style="height:100px;background-color:#209cee;">搜索</div>
					</div>
					<div class="grid-2-1 spacing-20" style="margin-top: 20px;">
						<div>
							<div class="grid-1-1 spacing-20">
								<div>
									<div style="height:190px;background-color:#00d1b2;margin-bottom:20px;"></div>
									<div style="height:190px;background-color:#ffdd57;"></div>
								</div>
								<div style="height:400px;background-color:#209cee;"></div>
							</div>
							<div style="height:180px;background-color:#ff3860;"></div>
						</div>
						<div style="height:600px;background-color:#23d160;"></div>
					</div>
				</div>
			</div>
		</div>
		
		
		<!--底部footer-->
		<div class="footer" style="background: #323437;">
			<div class="grid-1-3 container">
				<div style="text-align: left;">
					<ul class="equal-4">
						<li><a href="#">联系我</a></li>
						<li><a href="#">友情链接</a></li>
						<li><a href="${pageContext.request.contextPath}/admin/index.action">后台管理</a></li>
					</ul>
				</div>
				<div style="text-align: right;color: #ccc;">@2017-2018 重庆第二师范学院-科南智汇-提供技术支持 版权所有</div>
			</div>
		</div>
	</div>
	
	<!--回到顶部-->
	<div class="side-bar">
		<div id="goTopBtn">
			<span class="icon-arrow_upward"></span>
		</div>
	</div>
</body>
<script>
	var currentPage = "${pageInfo.pageNum}";
	var pageCount = "${pageInfo.pages}";
	
	$(document).ready(function() {
		// window的高度
		var windowHeight = $(window).height();
		// header的高度
		var headerHeight = $(".header").height();
		// footer的高度
		var footerHeight = $(".footer").height();
		// 内容的高度
		var contentHeight = $("#main-content").height();
		// 差
		var diff = windowHeight - (headerHeight+(contentHeight-60)+footerHeight);
		if (diff>0) {
			$("#main-content").css("margin-bottom", diff-100+"px");
		}
		
		// 监听元素获得焦点事件
		$('input[type="text"]').focus(function() {
			$("#search").addClass("is-focused");
		});

		// 监听元素失去焦点事件
		$('input[type="text"]').blur(function() {
			$("#search").removeClass("is-focused");
		});
	});
	
	function openSearch() {
		$(".nav").hide();
		$("#search").show();
	}
	
	$("#close-search").click(function() {
		$("#search").hide();
		$(".nav").show();
	});
	
	javaex.page({	
		id : "page",	// 分页id
		pageCount : pageCount,	// 总页数
		currentPage : currentPage,	// 默认选中第几页
		position : "center",
		// 返回当前选中的页数
		callback:function(rtn) {
			window.location.href = "${pageContext.request.contextPath}/home/index.action?pageNum="+rtn.pageNum;
		}
	});
	
	<!--导航选项卡切换-->
	javaex.tab({
		id : "tab",		// tab的id
		current : 1,	// 默认选中第几个选项卡
		mode : "mouseover",	// 鼠标移动切换选项卡
		// 切换选项卡后返回一个对象，包含选项卡的索引，从1开始计
		// 初始化会自动执行一次
		callback: function (rtn) {
			console.log(rtn.index);
		}
	});
	
	//类型检索
	javaex.select({
		id : "type_id",
		isSearch : false
	});
	
</script>
</html>
