import { TabsContainer } from "./components/TabsContainer";

const tabs = [
	{
		id: "tab1",
		title: "Tab 1",
		content: <div className="p-3">Content for Tab 1</div>
	},
	{
		id: "tab2",
		title: "Tab 2",
		content: <div className="p-3">Content for Tab 2</div>
	},
	{
		id: "tab3",
		title: "Tab 3",
		content: <div className="p-3">Content for Tab 3</div>
	}
];

export default function App() {
	return (
		<div className="container mt-4">
			<TabsContainer tabs={tabs} />
		</div>
	);
}
