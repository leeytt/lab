<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 左侧菜单 -->
			<div id="menu" class="menu" style="width: 260px;">
				<div class="menu-title">
					<h1><i>菜单</i></h1>
				</div>
				<ul>
					<li class="menu-item">
						<a href="javascript:;"><span class="icon-printer"> 审核管理</span><i class="my-icon menu-more"></i></a>
						<ul>
							<li><a href="javascript:;"><span>审核列表</span></a></li>
						</ul>
					</li>
					<li class="menu-item">
						<a href="javascript:;"><span class="icon-bell"> 实验室管理</span><i class="my-icon menu-more"></i></a>
						<ul>
							<li><a href="${pageContext.request.contextPath}/Lab/list_Lab_normal.action"><span>实验室列表</span></a></li>
							<li><a href="${pageContext.request.contextPath}/LabType/list_LabType.action"><span>类型管理</span></a></li>
							<li><a href="${pageContext.request.contextPath}/LabDoor/list_LabDoor.action"><span>门牌管理</span></a></li>
							<li><a href="${pageContext.request.contextPath}/Lab/list_Lab_recycle.action"><span>回收站</span></a></li>
						</ul>
					</li>
					<li class="menu-item">
						<a href="javascript:;"><span class="icon-chain-broken"> 设备管理</span><i class="my-icon menu-more"></i></a>
						<ul>
							<li><a href="javascript:;"><span>设备列表</span></a></li>
							<li><a href="javascript:;"><span>类型管理</span></a></li>
							<li><a href="javascript:;"><span>回收站</span></a></li>
						</ul>
					</li>
					<li class="menu-item">
						<a href="javascript:;"><span class="icon-folder-o"> 项目管理</span><i class="my-icon menu-more"></i></a>
						<ul>
							<li><a href="javascript:;"><span>实验室项目列表</span></a></li>
							<li><a href="javascript:;"><span>类型管理</span></a></li>
							<li><a href="javascript:;"><span>回收站</span></a></li>
						</ul>
					</li>
					<li class="menu-item">
						<a href="javascript:;"><span class="icon-commenting-o"> 公告管理</span><i class="my-icon menu-more"></i></a>
						<ul>
							<li><a href="${pageContext.request.contextPath}/Tip/list_Tip_normal.action"><span>公告列表</span></a></li>
							<li><a href="${pageContext.request.contextPath}/TipType/list_TipType.action"><span>类型管理</span></a></li>
							<li><a href="${pageContext.request.contextPath}/Tip/list_Tip_recycle.action"><span>回收站</span></a></li>
						</ul>
					</li>
					<li class="menu-item">
						<a href="javascript:;"><span class="icon-user"> 权限管理</span><i class="my-icon menu-more"></i></a>
						<ul>
							<li><a href="javascript:;"><span>管理员列表</span></a></li>
							<li><a href="javascript:;"><span>角色管理</span></a></li>
							<li><a href="javascript:;"><span>权限管理</span></a></li>
							<li><a href="javascript:;"><span>权限分类</span></a></li>
						</ul>
					</li>
					<li class="menu-item">
						<a href="javascript:;"><span class="icon-cog"> 其他</span><i class="my-icon menu-more"></i></a>
						<ul>
							<li><a href="javascript:;"><span>状态管理</span></a></li>
						</ul>
					</li>
				</ul>
			</div>
<script>
	javaex.menu({
		id : "menu",
		isAutoSelected:true
	});
</script>