import { Box, Button, Typography } from "@mui/material";
import React from "react";
import logo from "images/logo.png";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <Box
      width={"full"}
      display={"flex"}
      alignItems={"center"}
      paddingY={"12px"}
      paddingX={{
        xs: "14px",
        md: "120px",
      }}
      sx={{ backgroundColor: "white", boxShadow: '0px 8px 8px 0px #12121233' }}
      justifyContent={"space-between"}
    >
      <Box gap={3} display={"flex"} alignItems={"center"}>
        <Box sx={{ width: { xs: 131, md: 198 } }} ml={"16px"}>
          <Image style={{ width: "100%" }} src={logo} alt="log" />
        </Box>
        <Box gap={"60px"} display={{ xs: "none", md: "flex" }}>
          <Link href={"/"} >
            <Typography sx={{ cursor: 'pointer' }} fontSize={14} fontWeight={400} color={"#1158A7"}>صفحه اصلی</Typography>
          </Link>
          <Link href={"/todolist"} >
          <Typography sx={{ cursor: 'pointer' }} fontSize={14} fontWeight={400} color={"#1158A7"}>to do list</Typography>
          </Link>
          <Typography sx={{ cursor: 'pointer' }} fontSize={14} fontWeight={400} color={"#1158A7"}>مراکز خدمات درمانی</Typography>
          <Typography sx={{ cursor: 'pointer' }} fontSize={14} fontWeight={400} color={"#1158A7"}> شعبه های ما</Typography>
          <Typography sx={{ cursor: 'pointer' }} fontSize={14} fontWeight={400} color={"#1158A7"}>سوال های متداول</Typography>
        </Box>
      </Box>
      <Button variant="contained">ورود و فعال سازی</Button>
    </Box>
  );
};