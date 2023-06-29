"use client";
import { signInWithPopup } from "@/store/firebase";
import { getProvider, firebaseAuth } from "@/store/auth";
import { Button } from "@/components";

const LoginPage = () => {
  const onLogin = async (event: any) => {
    const provider = getProvider(event.target.textContent);
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      // 로그인에 성공한 후의 작업을 수행합니다.
      const user = result.user;
      console.log("로그인 성공", user);
    } catch (error) {
      // 에러 처리를 합니다.
      console.error("로그인 실패", error);
    }
  };

  return (
    <div className="">
      <Button name="Google" onClick={onLogin} />
      <Button name="Github" onClick={onLogin} />
    </div>
  );
};

export default LoginPage;
