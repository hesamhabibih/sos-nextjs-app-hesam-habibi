import { Box, Typography } from "@mui/material";
import { Article } from "../components/article/Article";


export default function Home() {
  return (
    <Box
      mt={{ xs: 2, md: 4 }}
      paddingX={{
        xs: "14px",
        md: "120px",
      }}
    >
      <Box display={"flex"} mb={2} justifyContent={"space-between"}>
        <Typography fontWeight={500} fontSize={24}>
          مقاله
        </Typography>
        <Typography
          fontSize={16}
          color={"#1158A7"}
          display={{ xs: "none", md: "block" }}
        >
          نمایش همه
        </Typography>
      </Box>
      <Box display={"flex"} gap={4} justifyContent={"center"} flexWrap={"wrap"}>
        {Array(4)
          .fill("")
          .map((_item, index) => {
            return (
              <Box key={index} width={{ md: "260px" }}>
                <Article index={index} />
              </Box>
            )
          })}
      </Box>
    </Box>
  );
}