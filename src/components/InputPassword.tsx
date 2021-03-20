import styled from "styled-components";
import Image from "next/image";
import { forwardRef, RefObject, useState } from "react";
import { Input } from "./Input";
import eyeClosed from "public/images/eye_closed.svg";
import eyeOpen from "public/images/eye_open.svg";
import { InputProps } from "src/utils/types/interface";

type InputType = "password" | "text";

const InputPassword = forwardRef(
  (props: InputProps, ref: RefObject<HTMLInputElement>) => {
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
          {...props}
        />
        <NextImageContainer type={inputType} onClick={handleDisplayPassword}>
          <Image layout="fill" src={eyeIcon} />
        </NextImageContainer>
      </InputContainer>
    );
  }
);

export { InputPassword };

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