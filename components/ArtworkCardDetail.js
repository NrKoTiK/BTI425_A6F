import useSWR from "swr";
import Error from "next/error";
import Card from "react-bootstrap/Card";
import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";
import { useEffect } from "react";

export default function ArtworkCard({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList])

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    }
    if (!showAdded) {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };

  let url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
  const { data, error } = useSWR(objectID ? url : null);
  if (error) {
    return <Error statusCode={404} />;
  }

  if (data) {
    const {
      primaryImage,
      title,
      objectDate,
      classification,
      medium,
      artistDisplayName,
      creditLine,
      dimensions,
      artistWikidata_URL,
    } = data;
    return (
      <Card>
        <Card.Img
          variant="top"
          src={
            primaryImage || "https://placehold.co/375x375?text=Not+Available"
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
            <br />
            <br />
            <strong>Artist Name:</strong> {artistDisplayName || "N/A"}{" "}
            ( {artistWikidata_URL && (
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                Artist Wiki
              </a>
            )} )
            <br />
            <strong>Credit Line:</strong> {creditLine || "N/A"}
            <br />
            <strong>Dimensions:</strong> {dimensions || "N/A"}
            <br />
            <br />
            <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
              {showAdded ? "+ Favourtie (added)" : "+ Favourites"}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
