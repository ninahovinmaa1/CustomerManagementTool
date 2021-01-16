import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 1rem 1.5rem;
`
const ButtonSecondary = styled(Button)`
    background: lightgrey;
`

const ButtonPrimary = styled(Button)`
    background: lightblue;
`

export { Button, ButtonSecondary, ButtonPrimary }