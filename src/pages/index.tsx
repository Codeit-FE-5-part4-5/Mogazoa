import EmailInput from '@/shared/components/Input/EmailInput';
import PasswordInput from '@/shared/components/Input/PasswordInput';
import NicknameInput from '@/shared/components/Input/NicknameInput';
import TextFieldInput from '@/shared/components/Input/TextFieldInput';
import TextAreaInput from '@/shared/components/Input/TextAreaInput';
import ImageInput from '@/shared/components/Input/ImageInput';

export default function Home() {
  return (
    <div className="bg-var-black1 p-10">
      <EmailInput placeholder="이메일을 입력해주세요." />
      <PasswordInput placeholder="비밀번호를 입력해주세요." />
      <NicknameInput placeholder="닉네임을 입력해주세요." />
      <TextFieldInput placeholder="이름을 입력해주세요." />
      <TextAreaInput placeholder="자기소개를 입력해주세요." />
      <ImageInput />
    </div>
  );
}
