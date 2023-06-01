// 이메일 입력 필드에 blur 이벤트 핸들러 등록
const emailInput = document.querySelector("#email-input");
emailInput.addEventListener("blur", handleEmailBlur);

// 비밀번호 입력 필드에 blur 이벤트 핸들러 등록
const passwordInput = document.querySelector("#passwd-input");
passwordInput.addEventListener("blur", handlePasswordBlur);

// 이메일 유효성 검사
function handleEmailBlur(event) {
  var emailMsg = event.target.parentNode.querySelector(".error-msg");

  var value = event.target.value;
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!value) {
    if (!emailMsg) {
      emailMsg = createErrorMessage();
      event.target.parentNode.appendChild(emailMsg);
    }
    showErrorMessage(emailMsg, "이메일을 입력해주세요.");
  } else if (!emailRegex.test(value)) {
    if (!emailMsg) {
      emailMsg = createErrorMessage();
      event.target.parentNode.appendChild(emailMsg);
    }
    showErrorMessage(emailMsg, "이메일 형식에 맞게 입력해주세요.");
  } else {
    if (emailMsg) {
      emailMsg.remove();
    }
  }
}

// 비밀번호 유효성 검사
function handlePasswordBlur(event) {
  var passwordMsg = event.target.parentNode.querySelector(".error-msg");

  var value = event.target.value;

  if (!value) {
    if (!passwordMsg) {
      passwordMsg = createErrorMessage();
      event.target.parentNode.appendChild(passwordMsg);
    }
    showErrorMessage(passwordMsg, "비밀번호를 입력해주세요.");
  } else {
    if (passwordMsg) {
      passwordMsg.remove();
    }
  }
}

// 토글 선택자(오류 메시지 노출 시 위치 조정, 비밀번호 토글 사용)
const passwdToggle = document.querySelector('.passwd-toggle');

// 오류 메시지를 보여주는 함수
function showErrorMessage(element, message) {
  element.innerText = message;
  element.style.display = "block";
}

// 오류 메시지를 생성하는 함수
function createErrorMessage() {
  var errorMessage = document.createElement("div");
  errorMessage.className = "error-msg";
  passwdToggle.style.top = "48px"
  return errorMessage;
}

// 비밀번호 토글
const passwdInput = document.querySelector('#passwd-input');

passwdToggle.addEventListener('click', function() {
  if (passwdInput.type === 'password') {
    passwdInput.type = 'text';
    passwdToggle.textContent = '숨기기';
  } else {
    passwdInput.type = 'password';
    passwdToggle.textContent = '보이기';
  }
});

// 서버 통신
const loginForm = document.querySelector('.signin-form');

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // 서버로 전송할 데이터를 객체 형식으로 만듦
  const data = {
    email: email,
    password: password
  };

  fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then(result => {
      // 서버 응답 처리
      console.log(result);

      // 로그인 성공 시 SPA로 main 페이지 요소들을 보여줘야 함 추후 추가
      
    })
    .catch(error => {
      // 에러 처리
      console.error('Error:', error);
    
      const errorMsg = createErrorMessage();
      showErrorMessage(errorMsg, '아이디 또는 비밀번호가 올바르지 않습니다.');
      passwordInput.parentNode.appendChild(errorMsg);
    });
});