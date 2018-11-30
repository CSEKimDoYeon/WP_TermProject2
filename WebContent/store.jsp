<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="org.json.simple.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.io.*"%>
<%@page import="org.json.*"%>

<%@ page import="java.util.*"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>

<%
		request.setCharacterEncoding("UTF-8"); //받아올 데이터의 인코딩을 UTF-8로 지정한다.
		
		String title = request.getParameter("title");
		String contents = request.getParameter("contents");
		String location = request.getParameter("location");
		String link = request.getParameter("link");
		String date = request.getParameter("date");
		out.println("\n\n ajax로 전송받은 데이터 : " + title + " " + contents + " " + location + " " + link + " " + date);
		// Ajax 호출 시 보낸 데이터들을 getParameter로 가져온다.
		
		String realPath = request.getSession().getServletContext().getRealPath("/")+ "items" + ".txt" ;
		out.println(realPath);
		// 서버 내의 물리적 주소를 구하기 위해 realPath를 사용한다.
	
		/*파일을 가져와서 파일 안의 내용을 한 줄 씩 읽어들인다.*/
		String Text ="";
		FileReader fr = new FileReader(realPath);
		BufferedReader br = new BufferedReader(fr);
		String line = null;
		while ((line = br.readLine()) != null) {
			Text = Text + line; 
		}
		fr.close(); // 파일 내용을 다 읽었으면 파일 리더를 닫는다.
		
		JSONParser jsonParser = new JSONParser(); // 새로운 JSON 파서를 선언한다.
		JSONObject jsonObject = (JSONObject) jsonParser.parse(Text); // 파일에서 읽어들인 Text를 파싱하여 jsonObject를 만든다.
		JSONArray jsonArray = (JSONArray) jsonObject.get("items"); // items object의 배열을 jsonArray에 저장한다.
		out.print("\n\n" + "items" + ".txt파일의 json 내용 : " + jsonArray);
		
		JSONObject obj = new JSONObject(); // 새로운 jsonObject를 선언한다.

		obj.put("title", title);
		obj.put("contents", contents);
		obj.put("location", location);
		obj.put("link", link);
		obj.put("date", date);
		/*Ajax로 받은 데이터들을 jsonObject에 값을 삽입한다.*/

		out.print("\n\n jsp 내부에서 만들어진 제이슨 객체" + obj);
		jsonArray.add(obj);
		// 최종적으로 만들어진 jsonObject를 jsonArray에 삽입한다.

		out.print("\n\n 오브젝트 넣고 난 이후의 어레이 : " + jsonArray); 

		String item = jsonArray.toJSONString(); // json 객체를 string 형식으로 바꾼다.
		String storeText = "{\"" + "items" + "\"" + ":" + item + "}";
		// 파일에 다시 저장할 Text를 jsonArray를 바탕으로 생성한다.
	%>

<%
	 try {
			// 파일 객체 생성
			File file = new File(realPath); // 서버의 물리주소에 저장하도록 한다.
			// 파일 생성
			file.createNewFile();
			// 파일쓰기를 위한 객체 생성
			BufferedWriter wt = new BufferedWriter(new FileWriter(file));
			wt.write(storeText);
			// 최종적으로 만들어진 storeText를 파일에 저장한다.
			wt.close();
		} catch (IOException e) {
			e.printStackTrace();
		} 

	%> 

