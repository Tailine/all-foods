import { InputProps } from 'helpers/types/interface'
import { forwardRef, RefObject } from 'react'
import styled from 'styled-components'
import colors from 'styles/themes/colors'
import { Input } from 'styles/shared'

const StyledInput = styled(Input)<{ hasError?: boolean }>`
  border: ${({ hasError }) =>
    `1px solid ${hasError ? colors.error : colors.blueishGray}`};
`

const FormInput = forwardRef(
  ({ hasError, ...props }: InputProps, ref: RefObject<HTMLInputElement>) => {
    return <StyledInput hasError={hasError} ref={ref} {...props} />
  }
)

FormInput.displayName = 'FormInput'
export { FormInput }
