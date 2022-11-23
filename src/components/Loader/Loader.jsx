import { Oval } from 'react-loader-spinner';

import { Container } from './Loader.styled';

export default function Loader() {
  return (
    <Container>
      <Oval color="#00BFFF" height={80} width={80} />
    </Container>
  );
}
