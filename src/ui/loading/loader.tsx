import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const LoaderWrapper = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
    width: '100%'
});

const Loader = () => (
    <LoaderWrapper>
        <LinearProgress color="primary" />
    </LoaderWrapper>
);

export default Loader;
