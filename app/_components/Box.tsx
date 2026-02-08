// app/_components/Box.tsx
// 밑줄 박으면 라우팅으로 인식하지 않음.
// app에서는 단순히 페이지를 보여주는 화면만 할당하자.
// 컴포넌트는 비즈니스 로직인 feature 폴더에 넣자.

export default function Box() {
  return <div className="p-4 border">Box</div>;
}
