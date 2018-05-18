<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>公告编辑</title>
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
						<span class="active">公告编辑</span>
					</div>
				</div>
				<!--全部主体内容-->
				<div class="list-content">
					<!--块元素-->
					<div class="block">
						<!--修饰块元素名称-->
						<div class="banner">
							<p class="tab fixed">公告编辑<span class="hint">Announcement to edit</span></p>
						</div>
						<!--正文-->
						<div class="main">
							<!--表单-->
							<form id="form">
								<input type="hidden" name="tip_Id" value="${tip.tip_Id}"/>
								<!--输入框-->
								<div class="unit">
									<div class="left">
										<p class="subtitle">公告标题</p>
									</div>
									<div class="right">
										<input type="text" class="text" name="tipTitle" data-type="必填" placeholder="请输入标题" value="${tip.tipTitle}" />
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
								<!--分割线-->
								<p class="divider"></p>
							
								<!--分割线-->
								<p class="divider"></p>
								
								<!--下拉选择框-->
								<div class="unit">
									<div class="left">
										<p class="subtitle">所属分类</p>
									</div>
									<div class="right">
										<select id="type_id" name="tipType_Id">
											<c:if test="${tip.tip_Id==null}">
												<option value="">请选择</option>
											</c:if>
											<c:forEach items="${typeList}" var="typeInfo" varStatus="status" >
												<option value="${typeInfo.tipType_Id}" <c:if test="${tip.tipType_Id==typeInfo.tipType_Id}">selected</c:if>>${typeInfo.typeName}</option>
											</c:forEach>
										</select>
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
								<!--分割线-->
								<p class="divider"></p>
								
								<!--文章封面-->
								<div class="unit">
									<div class="left">
										<p class="subtitle">公告封面</p>
									</div>
									<div class="right">
										<a href="javascript:;">
											<!-- 图片承载容器 -->
											<label id="container" for="upload" style="display: inline-block; width:132px;height:74px;">
												<c:choose>
													<c:when test="${empty tip.cover}">
														<img src="${pageContext.request.contextPath}/static/javaex/pc/images/default.png" width="100%" height="100%" />
													</c:when>
													<c:otherwise>
														<img src="/upload/${tip.cover}" width="100%" height="100%" />
													</c:otherwise>
												</c:choose>
											</label>
											<!-- 上传按钮 -->
											<input type="file" class="hide" id="upload" accept="image/gif, image/jpeg, image/jpg, image/png" />
											<input type="hidden" id="cover" name="cover" value=""/>
										</a>
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
								<!--分割线-->
								<p class="divider"></p>
								
								<!--文本域-->
								<div class="unit">
									<div class="left">
										<p class="subtitle">公告内容</p>
									</div>
									<div class="right">
										<div id="edit" class="edit-container"></div>
										<input type="hidden" id="tipContent" name="tipContent" value=""/>
										<input type="hidden" id="tipText" name="tipText" value=""/>
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
								<!--分割线-->
								<p class="divider"></p>
								
								<!--提交按钮-->
								<div class="unit">
									<div style="margin-left: 200px;">
										<!--表单提交时，必须是input元素，并指定type类型为button，否则ajax提交时，会返回error回调函数-->
										<input type="button" id="return" class="button no" value="返回" />
										<input type="button" id="submit" class="button yes" value="保存" />
									</div>
									<!--清浮动-->
									<span class="clearfix"></span>
								</div>
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
	
	javaex.upload({
		type : "image",
		url : "upload.json",	// 请求路径
		id : "upload",	// <input type="file" />的id
		param : "file",			// 参数名称，SSM中与MultipartFile的参数名保持一致
		dataType : "url",		// 返回的数据类型：base64 或 url
		callback : function (rtn) {
			// 后台返回的数据
			console.log(rtn);
			if (rtn.code=="000000") {
				var imgUrl = rtn.data.imgUrl;
				$("#container img").attr("src", "/upload/"+imgUrl);
				$("#cover").val(imgUrl);
			} else {
				javaex.optTip({
					content : rtn.message,
					type : "error"
				});
			}
		}
	});
	
	var tipcontent = '${tip.tipContent}';
	javaex.edit({
		id : "edit",
		image : {
			url : "upload.json",	// 请求路径
			param : "file",		// 参数名称，SSM中与MultipartFile的参数名保持一致
			dataType : "url",	// 返回的数据类型：base64 或 url
			rtn : "rtnData",	// 后台返回的数据对象，在前面页面用该名字存储
			imgUrl : "data.imgUrl",	// 根据返回的数据对象，获取图片地址。  例如后台返回的数据为：{code: "000000", message: "操作成功！", data: {imgUrl: "1.jpg"}}
			prefix : "/upload/"	// 图片地址的前缀，根据实际情况决定是否需要填写
		},
		content : tipcontent,	// 这里必须是单引号，因为html代码中都是双引号，会产生冲突
		callback : function(rtn) {
			$("#tipContent").val(rtn.html);
			$("#tipText").val(rtn.text.substring(0, 100));
		}
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
						window.location.href = "${pageContext.request.contextPath}/Tip/list_Tip_normal.action";
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