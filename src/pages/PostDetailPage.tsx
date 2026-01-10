import { useParams } from 'react-router-dom';

export default function PostDetailPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Post Detail</h1>
            <p>Viewing post ID: {id}</p>
        </div>
    );
}
