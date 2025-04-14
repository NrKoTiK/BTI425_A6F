import validObjectIDList from "@/public/data/validObjectIDList.json";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Error from "next/error";
import { Col, Row, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

const PER_PAGE = 12;

export default function Artwork() {
  const [page, setPage] = useState(1);
  const [artworkList, setArtworkList] = useState([]);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`;
  const { data, error } = useSWR(url);
  useEffect(() => {
    let filteredResults = validObjectIDList.objectIDs.filter(x => data?.objectIDs?.includes(x));
    if (filteredResults) {
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);
  if (error) {
    return <Error statusCode={404} />;
  }
  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };

  if (artworkList && artworkList.length > 0) {
    return (
      <>
        <Row classname="gy-4">
          {artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={() => previous()} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={() => next()} />
            </Pagination>
          </Col>
        </Row>
      </>
    );
  }
  if (artworkList.length == 0) {
    return <Card body>Nothing Here</Card>;
  }

  if (artworkList === null || artworkList === undefined) {
    return null;
  }
}
