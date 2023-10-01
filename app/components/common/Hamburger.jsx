//Author:Supratik De//
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";  
import ListItemButton from "@mui/material/ListItemButton";  
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="bg-primary-body"
    >
 
      <List>
        {["Home", "About Us", "Catalog", "Contact Us"].map((text, index) => (
          

          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              
              <Link href={`/${text.replaceAll(" ","")}`}>
              <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider className="py-[2px] border border-y-primary-violet bg-primary-yellow" />
      <List>
        {["Sign Up", "Log In"].map((text, index) => (
          <ListItem key={text} className="bg-primary-body p-4 mx-3">
            <ListItemButton className="bg-primary-yellow text-white  transition hover:bg-yellow-300 hover:text-black duration-300  rounded-lg">
              <ListItemIcon></ListItemIcon>
              <Link href={`/${text.replaceAll(" ","")}`}>
              <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        
        <React.Fragment key={anchor}>
 
          <Button onClick={toggleDrawer(anchor, true)}>
            {<GiHamburgerMenu size="32" className="text-white"/>}
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
