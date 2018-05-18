<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
<script>
	window.location.href = "${APP_PATH}/admin/index.action";
</script>