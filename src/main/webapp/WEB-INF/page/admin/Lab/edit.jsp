<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>实验室管理</title>
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
						<span>实验室管理</span>
						<span class="divider">/</span>
						<span class="active">实验室修改</span>
					</div>
				</div>
				<!--全部主体内容-->
				<div class="list-content">
					<!--块元素-->
					<div class="block">
						<!--修饰块元素名称-->
						<div class="banner">
							<p class="tab fixed">实验室修改<span class="hint">Laboratory modification</span></p>
						</div>
						<!--正文-->
						<div class="main">
							<!--表单-->
							<form id="form">
								<input type="hidden" name="lab_Id" value="${lab.lab_Id}"/>
								<!--输入框-->
								<div class="unit">
									<div class="left">
										<p class="subtitle">实验室名称</p>
									</div>
									<div class="right">
										<input type="text" class="text" name="labName" data-type="必填" placeholder="请输入实验室名称" 
										style="width:300px;" value="${lab.labName}"/>
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
								<!--分割线-->
								<br>
								
								<!--下拉选择框-->
								<div class="unit">
									<div class="left">
										<p class="subtitle">所属类型</p>
									</div>
									<div class="right">
										<select id="type_id" name="labType_Id">
											<c:if test="${lab.lab_Id==null}">
												<option value="">请选择</option>
											</c:if>
											<c:forEach items="${typeList}" var="typeInfo" varStatus="status" >
												<option value="${typeInfo.labType_Id}" <c:if test="${lab.labType_Id==typeInfo.labType_Id}">selected</c:if>>${typeInfo.typeName}</option>
											</c:forEach>
										</select>
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
								
								<!--分割线-->
								<br>
								
								<!--下拉选择框-->
								<div class="unit">
									<div class="left">
										<p class="subtitle">所属门牌号</p>
									</div>
									<div class="right">
										<select id="door_id" name="labDoor_Id">
											<c:if test="${lab.lab_Id==null}">
												<option value="">请选择</option>
											</c:if>
											<c:forEach items="${doorList}" var="doorInfo" varStatus="status" >
												<option value="${doorInfo.labDoor_Id}" <c:if test="${lab.labDoor_Id==doorInfo.labDoor_Id}">selected</c:if>>${doorInfo.doorName}</option>
											</c:forEach>
										</select>
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
								
								<!--分割线-->
								<br>
								
								<!--输入框-->
								<div class="unit">
									<div class="left">
										<p class="subtitle">实验室简称</p>
									</div>
									<div class="right">
										<input type="text" class="text" name="labna" data-type="必填" placeholder="请输入简称" 
										style="width:300px;" value="${lab.labna}" />
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
								
								<!--分割线-->
								<br>
								<p class="divider"></p>
								<!--提交按钮-->
								<div class="unit">
									<div style="margin-left: 200px;">
										<!--表单提交时，必须是input元素，并指定type类型为button，否则ajax提交时，会返回error回调函数-->
										<input type="button" id="return" zoom="0.9" class="button no" value="返回" style="width:60px;"/>
										<input type="button" id="submit" zoom="1.2" class="button green" value="提交" style="width:40px;"/>
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
								<br>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script>
	javaex.select({
		id : "type_id",
		isSearch : false
	});
	
	javaex.select({
		id : "door_id",
		isSearch : false
	});
	
	$("#return").click(function(){
		history.back();
	});
	
	$("#submit").click(function(){
		$.ajax({
			url : "save.json",
			type : "POST",
			dataType : "json",
			data : $("#form").serialize(),
			success : function(rtn) {
				if(rtn.code=="000000"){
					javaex.optTip({
						content : rtn.message
					});
					// 建议延迟加载
					setTimeout(function() {
						//跳转页面
						window.location.href = "${pageContext.request.contextPath}/Lab/list_Lab_normal.action";
					}, 2000);
				}else{
					javaex.optTip({
						content : rtn.message,
						type : "error"
					});
				}
			}
		});
	});
</script>

</html>