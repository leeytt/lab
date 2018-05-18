<%@ page pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>实验室系统后台</title>
</head>

<body>
	<div class="wrap">
		<!-- 头部 -->
		<div id="header">
			<c:import url="header.jsp"></c:import>
		</div>
		
		<!-- 左侧菜单和主体内容 -->
		<div class="grid-1-7" style="flex: 1;margin:0;">
			<c:import url="menu.jsp"></c:import>
		</div>
		
		<!-- 面包屑导航和主体内容 -->
		<div class="content">
		
		</div>
	</div>
</body>
</html>