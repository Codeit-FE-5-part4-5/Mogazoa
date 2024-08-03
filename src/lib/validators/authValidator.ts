import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해 주세요.')
    .email('올바른 이메일 주소가 아닙니다.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해 주세요.')
      .email('올바른 이메일 주소가 아닙니다.'),
    nickname: z
      .string()
      .min(1, '닉네임을 입력해 주세요.')
      .max(10, '닉네임은 최대 10자 까지 가능합니다.'),
    password: z
      .string()
      .regex(
        /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
        '비밀번호는 숫자,영문,특수문자로만 가능합니다.',
      )
      .min(1, '비밀번호는 필수 입력입니다.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    passwordConfirmation: z
      .string()
      .regex(
        /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
        '비밀번호는 숫자,영문,특수문자로만 가능합니다.',
      )
      .min(1, '비밀번호 확인을 입력해주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirmation'],
  });

export const oAuthSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해 주세요.')
    .max(20, '닉네임은 최대 20자 까지 가능합니다.'),
});
