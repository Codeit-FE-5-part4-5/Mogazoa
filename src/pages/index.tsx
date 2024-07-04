import EmailInput from '@/shared/components/Input/EmailInput';
import PasswordInput from '@/shared/components/Input/PasswordInput';
import NicknameInput from '@/shared/components/Input/NicknameInput';
import TextFieldInput from '@/shared/components/Input/TextFieldInput';
import TextAreaInput from '@/shared/components/Input/TextAreaInput';
import ImageInput from '@/shared/components/Input/ImageInput';

export default function Home() {
  return (
    <div className="bg-var-black1 p-10">
      <EmailInput placeholder="이메일을 입력해주세요"></EmailInput>
      <br />
      <PasswordInput placeholder="비밀번호를 입력해주세요"></PasswordInput>
      <br />
      <NicknameInput placeholder="닉네임을 입력해주세요(최대10자)"></NicknameInput>
      <br></br>
      <TextFieldInput placeholder="상품명"></TextFieldInput>
      <br></br>
      <TextAreaInput placeholder="리뷰를 작성해주세요"></TextAreaInput>
      <br></br>
      <ImageInput> </ImageInput>
    </div>
  );
}
