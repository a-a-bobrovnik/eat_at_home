import styled from 'styled-components'

export const Button = styled("button")<{updateBtn?: boolean}>`
    background: #B0FF69;
    border-radius: 5px;
    padding: 5px 20px
    border: none;
    color: #000;
    ${(props:any) =>
        props.updateBtn &&`
          background: #E9E929;
          border: #000 solid 1px;
          text-transform: uppercase;
        `};
`