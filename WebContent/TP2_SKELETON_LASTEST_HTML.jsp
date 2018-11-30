<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
    request.setCharacterEncoding("UTF-8");
	String title = request.getParameter("title");
	String contents = request.getParameter("contents");
	String location = request.getParameter("location");
	String link = request.getParameter("link");
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<!--모바일페이지크기조절메타태그-->

<title>컴퓨터공학과 학생회 공지!</title>
<!-- CSS, JS External 정의 -->
<link rel="stylesheet" type="text/css" href="TP2_SKELETON_OPEN_CSS.css">


<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
	integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
	crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
	integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
	crossorigin="anonymous"></script>


<script src="http://code.jquery.com/jquery-1.4.2.min.js"></script>
<script src="http://code.jquery.com/ui/1.8.23/jquery-ui.min.js"></script>

<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>

</head>

<body class="main_body" background="img/background.jpg">
	<!-- 게시판 테이블 정의 -->
	<div height="30px" weight="10px" background="img/banner.PNG"></div>
	<div>
		<!-- CSS, JS External 정의 -->
		<table id="input_table" class="table table-bordered">
			<thead>
			</thead>
			<tbody>
				<!----------- table 배너 ----------->
				<form action="write_ok.jsp" method="post"
					encType="multiplart/form-data">
					<tr>
						<td colspan="2" height="50px" align="center">
							<p>
								<font size="5"><strong>학생회 공지사항</strong></font>
							</p>
						</td>

					</tr>
					<!----------- 제목 입력란 ----------->
					<tr>
						<td id="td_title"><%=title %></td>
					</tr>
					<!----------- 내용 입력란 ----------->
					<tr>
						<td id="td_contents"><strong><<공지내용>></strong><br><%=contents %></td>
					</tr>
					<!----------- 위치 첨부란 ----------->
					<tr>
						<td id="td_location"><strong><<장소>></strong><br><%=location %></td>
					</tr>
					<!----------- 링크 입력란 ----------->
					<tr>
						<td id="td_link"><strong><<링크>></strong><br>
						<a href="<%=link %>"><%=link %></a></td>
					</tr>
				</form>
			</tbody>
		</table>
	</div>

</body>

</html>