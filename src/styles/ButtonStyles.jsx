import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 1rem 1.5rem;
`
const ButtonSecondary = styled(Button)`
    background: lightblue;
`

const ButtonPrimary = styled(Button)`
    background: blue;
`

export { Button, ButtonSecondary, ButtonPrimary }