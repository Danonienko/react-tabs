import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Nav } from "react-bootstrap";
import { GripHorizontal } from "react-bootstrap-icons";

interface DraggableTabProps {
	id: string;
	title: string;
	active: boolean;
	onSelect: () => void;
}

export function DraggableTab({ id, title, active, onSelect }: DraggableTabProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 1 : undefined,
		opacity: isDragging ? 0.5 : undefined,
	};

	return (
		<Nav.Item ref={setNodeRef} style={style} {...attributes}>
			<Nav.Link
				active={active}
				eventKey={id}
				onClick={onSelect}
				className="d-flex align-items-center gap-2"
			>
				<span {...listeners} style={{ cursor: "grab" }}>
					<GripHorizontal />
				</span>
				{title}
			</Nav.Link>
		</Nav.Item>
	);
}
