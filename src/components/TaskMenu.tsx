import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Check } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import { useState } from "react";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

export default function TaskMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList dense>
          <MenuItem>
            <ListItemText onClick={handleClose}>Add sub task</ListItemText>
          </MenuItem>
          <MenuItem color="error">
            <ListItemText onClick={handleClose}>Delete</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText inset>Single</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText inset>1.15</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText inset>Double</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            Custom: 1.2
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText>Add space before paragraph</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Add space after paragraph</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemText>Custom spacing...</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
