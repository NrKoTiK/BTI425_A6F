import useSWR from "swr";
import Error from "next/error";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";

export default function ArtworkCard({ objectID }) {
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
  const { data, error } = useSWR(url);
  if (error) {
    return <Error statusCode={404} />;
  }

  if (data) {
    const { primaryImageSmall, title, objectDate, classification, medium } =
      data;
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={
              primaryImageSmall ||
              "https://placehold.co/375x375?text=Not+Available"
            }
          />
          <Card.Body>
            <Card.Title>{title || "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {objectDate || "N/A"}
              <br />
              <strong>Classification:</strong> {classification || "N/A"}
              <br />
              <strong>Medium:</strong> {medium || "N/A"}
            </Card.Text>
            <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
              <Button variant="primary">ID: {objectID}</Button>
            </Link>
          </Card.Body>
        </Card>
        <br />
      </>
    );
  }
}
