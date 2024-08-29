import { Box, Button, Icon, Typography } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import Image from "next/image";
import Link from "next/link";
import { imageSelector } from "../../utils/imageSelector";

interface IArticle {
  index: number;
}

export const Article = ({ index }: IArticle) => {
  debugger
  return (
    <Box p={2} borderRadius={2} border={"1px solid #0F5098"}>
      <Box display="flex" justifyContent="center">
        <Image className="image-article" alt="img" src={imageSelector(index)} />
      </Box>
      <Typography color={"#121212"} fontSize={16} fontWeight={600}>
        عنوان مقاله
      </Typography>
      <Box display={"flex"}>
        <AccessTimeIcon
          style={{ color: "#9E9E9E", fontSize: 14, marginLeft: 2 }}
        />
        <Typography color={"#9E9E9E"} fontSize={14} fontWeight={400}>
          ۵ دقیقه
        </Typography>
      </Box>
      <Typography color={"#767676"} fontSize={14} fontWeight={400}>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و...
      </Typography>
      <Box display={"flex"} justifyContent={"end"} width="full" mt="2">
        <Link href={`/Article/${index}`}>
          <Button variant="outlined" sx={{ paddingX: 4 }}>
            ادامه
          </Button>
        </Link>
      </Box>
    </Box>
  );
};