import styled from "styled-components";
import Image from "next/image";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  RefObject,
  useState,
} from "react";
import { Input } from "./Input";
import eyeClosed from "public/images/eye_closed.svg";
import eyeOpen from "public/images/eye_open.svg";

type InputType = "password" | "text";

const InputContainer = styled.div`
  position: relative;
`;

const NextImageContainer = styled.div<{ type: InputType }>`
  width: 27px;
  height: ${({ type }) => (type === "password" ? "12px" : "16px")};
  position: absolute;
  right: 0.5em;
  top: ${({ type }) => (type === "password" ? "10px" : "8px")};
  cursor: pointer;
`;

export function InputPassword({
  ref,
  ...rest
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  const [inputType, setInputType] = useState<InputType>("password");

  function handleDisplayPassword() {
    if (inputType === "password") {
      return setInputType("text");
    }
    setInputType("password");
  }

  const eyeIcon = inputType === "password" ? eyeOpen : eyeClosed;

  return (
    <InputContainer>
      <Input
        type={inputType}
        ref={ref as RefObject<HTMLInputElement>}
        {...rest}
      />
      <NextImageContainer type={inputType} onClick={handleDisplayPassword}>
        <Image layout="fill" src={eyeIcon} />
      </NextImageContainer>
    </InputContainer>
  );
}
