import { Menu, Layout } from 'antd';
import { useHistory } from 'react-router-dom';

const { Item } = Menu;

const { Sider } = Layout;

function SideNavBar() {
	const history = useHistory();

	function handleItemClick(route) {
		history.push(route);
	}

  return (
		<Sider width={200} className="site-layout-background">
			<Menu	mode="inline"
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				style={{ height: '100%', borderRight: 0 }} >
				<Item key="1" onClick={handleItemClick.bind(null, 'measurements')}>Pacientes</Item>
			</Menu>
		</Sider>
  );
}

export default SideNavBar;