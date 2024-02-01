import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function PostCard({ blog }) {
  return (
    <Card className="PostCard">
      <CardContent>
        <Typography variant="h6" style={{ color: "#164c50" }}>
          <u>{capitalizeFirstLetter(blog.title)}</u>
        </Typography>
        <Typography variant="body1" style={{ padding: "10px", maxHeight:'25px' }}>
          {blog.content}
        </Typography>
      </CardContent>
      <Link className="link" to={`/blog/${blog.id}`}>
        <Button size="small">View</Button>
      </Link>
    </Card>
  );
}
