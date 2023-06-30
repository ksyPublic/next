"use client";
import { signInWithPopup } from "@/store/firebase";
import { getProvider, firebaseAuth } from "@/store/auth";
import { Button, Input, Text } from "@/components";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const onLogin = async (event: any) => {
    const getDataValue = event.target.getAttribute("data-value");
    const provider = getProvider(getDataValue);
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      // 로그인에 성공한 후의 작업을 수행합니다.
      router.push("/main");
    } catch (error) {
      // 에러 처리를 합니다.
      console.error("로그인 실패", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[360px] text-center">
        <Text name="로그인" />
        <Input placeholder="이메일 또는 아이디를 입력해주세요." />
        <Input placeholder="비밀번호를 입력해주세요." className="mt-2" />
        <Button
          name="로그인"
          className="w-36 mt-4 font-medium mx-auto py-3 bg-black hover:bg-gray-800"
        />
        <Button
          name="Sign in with Google"
          variant="Google"
          onClick={onLogin}
          className="w-full mt-10"
        />
        <Button
          name="Sign in with Github"
          variant="Github"
          onClick={onLogin}
          className="w-full mt-2"
        />

        <Button
          name="Sign in with Facebook"
          variant="Facebook"
          onClick={onLogin}
          className="w-full mt-2"
        />
      </div>
    </div>
  );
};

export default LoginPage;
