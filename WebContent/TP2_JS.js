var receive_json_data = "";
// 서버로부터 받아올 json 데이터를 저장 할 전역변수.

$(document).ready(function() { // 페이지 로딩 시 DOM이 모두 load되면 호출되는 함수.
	page_load(); // 초기 세팅 과정을 위해 page_load() 함수를 호출한다.
	set_lastest_page(); // 가장 최근에 올라온 공지를 세팅한다.
});

function page_load() {
	/*
	 * 초기 페이지 로드 시 onload 호출 페지이가 로드되면 ajax를 통해 json 파일에 접근해서 json Array를 읽고
	 * json Array 내부 내용들을 Object화 해서 post_notification을 호출하여 이전 게시 내역들을 View해준다.
	 */

	$.ajax({ // Ajax 호출
		type : "POST", // POST 방식으로 전송한다.
		url : "http://ehdus0008.cafe24.com/return.jsp",
		dataType : "json", // 데이터타입을 json 으로 받아옴
		async : false, // 비동기 함수 수행을 진행한다.
		data : ({

		}),
		cache : false,
		success : function(data) { // Ajax호출이 성공하였을 경우의 Action.

			receive_json_data = data; // 받아온 data(json)을 전역변수에 저장한다.
			console.log(receive_json_data);

			post_notification(); // 받은 json 데이터를 바탕으로 포스트 실행.

		},
		error : function(e) { // Ajax호출을 실패하였을 경우의 Action.
			alert("page_load 실패");
			console.log(e.responseText);
		}
	});
}

function store_notification() {
	/*
	 * 카카오톡 공유하기 버튼이 눌렸을 때 json파일에 해당 내용을 저장하는 역할을 수행한다.
	 */
	var d = new Date(); // 새로운 글을 저장 시 저장한 날짜도 필요하기 때문에 Date() 객체를 사용한다.
	var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
	// date 출력 포멧을 설정해준다.

	var _title = document.getElementById("input_title").value;
	var _contents = document.getElementById("input_contents").value;
	var _location = document.getElementById("input_location").value;
	var _link = document.getElementById("input_link").value;
	var _date = date;
	/* Kakao Notification의 From 내용들을 읽어와서 변수에 임시저장한다. */

	if ((_title != "") && (_contents != "") && (_location != "")
			&& (_link != "")) { // 모든 내용이 다 차있을 경우에만 Ajax를 실행하도록한다.

		var jObj = new Object();
		jObj.title = _title;
		jObj.contents = _contents;
		jObj.location = _location;
		jObj.link = _link;
		jObj.date = _date;
		/* 새로운 JsonObect를 선언하고 from에서 가져온 값들을 바탕으로 jObj를 만든다. */

		var _jsonData = JSON.stringify(jObj);
		// 만들어진 jObj를 String 형식으로 변환한다.
		console.log("제이슨데이터" + _jsonData);

		$.ajax({ // Ajax 호출
			type : "POST", // POST 방식으로 전송한다.
			url : "http://ehdus0008.cafe24.com/store.jsp",
			timeout : 10000, // 타임아웃을 넘었을 경우 전송에 실패 한 것으로 간주한다.
			data : ({ // Ajax를 통해 jsp 파일에 보낼 데이터들을 parameter : value 순으로 세팅한다.
				title : _title,
				contents : _contents,
				location : _location,
				link : _link,
				date : _date
			}),
			cache : false,
			success : function(data) {
				// Ajax 호출 성공하였을 경우의 Action.
			},
			error : function(xhr, textStatus, errorThrown) {
				alert("전송실패.");
			}
		});

	} else
		// 입력 내용이 하나라도 빠져있을 경우에는 오류 메시지 창을 띄우도록 한다.
		alert("내용을 모두 입력해주세요.");
}

function post_notification() {
	/*
	 * 카카오톡 공유하기가 완료되었을 때, 해당 내용들을 바탕으로 게시판 view에 tr을 append 처리 해준다.
	 */

	var json_length = receive_json_data.items.length; // 현재 전역번수 json 배열의 길이를
														// 저장한다.

	for (var i = json_length - 1; i >= 0; i--) {
		// 맨 마지막에 저장 된 글이 가장 위에 띄워줘야 할 최신 글이므로 맨 뒤의 인덱스부터 반복한다.
		if (i == json_length - 1) { // 가장 최신글일 경우
			var html = '<tr>'
					+ '<td class="title">'
					+ '<a href="#" onclick="open_notification('
					+ i
					+ ');">'
					+ receive_json_data.items[i].title
					+ '</a>'
					+ '<img width="15px" height="15px" class="new" alt="새글" src="img/icon_new.png">'
					+ '</td><td class="name">김도연</td>' + '<td class="date">'
					+ receive_json_data.items[i].date + '</td>' + '</tr>';
			// 최신글일 경우에는 추가적으로 img 태그를 추가하여 새로운 글임을 보여주는 아이콘을 붙혀준다.

			jQuery("#board tbody").append(html);
			// jQuery를 사용하여 board라는 아이디를 가진 tbody 태그에 위에 생성한 DOM을 append 해준다.
		} else {
			var html = '<tr>' + '<td class="title">'
					+ '<a href="#" onclick="open_notification(' + i + ');">'
					+ receive_json_data.items[i].title + '</a>'
					+ '</td><td class="name">김도연</td>' + '<td class="date">'
					+ receive_json_data.items[i].date + '</td>' + '</tr>';
			jQuery("#board tbody").append(html);
			// jQuery를 사용하여 board라는 아이디를 가진 tbody 태그에 위에 생성한 DOM을 append 해준다.
		}
	}

}

function open_notification(index) {
	/* 게시판에서 해당 게시글을 눌렀을때 contents 내용을 보여준다. */

	var target_json_data = receive_json_data; // 전역번수에 저장되어있는 json데이터를 가져온다.
	var target_json_object = target_json_data.items[index];
	// parameter로 받은 index에 해당하는 object를 jsonArray에서 가져온다.

	var _title = target_json_object.title;
	var _contents = target_json_object.contents;
	var _location = target_json_object.location;
	var _link = target_json_object.link;
	/* 가져온 jsonObject에서 데이터들을 추출한다. */

	var form = document.createElement("form");
	form.setAttribute("charset", "UTF-8");
	form.setAttribute("method", "Post"); // Get 또는 Post 입력
	form.setAttribute("action",
			"http://ehdus0008.cafe24.com/TP2_SKELETON_OPEN_HTML.jsp");
	form.setAttribute("target", "_blank");
	/* jsp로 데이터를 전송하기 위해 from 태그를 새로 생성하고 속성을 정의해준다. */

	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "title");
	hiddenField.setAttribute("value", _title);
	form.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "contents");
	hiddenField.setAttribute("value", _contents);
	form.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "location");
	hiddenField.setAttribute("value", _location);
	form.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "link");
	hiddenField.setAttribute("value", _link);
	form.appendChild(hiddenField);

	/* 총 4가지의 필드를 전송해야하기 때문에 4개의 필드를 선언해주고 form 태그에 append해준다. */

	var url = "http://ehdus0008.cafe24.com/TP2_SKELETON_OPEN_HTML.jsp"

	document.body.appendChild(form);
	// 최종적으로 만들어진 form 태그를 body에 append해준다.
	form.submit(); // 만들어진 form을 target url로 submit해준다.

}

function set_lastest_page() {
	/* 가장 최근의 공지를 세팅하는 함수 */

	var target_json_data = receive_json_data;
	var length = target_json_data.items.length;
	/*전역번수에 저장된 jsonArray를 가져오고 해당 배열의 길이를 가져온다.*/

	var target_json_object = target_json_data.items[length - 1];
	// 길이 -1의 인덱스를 가지는 object가 가장 최신 글이 저장되어있는 object이므로 가져온다.
	var _title = target_json_object.title;
	var _contents = target_json_object.contents;
	var _location = target_json_object.location;
	var _link = target_json_object.link;
	// 가져온 object에서 필요한 값들을 추출한다.

	var form = document.createElement("form");
	form.setAttribute("charset", "UTF-8");
	form.setAttribute("method", "Post"); // Get 또는 Post 입력
	form.setAttribute("action",
			"http://ehdus0008.cafe24.com/TP2_SKELETON_LASTEST_HTML.jsp");
	form.setAttribute("target", "_blank");
	/* jsp로 데이터를 전송하기 위해 from 태그를 새로 생성하고 속성을 정의해준다. */

	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "title");
	hiddenField.setAttribute("value", _title);
	form.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "contents");
	hiddenField.setAttribute("value", _contents);
	form.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "location");
	hiddenField.setAttribute("value", _location);
	form.appendChild(hiddenField);

	hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "link");
	hiddenField.setAttribute("value", _link);
	form.appendChild(hiddenField);

	/* 총 4가지의 필드를 전송해야하기 때문에 4개의 필드를 선언해주고 form 태그에 append해준다. */
	
	var url = "http://ehdus0008.cafe24.com/TP2_SKELETON_LASTEST_HTML.jsp"

	document.body.appendChild(form);
	// 최종적으로 만들어진 form 태그를 body에 append해준다.
	form.submit(); // 만들어진 form을 target url로 submit해준다.

}
