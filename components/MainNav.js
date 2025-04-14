import { Container, Nav, Navbar } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";


export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsExpanded(false);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    await router.push(`/artwork?title=true&q=${searchField}`);
  };
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavLinkClick = () => {
    setIsExpanded(false);
  };

  let token = readToken();
  let userName = token ? token.userName : null;

  const logout = () => {
    setIsExpanded(false); // Collapse the menu
    removeToken(); // Remove the token
    router.push("/login"); // Redirect to the login page
  };

  return (
    <>
      <Navbar expanded={isExpanded} className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand>Ahmad Syed</Navbar.Brand>
          <Navbar.Toggle onClick={handleToggle} />
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/"}
                onClick={handleNavLinkClick}>Home</Nav.Link>
            </Link>
            {token &&
              <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={handleNavLinkClick}>Advance Search</Nav.Link></Link>
            }
          </Nav>
          &nbsp;
          {token && (
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          )}
          &nbsp;
          {token && (
            <Nav className="me-auto">
              <NavDropdown title={userName || "User Name"} id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/favourites"}
                    onClick={handleNavLinkClick} >Favourites</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/history"}
                    onClick={handleNavLinkClick} >Search History</NavDropdown.Item>
                </Link>
                <Link href="/home" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === "/home"} onClick={logout}>Logout</NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          )}
          {!token && (
            <Nav>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/login"} onClick={handleNavLinkClick}>
                  Login
                </Nav.Link>
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/register"} onClick={handleNavLinkClick}>
                  Register
                </Nav.Link>
              </Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
