$(document).ready(function() {
	alert("onload 실행.");
	
	page_load();
	
});

function page_load() {
	/*초기 페이지 로드 시 onload 호출
	 * 페지이가 로드되면 ajax를 통해 json 파일에 접근해서
	 * json Array를 읽고 json Array 내부 내용들을 Object화 해서
	 * post_notification을 호출하여 이전 게시 내역들을 View해준다.*/
	
	alert("page_load 실행");
	
	$.ajax({
		type : "POST",
		url : "item_return.jsp",
		dataType : "json", // 데이터타입을 json 으로 받아옴
		async : false,
		data : ({
			send_Date : _send_Date
		}),
		cache : false,
		success : function(data) {
			// alert("init_view 통신 성공");
			// alert(data);

			receive_json_data = data;
			// alert(receive_json_data.Monday.length);

			var data_length = 0;

			console.log(receive_json_data);
			}

		},

		error : function(e) {
			alert("init_view 실패ㅜㅜㅜ");
			console.log(e.responseText);
		}
	});
}

function write_notification() {
	/*카카오톡 공유하기 버튼 누를 시 호출되며, 이 함수가 호출되었을 때,
	 * Form 태그 안의 내용들을 바탕으로 해당 내용들을 json Object로
	 * 만들고 json파일에 있는 json array에 add한다.*/
}

function reset_page() {	
	/*Form 태그 내부에 있는 내용들을 모두 초기화 하여 다시 작성할 수 있도록 한다.*/
	alert("페이지를 리셋합니다.");
}
 
function store_notification() {
	/*카카오톡 공유하기 버튼이 눌렸을 때 json파일에 해당 내용을 저장하는 역할을
	 * 수행한다. write_notification 함수 내부에서 호출되도록 한다.*/
	alert("아이템을 저장합니다.");
	
	var _title = document.getElementById("input_title").value;
	var _contents = document.getElementById("input_contents").value;
	var _location = document.getElementById("input_location").value;
	var _link = document.getElementById("input_link").value;
	
	var jObj = new Object();
	jObj.title = _title;
	jObj.contents = _contents;
	jObj.location = _location;
	jObj.link =  _link;

	var _jsonData = JSON.stringify(jObj);
	console.log("제이슨데이터" + _jsonData);
	
	$.ajax({
		type : "POST",
		url : "http://ehdus0008.cafe24.com/store.jsp", 
		timeout : 10000, 
		data : ({
			title : _title,
			contents : _contents,
			location : _location,
			link : _link,
		// json : _jsonData
		}),
		cache : false,
		// dataType: "text",
		success : function(data) {
			alert("받은데이터." + _title + " " + _contents + " " + _location + " "
					+ _link);
			alert(data);
		},
		error : function(xhr, textStatus, errorThrown) {
			alert("전송실패.");
		}
	});
	
	
	window.location.reload(); // 페이지 새로고침.
	
}

function post_notification() {
	/*카카오톡 공유하기가 완료되었을 때, 해당 내용들을 바탕으로 게시판 view에
	 * div를 append 처리 해준다.*/
}

function count_notification() {
	/*게시글이 눌렸을 때, 조회수를 1씩 더해주면서 count된 조회수를 표시해준다.*/
}

function page_next(){
	/*다음 페이지 버튼을 눌렀을 때 게시글 목록을 다음 페이지로 넘겨준다.*/
}

function page_previous(){
	/*이전 페이지 버튼을 눌렀을 때 게시글 목록을 이전 페이지로 넘겨준다.*/
}

function open_notification(){
	/*게시판에서 해당 게시글을 눌렀을때 contents 내용을 보여준다.*/
}