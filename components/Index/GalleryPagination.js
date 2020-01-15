import { Container, Pagination } from "semantic-ui-react";
import { useRouter } from "next/router";

function GalleryPagination({ totalPages }) {
  const router = useRouter();

  return (
    <Container textAlign="center" style={{ marginTop: "50px" }}>
      <Pagination
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={(event, data) => {
          data.activePage === 1
            ? router.push("/image")
            : router.push(`/image?page=${data.activePage}`);
        }}
      ></Pagination>
    </Container>
  );
}

export default GalleryPagination;
