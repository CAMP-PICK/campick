import * as Api from '/api.js';

function unlinkApp() {
  Kakao.API.request({
    // 연결 끊기 요청 url
    url: '/v1/user/unlink',
    success: function (res) {
      alert('success: ' + JSON.stringify(res));
    },
    fail: function (err) {
      alert('fail: ' + JSON.stringify(err));
    },
  });
}

// 카카오 api 자바스크립트 키
Kakao.init('4a05adeda27e76e8ecda015e8f2ad57e');

// 카카오 api 초기화(한번은 해야함)
Kakao.isInitialized();

Kakao.Auth.createLoginButton({
  container: '#kakao-login-btn',
  success: function (authObj) {
    Kakao.API.request({
      // 로그인 요청 url
      url: '/v2/user/me',
      success: function (result) {
        const kakao_account = result.kakao_account;
        const nickname = kakao_account.profile.nickname;
        const kakao_email = result.kakao_account.email;
        if (kakao_email === 'undefined') {
          unlinkApp();
          alert(
            '로그인을 위해서 이메일이 필요 합니다. 이메일 제공 항목에 동의해 주세요.'
          );
        } else kakaoLogin(kakao_email, nickname);
      },
      fail: function (error) {
        alert(
          'login success, but failed to request user information: ' +
            JSON.stringify(error)
        );
      },
    });
  },
  fail: function (err) {
    alert('failed to login: ' + JSON.stringify(err));
  },
});

async function kakaoLogin(email, fullName) {
  const user = await Api.get(`/api/user/email/${email}`);
  console.log(user);
  if (!user) {
    // 회원가입 api 요청
    try {
      const data = { fullName: fullName, email: email, platform: 'kakao' };

      await Api.post('/api/user/register', data);
    } catch (err) {
      console.error(err.stack);
      alert(
        `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
      );
    }
  }
  try {
    const access_token = Kakao.Auth.getAccessToken();
    const data = { email: email, password: access_token };

    const result = await Api.post('/api/user/login', data);
    const token = result.token;

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 물론 다른 스토리지여도 됨
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);

    alert(`정상적으로 로그인되었습니다.`);

    // 로그인 성공

    // 기본 페이지로 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
