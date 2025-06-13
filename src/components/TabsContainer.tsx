import { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { DraggableTab } from "./DraggableTab";

interface TabItem {
	id: string;
	title: string;
	content: React.ReactNode;
}

interface TabsContainerProps {
	tabs: TabItem[];
}

const STORAGE_KEY = "tabsOrder";

export function TabsContainer({ tabs: initialTabs }: TabsContainerProps) {
	const [tabs, setTabs] = useState(() => {
		const savedOrder = localStorage.getItem(STORAGE_KEY);
		if (savedOrder) {
			const orderMap = JSON.parse(savedOrder);
			return [...initialTabs].sort(
				(a, b) => orderMap[a.id] - orderMap[b.id]
			);
		}
		return initialTabs;
	});
	const [activeKey, setActiveKey] = useState(tabs[0]?.id);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setTabs((items) => {
				const oldIndex = items.findIndex(
					(item) => item.id === active.id
				);
				const newIndex = items.findIndex((item) => item.id === over.id);
				const newTabs = arrayMove(items, oldIndex, newIndex);

				// Save new order to localStorage
				const orderMap = Object.fromEntries(
					newTabs.map((tab, index) => [tab.id, index])
				);
				localStorage.setItem(STORAGE_KEY, JSON.stringify(orderMap));

				return newTabs;
			});
		}
	}

	return (
		<Tab.Container
			activeKey={activeKey}
			onSelect={(k) => k && setActiveKey(k)}
		>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<Nav variant="tabs">
					<SortableContext
						items={tabs.map((tab) => tab.id)}
						strategy={horizontalListSortingStrategy}
					>
						{tabs.map((tab) => (
							<DraggableTab
								key={tab.id}
								id={tab.id}
								title={tab.title}
								active={activeKey === tab.id}
								onSelect={() => setActiveKey(tab.id)}
							/>
						))}
					</SortableContext>
				</Nav>
				<Tab.Content>
					{tabs.map((tab) => (
						<Tab.Pane key={tab.id} eventKey={tab.id}>
							{tab.content}
						</Tab.Pane>
					))}
				</Tab.Content>
			</DndContext>
		</Tab.Container>
	);
}
