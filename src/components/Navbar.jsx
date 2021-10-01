import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

function NavBar() {
	const Logo = styled.div`
		float: left;
		width: 125px;
		height: 31px;
		margin: 16px 24px 16px 0;
	`;

	return (
		<Header style={{ background: '#fff' }}>
			<Logo>
				<h1 style={{ fontSize: '24px' }}> MoniCare </h1>
			</Logo>
		</Header>
	);
}

export default NavBar;
