import { useAtom } from 'jotai';
import { favouritesAtom } from "@/store";
import ArtworkCard from "@/components/ArtworkCard";
import { Row, Col, Card } from "react-bootstrap";

export default function Favourites() {
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    
    if (!favourites) return null;

    if (favourites.length == 0) {

        return <Card body>Nothing Here</Card>;
    }

    return (
        <>
            <Row className="gy-4">
                {favourites.map((objectID) => (
                    <Col lg={3} key={objectID}>
                        <ArtworkCard objectID={objectID} />
                    </Col>
                ))}
            </Row>
        </>
    );

}