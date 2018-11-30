<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.io.*"%>
<%@page import="org.json.*"%>

<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>

<%
	request.setCharacterEncoding("UTF-8"); //받아올 데이터의 인코딩을 UTF-8로 지정한다.

	String realPath = request.getSession().getServletContext().getRealPath("/")+ "items" + ".txt" ;
	// 서버 내의 파일의 물리적 주소를 구하기 위해 realPath를 사용한다.
	
	/*서버에 저장되어있는 텍스트 파일을 읽어드린다.*/
	String Text = "";
	FileReader fr = new FileReader(realPath);
	BufferedReader br = new BufferedReader(fr);
	String line = null;
	while ((line = br.readLine()) != null) {
		Text = Text + line;
	}
	fr.close(); // 파일 읽기가 끝난 후 파일 리더를 닫는다.

	JSONParser jsonParser = new JSONParser(); // JSON 파서 선언. 
	JSONObject jsonObject = (JSONObject) jsonParser.parse(Text);
	// 파일에서 읽어온 Text를 바탕으로 이를 파싱하여 jsonObject를 만든다.
	
	out.println(jsonObject); // 생성한 jsonObject를 출력해본다.
	out.flush(); // out 버퍼를 종료한다.

%>
