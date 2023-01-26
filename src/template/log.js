const log = ({ where, what, to, action }) => {
  const LOG_MSG = {
    ADD: `<strong>${where}</strong>에 <strong>${what}</strong>을(를) 새로 <strong>입력</strong>했습니다`,
    REMOVE: `<strong>${where}</strong>에 <strong>${what}</strong>을(를) 새로 <strong>삭제</strong>했습니다.`,
    FIX: `<strong>${where}</strong>에 <strong>${what}</strong>을(를) 새로 <strong>수정</strong>했습니다.`,
    MOVE: `<strong>${where}</strong>에서 <strong>${what}</strong>을(를) <strong>${to}</strong>로 <strong>이동</strong>했습니다.`,
    NAME: `<strong>${where}</strong> 영역의 이름이 <strong>${what}</strong>(으)로  <strong>변경</strong>되었습니다.`,
  };

  return `
    <div class="log-wrapper">
      <div class="log-image-wrapper">
        😀
      </div>
      <div class="log-text-wrapper">
        <span class="user-name">jangOh</span>
        <p class="log-text">${LOG_MSG[action]}</p>
        <span class="time">1분 전</span>
      </div>
    </div>
  `;
};
