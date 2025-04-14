import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from '@/styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    if (!searchHistory) return null;
    
    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });
    const router = useRouter();
    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);

    };

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]))
    };
    if (parsedHistory.length == 0) {
        return <Card body>Nothing Here</Card>;
    }

    return (
        <>
            <ListGroup>
                {parsedHistory.map((historyItem, index) => (
                    <ListGroup.Item key={index} onClick={(e) => historyClicked(e, index)} className={styles.historyListItem}>
                        {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                        <Button className="float-end" variant="danger" size="sm"
                            onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}