<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>公告管理</title>
</head>

<body>
	<div class="wrap">
		<!-- 头部 -->
		<div id="header">
			<c:import url="../header.jsp"></c:import>
		</div>
		<!-- 左侧菜单和主体内容 -->
		<div class="grid-1-7" style="flex: 1;margin:0;">
			<!-- 左侧菜单 -->
			<div class="menu">
				<c:import url="../menu.jsp"></c:import>
			</div>
			<!-- 面包屑导航和主体内容 -->
			<div class="content">
				<!--面包屑导航-->
				<div class="content-header">
					<div class="breadcrumb">
						<span>公告管理</span>
						<span class="divider">/</span>
						<span class="active">公告列表</span>
					</div>
				</div>
				<!--全部主体内容-->
				<div class="list-content">
					<!--块元素-->
					<div class="block">
						<!--页面有多个表格时，可以用于标识表格-->
						<h2>公告列表</h2>
						<!--右上角的返回按钮-->
						<a href="javascript:history.back();">
							<button class="button wathet" style="position: absolute;right: 20px;top: 16px;"><span class="icon-arrow_back"></span> 返回</button>
						</a>
						
						<!--正文内容-->
						<div class="main-20">
							<!--表格上方的搜索操作-->
							<div style="text-align:center;margin-bottom:15px;">
								<!-- 类型检索 -->
								<select id="type_id" class="no-shadow">
									<option value="">请选择类型</option>
									<c:forEach items="${typeList}" var="typeInfo" varStatus="status" >
										<option value="${typeInfo.tipType_Id}" <c:if test="${typeInfo.tipType_Id==tipType_Id}">selected</c:if>>${typeInfo.typeName}</option>
									</c:forEach>
								</select>
								<!-- 范围日期检索 -->
								<input type="text" id="date2" class="date" style="width: 300px;" value="" readonly/>
								<!-- 标题检索 -->
								<input type="text" class="text" id="title" value="${keyWord}" placeholder="检索公告标题" />
								<!-- 点击查询按钮 -->
								<button class="button blue" style="margin-top: -3px;width:50px;" onclick="search()"><span class="icon-search"> 检索</span></button>
							</div>
							
							<!--表格上方的操作元素，添加、删除等-->
							<div class="operation-wrap">
								<div class="buttons-wrap">
									<a href="edit.action">
										<button id="add" class="button blue"><span class="icon-plus"></span>  发布公告 </button>
									</a>
								</div>
							</div>
							<table id="table" class="table">
								<thead>
									<tr>
										<th style="width:10px;"><input type="checkbox" class="fill listen-1"/> </th>
										<th style="width:20px;">序号</th>
										<th style="width:100px;">公告标题</th>
										<th>类型</th>
										<th style="width:100px;">公告封面</th>
										<th style="width:200px;">备注</th>
										<th style="width:40px;">浏览次数</th>
										<th>创建日期</th>
										<th>编辑</th>
									</tr>
								</thead>
								<tbody>
									<c:choose>
										<c:when test="${fn:length(pageInfo.list)==0}">
											<tr>
												<td colspan="10" style="text-align:center;">暂无记录</td>
											</tr>
										</c:when>
										<c:otherwise>
											<c:forEach items="${pageInfo.list}" var="entity" varStatus="status" >
												<tr>
													<td><input type="checkbox" class="fill listen-1-2" name="tip_Id" value="${entity.tip_Id}"/> </td>
													<td>${status.index+1}</td>
													<td>${entity.tipTitle}</td>
													<td>${entity.typeName}</td>
													<td><!-- 图片承载容器 -->
														<label id="container" for="upload" style="display: inline-block; width:132px;height:74px;">
															<img src="/upload/${entity.cover}" width="100%" height="100%" />
														</label>
													</td>
													<td>${entity.tipNote}</td>
													<td>${entity.viewCount}</td>
													<td>${entity.updateTime}</td>
													<td>
														<a href="edit.action?tip_Id=${entity.tip_Id}">
															<button class="button wathet"><span class="icon-edit"></span> 编辑</button>
														</a>
													</td>
												</tr>
											</c:forEach>
										</c:otherwise>
									</c:choose>
								</tbody>
							</table>
							<!--分页-->
							<div class="page">
								<ul id="page" class="pagination"></ul>
							</div>
							<!--批量操作-->
							<c:choose>
								<c:when test="${fn:length(pageInfo.list)==0}">
									<div class="block no-shadow" type="hidden"></div>
								</c:when>
								<c:otherwise>
									<div class="block no-shadow">
										<!--banner用来修饰块元素的名称-->
										<div class="banner">
											<p class="tab fixed">批量操作<span class="hint">The batch operation</span></p>
										</div>
										<!--正文内容-->
										<div class="main" style="margin-bottom:100px;">
											<label zoom="1.1"><input type="radio" class="fill" name="radio" value="move"/>批量移动类型</label>
											<select id="type_Id2" class="no-shadow">
												<c:forEach items="${typeList}" var="typeInfo" varStatus="status" >
													<option value="${typeInfo.tipType_Id}">${typeInfo.typeName}</option>
												</c:forEach>
											</select>
											<br/>
											<label zoom="1.1"><input type="radio" class="fill" name="radio" value="recycle"/>批量删除</label>
											<br/>
											<button style="margin-top:10px; width:50px;" id="submit" class="button green"><span class="icon-check"></span> 提交</button>
										</div>
									</div>
								</c:otherwise>
							</c:choose>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script>
	var currentPage = "${pageInfo.pageNum}";
	var pageCount = "${pageInfo.pages}";
	
	//类型检索
	javaex.select({
		id : "type_id",
		isSearch : false
	});
	
	javaex.select({
		id : "type_Id2",
		isSearch : false
	});
	//时间范围检索
	var startDate = "";
	var endDate = "";
	javaex.date({
		id : "date2",		// 承载日期组件的id
		monthNum : 2,		// 2代表选择范围日期
		startDate : "${startDate}",	// 开始日期
		endDate : "${endDate}",		// 结束日期
		// 重新选择日期之后返回一个时间对象
		callback : function(rtn) {
			startDate = rtn.startDate;
			endDate = rtn.endDate;
		}
	});
	
	//分页插件
	javaex.page({
		id : "page",
		pageCount : pageCount,	// 总页数
		currentPage : currentPage,// 默认选中第几页
		// 返回当前选中的页数
		callback:function(rtn) {
			search(rtn.pageNum);
		}
	});
	
	//检索+分页
	function search(pageNum) {
		if(pageNum==undefined){
			pageNum=1;
		}
		//公告类型
		var tipType_Id = $("#type_id").val();
		
		//公告标题
		var keyWord = $("#title").val();
		
		//分页
		window.location.href = "list_Tip_normal.action"
		+ "?pageNum="+pageNum
		+ "&tipType_Id="+tipType_Id
		+ "&startDate="+startDate
		+ "&endDate="+endDate
		+ "&keyWord="+keyWord
		;
	}
	
	//批量提交按钮的点击事件
	$("#submit").click(function() {
		var idArr = new Array();
		
		//id：把选中的id保存到数组中
		$(':checkbox[name="tip_Id"]:checked').each(function() {
			idArr.push($(this).val());
		});
		
		//如果一条都没选中，弹出异常提醒
		if(idArr.length==0){
			javaex.optTip({
				content : "至少选择一条记录",
				type : "error"
			});
			return;
		}
		
		//判断选中的哪一个单选框
		var opt = $(':radio[name="radio"]:checked').val();
		if(opt=="move") {
			//获取下拉框选中的id
			var tipType_Id = $("#type_Id2").val();
			
			$.ajax({
				url : "move.json",
				type : "POST",
				dataType : "json",
				traditional : "true",
				data : {
					"idArr" : idArr,
					"tipType_Id" : tipType_Id
				},
				success : function(rtn) {
					if(rtn.code=="000000"){
						javaex.optTip({
							content : rtn.message
						});
						// 建议延迟加载
						setTimeout(function() {
							//刷新页面
							window.location.reload();
						}, 2000);
					}else{
						javaex.optTip({
							content : rtn.message,
							type : "error"
						});
					}
				}
			});
			
		} else if (opt=="recycle") {
			$.ajax({
				url : "update_status.json",
				type : "POST",
				dataType : "json",
				traditional : "true",
				data : {
					"idArr" : idArr,
					"recStatus" : "0"
				},
				success : function(rtn) {
					if(rtn.code=="000000"){
						javaex.optTip({
							content : rtn.message
						});
						// 建议延迟加载
						setTimeout(function() {
							//刷新页面
							window.location.reload();
						}, 2000);
					}else{
						javaex.optTip({
							content : rtn.message,
							type : "error"
						});
					}
				}
			});
		}
		
	});
</script>
</html>