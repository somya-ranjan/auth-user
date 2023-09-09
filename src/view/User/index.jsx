import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import axios from "axios";
import errorHandler from "../../utility/errorHandler";
import LogoutModal from "../../component/logout/LogoutModal";

function User() {
  // // local state
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  async function getData(page) {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setData(response?.data);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  }
  // // // lifeCycle
  useEffect(() => {
    getData(page);
  }, [page]);
  return (
    <>
      <Container>
        <div className="d-flex justify-content-between mt-2 mb-4">
          <h3>User</h3>
          <Button
            color="danger"
            onClick={() => {
              setOpenLogoutModal(true);
            }}
          >
            Logout
          </Button>
        </div>
        <Row>
          {isLoading ? (
            <p>Loading...</p>
          ) : data?.data?.length ? (
            data?.data?.map((ele) => (
              <Col xs={12} sm={6} lg={3} key={Math.random()} className="mb-4">
                <Card>
                  <CardBody>
                    <img
                      src={ele?.avatar}
                      className="img-fluid d-block mx-auto rounded"
                    />
                    <p className="pt-3 mb-0">Email:- {ele?.email}</p>
                    <p className="mb-0">
                      Name:- {`${ele?.first_name} ${ele?.last_name}`}
                    </p>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <p>Data not found</p>
          )}
        </Row>
        <Row>
          {data?.data?.length ? (
            <div className=" text-end">
              <Button
                color="primary"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="me-1"
              >
                Prev
              </Button>
              <Button
                color="primary"
                onClick={() => setPage(page + 1)}
                disabled={data?.total_pages === page}
              >
                Next
              </Button>
            </div>
          ) : null}
        </Row>
      </Container>
      <LogoutModal isOpen={openLogoutModal} setOpen={setOpenLogoutModal} />
    </>
  );
}

export default User;
