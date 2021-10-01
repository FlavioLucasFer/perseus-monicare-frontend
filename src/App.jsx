import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';

import SideNavBar from 'components/SideNavbar';
import NavBar from 'components/NavBar';
import Routes from 'Routes';

const { Content } = Layout;

function App() {
  return (
		<Router>
			<Layout style={{ height: '100%' }}>
				<NavBar />

				<Layout>
					<SideNavBar />

					<Layout style={{ padding: '0 24px 24px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							<Breadcrumb.Item>Pacients</Breadcrumb.Item>
							<Breadcrumb.Item>Medições do paciente</Breadcrumb.Item>
						</Breadcrumb>
						<Content className="site-layout-background"
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
							}} >
							<Routes />
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</Router>
  );
}

export default App;
