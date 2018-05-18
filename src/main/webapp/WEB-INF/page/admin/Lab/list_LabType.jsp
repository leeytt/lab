<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>类型管理</title>
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
						<span class="active">类型管理</span>
					</div>
				</div>
				<!--全部主体内容-->
				<div class="list-content">
					<!--块元素-->
					<div class="block ">
						<!--页面有多个表格时，可以用于标识表格-->
						<h2>实验室类型列表</h2>
						<!--右上角的返回按钮-->
						<a href="javascript:history.back();">
							<button class="button wathet" style="position: absolute;right: 20px;top: 16px;"><span class="icon-arrow_back"></span> 返回</button>
						</a>
						
						<!--正文内容-->
						<div class="main-20">
							<!--表格上方的搜索操作-->
							<div style="text-align:right;margin-bottom:10px;">
								<!-- 标题检索 -->
								<input type="text" class="text" id="title" value="" placeholder="检索标题" />
								<!-- 点击查询按钮 -->
								<button class="button blue" style="margin-top: -3px;" onclick="search()"><span class="icon-search"></span></button>
							</div>
							
							<!--表格上方的操作元素，添加、删除等-->
							<div class="operation-wrap">
								<div class="buttons-wrap">
									<button id="add" class="button blue"><span class="icon-plus"></span> 添加</button>
									<button id="delete" class="button red"><span class="icon-minus"></span> 删除</button>
									<button id="save" class="button green"><span class="icon-check"></span> 保存</button>
								</div>
							</div>
							<table id="table" class="table">
								<thead>
									<tr>
										<th style="width:20px;"><input type="checkbox" class="fill listen-1"/> </th>
										<th style="width:30%;">显示排序</th>
										<th>类型名称</th>
									</tr>
								</thead>
								<tbody>
									<c:forEach items="${list}" var="entity" varStatus="status" >
										<tr>
											<td><input type="checkbox" class="fill listen-1-2" name="id" value="${entity.labType_Id}"/> </td>
											<td><input type="text" class="text" name="sort" value="${entity.sort}" data-type="正整数" error-msg="必须输入正整数" /></td>
											<td><input type="text" class="text" name="name" data-type="必填" placeholder="请输入类型名称" value="${entity.typeName}"/></td>
										</tr>
									</c:forEach>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script>
	var idArr = new Array();
	var sortArr = new Array();
	var nameArr = new Array();
	
	//动态添加tr行
	$("#add").click(function() {
		var html = '';
		html += '<tr>';
		html += '<td><input type="checkbox" class="fill listen-1-2" name="id" value="${entity.labType_Id}"/> </td>';
		html += '<td><input type="text" class="text" name="sort" value="${entity.sort}" data-type="正整数" error-msg="必须输入正整数" /></td>';
		html += '<td><input type="text" class="text" name="name" data-type="必填" placeholder="请输入分类名称" value="${entity.typeName}"/></td>';
		html += '</tr>';
		
		$("#table tbody").append(html);
		//重新渲染
		javaex.render();
	});
	
	//保存按钮点击事件
	$("#save").click(function() {
		if(javaexVerify()){
			idArr = [];
			sortArr = [];
			nameArr = [];
			
			//id
			$(':checkbox[name="id"]').each(function() {
				idArr.push($(this).val());
			});
			
			//sort
			$('input[name="sort"]').each(function() {
				sortArr.push($(this).val());
			});
			
			//name
			$('input[name="name"]').each(function() {
				nameArr.push($(this).val());
			});
		
			
			$.ajax({
				url : "save.json",
				type : "POST",
				dataType : "json",
				traditional : "true",
				data : {
					"idArr" : idArr,
					"sortArr" : sortArr,
					"nameArr" : nameArr
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
	
	//点击删除按钮事件
	$("#delete").click(function() {
		idArr = [];
		//1.0遍历所有被勾选的复选框
		$(':checkbox[name="id"]:checked').each(function() {
			//2.0添加主键存在的记录
			var id = $(this).val();
			if(id!=""){
				idArr.push(id);
			}
		});
		
		//判断所勾选的是不是新增的空白记录
		if (idArr.length==0){
			$(':checkbox[name="id"]:checked').each(function() {
				//前台无刷新的去除新增的空白tr
				$(this).parent().parent().parent().remove();
			});
		}else{
			$.ajax({
				url : "delete.json",
				type : "POST",
				dataType : "json",
				traditional : "true",
				data : {
					"idArr" : idArr
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