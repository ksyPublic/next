"use client";
import React from "react";
import {
  Navbar,
  Button,
  Link,
  Text,
  Switch,
  useTheme,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import Image from "next/image";
import logo from "@img/logo.png";
const Nav = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar variant="sticky">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Text b size="$xl">
          <Link color="text" href="#">
            <Image src={logo} width={220} height={45} alt="logo" />
          </Link>
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="#">Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Company</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="#">
            Sign Up
          </Button>
        </Navbar.Item>
        <Navbar.Item>
          <Switch
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />
        </Navbar.Item>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;
